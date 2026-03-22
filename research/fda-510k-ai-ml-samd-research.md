# FDA 510(k) Requirements for AI/ML-Based Medical Imaging Devices (SaMD)
## Comprehensive Research Document
### Date: March 22, 2026

---

## 1. FDA Guidance Documents for AI/ML SaMD

### Final Guidance Documents

| Document Title | Date | URL |
|---|---|---|
| Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions | December 3, 2024 (Final) | https://www.fda.gov/media/166704/download |
| Good Machine Learning Practice for Medical Device Development: Guiding Principles | October 2021 (adopted by FDA/Health Canada/MHRA) | https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles |
| Clinical Performance Assessment: Considerations for Computer-Assisted Detection Devices Applied to Radiology Images and Radiology Device Data in Premarket Notification [510(k)] Submissions | September 2022 (Final) | https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-performance-assessment-considerations-computer-assisted-detection-devices-applied-radiology |
| Computer-Assisted Detection Devices Applied to Radiology Images and Radiology Device Data - Premarket Notification [510(k)] Submissions | July 2012 (Final) | https://www.fda.gov/regulatory-information/search-fda-guidance-documents/computer-assisted-detection-devices-applied-radiology-images-and-radiology-device-data-premarket |

### Draft Guidance Documents

| Document Title | Date | URL |
|---|---|---|
| Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations | January 6, 2025 (Draft) | https://www.fda.gov/media/184856/download |
| AI-Enabled Digital Mental Health Medical Devices | 2025 (Draft) | https://www.fda.gov/media/189391/download |

### Key Framework Documents

| Document Title | Date | URL |
|---|---|---|
| Artificial Intelligence and Medical Products: How CBER, CDER, CDRH, and OCP are Working Together | March 15, 2024 | https://www.fda.gov/media/177030/download |
| AI/ML-Based SaMD Action Plan | January 2021 | https://www.fda.gov/media/145022/download |
| IMDRF Good Machine Learning Practice (GMLP) 10 Guiding Principles | January 2025 | Referenced at https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles |

### FDA Portal

The master list of AI/ML-enabled medical devices authorized by FDA is maintained at:
https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices

---

## 2. 510(k) Submission Sections for an AI Radiology Tool

Per 21 CFR 807.87 and the mandatory eSTAR (Electronic Submission Template and Resource) format (required since October 1, 2023), a 510(k) submission contains **22 sections** (lettered A through V in eSTAR format):

### Required Sections (All 510(k)s)

1. **Cover Letter** - Submission type, contact info, MDUFA cover sheet (FDA Form 3514)
2. **Indications for Use Statement** - FDA Form 3881, specific clinical claim
3. **510(k) Summary or Statement** - Per 21 CFR 807.92/807.93
4. **Truthful and Accuracy Statement** - Certification per 21 CFR 807.87(j)
5. **Class III Summary and Certification** (if applicable)
6. **Financial Certification/Disclosure** - For clinical studies per 21 CFR 54
7. **Declarations of Conformity and Summary Reports** (for recognized standards)
8. **Executive Summary / Device Description** - Complete description of the device, including:
   - Technological characteristics
   - Materials, design, key subsystems
   - For software/AI: algorithm description, architecture, inputs/outputs, training data description
9. **Substantial Equivalence Comparison** - Side-by-side comparison table with predicate(s) covering:
   - Intended use / indications for use
   - Technological characteristics
   - Performance characteristics
10. **Proposed Labeling** - Per 21 CFR 801: instructions for use, user manual, promotional materials
11. **Sterilization and Shelf Life** (if applicable - typically N/A for SaMD)
12. **Biocompatibility** (if applicable - typically N/A for SaMD)
13. **Software Documentation** - For AI/ML SaMD this is critical and includes:
    - Software level of concern (now replaced by documentation level based on risk)
    - Software description (including algorithm description)
    - Software requirements specification (SRS)
    - Software architecture design chart
    - Software design specification
    - Software development environment description
    - Verification and validation (V&V) documentation
    - Revision history
    - Unresolved anomalies (bug list)
    - Software of Unknown Provenance (SOUP) / Off-the-Shelf (OTS) list
14. **Cybersecurity** - Per October 2023 FDA guidance:
    - Threat model
    - Cybersecurity risk assessment
    - Software Bill of Materials (SBOM)
    - Security architecture
    - Vulnerability testing
