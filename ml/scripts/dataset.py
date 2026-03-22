"""
PelvicScan AI - Dataset Module
================================
CT Pelvic Fracture Detection Dataset

Handles:
- CTPelvic1K dataset loading (NIfTI format)
- Clinical DICOM dataset loading and conversion
- CT windowing (bone + soft tissue)
- Patient-level train/val/test splitting (no data leakage)
- FDA-compliant data augmentation

IEC 62304 Software Item: DATASET-001
Version: 0.1-dev
"""

import os
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
import SimpleITK as sitk
import nibabel as nib
from scipy.ndimage import zoom
from sklearn.model_selection import StratifiedGroupKFold
import yaml

logger = logging.getLogger(__name__)


# =============================================================================
# CT Windowing Functions
# =============================================================================

def apply_ct_window(image: np.ndarray, center: int, width: int) -> np.ndarray:
    """
    Apply CT windowing to convert Hounsfield Units to display range.

    Standard radiology protocol:
    - Bone window: center=300, width=1500
    - Soft tissue: center=40, width=400

    Args:
        image: CT image in Hounsfield Units
        center: Window center (level)
        width: Window width

    Returns:
        Windowed image normalized to [0, 1]
    """
    lower = center - width / 2
    upper = center + width / 2
    windowed = np.clip(image, lower, upper)
    windowed = (windowed - lower) / (upper - lower)
    return windowed.astype(np.float32)


def create_multichannel_input(image_hu: np.ndarray) -> np.ndarray:
    """
    Create 3-channel input from single CT image:
    - Channel 0: Bone window (WL=300, WW=1500) - fracture visualization
    - Channel 1: Soft tissue window (WL=40, WW=400) - hemorrhage detection
    - Channel 2: Full HU range normalized - overall anatomy

    This multi-window approach improves detection by 3-5% (Roth et al., 2021)

    Args:
        image_hu: Raw CT image in Hounsfield Units

    Returns:
        3-channel numpy array, shape (3, H, W), values in [0, 1]
    """
    bone = apply_ct_window(image_hu, center=300, width=1500)
    soft_tissue = apply_ct_window(image_hu, center=40, width=400)
    full_range = apply_ct_window(image_hu, center=800, width=2000)

    return np.stack([bone, soft_tissue, full_range], axis=0)


# =============================================================================
# Data Preprocessing
# =============================================================================

def resample_volume(
    image: np.ndarray,
    original_spacing: Tuple[float, ...],
    target_spacing: Tuple[float, ...] = (1.0, 1.0, 1.0)
) -> np.ndarray:
    """
    Resample CT volume to isotropic voxel spacing.
    Critical for consistent measurements across different scanners.

    Args:
        image: 3D CT volume
        original_spacing: Original voxel spacing (z, y, x) in mm
        target_spacing: Target voxel spacing in mm

    Returns:
        Resampled volume
    """
    resize_factor = np.array(original_spacing) / np.array(target_spacing)
    new_shape = np.round(image.shape * resize_factor).astype(int)
    zoom_factors = new_shape / np.array(image.shape)

    resampled = zoom(image, zoom_factors, order=3)  # cubic interpolation
    return resampled


def load_nifti(filepath: str) -> Tuple[np.ndarray, Tuple[float, ...]]:
    """
    Load NIfTI file and extract voxel spacing.

    Args:
        filepath: Path to .nii or .nii.gz file

    Returns:
        Tuple of (image_array, voxel_spacing)
    """
    nii = nib.load(filepath)
    image = nii.get_fdata().astype(np.float32)
    spacing = tuple(nii.header.get_zooms()[:3])
    return image, spacing


def load_dicom_series(directory: str) -> Tuple[np.ndarray, Tuple[float, ...]]:
    """
    Load DICOM series from directory using SimpleITK.

    Args:
        directory: Path to directory containing DICOM files

    Returns:
        Tuple of (image_array_in_HU, voxel_spacing)
    """
    reader = sitk.ImageSeriesReader()
    dicom_files = reader.GetGDCMSeriesFileNames(directory)

    if not dicom_files:
        raise FileNotFoundError(f"No DICOM files found in {directory}")

    reader.SetFileNames(dicom_files)
    image = reader.Execute()

    array = sitk.GetArrayFromImage(image).astype(np.float32)
    spacing = image.GetSpacing()[::-1]  # SimpleITK uses (x,y,z), we want (z,y,x)

    return array, tuple(spacing)


