# PelvicScan AI — FDA 510(k) Submission Guide

## Regulatory Classification

| Field | Value |
|-------|-------|
| **Device Name** | PelvicScan AI |
| **Device Class** | Class II |
| **Pathway** | 510(k) Premarket Notification |
| **Product Code** | QAS (Radiological Computer-Assisted Triage/Notification) |
| **Predicate Device** | Aidoc BriefCase CARE Multi-Triage CT Body (K252970) |
| **Secondary Predicate** | GLEAMER BoneView (K222176) |
| **IEC 62304 Software Class** | Class B |
| **Intended Use** | Computer-aided detection (CADe) of pelvic fractures on CT |

---

## Submission Format: eSTAR (Mandatory since Oct 1, 2023)

### Required Sections (22 total per eSTAR template)

| Section | Title | Status |
|---------|-------|--------|
| A | Administrative | Pending |
| B | Device Description | **Template Ready** |
| C | Substantial Equivalence Comparison | **Template Ready** |
| D | Proposed Labeling | Pending |
| E | Sterilization/Shelf Life | N/A (Software) |
| F | Biocompatibility | N/A (Software) |
| G | Software Documentation | **Template Ready** |
| H | Electromagnetic Compatibility | N/A (Software) |
| I | Performance Testing - Bench | N/A |
| J | Performance Testing - Animal | N/A |
| K | Performance Testing - Clinical | **Template Ready** |
| L | Cybersecurity | Pending |
| M | Risk Analysis (ISO 14971) | Pending |
| N-V | Additional sections | N/A or Pending |

---

## Section B: Device Description

### Intended Use Statement

> PelvicScan AI is a computer-aided detection (CADe) software device intended to
> analyze computed tomography (CT) images of the pelvis and notify healthcare
> providers of suspected pelvic fractures. The device is intended to be used by
> qualified radiologists and trauma surgeons as an adjunctive tool to assist in
> the detection of pelvic ring fractures. It does not replace clinical judgment
> and all findings must be confirmed by a qualified physician.

### Algorithm Description

- **Architecture**: Ensemble of EfficientNet-B4 (2D slice-level) and ResNet-50-3D (volume-level)
- **Input**: CT pelvic images (DICOM format)
- **Output**: Binary fracture detection (fracture/no fracture) with confidence score
- **Preprocessing**: CT bone window (WL:300, WW:1500), isotropic resampling (1.0mm), HU normalization
- **Explainability**: GradCAM heatmaps for fracture localization
- **Training Data**: Pre-trained on CTPelvic1K (1,184 volumes), fine-tuned on clinical dataset (4,000 scans)
- **Operating Threshold**: Optimized via Youden's J statistic on validation set

### Indications for Use

> PelvicScan AI is indicated as a computer-aided detection and notification
> software device to assist in the identification of pelvic fractures on
> non-contrast CT images in adult patients (≥18 years). The device is intended
> for use by qualified healthcare professionals as an adjunct to standard
> clinical interpretation.

---

## Section C: Substantial Equivalence Comparison

| Feature | PelvicScan AI (Subject) | Aidoc K252970 (Predicate) |
|---------|------------------------|---------------------------|
| Intended Use | CADe for pelvic fractures | CADe/triage for 11 CT body findings (incl. pelvic fracture) |
| Technology | Deep learning (CNN ensemble) | Deep learning (CNN) |
| Input | Non-contrast CT pelvis | Non-contrast CT body |
| Output | Detection + confidence + heatmap | Detection + triage flag |
| User | Radiologist/trauma surgeon | Radiologist |
| Setting | Hospital (ER, radiology dept) | Hospital (ER, radiology dept) |
| Regulatory Class | Class II | Class II |
| Performance | Sensitivity ≥90%, Specificity ≥85% | Sensitivity 97% |

### Justification for Substantial Equivalence

The subject device has the same intended use (CADe for pelvic fracture detection),
same technology (deep learning), same input type (CT images), and same clinical setting
as the predicate. The additional features (confidence scores, GradCAM heatmaps) enhance
clinical utility without raising new safety concerns.

---

## Section G: Software Documentation (IEC 62304)

### Required Deliverables

| Document | IEC 62304 Reference | Status |
|----------|-------------------|--------|
| Software Development Plan (SDP) | 5.1 | Pending |
| Software Requirements Specification (SRS) | 5.2 | **Template Ready** |
| Software Architecture Document | 5.3 | **Template Ready** |
| Detailed Design Document | 5.4 | Pending |
| Unit Test Plan + Report | 5.5 | Pending |
| Integration Test Plan + Report | 5.6 | Pending |
| System Test Plan + Report | 5.7 | Pending |
| V&V Plan + Report | 5.8 | Pending |
| Risk Management File (ISO 14971) | 7 | Pending |
| Traceability Matrix | 5.8 | Pending |
| SOUP List | 8.1 | **Template Ready** |
| Configuration Management Plan | 8 | Pending |
| Anomaly List | 9 | Pending |