15. **Electromagnetic Compatibility (EMC) / Electrical Safety** (if hardware involved)
16. **Performance Testing - Bench** - Non-clinical testing, including:
    - Standalone algorithm performance (sensitivity, specificity, AUC, PPV, NPV)
    - Subgroup analyses (demographics, imaging parameters)
17. **Performance Testing - Clinical** - For CADe/CADx devices:
    - Multi-Reader Multi-Case (MRMC) study results
    - OR standalone clinical performance study
18. **Clinical Evidence** - May include literature review, clinical experience data
19. **Risk Analysis Summary** - Per ISO 14971
20. **Quality System Information** - 21 CFR 820 / ISO 13485 compliance
21. **Substantial Equivalence Discussion** - Narrative argument
22. **Other Information** - Additional supporting data

### AI/ML-Specific Additional Requirements (from Jan 2025 Draft Guidance)

- **Description of AI/ML model**: Architecture, training methodology, data sources
- **Training/tuning/validation data description**: Demographics, data sources, preprocessing
- **Reference standard / ground truth methodology**: How was truth established
- **Predetermined Change Control Plan (PCCP)**: If planning future algorithm updates
- **Algorithm performance across subgroups**: Demographic, equipment, clinical subgroups
- **Total Product Lifecycle (TPLC) approach description**: How performance will be monitored post-market

---

## 3. Predicate Devices for Pelvic Fracture AI

### Aidoc Medical, Ltd. - BriefCase

**IMPORTANT NOTE**: As of this research, Aidoc does NOT have a standalone pelvic-fracture-specific 510(k) clearance. Their pelvic fracture capability is part of a broader multi-condition triage platform:

| Detail | Information |
|---|---|
| **Product** | BriefCase-Triage: CARE (Clinical AI Reasoning Engine) Multi-Triage CT Body |
| **K-Number** | K252970 (most recent comprehensive clearance) |
| **Clearance Date** | ~2025 (exact date to be verified on FDA database) |
| **Indications** | Pelvic fracture is ONE of 11 acute conditions triaged, including: appendicitis, acute diverticulitis, abdominal-pelvic abscess, small/large bowel obstruction, obstructive kidney stone, intestinal ischemia/pneumatosis, kidney injury, liver injury, spleen injury, and pelvic fracture |
| **Performance (claimed)** | Mean sensitivity of 97% (up to 98.5%); Mean specificity of 98% (up to 99.7%) across the 11 conditions |
| **Modality** | CT (abdomen/pelvis) |
| **Classification** | Class II, Product Code: QAS (Radiological Computer-Assisted Triage) |

#### Other Notable Aidoc Clearances (for predicate chain reference):

| K-Number | Product | Indication | Approx. Date |
|---|---|---|---|
| K180647 | BriefCase ICH | Intracranial hemorrhage triage (CT) | 2018 |
| K190896 | BriefCase PE | Pulmonary embolism triage (CT) | 2019 |
| K202992 | BriefCase RibFx | Rib fracture triage (CT) | 2020-2021 |
| K220709 | BriefCase LVO | Large vessel occlusion (CTA) | 2022 |
| K230534 | BriefCase Aorta | Aortic diameter quantification | 2023 |
| K243548 | BriefCase RibFx (updated) | Rib fractures (CT) | 2024 |
| K251406 | BriefCase Aortic Dissection | Acute aortic dissection | 2025 |

### GLEAMER - BoneView

| Detail | Information |
|---|---|
| **Product** | BoneView |
| **K-Number** | K222176 (initial US clearance); K212365 (appears in FDA database, possibly initial filing); K233655 (pediatric expansion) |
| **Clearance Date** | March 2, 2022 (initial); subsequent expansions |
| **Indications** | AI-powered fracture detection and localization on X-rays of limbs, **pelvis**, thoracic and lumbar spine, and rib cage |
| **Population** | Adults and children above 2 years old (expanded with K233655) |
| **Anatomical Coverage** | Foot/ankle, knee/leg, **hip/pelvis**, hand/wrist, elbow/arm, shoulder/clavicle, rib cage, thoracolumbar spine |
| **Modality** | X-ray (plain radiography) |
| **Performance** | 91.3% sensitivity for fracture detection (pediatric study with 300 patients) |
| **Classification** | Class II, CADe |
| **Key Note** | BoneView is X-ray based (not CT), so it may serve as a predicate for X-ray AI but not directly for CT-based pelvic fracture detection |