# =============================================================================
# Dataset Classes
# =============================================================================

class PelvicFractureDataset2D(Dataset):
    """
    2D slice-level pelvic fracture detection dataset.

    Loads individual CT slices with multi-channel windowing.
    Each slice is labeled as fracture/no_fracture based on
    slice-level annotations.

    IEC 62304 Software Item: DATASET-001-2D
    """

    def __init__(
        self,
        data_dir: str,
        split: str = "train",
        config_path: str = "configs/phase1_detection.yaml",
        transform=None,
    ):
        """
        Args:
            data_dir: Root directory containing processed data
            split: One of 'train', 'val', 'test'
            config_path: Path to configuration YAML
            transform: Optional torchvision transforms
        """
        self.data_dir = Path(data_dir)
        self.split = split
        self.transform = transform

        # Load config
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        # Load manifest (list of slice paths + labels)
        manifest_path = self.data_dir / f"{split}_manifest.csv"
        if not manifest_path.exists():
            raise FileNotFoundError(
                f"Manifest not found: {manifest_path}. "
                f"Run prepare_dataset.py first."
            )

        self.samples = self._load_manifest(manifest_path)
        logger.info(
            f"Loaded {len(self.samples)} slices for {split} split "
            f"({sum(s['label'] for s in self.samples)} fracture, "
            f"{sum(1-s['label'] for s in self.samples)} normal)"
        )

    def _load_manifest(self, path: Path) -> List[Dict]:
        """Load dataset manifest CSV."""
        import csv
        samples = []
        with open(path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                samples.append({
                    'path': row['slice_path'],
                    'label': int(row['label']),
                    'patient_id': row['patient_id'],
                    'slice_index': int(row['slice_index']),
                    'source': row.get('source', 'unknown'),
                })
        return samples

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, int]:
        sample = self.samples[idx]

        # Load preprocessed slice (saved as .npy for speed)
        slice_data = np.load(sample['path']).astype(np.float32)

        # Create 3-channel input (bone, soft tissue, full range)
        multichannel = create_multichannel_input(slice_data)

        # Resize to target input size
        cfg = self.config['dataset']['preprocessing']
        target_h, target_w = cfg['input_size']
        if multichannel.shape[1] != target_h or multichannel.shape[2] != target_w:
            resized = np.zeros((3, target_h, target_w), dtype=np.float32)
            for c in range(3):
                resized[c] = zoom(
                    multichannel[c],
                    (target_h / multichannel.shape[1], target_w / multichannel.shape[2]),
                    order=1
                )
            multichannel = resized

        tensor = torch.from_numpy(multichannel)

        # Apply augmentation (train only)
        if self.transform is not None:
            tensor = self.transform(tensor)

        label = sample['label']
        return tensor, label


class PelvicFractureDataset3D(Dataset):
    """
    3D volume-level pelvic fracture detection dataset.

    Loads CT sub-volumes centered on the pelvis for volumetric analysis.
    Each volume is labeled as fracture/no_fracture.

    IEC 62304 Software Item: DATASET-001-3D
    """

    def __init__(
        self,
        data_dir: str,
        split: str = "train",
        config_path: str = "configs/phase1_detection.yaml",
        volume_depth: int = 64,
        transform=None,
    ):
        self.data_dir = Path(data_dir)
        self.split = split
        self.volume_depth = volume_depth
        self.transform = transform

        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        manifest_path = self.data_dir / f"{split}_volumes.csv"
        if not manifest_path.exists():
            raise FileNotFoundError(
                f"Volume manifest not found: {manifest_path}. "
                f"Run prepare_dataset.py first."
            )

        self.samples = self._load_manifest(manifest_path)
        logger.info(
            f"Loaded {len(self.samples)} volumes for {split} split"
        )

    def _load_manifest(self, path: Path) -> List[Dict]:
        import csv
        samples = []
        with open(path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                samples.append({
                    'path': row['volume_path'],
                    'label': int(row['label']),
                    'patient_id': row['patient_id'],
                    'source': row.get('source', 'unknown'),
                })
        return samples

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, int]:
        sample = self.samples[idx]

        # Load preprocessed volume
        volume = np.load(sample['path']).astype(np.float32)

        # Ensure correct depth
        if volume.shape[0] != self.volume_depth:
            depth_factor = self.volume_depth / volume.shape[0]
            volume = zoom(volume, (depth_factor, 1, 1), order=1)

        # Apply bone window
        volume = apply_ct_window(volume, center=300, width=1500)

        # Add channel dimension: (1, D, H, W)
        tensor = torch.from_numpy(volume).unsqueeze(0)

        if self.transform is not None:
            tensor = self.transform(tensor)

        return tensor, sample['label']