### SOUP (Software of Unknown Provenance) List

| Component | Version | Purpose | Risk |
|-----------|---------|---------|------|
| PyTorch | ≥2.1.0 | ML framework | Medium |
| MONAI | ≥1.3.0 | Medical imaging transforms | Medium |
| timm | ≥0.9.0 | Model architectures | Medium |
| SimpleITK | ≥2.3.0 | DICOM/NIfTI I/O | Low |
| nibabel | ≥5.2.0 | NIfTI I/O | Low |
| scikit-learn | ≥1.3.0 | Metrics computation | Low |
| NumPy | ≥1.24.0 | Array operations | Low |
| SciPy | ≥1.11.0 | Statistical computations | Low |

---

## Section K: Clinical Performance Testing

### Study Design: Standalone Performance Testing

| Parameter | Value |
|-----------|-------|
| Study Type | Retrospective, multi-center |
| Test Set Size | 600 cases (from held-out test split) |
| Multi-center | ≥3 hospital sites, different scanner manufacturers |
| Ground Truth | Expert annotation by ≥2 board-certified radiologists per case |
| Primary Endpoint | AUROC for fracture detection |
| Secondary Endpoints | Sensitivity, Specificity, PPV, NPV, F1 |
| Subgroup Analysis | Age (<50, 50-70, >70), Sex, Fracture type, Scanner |

### Performance Targets

| Metric | Target | FDA Basis |
|--------|--------|-----------|
| Sensitivity | ≥90% | Consistent with predicate performance |
| Specificity | ≥85% | Clinically meaningful |
| AUC-ROC | ≥0.92 | Above median for cleared AI devices |
| NPV | ≥95% | Critical: minimize missed fractures |

### Statistical Analysis Plan

- Primary: AUROC with 95% CI (Wilson score interval)
- Secondary: Sensitivity/Specificity at optimal threshold (Youden's J)
- Bootstrap CI (2,000 iterations) for AUC
- Subgroup analysis per FDA requirement
- Power analysis: 80% power at α=0.05

---

## Cost Estimate

| Item | Estimated Cost |
|------|---------------|
| FDA User Fee (510(k), small business) | $6,517 |
| Regulatory Consulting | $75,000-$150,000 |
| Software Documentation (IEC 62304) | $50,000-$100,000 |
| Clinical Validation Study | $150,000-$300,000 |
| Data Annotation (expert radiologists) | $50,000-$100,000 |
| Cybersecurity Documentation | $30,000-$50,000 |
| **Total Estimated** | **$360,000-$700,000** |

---

## Timeline

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Data prep + model development | 2 months | Month 2 |
| Retrospective validation study | 1 month | Month 3 |
| Reader study (3-5 radiologists) | 1 month | Month 4 |
| Pre-Submission meeting with FDA | 2 months | Month 6 |
| 510(k) submission preparation | 2 months | Month 8 |
| FDA review (median 142 days) | 5 months | Month 13 |
| **Total** | **~13 months** | |

---

## Key FDA Guidance Documents

1. **PCCP for AI/ML** (Dec 2024): https://www.fda.gov/media/166704/download
2. **AI-Enabled Device Software** (Jan 2025 draft): https://www.fda.gov/media/184856/download
3. **CADe Clinical Performance** (Sep 2022): FDA guidance for radiology AI study design
4. **RWE for Medical Devices** (Dec 2025): De-identified datasets now accepted
5. **eSTAR Program**: https://www.fda.gov/medical-devices/how-study-and-market-your-device/estar-program
6. **iMRMC Software** (free from FDA): https://cdrh-rst.fda.gov/imrmc-software-do-multi-reader-multi-case-statistical-analysis-reader-studies

---

## Predicate Device Details

### Aidoc BriefCase CARE Multi-Triage CT Body (K252970)
- **Cleared**: ~2025
- **Performance**: Mean sensitivity 97%, mean specificity 98%
- **Scope**: 11 conditions including pelvic fracture
- **Note**: Pelvic fracture is one component of multi-triage; PelvicScan AI offers deeper pelvic-specific analysis

### GLEAMER BoneView (K222176)
- **Cleared**: March 2, 2022
- **Scope**: X-ray fracture detection on limbs, pelvis, spine, rib cage
- **Note**: X-ray based (not CT); establishes fracture AI precedent for pelvic region

### Imagen OsteoDetect (DEN180005)
- **Classification**: De Novo (first AI fracture detection device)
- **Note**: Established the predicate chain for all subsequent fracture AI 510(k)s