### Other Potential Predicates for Fracture AI

| Company | Product | K-Number | Indication | Notes |
|---|---|---|---|---|
| Imagen Technologies | OsteoDetect | DEN180005 (De Novo) | Distal radius fracture detection on X-ray | First-ever FDA-cleared AI CADx for fractures; De Novo, not 510(k) |
| Zebra Medical Vision | HealthVCF | K192901 | Vertebral compression fracture detection on CT | CT-based; cleared May 2020 |
| Zebra Medical Vision | HealthPNX | K193417 | Pneumothorax detection on X-ray | Not fracture-specific but relevant triage predicate |

### Predicate Strategy Note for Pelvic Fracture AI
For a CT-based pelvic fracture detection tool, the most relevant predicates would be:
- **Aidoc K252970** (BriefCase multi-triage, includes pelvic fracture on CT)
- **Aidoc K202992/K243548** (BriefCase rib fracture on CT - same modality, fracture detection)
- **Zebra Medical K192901** (HealthVCF - CT-based fracture detection, different anatomy)
- For X-ray based: **GLEAMER K222176** (BoneView, includes pelvis on X-ray)

---

## 4. IEC 62304 Software Lifecycle Requirements

### Standard: IEC 62304:2006+AMD1:2015 - Medical device software - Software life cycle processes

The standard is harmonized by both FDA (recognized consensus standard) and EU MDR.

### Software Safety Classifications

| Class | Risk Level | Documentation Required |
|---|---|---|
| **Class A** | No injury or damage to health possible | Minimal documentation |
| **Class B** | Non-serious injury possible | Moderate documentation |
| **Class C** | Death or serious injury possible | **Full documentation** (AI pelvic fracture detection = likely Class C) |

### Required Documentation by IEC 62304 Process (Class C - Full Requirements)

#### 5.1 Software Development Planning
- **Software Development Plan (SDP)** - Defines processes, deliverables, development activities, tools, coding standards, V&V strategies
- Traceability between system requirements, software requirements, verification tests, and risk controls
- Reference to ISO 14971 risk management process

#### 5.2 Software Requirements Analysis
- **Software Requirements Specification (SRS)** - Functional, performance, interface, safety requirements, and hazard mitigations
- Input/output specifications
- User interface requirements
- Data definition and database requirements
- Installation and acceptance requirements

#### 5.3 Software Architectural Design
- **Software Architecture Document (SAD)** - Diagrams of subsystems/components and interfaces
- Identification of SOUP (Software of Unknown Provenance) components
- Segregation of software items for risk control
- **Verification**: Architecture implements requirements, supports SOUP integration, is traceable to requirements

#### 5.4 Software Detailed Design
- **Detailed Design Document (DDD)** - Design detail sufficient for correct implementation of each software unit
- Interface specifications between software units
- **Verification (Class C)**: Detailed design implements architecture, is free from contradiction with architecture, supports proper interfaces

#### 5.5 Software Unit Implementation
- Source code
- **Unit Verification (Class C)**:
  - Code review / static analysis
  - Unit tests covering functionality, boundary conditions, error handling
  - Verification that units implement detailed design

#### 5.6 Software Integration and Integration Testing
- **Software Integration Plan**
- **Integration Test Plan and Report** - Testing of interfaces between software items
- **Verification**: Integration tests verify proper data transfer, timing, resource allocation

#### 5.7 Software System Testing
- **System Test Plan and Report** - Testing against software requirements
- Inputs from risk management (test hazardous situations)
- Regression testing strategy

#### 5.8 Software Release
- **Release documentation** - Version identification, known anomalies, release notes
- Verification that all planned activities have been completed

#### 6. Software Maintenance Process
- **Maintenance Plan** - Problem tracking, modification analysis, change implementation
- Feedback monitoring procedures

#### 7. Software Risk Management Process
- **Software Risk Management File** (per ISO 14971)
- Software hazard analysis (FMEA, FTA, or similar)
- Software risk control measures
- Verification of risk control measure effectiveness
- Residual risk evaluation

