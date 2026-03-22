"""
PelvicScan AI - Model Architecture Module
============================================
Fracture Detection Neural Network Models

Phase 1 Models:
- PelvicNet2D: EfficientNet-B4 based 2D slice classifier
- PelvicNet3D: ResNet-50 based 3D volume classifier
- PelvicNetEnsemble: Weighted ensemble of 2D + 3D models

All models documented per IEC 62304 requirements.
Architecture decisions justified by peer-reviewed literature.

IEC 62304 Software Item: MODEL-001
Version: 1.0.0
"""

import logging
from typing import Dict, Optional, Tuple

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import timm

logger = logging.getLogger(__name__)


# =============================================================================
# 2D Model: EfficientNet-B4 Backbone
# =============================================================================
# Architecture Justification:
#   - EfficientNet-B4 achieves 96.4% top-1 on ImageNet with 19M params
#   - Compound scaling provides better feature extraction than ResNet
#   - Used in FDA-cleared Aidoc products for feature extraction
#   - Transfer learning from ImageNet is standard for medical imaging
#     (Raghu et al., "Transfusion: Understanding Transfer Learning
#      for Medical Imaging", NeurIPS 2019)
# =============================================================================

class PelvicNet2D(nn.Module):
    """
    2D Pelvic Fracture Detector.

    Input: 3-channel CT slice (bone window, soft tissue window, full HU range)
    Output: Binary classification (fracture / no_fracture) with confidence score

    Architecture:
        EfficientNet-B4 backbone (pretrained on ImageNet)
        → Global Average Pooling
        → Dropout (0.3)
        → FC (1792 → 512)
        → ReLU + Dropout (0.2)
        → FC (512 → 2)

    The additional FC layer with ReLU provides a non-linear projection
    from ImageNet features to medical imaging features.
    """

    def __init__(
        self,
        num_classes: int = 2,
        pretrained: bool = True,
        dropout: float = 0.3,
    ):
        super().__init__()

        # Load EfficientNet-B4 backbone
        self.backbone = timm.create_model(
            'efficientnet_b4',
            pretrained=pretrained,
            num_classes=0,      # Remove classification head
            in_chans=3,
        )

        # Get feature dimension from backbone
        feature_dim = self.backbone.num_features  # 1792 for EfficientNet-B4

        # Classification head
        self.classifier = nn.Sequential(
            nn.Dropout(p=dropout),
            nn.Linear(feature_dim, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.2),
            nn.Linear(512, num_classes),
        )

        # GradCAM hook targets (for explainability - FDA requirement)
        self.gradcam_target_layer = None

        logger.info(
            f"PelvicNet2D initialized: "
            f"backbone=EfficientNet-B4, "
            f"features={feature_dim}, "
            f"classes={num_classes}, "
            f"pretrained={pretrained}"
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass.

        Args:
            x: Input tensor, shape (B, 3, H, W)

        Returns:
            Logits tensor, shape (B, num_classes)
        """
        features = self.backbone(x)
        logits = self.classifier(features)
        return logits

    def predict_with_confidence(
        self, x: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Predict with confidence scores (for clinical display).

        Returns:
            Tuple of (predictions, confidence_scores)
            - predictions: (B,) tensor of class indices
            - confidence: (B,) tensor of confidence values [0, 1]
        """
        logits = self.forward(x)
        probs = F.softmax(logits, dim=1)
        confidence, predictions = probs.max(dim=1)
        return predictions, confidence


# =============================================================================
# 3D Model: ResNet-50 based Volume Classifier
# =============================================================================
# Architecture Justification:
#   - 3D convolutions capture inter-slice spatial relationships
#   - Fracture lines often span multiple axial slices
#   - ResNet-50 with 3D convolutions validated in medical imaging
#     (Chen et al., "Med3D: Transfer Learning for 3D Medical Image
#      Analysis", arXiv 2019)
# =============================================================================

class ResBlock3D(nn.Module):
    """3D Residual Block with bottleneck architecture."""

    def __init__(self, in_channels: int, mid_channels: int, out_channels: int, stride: int = 1):
        super().__init__()
        self.conv1 = nn.Conv3d(in_channels, mid_channels, 1, bias=False)
        self.bn1 = nn.BatchNorm3d(mid_channels)
        self.conv2 = nn.Conv3d(mid_channels, mid_channels, 3, stride=stride, padding=1, bias=False)
        self.bn2 = nn.BatchNorm3d(mid_channels)
        self.conv3 = nn.Conv3d(mid_channels, out_channels, 1, bias=False)
        self.bn3 = nn.BatchNorm3d(out_channels)
        self.relu = nn.ReLU(inplace=True)

        self.downsample = None
        if stride != 1 or in_channels != out_channels:
            self.downsample = nn.Sequential(
                nn.Conv3d(in_channels, out_channels, 1, stride=stride, bias=False),
                nn.BatchNorm3d(out_channels),
            )

    def forward(self, x):
        identity = x
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.relu(self.bn2(self.conv2(out)))
        out = self.bn3(self.conv3(out))
        if self.downsample is not None:
            identity = self.downsample(x)
        out += identity
        return self.relu(out)


class PelvicNet3D(nn.Module):
    """
    3D Pelvic Fracture Detector.

    Input: Single-channel CT volume (bone window), shape (B, 1, D, H, W)
    Output: Binary classification with confidence

    Architecture:
        Conv3D stem (1 → 64 channels)
        → ResBlock3D layers [3, 4, 6, 3] (ResNet-50 config)
        → Global Average Pooling 3D
        → Dropout (0.3)
        → FC (2048 → 512)
        → ReLU + Dropout
        → FC (512 → 2)
    """

    def __init__(
        self,
        num_classes: int = 2,
        dropout: float = 0.3,
    ):
        super().__init__()

        # Stem
        self.stem = nn.Sequential(
            nn.Conv3d(1, 64, kernel_size=7, stride=2, padding=3, bias=False),
            nn.BatchNorm3d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool3d(kernel_size=3, stride=2, padding=1),
        )

        # ResNet-50 layers
        self.layer1 = self._make_layer(64, 64, 256, blocks=3, stride=1)
        self.layer2 = self._make_layer(256, 128, 512, blocks=4, stride=2)
        self.layer3 = self._make_layer(512, 256, 1024, blocks=6, stride=2)
        self.layer4 = self._make_layer(1024, 512, 2048, blocks=3, stride=2)

        self.global_pool = nn.AdaptiveAvgPool3d(1)

        self.classifier = nn.Sequential(
            nn.Dropout(p=dropout),
            nn.Linear(2048, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.2),
            nn.Linear(512, num_classes),
        )

        # Initialize weights
        self._init_weights()

        logger.info(
            f"PelvicNet3D initialized: "
            f"ResNet-50-3D, classes={num_classes}"
        )

    def _make_layer(self, in_ch, mid_ch, out_ch, blocks, stride):
        layers = [ResBlock3D(in_ch, mid_ch, out_ch, stride)]
        for _ in range(1, blocks):
            layers.append(ResBlock3D(out_ch, mid_ch, out_ch, 1))
        return nn.Sequential(*layers)

    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv3d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
            elif isinstance(m, nn.BatchNorm3d):
                nn.init.constant_(m.weight, 1)
                nn.init.constant_(m.bias, 0)
            elif isinstance(m, nn.Linear):
                nn.init.normal_(m.weight, 0, 0.01)
                nn.init.constant_(m.bias, 0)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.stem(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        x = self.global_pool(x)
        x = x.flatten(1)
        return self.classifier(x)

    def predict_with_confidence(
        self, x: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        logits = self.forward(x)
        probs = F.softmax(logits, dim=1)
        confidence, predictions = probs.max(dim=1)
        return predictions, confidence


# =============================================================================
# Ensemble Model
# =============================================================================

class PelvicNetEnsemble(nn.Module):
    """
    Ensemble of 2D (slice-level) and 3D (volume-level) models.

    Combines predictions using weighted averaging.
    The 2D model provides per-slice sensitivity, while
    the 3D model provides volumetric context.

    Ensemble strategy validated in medical imaging:
    - Reduces variance and improves calibration
    - 2-5% AUC improvement over single models
      (Lakshminarayanan et al., "Simple and Scalable
       Predictive Uncertainty Estimation", NeurIPS 2017)
    """

    def __init__(
        self,
        model_2d: PelvicNet2D,
        model_3d: PelvicNet3D,
        weight_2d: float = 0.6,
        weight_3d: float = 0.4,
    ):
        super().__init__()
        self.model_2d = model_2d
        self.model_3d = model_3d
        self.weight_2d = weight_2d
        self.weight_3d = weight_3d

    def forward(
        self,
        x_2d: torch.Tensor,
        x_3d: torch.Tensor,
    ) -> Dict[str, torch.Tensor]:
        """
        Forward pass combining both models.

        Args:
            x_2d: 2D input (B, 3, H, W)
            x_3d: 3D input (B, 1, D, H, W)

        Returns:
            Dict with 'logits', 'probs_2d', 'probs_3d', 'probs_ensemble'
        """
        logits_2d = self.model_2d(x_2d)
        logits_3d = self.model_3d(x_3d)

        probs_2d = F.softmax(logits_2d, dim=1)
        probs_3d = F.softmax(logits_3d, dim=1)

        # Weighted ensemble
        probs_ensemble = (
            self.weight_2d * probs_2d +
            self.weight_3d * probs_3d
        )

        return {
            'logits_2d': logits_2d,
            'logits_3d': logits_3d,
            'probs_2d': probs_2d,
            'probs_3d': probs_3d,
            'probs_ensemble': probs_ensemble,
        }


# =============================================================================
# Loss Functions
# =============================================================================

class FocalLoss(nn.Module):
    """
    Focal Loss for handling class imbalance in fracture detection.

    In pelvic CT datasets, fracture cases are typically 30-40% of total.
    Focal loss down-weights easy (non-fracture) examples and focuses
    training on hard (subtle fracture) examples.

    Reference: Lin et al., "Focal Loss for Dense Object Detection", ICCV 2017

    Args:
        gamma: Focusing parameter (default=2.0). Higher = more focus on hard examples
        alpha: Class weight for positive class (default=0.75 for fracture)
    """

    def __init__(self, gamma: float = 2.0, alpha: float = 0.75):
        super().__init__()
        self.gamma = gamma
        self.alpha = alpha

    def forward(self, logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:
        ce_loss = F.cross_entropy(logits, targets, reduction='none')
        probs = F.softmax(logits, dim=1)
        p_t = probs.gather(1, targets.unsqueeze(1)).squeeze(1)

        # Focal modulating factor
        focal_weight = (1 - p_t) ** self.gamma

        # Alpha weighting
        alpha_t = torch.where(
            targets == 1,
            torch.tensor(self.alpha, device=logits.device),
            torch.tensor(1 - self.alpha, device=logits.device),
        )

        loss = alpha_t * focal_weight * ce_loss
        return loss.mean()


# =============================================================================
# GradCAM for Explainability (FDA Requirement)
# =============================================================================

class GradCAM:
    """
    Gradient-weighted Class Activation Mapping for fracture localization.

    FDA requires AI/ML devices to provide "explainability" -
    visual indication of what the model is looking at.
    GradCAM provides heatmaps showing regions driving the prediction.

    Reference: Selvaraju et al., "Grad-CAM: Visual Explanations from
    Deep Networks via Gradient-based Localization", ICCV 2017
    """

    def __init__(self, model: nn.Module, target_layer: nn.Module):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None

        # Register hooks
        target_layer.register_forward_hook(self._save_activation)
        target_layer.register_full_backward_hook(self._save_gradient)

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(
        self,
        input_tensor: torch.Tensor,
        target_class: Optional[int] = None,
    ) -> np.ndarray:
        """
        Generate GradCAM heatmap.

        Args:
            input_tensor: Model input (B, C, H, W)
            target_class: Class to explain (default: predicted class)

        Returns:
            Heatmap array, shape (H, W), values in [0, 1]
        """
        self.model.eval()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = output.argmax(dim=1).item()

        self.model.zero_grad()
        output[0, target_class].backward()

        # Weight activations by gradients
        weights = self.gradients.mean(dim=(2, 3), keepdim=True)
        cam = (weights * self.activations).sum(dim=1, keepdim=True)
        cam = F.relu(cam)

        # Resize to input dimensions
        cam = F.interpolate(
            cam,
            size=input_tensor.shape[2:],
            mode='bilinear',
            align_corners=False,
        )

        # Normalize to [0, 1]
        cam = cam.squeeze().cpu().numpy()
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)

        return cam


# =============================================================================
# Model Factory
# =============================================================================

def create_model(config: dict, device: str = "cpu") -> nn.Module:
    """
    Create model from configuration.

    Args:
        config: Model configuration dict
        device: Target device ('cpu', 'cuda', 'mps')

    Returns:
        Initialized model on specified device
    """
    model_config = config['model']['primary']
    arch = model_config['architecture']

    if arch == 'efficientnet_b4':
        model = PelvicNet2D(
            num_classes=model_config['num_classes'],
            pretrained=model_config['pretrained'],
            dropout=model_config['dropout'],
        )
    else:
        raise ValueError(f"Unknown architecture: {arch}")

    return model.to(device)
