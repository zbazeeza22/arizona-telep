"""
PelvicScan AI - Dataset Preparation Pipeline
================================================
Prepares CT data for training from multiple sources:
1. CTPelvic1K benchmark dataset (NIfTI format)
2. Clinical DICOM scans (4,000 patient scans)

Pipeline:
  Raw Data → DICOM/NIfTI Loading → Resampling → Windowing →
  Patient-Level Splitting → Slice Extraction → Manifest Generation

FDA Compliance:
- Patient-level splitting prevents data leakage
- All processing steps are deterministic and logged
- Data provenance tracked (source, patient ID, scanner)
- Processing parameters documented in config

IEC 62304 Software Item: PREPARE-001
Version: 0.1-dev

Usage:
    python prepare_dataset.py \
        --config configs/phase1_detection.yaml \
        --data-dir ./data \
        --output-dir ./data/processed
"""

import argparse
import csv
import hashlib
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import numpy as np
import SimpleITK as sitk
import nibabel as nib
from scipy.ndimage import zoom
from tqdm import tqdm
import yaml

from dataset import (
    apply_ct_window,
    create_multichannel_input,
    create_patient_level_splits,
    load_dicom_series,
    load_nifti,
    resample_volume,
)

logger = logging.getLogger(__name__)


# =============================================================================
# CTPelvic1K Processor
# =============================================================================

class CTPelvic1KProcessor:
    """
    Process CTPelvic1K benchmark dataset.

    CTPelvic1K (Liu et al., 2021):
    - 1,184 CT volumes from multiple clinical centers
    - Voxel-level bone segmentation masks
    - NIfTI format (.nii.gz)
    - Source: https://github.com/MIRACLE-Center/CTPelvic1K

    Directory structure expected:
      CTPelvic1K/
        dataset1_CLINIC/       # Clinical cases
        dataset2_CLINIC_metal/  # Cases with metal implants
        dataset3_KITS/         # From KiTS challenge
        dataset4_CLINIC/       # Additional clinical
        dataset5_SMU/          # From SMU
        dataset6_ABDOMEN/      # From abdomen CT
    """

    def __init__(self, data_dir: str, config: dict):
        self.data_dir = Path(data_dir)
        self.config = config
        self.preprocessing = config['dataset']['preprocessing']

    def find_volumes(self) -> List[Dict]:
        """Find all NIfTI volumes in CTPelvic1K directory."""
        volumes = []
        subsets = [
            'dataset1_CLINIC',
            'dataset2_CLINIC_metal',
            'dataset3_KITS',
            'dataset4_CLINIC',
            'dataset5_SMU',
            'dataset6_ABDOMEN',
        ]

        for subset in subsets:
            subset_dir = self.data_dir / subset
            if not subset_dir.exists():
                logger.warning(f"Subset not found: {subset_dir}")
                continue

            for nifti_file in sorted(subset_dir.glob('*.nii.gz')):
                # Skip mask files
                if '_mask' in nifti_file.name or '_label' in nifti_file.name:
                    continue

                # Look for corresponding mask
                mask_name = nifti_file.name.replace('.nii.gz', '_mask.nii.gz')
                mask_path = subset_dir / mask_name
                if not mask_path.exists():
                    mask_name = nifti_file.name.replace('.nii.gz', '_label.nii.gz')
                    mask_path = subset_dir / mask_name

                volumes.append({
                    'volume_path': str(nifti_file),
                    'mask_path': str(mask_path) if mask_path.exists() else None,
                    'patient_id': nifti_file.stem.replace('.nii', ''),
                    'source': f'CTPelvic1K_{subset}',
                    'format': 'nifti',
                })

        logger.info(f"Found {len(volumes)} CTPelvic1K volumes")
        return volumes

    def process_volume(
        self,
        volume_info: Dict,
        output_dir: Path,
    ) -> List[Dict]:
        """
        Process a single CTPelvic1K volume into training slices.

        Steps:
        1. Load NIfTI volume
        2. Resample to isotropic spacing
        3. Extract pelvic region slices
        4. Save individual slices as .npy files
        5. Generate slice-level labels from mask

        Returns:
            List of slice info dicts for manifest
        """
        # Load volume
        image, spacing = load_nifti(volume_info['volume_path'])

        # Load mask if available (for label generation)
        has_mask = volume_info['mask_path'] is not None
        mask = None
        if has_mask:
            mask, _ = load_nifti(volume_info['mask_path'])

        # Resample to target spacing
        target_spacing = tuple(self.preprocessing['target_spacing'])
        if spacing != target_spacing:
            image = resample_volume(image, spacing, target_spacing)
            if mask is not None:
                mask = resample_volume(mask, spacing, target_spacing)
                mask = (mask > 0.5).astype(np.float32)

        # Clip HU range
        hu_min = self.preprocessing['hu_min']
        hu_max = self.preprocessing['hu_max']
        image = np.clip(image, hu_min, hu_max)

        # Extract slices and save
        patient_id = volume_info['patient_id']
        patient_dir = output_dir / patient_id
        patient_dir.mkdir(parents=True, exist_ok=True)

        slices_info = []
        num_slices = image.shape[0]  # Axial slices (z-axis)

        for z in range(num_slices):
            slice_data = image[z]

            # Determine label from mask
            # A slice is positive if mask contains pelvic bone annotations
            # For CTPelvic1K, mask presence indicates pelvic anatomy
            label = 0
            if mask is not None and z < mask.shape[0]:
                # If mask has significant content in this slice, it's pelvic region
                mask_coverage = (mask[z] > 0).sum() / mask[z].size
                if mask_coverage > 0.01:  # At least 1% of slice is pelvic bone
                    label = 1  # Pelvic bone present (used for pretraining localization)

            # Save slice
            slice_path = patient_dir / f'slice_{z:04d}.npy'
            np.save(slice_path, slice_data)

            slices_info.append({
                'slice_path': str(slice_path),
                'label': label,
                'patient_id': patient_id,
                'slice_index': z,
                'source': volume_info['source'],
            })

        return slices_info