#### 8. Software Configuration Management
- **Configuration Management Plan**
- Change control procedures
- Configuration identification
- Configuration status accounting

#### 9. Software Problem Resolution Process
- **Problem reporting and tracking system**
- Trend analysis of problems
- Verification of problem resolutions

### Key Deliverables Summary for Class C (Pelvic Fracture AI)

1. Software Development Plan (SDP)
2. Software Requirements Specification (SRS)
3. Software Architecture Document (SAD)
4. Software Detailed Design Document (DDD)
5. Unit Test Plans and Reports
6. Integration Test Plans and Reports
7. System Test Plan and Report
8. Software V&V Plan and Reports
9. Risk Management File (ISO 14971)
10. Software Hazard Analysis (FMEA)
11. Traceability Matrix (requirements -> design -> implementation -> verification)
12. Configuration Management Plan
13. SOUP/OTS List with risk assessment
14. Anomaly/Bug List (unresolved anomalies)
15. Release Notes and Version History
16. Maintenance Plan

---

## 5. Performance Testing Requirements

### FDA Does NOT Specify Fixed Sensitivity/Specificity Thresholds

**Critical fact**: The FDA does not mandate minimum numerical thresholds for sensitivity or specificity. Instead, the manufacturer must:
- Propose clinically meaningful performance claims
- Demonstrate those claims with statistically significant evidence
- Show the device performs as well as or better than the predicate
- Demonstrate adequate performance across relevant subgroups

### What FDA-Cleared AI Radiology Devices Have Demonstrated (Benchmarks, Not Requirements)

From published literature and FDA summaries:
- **Median reported sensitivity**: >91%
- **Median reported specificity**: >91%
- **Median AUROC**: 96.1%
- **Median NPV**: 98.9%
- **Aidoc BriefCase multi-triage (K252970)**: Mean sensitivity 97%, mean specificity 98%
- **BoneView pediatric fractures**: 91.3% sensitivity

### Validation Study Case Numbers

The FDA does not mandate a specific minimum number of cases, but expects:
- Sample size powered to detect clinically meaningful differences with statistical significance
- **Typical ranges from cleared devices**:
  - Standalone performance: 300-5,000+ cases (varies widely)
  - Multi-Reader Multi-Case (MRMC) studies: 200-500 cases is common
  - Example: Aorta-CAD MRMC study used 244 cases
  - Example: BoneView pediatric study used 300 patients

### Multi-Reader Multi-Case (MRMC) Study Design

Per FDA guidance ("Clinical Performance Assessment: Considerations for Computer-Assisted Detection Devices Applied to Radiology Images and Radiology Device Data in Premarket Notification [510(k)] Submissions"):

#### Study Design Options:

**1. Sequential (Most Common for CADe)**
- Same readers read all cases twice: first without AI, then (after washout period) with AI
- Fully-crossed design (all readers read all cases) is preferred for maximum statistical power
- Primary endpoint: Difference in AUC between aided and unaided readings

**2. Independent / Crossover**
- Two distinct reading sessions separated in time
- One session without device, one with device
- Renders readings "independent"

**3. Standalone Performance**
- Algorithm output compared to ground truth without reader involvement
- Reports sensitivity/specificity at operating point

#### Reader Requirements:
- Multiple readers (typically 6-15 radiologists in published studies)
- Readers should represent intended users (e.g., radiologists, emergency physicians)
- Both readers and cases contribute to statistical uncertainty
- Pre-specify the statistical analysis plan

#### Case Selection:
- Sample from intended use population
- Include appropriate range of diseased/abnormal AND normal cases
- DO NOT enrich cases based on device performance
- Include range of difficulty levels
- Multi-site data strongly preferred
- Stratified analysis by subgroups (lesion type, size, demographics, imaging equipment)

#### Ground Truth / Reference Standard:
- Expert-annotated (typically 2+ board-certified radiologists with adjudication)
- May use surgical/pathological confirmation where available
- Ground truth methodology must be pre-specified
- Test data MUST be sequestered from training data

#### Statistical Analysis:
- **Primary endpoint**: AUROC is recommended by FDA for MRMC designs
- Sensitivity/specificity at clinically relevant thresholds
- Confidence intervals required
- **FDA provides free software**: iMRMC (software for Multi-Reader Multi-Case statistical analysis) available at: https://cdrh-rst.fda.gov/imrmc-software-do-multi-reader-multi-case-statistical-analysis-reader-studies