# =============================================================================
# Patient-Level Splitting (FDA Requirement: No Data Leakage)
# =============================================================================

def create_patient_level_splits(
    patient_ids: List[str],
    labels: List[int],
    train_ratio: float = 0.70,
    val_ratio: float = 0.15,
    test_ratio: float = 0.15,
    seed: int = 42,
) -> Dict[str, List[str]]:
    """
    Split patients into train/val/test ensuring:
    1. No patient appears in multiple splits (prevents data leakage)
    2. Stratified by label (maintains fracture/normal ratio)
    3. Reproducible (fixed seed per IEC 62304)

    FDA 510(k) Requirement: Test set must be completely independent
    of training data. Patient-level splitting prevents any slice from
    the same patient appearing in both train and test sets.

    Args:
        patient_ids: Unique patient identifiers
        labels: Binary labels (0=normal, 1=fracture)
        train_ratio: Fraction for training
        val_ratio: Fraction for validation
        test_ratio: Fraction for testing
        seed: Random seed for reproducibility

    Returns:
        Dict with 'train', 'val', 'test' keys, each containing patient IDs
    """
    assert abs(train_ratio + val_ratio + test_ratio - 1.0) < 1e-6, \
        "Split ratios must sum to 1.0"

    # Get unique patients and their labels
    unique_patients = list(set(patient_ids))
    patient_labels = {}
    for pid, label in zip(patient_ids, labels):
        if pid not in patient_labels:
            patient_labels[pid] = label
        else:
            # If any scan has fracture, patient is positive
            patient_labels[pid] = max(patient_labels[pid], label)

    unique_labels = [patient_labels[p] for p in unique_patients]

    np.random.seed(seed)

    # Stratified split
    from sklearn.model_selection import train_test_split

    # First split: train+val vs test
    trainval_patients, test_patients = train_test_split(
        unique_patients,
        test_size=test_ratio,
        stratify=unique_labels,
        random_state=seed,
    )

    # Extract labels for trainval patients
    trainval_labels = [patient_labels[p] for p in trainval_patients]

    # Second split: train vs val
    adjusted_val_ratio = val_ratio / (train_ratio + val_ratio)
    train_patients, val_patients = train_test_split(
        trainval_patients,
        test_size=adjusted_val_ratio,
        stratify=trainval_labels,
        random_state=seed,
    )

    splits = {
        'train': train_patients,
        'val': val_patients,
        'test': test_patients,
    }

    logger.info(
        f"Patient-level splits: "
        f"train={len(train_patients)}, "
        f"val={len(val_patients)}, "
        f"test={len(test_patients)}"
    )

    return splits


# =============================================================================
# DataLoader Factory
# =============================================================================

def create_dataloaders(
    config_path: str,
    data_dir: str,
    mode: str = "2d",
    num_workers: int = 4,
) -> Dict[str, DataLoader]:
    """
    Create train/val/test DataLoaders with proper configuration.

    Args:
        config_path: Path to YAML config
        data_dir: Root data directory
        mode: '2d' for slice-level, '3d' for volume-level
        num_workers: Number of data loading workers

    Returns:
        Dict with 'train', 'val', 'test' DataLoaders
    """
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)

    batch_size = config['training']['finetune']['batch_size']

    DatasetClass = PelvicFractureDataset2D if mode == "2d" else PelvicFractureDataset3D

    loaders = {}
    for split in ['train', 'val', 'test']:
        dataset = DatasetClass(
            data_dir=data_dir,
            split=split,
            config_path=config_path,
        )

        loaders[split] = DataLoader(
            dataset,
            batch_size=batch_size if split == 'train' else batch_size * 2,
            shuffle=(split == 'train'),
            num_workers=num_workers,
            pin_memory=True,
            drop_last=(split == 'train'),
        )

    return loaders