# =============================================================================
# Clinical DICOM Processor
# =============================================================================

class ClinicalDICOMProcessor:
    """
    Process clinical DICOM scans.

    Expected directory structure:
      clinical/
        patient_001/
          series_001/
            *.dcm
        patient_002/
          ...
        labels.csv  (patient_id, fracture_label, fracture_type, ...)

    The labels.csv must be created by expert radiologists
    with multi-reader validation (minimum 2 readers per case).
    """

    def __init__(self, data_dir: str, config: dict):
        self.data_dir = Path(data_dir)
        self.config = config
        self.preprocessing = config['dataset']['preprocessing']

    def find_patients(self) -> List[Dict]:
        """Find all patient directories with DICOM series."""
        patients = []
        labels = self._load_labels()

        for patient_dir in sorted(self.data_dir.iterdir()):
            if not patient_dir.is_dir():
                continue
            if patient_dir.name.startswith('.'):
                continue
            if patient_dir.name == 'labels.csv':
                continue

            patient_id = patient_dir.name

            # Find DICOM series
            series_dirs = [d for d in patient_dir.iterdir() if d.is_dir()]
            if not series_dirs:
                # DICOM files directly in patient dir
                series_dirs = [patient_dir]

            for series_dir in series_dirs:
                dcm_files = list(series_dir.glob('*.dcm'))
                if not dcm_files:
                    continue

                label_info = labels.get(patient_id, {'label': 0})

                patients.append({
                    'dicom_dir': str(series_dir),
                    'patient_id': patient_id,
                    'label': label_info.get('label', 0),
                    'fracture_type': label_info.get('fracture_type', ''),
                    'source': 'clinical',
                    'format': 'dicom',
                })

        logger.info(f"Found {len(patients)} clinical patient scans")
        return patients

    def _load_labels(self) -> Dict:
        """Load expert annotations from labels.csv."""
        labels_path = self.data_dir / 'labels.csv'
        if not labels_path.exists():
            logger.warning(f"Labels file not found: {labels_path}")
            return {}

        labels = {}
        with open(labels_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                labels[row['patient_id']] = {
                    'label': int(row.get('fracture_label', 0)),
                    'fracture_type': row.get('fracture_type', ''),
                    'young_burgess': row.get('young_burgess', ''),
                    'ao_ota': row.get('ao_ota', ''),
                    'stability': row.get('stability', ''),
                    'reader_1': row.get('reader_1', ''),
                    'reader_2': row.get('reader_2', ''),
                    'consensus': row.get('consensus', ''),
                }
        return labels

    def process_patient(
        self,
        patient_info: Dict,
        output_dir: Path,
    ) -> List[Dict]:
        """Process a single clinical DICOM scan."""
        try:
            image, spacing = load_dicom_series(patient_info['dicom_dir'])
        except Exception as e:
            logger.error(f"Failed to load {patient_info['dicom_dir']}: {e}")
            return []

        # Resample
        target_spacing = tuple(self.preprocessing['target_spacing'])
        image = resample_volume(image, spacing, target_spacing)

        # Clip HU range
        image = np.clip(
            image,
            self.preprocessing['hu_min'],
            self.preprocessing['hu_max'],
        )

        # Save slices
        patient_id = patient_info['patient_id']
        patient_dir = output_dir / patient_id
        patient_dir.mkdir(parents=True, exist_ok=True)

        slices_info = []
        label = patient_info['label']

        for z in range(image.shape[0]):
            slice_path = patient_dir / f'slice_{z:04d}.npy'
            np.save(slice_path, image[z])

            slices_info.append({
                'slice_path': str(slice_path),
                'label': label,  # Volume-level label applied to all slices
                'patient_id': patient_id,
                'slice_index': z,
                'source': 'clinical',
            })

        # Save volume for 3D model
        volume_path = patient_dir / 'volume.npy'
        np.save(volume_path, image)

        return slices_info


# =============================================================================
# Main Preparation Pipeline
# =============================================================================

def prepare_dataset(
    config_path: str,
    data_dir: str,
    output_dir: str,
):
    """
    Full dataset preparation pipeline.

    Steps:
    1. Process CTPelvic1K (pretrain data)
    2. Process clinical DICOM (finetune data)
    3. Create patient-level splits
    4. Generate manifests (train/val/test CSV files)
    5. Log data provenance for FDA audit
    """
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    all_slices = []
    all_volumes = []

    # =========================================================================
    # Stage 1: Process CTPelvic1K
    # =========================================================================
    ctpelvic_dir = Path(data_dir) / 'CTPelvic1K'
    if ctpelvic_dir.exists():
        logger.info("Processing CTPelvic1K dataset...")
        processor = CTPelvic1KProcessor(str(ctpelvic_dir), config)
        volumes = processor.find_volumes()

        ctpelvic_output = output_path / 'ctpelvic1k'
        for vol_info in tqdm(volumes, desc="CTPelvic1K"):
            slices = processor.process_volume(vol_info, ctpelvic_output)
            all_slices.extend(slices)
    else:
        logger.warning(
            f"CTPelvic1K not found at {ctpelvic_dir}. "
            f"Download from: https://github.com/MIRACLE-Center/CTPelvic1K"
        )

    # =========================================================================
    # Stage 2: Process Clinical DICOM
    # =========================================================================
    clinical_dir = Path(data_dir) / 'clinical'
    if clinical_dir.exists():
        logger.info("Processing clinical DICOM scans...")
        processor = ClinicalDICOMProcessor(str(clinical_dir), config)
        patients = processor.find_patients()

        clinical_output = output_path / 'clinical'
        for patient_info in tqdm(patients, desc="Clinical"):
            slices = processor.process_patient(patient_info, clinical_output)
            all_slices.extend(slices)
    else:
        logger.warning(
            f"Clinical data not found at {clinical_dir}. "
            f"Expected structure: clinical/patient_XXX/series_XXX/*.dcm"
        )

    if not all_slices:
        logger.error("No data processed. Check data directories.")
        return

    # =========================================================================
    # Stage 3: Patient-Level Splitting
    # =========================================================================
    logger.info("Creating patient-level splits...")

    patient_ids = [s['patient_id'] for s in all_slices]
    labels = [s['label'] for s in all_slices]
    split_cfg = config['dataset']['split']

    splits = create_patient_level_splits(
        patient_ids=patient_ids,
        labels=labels,
        train_ratio=split_cfg['train'],
        val_ratio=split_cfg['val'],
        test_ratio=split_cfg['test'],
        seed=split_cfg['seed'],
    )

    # Assign slices to splits
    patient_to_split = {}
    for split_name, pids in splits.items():
        for pid in pids:
            patient_to_split[pid] = split_name

    # =========================================================================
    # Stage 4: Generate Manifests
    # =========================================================================
    logger.info("Generating split manifests...")

    manifest_writers = {}
    manifest_files = {}
    for split_name in ['train', 'val', 'test']:
        manifest_path = output_path / f'{split_name}_manifest.csv'
        f = open(manifest_path, 'w', newline='')
        writer = csv.DictWriter(
            f,
            fieldnames=['slice_path', 'label', 'patient_id', 'slice_index', 'source'],
        )
        writer.writeheader()
        manifest_writers[split_name] = writer
        manifest_files[split_name] = f

    split_counts = {'train': 0, 'val': 0, 'test': 0}
    split_positive = {'train': 0, 'val': 0, 'test': 0}

    for slice_info in all_slices:
        split_name = patient_to_split.get(slice_info['patient_id'])
        if split_name is None:
            continue

        manifest_writers[split_name].writerow(slice_info)
        split_counts[split_name] += 1
        if slice_info['label'] == 1:
            split_positive[split_name] += 1

    for f in manifest_files.values():
        f.close()

    # =========================================================================
    # Stage 5: Data Provenance Report
    # =========================================================================
    provenance = {
        'generated_at': datetime.now().isoformat(),
        'config': config_path,
        'data_sources': {
            'CTPelvic1K': str(ctpelvic_dir),
            'clinical': str(clinical_dir),
        },
        'total_slices': len(all_slices),
        'splits': {
            name: {
                'total_slices': split_counts[name],
                'positive_slices': split_positive[name],
                'negative_slices': split_counts[name] - split_positive[name],
                'positive_ratio': (
                    split_positive[name] / split_counts[name]
                    if split_counts[name] > 0 else 0
                ),
                'num_patients': len(splits[name]),
            }
            for name in ['train', 'val', 'test']
        },
        'processing_parameters': config['dataset']['preprocessing'],
    }

    provenance_path = output_path / 'data_provenance.json'
    with open(provenance_path, 'w') as f:
        json.dump(provenance, f, indent=2)

    logger.info("=" * 60)
    logger.info("Dataset Preparation Complete")
    logger.info("=" * 60)
    for name in ['train', 'val', 'test']:
        logger.info(
            f"  {name}: {split_counts[name]} slices "
            f"({split_positive[name]} positive, "
            f"{split_counts[name] - split_positive[name]} negative)"
        )
    logger.info(f"Provenance report: {provenance_path}")


# =============================================================================
# CLI Entry Point
# =============================================================================

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="PelvicScan AI - Dataset Preparation"
    )
    parser.add_argument('--config', default='configs/phase1_detection.yaml')
    parser.add_argument('--data-dir', default='./data')
    parser.add_argument('--output-dir', default='./data/processed')

    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    )

    prepare_dataset(args.config, args.data_dir, args.output_dir)