---

## 6. Real-World Evidence (RWE) Guidance - 2025-2026 Changes

### Key Document
**"Use of Real-World Evidence to Support Regulatory Decision-Making for Medical Devices"**
- Published: December 2025 (Final Guidance)
- Supersedes: August 31, 2017 version
- Federal Register: https://www.federalregister.gov/documents/2025/12/18/2025-23252/use-of-real-world-evidence-to-support-regulatory-decision-making-for-medical-devices-guidance-for

### Major Changes in the December 2025 Update

#### 1. De-Identified Data Now Accepted
**Previous requirement**: Sponsors had to secure access to identifiable individual-level patient data as a condition for using a given RWD source.
**New policy**: De-identified, aggregate, and international datasets may now be used, provided data relevance, reliability, and traceability are demonstrated. This removes a major barrier to using large databases like claims databases and registries.

#### 2. Expanded Data Source Options
- De-identified data sources
- Aggregate data
- International datasets
- All acceptable as long as relevance, reliability, and traceability are demonstrated

#### 3. Enhanced Documentation Requirements
- Comprehensive documentation of RWD sources
- Pre-specified study protocols
- Clear definitions of all study elements
- Relevance and reliability assessments
- Specific methodological recommendations

#### 4. Implementation Timeline
- FDA does not expect industry to start "operationalizing" recommendations until **February 16, 2026**
- However, FDA will review such information if submitted at any time

#### 5. Relevance to AI/ML Devices
- RWE can potentially support:
  - Post-market performance monitoring of AI algorithms
  - Evidence for PCCP modifications
  - Supplemental clinical evidence in 510(k) submissions
  - Expanded indications supported by real-world performance data

---

## 7. FDA's PCCP (Predetermined Change Control Plan) for AI/ML

### Key Document
**"Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions"**
- Published: December 3, 2024 (Final Guidance)
- URL: https://www.fda.gov/media/166704/download

### What PCCP Allows

Once FDA reviews and authorizes a PCCP as part of a 510(k), De Novo, or PMA submission, the manufacturer may implement planned modifications **without submitting a new marketing authorization**, provided changes remain within the authorized plan.

### Three Required Components of a PCCP

1. **Description of Modifications** - What specific changes are anticipated
2. **Modification Protocol** - How those changes will be implemented, verified, and validated
3. **Impact Assessment** - Analysis of how modifications affect safety and effectiveness

### Types of Modifications Allowed Under PCCP

| Modification Type | Description |
|---|---|
| **ML model retraining** | Retraining with new data, new hyperparameters, loss functions, and optimizers, or different model architectures |
| **Signal processing updates** | Updates to digital signal processing steps applied before ML model |
| **Probability postprocessing** | Modification of methods used to generate outputs from model output |
| **Signal quality check updates** | Update of thresholds used to check input signal quality |
| **Performance improvements** | Quantitative improvements within specified bounds |
| **Input data expansion** | Support for additional scanner types, imaging protocols (within defined scope) |

### Requirements for Algorithm Retraining Under PCCP

- Specify triggers for retraining (acquisition of new data, drift detection, performance degradation, fixed cadence)
- Define what parts of the model may change
- Describe overfitting controls
- Include performance evaluation with:
  - Pre-specified study designs
  - Acceptance metrics and criteria
  - Statistical analysis plans
- Verify non-targeted specifications do not degrade

### Key Changes in Final Guidance (vs. Draft)

| Change | Detail |
|---|---|
| **Expanded scope** | Now covers ALL AI-enabled devices (not just ML-enabled devices) |
| **Interplay with new submissions** | Additional detail on when changes exceed PCCP scope and require new marketing submissions |
| **Description of Modifications section** | More detail on required content |
| **Labeling considerations** | New guidance on how labeling should reflect PCCP modifications |

### What PCCP Does NOT Allow
- Changes outside the described scope of modifications
- Changes that cannot follow the modification protocol
- Changes to intended use or indications for use (unless specifically described in the PCCP)
- Any modification that is presumed to require a new submission if not described in the plan

---

## 8. Cost Breakdown of a 510(k) Submission

### FDA User Fees (FY 2026: October 1, 2025 - September 30, 2026)

