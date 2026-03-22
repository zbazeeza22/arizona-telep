# PelvicScan AI — ML Training Pipeline

Phase 1: Pelvic Fracture Detection | Targeting FDA 510(k) Class II

## Quick Start

```bash
# 1. Install dependencies
cd ml
pip install -r requirements.txt

# 2. Download CTPelvic1K benchmark dataset
# Source: https://github.com/MIRACLE-Center/CTPelvic1K
# Annotations: https://zenodo.org/record/4588403
# Place in: ml/data/CTPelvic1K/

# 3. Place clinical DICOM scans
# Place in: ml/data/clinical/patient_XXX/series_XXX/*.dcm
# Create: ml/data/clinical/labels.csv

# 4. Prepare dataset (preprocessing + patient-level splits)
cd scripts
python prepare_dataset.py --config ../configs/phase1_detection.yaml --data-dir ../data --output-dir ../data/processed

# 5. Pre-train on CTPelvic1K
python train.py --config ../configs/phase1_detection.yaml --stage pretrain --data-dir ../data/processed

# 6. Fine-tune on clinical dataset
python train.py --config ../configs/phase1_detection.yaml --stage finetune --data-dir ../data/processed
```

## Directory Structure

```
ml/
├── configs/
│   └── phase1_detection.yaml    # All hyperparameters + FDA validation config
├── data/
│   ├── CTPelvic1K/              # Benchmark dataset (download separately)
│   ├── clinical/                # Your 4,000 clinical scans (DICOM)
│   └── processed/               # Preprocessed data (generated)
├── models/                      # Saved model checkpoints
├── scripts/
│   ├── dataset.py               # Dataset loading, windowing, splitting
│   ├── model.py                 # PelvicNet2D, PelvicNet3D, Ensemble, GradCAM
│   ├── train.py                 # Training pipeline with FDA audit trail
│   ├── validate.py              # FDA-compliant validation metrics
│   └── prepare_dataset.py       # Data preprocessing pipeline
├── validation/                  # FDA validation reports (generated)
├── docs/
│   └── FDA_510K_SUBMISSION_GUIDE.md
├── requirements.txt
└── README.md
```

## Architecture

**2D Model (PelvicNet2D):** EfficientNet-B4 backbone with 3-channel CT input (bone window, soft tissue window, full HU range). Slice-level fracture detection.

**3D Model (PelvicNet3D):** ResNet-50-3D with single-channel bone window input. Volume-level fracture detection using 64-slice sub-volumes.

**Ensemble:** Weighted average (60% 2D + 40% 3D) for final prediction.

## FDA Compliance

- All training is deterministic (fixed seed=42)
- Patient-level data splitting (no leakage between train/val/test)
- Full training metadata exported as JSON for audit trail
- Validation uses Wilson score CI and bootstrap CI
- Subgroup analysis by demographics and scanner type
- GradCAM explainability for every prediction

## Performance Targets

| Metric | Target | FDA Basis |
|--------|--------|-----------|
| Sensitivity | ≥90% | Predicate device benchmark |
| Specificity | ≥85% | Clinically meaningful |
| AUC-ROC | ≥0.92 | Above median for cleared devices |
| NPV | ≥95% | Minimize missed fractures |

## References

- CTPelvic1K: Liu et al., IJCARS 2021
- nnU-Net: Isensee et al., Nature Methods 2021
- FracSegNet: MICCAI 2023
- PENGWIN Challenge: MICCAI 2024