| Fee Type | Standard | Small Business (<=USD 100M revenue) |
|---|---|---|
| **510(k) Premarket Notification** | **$26,069** | **$6,517** (25% of standard) |
| **De Novo Classification Request** | **$173,782** | **$43,446** (25% of standard) |
| **PMA (for reference)** | $579,272 | $144,818 |
| **Annual Establishment Registration** | $11,423 | Waiver possible if <$1M revenue |

Source: Federal Register, July 30, 2025, "Medical Device User Fee Rates for Fiscal Year 2026"

### Total Cost Estimates for AI/ML 510(k) (Industry Ranges)

| Cost Category | Estimated Range | Notes |
|---|---|---|
| **FDA User Fee** | $6,517 - $26,069 | Depends on small business qualification |
| **Regulatory Consulting** | $75,000 - $250,000 | Submission preparation, strategy, FDA interactions |
| **Pre-Submission Meeting (Pre-Sub)** | $15,000 - $40,000 | Consultant time to prepare; FDA meeting is free |
| **Software Documentation (IEC 62304)** | $50,000 - $150,000 | SDP, SRS, architecture, V&V |
| **Cybersecurity Documentation** | $30,000 - $75,000 | Threat model, SBOM, testing |
| **Clinical Validation Study (MRMC)** | $150,000 - $500,000+ | Reader recruitment, case curation, statistical analysis |
| **Data Acquisition/Curation** | $50,000 - $200,000 | Multi-site imaging data licensing, annotation |
| **Standalone Performance Testing** | $50,000 - $150,000 | Algorithm benchmarking, subgroup analysis |
| **Biostatistical Support** | $30,000 - $75,000 | Study design, sample size calculations, analysis |
| **Quality System (ISO 13485)** | $50,000 - $100,000 | If not already established |
| **eSTAR Preparation** | $10,000 - $30,000 | Template completion, formatting |
| **TOTAL ESTIMATED RANGE** | **$500,000 - $1,500,000+** | For AI/ML radiology device |

### Notes on Cost
- Simple SaMD with clear predicate and existing clinical data: closer to $250,000-$500,000
- Complex AI with novel algorithm, multi-site MRMC study: $750,000-$2,500,000
- Dental AI 510(k) submissions have been estimated at $750,000-$2,500,000 by industry sources
- Costs increase significantly if FDA issues Additional Information (AI) requests or if pre-submission feedback requires study redesign

---

## 9. Timeline: Review Times and Fastest Clearances

### Median Review Times (Submission to Clearance)

| Year | Median (All AI/ML Devices) | 510(k) Pathway | De Novo Pathway |
|---|---|---|---|
| **2024** | 162 days | 151 days | 372 days |
| **2025** | 142 days | ~135-142 days (est.) | ~350+ days |

- Interquartile range (2024): 106 to 230 days
- Full range (2024): 23 to 887 days
- A quarter of all 2025 devices were cleared in under 90 days

### Key Timeline Milestones (Typical)

| Phase | Duration | Cumulative |
|---|---|---|
| Pre-Submission meeting request | 2-4 weeks | 1 month |
| FDA Pre-Sub feedback | 60-75 days | 3-4 months |
| Submission preparation | 3-6 months | 6-10 months |
| FDA acceptance review (RTA) | 15 business days | +3 weeks |
| FDA substantive review (510(k)) | 90 days (statutory goal) | +3 months |
| Additional Information response | 30-90 days | +1-3 months |
| **Total (typical)** | **12-18 months** from start to clearance |

### Fastest Clearances
- Some devices cleared in as few as **23 days** from submission (2024 data)
- A quarter of 2025 AI/ML devices cleared in **under 90 days**
- Fastest results typically involve: clear predicate, well-prepared submission, no AI requests, accredited third-party review

### Third-Party Review Option
- For eligible Class II devices, FDA-accredited third-party reviewers can conduct the review
- No user fee for 510(k)s submitted through third-party review
- Can accelerate the process

---

## 10. Common Rejection Reasons for AI/ML 510(k) Submissions

### Refuse to Accept (RTA) Statistics
- When the RTA program began, ~60% of new 510(k)s received an RTA hold
- More recent FDA data: ~30% receive an RTA hold at least once
- RTA review occurs within 15 business days of submission

### Top Rejection/Deficiency Reasons

#### A. Device Description Deficiencies
- Incomplete or unclear description of the AI/ML algorithm
- Failure to describe the proprietary signal processing or ML architecture
- Missing information about training data composition and methodology

#### B. Predicate Device Issues
- Incorrect predicate selection
- Failure to adequately address differences from predicate
- Insufficient justification for substantial equivalence
- Inconsistent indications for use between device and predicate

#### C. Performance Data Insufficiencies
- Inadequate clinical validation data (too few cases, single-site, non-representative population)
- Missing subgroup analyses (demographics, scanner types, disease severity)
- Inadequate ground truth methodology
- Post-hoc threshold tuning inflating performance metrics
- Insufficient standalone performance characterization

#### D. Software Documentation Gaps
- Insufficient software validation and verification (V&V)
- Unclear software hazard analysis with inadequate mitigation measures
- Missing or incomplete software description per IEC 62304
- Inadequate description of algorithm modifications and version control

#### E. Cybersecurity Deficiencies
- Missing or inadequate threat model
- Incomplete Software Bill of Materials (SBOM)
- Cybersecurity deficiencies frequently trigger substantial rework including:
  - Architecture redesign
  - Updated development processes
  - Re-testing and expanded documentation

#### F. Labeling Issues
- Inconsistent indications for use across submission documents
- Missing warnings about AI limitations
- Inadequate instructions for use describing the role of the clinician

#### G. Statistical Analysis Issues
- Pre-specification of analysis plan missing
- Inappropriate statistical methodology
- Confidence intervals not reported
- Sample size not justified

---

## 11. Class II (510(k)) vs. De Novo for AI Tools

### Side-by-Side Comparison

| Feature | 510(k) (Class II) | De Novo |
|---|---|---|
| **When to use** | Predicate device exists | No predicate exists, but device is low-to-moderate risk |
| **Requirement** | Demonstrate "substantial equivalence" to predicate | Demonstrate safety/effectiveness through general and special controls |
| **Classification** | Device already has a classification regulation | Creates NEW classification regulation (Class I or II) |
| **FDA User Fee (FY2026)** | $26,069 (standard) | $173,782 (standard) |
| **Small Business Fee** | $6,517 | $43,446 |
| **Target Review Time** | 90 days | 150 days (statutory) |
| **Actual Median Review (2024 AI/ML)** | 151 days | 372 days |
| **Becomes a predicate?** | Can cite existing predicates | YES - De Novo grants create new predicates for future 510(k)s |
| **Evidence burden** | Lower - show equivalence | Higher - must independently demonstrate safety and effectiveness |
| **Special controls** | Defined by existing classification | Manufacturer proposes special controls (FDA may modify) |

### Which Path for Pelvic Fracture AI?

**510(k) is likely appropriate** because:
- Multiple predicates now exist (Aidoc K252970 includes pelvic fracture, GLEAMER BoneView includes pelvis on X-ray)
- The product code QAS (radiological computer-assisted triage/notification) has established predicates
- CADe for fracture detection is a recognized device type

**De Novo would be needed if**:
- The device has a fundamentally different intended use with no predicate
- The device is autonomous (makes diagnostic decisions without physician involvement)
- No substantially equivalent predicate can be identified

### Historical Context
- Imagen OsteoDetect (DEN180005) went through De Novo as the FIRST AI fracture detection device
- That De Novo then created a predicate allowing subsequent fracture AI devices to use the 510(k) pathway
- As of 2025, 97% of FDA-authorized AI/ML devices used the 510(k) pathway (924 of 950)

---

## 12. "Physician in the Loop" - Legal Meaning for FDA Classification

### Regulatory Framework

The concept of "physician in the loop" (or "clinician in the loop") is not a single defined legal term in FDA regulations, but it has direct implications for device classification through several regulatory mechanisms:

### 1. 21st Century Cures Act (2016) - Clinical Decision Support (CDS) Exemption

Section 3060 of the Cures Act **excludes** certain CDS software from being regulated as a medical device IF all four criteria are met:
1. Not intended to acquire, process, or analyze a medical image, signal, or pattern
2. Intended for the purpose of displaying, analyzing, or printing medical information
3. Intended for the purpose of supporting or providing recommendations to a healthcare professional
4. Intended for the purpose of enabling the healthcare professional to independently review the basis for the recommendations

**Important**: AI radiology tools that process medical images are **NOT exempt** under this provision (criterion #1 fails). They ARE regulated as medical devices regardless of physician involvement.

### 2. Impact on Device Classification (Class II vs. Class III)

| Device Type | Physician Role | Typical Classification |
|---|---|---|
| **CADe (Computer-Assisted Detection)** | Physician reviews AI findings, makes final decision | Class II (510(k)) |
| **CADx (Computer-Assisted Diagnosis)** | Physician uses AI output to aid diagnosis, makes final call | Class II (510(k)) |
| **CADt (Computer-Assisted Triage)** | AI prioritizes worklist, physician still reads all cases | Class II (510(k)) |
| **Autonomous AI** | Device makes clinical decision WITHOUT physician review | Class III (PMA) or De Novo with special controls |

### 3. Real-World Regulatory Precedent

- **IDx-DR (now Digital Diagnostics)** - DEN180001: First FDA-authorized **autonomous** AI diagnostic. Cleared via De Novo for diabetic retinopathy screening. Classified as Class II with special controls, but required NO physician interpretation of images. This was groundbreaking.
- Most AI radiology devices (>95%) are classified as **physician-adjunctive** (CADe/CADt), meaning they assist but do not replace physician judgment

### 4. Practical Legal Implications

**For a pelvic fracture AI tool:**
- If designed as **CADe/CADt** (flags findings for physician review, does not autonomously diagnose): Class II, 510(k) pathway is appropriate
- If designed as **autonomous diagnostic** (makes fracture diagnosis without physician review): Would likely require De Novo classification with special controls, or potentially Class III/PMA
- The **labeling must clearly state** the role of the physician (e.g., "intended to assist qualified clinicians" vs. "intended to provide autonomous detection")
- The **clinical study design** must reflect the intended use: MRMC studies for adjunctive tools; standalone accuracy + prospective outcomes for autonomous tools

### 5. FDA's Evolving Position (2025-2026)

The January 2025 draft guidance on AI-enabled device software functions acknowledges a spectrum from "locked" algorithms (no learning) to "continuously learning" algorithms, and from "assistive" to "autonomous." The FDA's framework increasingly recognizes that the degree of human oversight is a key factor in:
- Risk classification
- Required evidence (more evidence for less physician oversight)
- Post-market surveillance requirements
- PCCP design

---

## Summary of Key Sources

### FDA.gov Primary Sources
1. FDA AI/ML SaMD Portal: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device
2. AI/ML Enabled Medical Devices List: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices
3. PCCP Final Guidance (Dec 2024): https://www.fda.gov/media/166704/download
4. AI-Enabled Device Draft Guidance (Jan 2025): https://www.fda.gov/media/184856/download
5. CADe Clinical Performance Guidance: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-performance-assessment-considerations-computer-assisted-detection-devices-applied-radiology
6. RWE Guidance (Dec 2025): https://www.fda.gov/regulatory-information/search-fda-guidance-documents/use-real-world-evidence-support-regulatory-decision-making-medical-devices
7. MDUFA FY2026 Fees: https://www.federalregister.gov/documents/2025/07/30/2025-14412/medical-device-user-fee-rates-for-fiscal-year-2026
8. iMRMC Software: https://cdrh-rst.fda.gov/imrmc-software-do-multi-reader-multi-case-statistical-analysis-reader-studies
9. 510(k) Database: https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
10. eSTAR Program: https://www.fda.gov/medical-devices/how-study-and-market-your-device/estar-program

### Peer-Reviewed / Industry Analysis
11. JAMA Network Open - FDA Approval of AI/ML Devices in Radiology Systematic Review: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2841066
12. Innolitics - 2025 Year in Review AI/ML 510(k) Clearances: https://innolitics.com/articles/year-in-review-ai-ml-medical-device-k-clearances/
13. PMC - Commercially available AI tools for fracture detection: https://pmc.ncbi.nlm.nih.gov/articles/PMC10860511/

### Disclaimer
This research was compiled on March 22, 2026 from publicly available sources. FDA guidance, fees, and regulatory requirements are subject to change. Specific K-numbers and clearance dates should be verified directly on the FDA's 510(k) database at accessdata.fda.gov. This document is for informational purposes and does not constitute legal or regulatory advice.
