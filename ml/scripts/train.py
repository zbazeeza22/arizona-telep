"""
PelvicScan AI - Training Pipeline
====================================
Phase 1: Pelvic Fracture Detection Training

Two-stage training:
  Stage 1: Pre-train on CTPelvic1K (1,184 volumes)
  Stage 2: Fine-tune on clinical dataset (4,000 scans)

All training is logged and reproducible per IEC 62304.
Checkpoints saved with full training state for audit trail.

IEC 62304 Software Item: TRAIN-001
Version: 1.0.0

Usage:
    python train.py --config configs/phase1_detection.yaml --stage pretrain
    python train.py --config configs/phase1_detection.yaml --stage finetune
"""

import argparse
import json
import logging
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, Tuple

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter
import yaml

from model import PelvicNet2D, PelvicNet3D, FocalLoss, create_model
from dataset import create_dataloaders
from validate import ValidationEngine

logger = logging.getLogger(__name__)


# =============================================================================
# Training Engine
# =============================================================================

class TrainingEngine:
    """
    FDA-compliant training engine with full audit trail.

    Features:
    - Deterministic training (fixed seeds)
    - Automatic mixed precision (AMP) for efficiency
    - Learning rate scheduling with warmup
    - Early stopping on validation AUC
    - Checkpoint saving with training state
    - TensorBoard logging
    - Training metadata export (for FDA submission)
    """

    def __init__(
        self,
        config_path: str,
        stage: str = "finetune",
        device: Optional[str] = None,
        output_dir: str = "./outputs",
    ):
        # Load configuration
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        self.stage = stage
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Set device
        if device:
            self.device = torch.device(device)
        elif torch.cuda.is_available():
            self.device = torch.device('cuda')
        elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
            self.device = torch.device('mps')
        else:
            self.device = torch.device('cpu')

        logger.info(f"Using device: {self.device}")

        # Set seeds for reproducibility (IEC 62304 requirement)
        seed = self.config['dataset']['split']['seed']
        self._set_seed(seed)

        # Training config
        train_cfg = self.config['training'][stage]
        self.epochs = train_cfg['epochs']
        self.batch_size = train_cfg['batch_size']
        self.lr = train_cfg['learning_rate']

        # Initialize model
        self.model = create_model(self.config, str(self.device))

        # Load pretrained weights for fine-tuning
        if stage == 'finetune':
            pretrain_path = self.output_dir / 'pretrain' / 'best_model.pth'
            if pretrain_path.exists():
                self._load_checkpoint(pretrain_path)
                logger.info(f"Loaded pretrained weights from {pretrain_path}")
            else:
                logger.warning(
                    "No pretrained weights found. "
                    "Training from ImageNet initialization."
                )

        # Loss function
        loss_cfg = self.config['training']['loss']
        self.criterion = FocalLoss(
            gamma=loss_cfg['gamma'],
            alpha=loss_cfg['alpha'],
        )

        # Optimizer
        self.optimizer = optim.AdamW(
            self.model.parameters(),
            lr=self.lr,
            weight_decay=train_cfg['weight_decay'],
        )

        # Scheduler
        self.scheduler = optim.lr_scheduler.CosineAnnealingLR(
            self.optimizer,
            T_max=self.epochs - train_cfg['warmup_epochs'],
            eta_min=self.lr * 0.01,
        )

        # Warmup scheduler
        self.warmup_epochs = train_cfg['warmup_epochs']

        # Early stopping
        es_cfg = self.config['training']['early_stopping']
        self.early_stopping = EarlyStopping(
            patience=es_cfg['patience'],
            min_delta=es_cfg['min_delta'],
            mode=es_cfg['mode'],
        )

        # Mixed precision
        self.scaler = torch.amp.GradScaler('cuda') if self.device.type == 'cuda' else None

        # TensorBoard
        self.writer = SummaryWriter(
            log_dir=str(self.output_dir / stage / 'logs')
        )

        # Training metadata (for FDA audit)
        self.metadata = {
            'project': self.config['project']['name'],
            'version': self.config['project']['version'],
            'phase': self.config['project']['phase'],
            'stage': stage,
            'started_at': datetime.now().isoformat(),
            'device': str(self.device),
            'seed': seed,
            'config': self.config,
            'pytorch_version': torch.__version__,
            'cuda_version': torch.version.cuda if torch.cuda.is_available() else None,
        }

        # Validation engine
        self.validator = ValidationEngine(self.config)

    def _set_seed(self, seed: int):
        """Set all random seeds for reproducibility."""
        torch.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)
        np.random.seed(seed)
        if torch.cuda.is_available():
            torch.backends.cudnn.deterministic = True
            torch.backends.cudnn.benchmark = False

    def _load_checkpoint(self, path: Path):
        """Load model weights from checkpoint."""
        checkpoint = torch.load(path, map_location=self.device, weights_only=True)
        if 'model_state_dict' in checkpoint:
            self.model.load_state_dict(checkpoint['model_state_dict'])
        else:
            self.model.load_state_dict(checkpoint)

    def _save_checkpoint(
        self,
        epoch: int,
        metrics: Dict,
        is_best: bool = False,
    ):
        """
        Save checkpoint with full training state.
        FDA audit trail: every checkpoint includes config + metrics.
        """
        stage_dir = self.output_dir / self.stage
        stage_dir.mkdir(parents=True, exist_ok=True)

        checkpoint = {
            'epoch': epoch,
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'scheduler_state_dict': self.scheduler.state_dict(),
            'metrics': metrics,
            'config': self.config,
            'timestamp': datetime.now().isoformat(),
        }

        # Save periodic checkpoint
        ckpt_cfg = self.config['training']['checkpoint']
        if epoch % ckpt_cfg.get('save_every_n_epochs', 5) == 0:
            path = stage_dir / f'checkpoint_epoch_{epoch:03d}.pth'
            torch.save(checkpoint, path)

        # Save best model
        if is_best:
            path = stage_dir / 'best_model.pth'
            torch.save(checkpoint, path)
            logger.info(f"Saved best model (epoch {epoch})")

    def _warmup_lr(self, epoch: int):
        """Linear warmup for learning rate."""
        if epoch < self.warmup_epochs:
            warmup_factor = (epoch + 1) / self.warmup_epochs
            for param_group in self.optimizer.param_groups:
                param_group['lr'] = self.lr * warmup_factor

    def train_epoch(self, dataloader: DataLoader) -> Dict[str, float]:
        """
        Train for one epoch.

        Returns:
            Dict with training metrics (loss, accuracy)
        """
        self.model.train()
        total_loss = 0.0
        correct = 0
        total = 0

        for batch_idx, (inputs, targets) in enumerate(dataloader):
            inputs = inputs.to(self.device)
            targets = targets.to(self.device)

            self.optimizer.zero_grad()

            # Mixed precision forward pass
            if self.scaler is not None:
                with torch.amp.autocast('cuda'):
                    outputs = self.model(inputs)
                    loss = self.criterion(outputs, targets)

                self.scaler.scale(loss).backward()
                self.scaler.unscale_(self.optimizer)
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
                self.scaler.step(self.optimizer)
                self.scaler.update()
            else:
                outputs = self.model(inputs)
                loss = self.criterion(outputs, targets)
                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
                self.optimizer.step()

            total_loss += loss.item() * inputs.size(0)
            _, predicted = outputs.max(1)
            total += targets.size(0)
            correct += predicted.eq(targets).sum().item()

        metrics = {
            'train_loss': total_loss / total,
            'train_accuracy': correct / total,
        }
        return metrics

    @torch.no_grad()
    def validate_epoch(self, dataloader: DataLoader) -> Dict[str, float]:
        """
        Validate for one epoch.

        Returns:
            Dict with validation metrics
        """
        self.model.eval()
        total_loss = 0.0
        all_probs = []
        all_targets = []

        for inputs, targets in dataloader:
            inputs = inputs.to(self.device)
            targets = targets.to(self.device)

            outputs = self.model(inputs)
            loss = self.criterion(outputs, targets)

            total_loss += loss.item() * inputs.size(0)
            probs = torch.softmax(outputs, dim=1)[:, 1]  # P(fracture)
            all_probs.append(probs.cpu())
            all_targets.append(targets.cpu())

        all_probs = torch.cat(all_probs).numpy()
        all_targets = torch.cat(all_targets).numpy()

        # Compute comprehensive metrics
        metrics = self.validator.compute_metrics(all_targets, all_probs)
        metrics['val_loss'] = total_loss / len(all_targets)

        return metrics

    def train(self, train_loader: DataLoader, val_loader: DataLoader):
        """
        Full training loop with validation and early stopping.

        This is the main entry point for training.
        All epochs, metrics, and decisions are logged for FDA audit.
        """
        logger.info(
            f"Starting {self.stage} training: "
            f"{self.epochs} epochs, lr={self.lr}, "
            f"batch_size={self.batch_size}"
        )

        best_metric = 0.0
        history = []

        for epoch in range(self.epochs):
            epoch_start = time.time()

            # Warmup LR
            self._warmup_lr(epoch)

            # Freeze backbone during initial fine-tuning
            if (
                self.stage == 'finetune'
                and epoch < self.config['training']['finetune'].get('freeze_backbone_epochs', 0)
            ):
                for param in self.model.backbone.parameters():
                    param.requires_grad = False
            elif self.stage == 'finetune':
                for param in self.model.backbone.parameters():
                    param.requires_grad = True

            # Train
            train_metrics = self.train_epoch(train_loader)

            # Validate
            val_metrics = self.validate_epoch(val_loader)

            # Update LR scheduler (after warmup)
            if epoch >= self.warmup_epochs:
                self.scheduler.step()

            # Compute epoch time
            epoch_time = time.time() - epoch_start

            # Merge metrics
            metrics = {**train_metrics, **val_metrics, 'epoch_time': epoch_time}
            history.append(metrics)

            # Log to TensorBoard
            for key, value in metrics.items():
                if isinstance(value, (int, float)):
                    self.writer.add_scalar(f'{self.stage}/{key}', value, epoch)

            self.writer.add_scalar(
                f'{self.stage}/learning_rate',
                self.optimizer.param_groups[0]['lr'],
                epoch,
            )

            # Check if best
            current_metric = val_metrics.get('val_auc', 0)
            is_best = current_metric > best_metric
            if is_best:
                best_metric = current_metric

            # Save checkpoint
            self._save_checkpoint(epoch, metrics, is_best=is_best)

            # Log progress
            logger.info(
                f"Epoch {epoch+1}/{self.epochs} "
                f"[{epoch_time:.1f}s] "
                f"loss={train_metrics['train_loss']:.4f} "
                f"acc={train_metrics['train_accuracy']:.4f} "
                f"val_loss={val_metrics['val_loss']:.4f} "
                f"val_auc={val_metrics.get('val_auc', 0):.4f} "
                f"val_sens={val_metrics.get('sensitivity', 0):.4f} "
                f"val_spec={val_metrics.get('specificity', 0):.4f} "
                f"{'[BEST]' if is_best else ''}"
            )

            # Early stopping check
            if self.early_stopping(current_metric):
                logger.info(
                    f"Early stopping triggered at epoch {epoch+1}. "
                    f"Best val_auc: {best_metric:.4f}"
                )
                break

        # Save training metadata
        self.metadata['completed_at'] = datetime.now().isoformat()
        self.metadata['total_epochs'] = epoch + 1
        self.metadata['best_val_auc'] = best_metric
        self.metadata['history'] = history

        metadata_path = self.output_dir / self.stage / 'training_metadata.json'
        with open(metadata_path, 'w') as f:
            json.dump(self.metadata, f, indent=2, default=str)

        self.writer.close()
        logger.info(f"Training complete. Best val AUC: {best_metric:.4f}")

        return history


# =============================================================================
# Early Stopping
# =============================================================================

class EarlyStopping:
    """
    Early stopping to prevent overfitting.

    Monitors a metric and stops training if no improvement
    for `patience` consecutive epochs.
    """

    def __init__(
        self,
        patience: int = 10,
        min_delta: float = 0.001,
        mode: str = "max",
    ):
        self.patience = patience
        self.min_delta = min_delta
        self.mode = mode
        self.counter = 0
        self.best_value = None

    def __call__(self, value: float) -> bool:
        if self.best_value is None:
            self.best_value = value
            return False

        if self.mode == "max":
            improved = value > self.best_value + self.min_delta
        else:
            improved = value < self.best_value - self.min_delta

        if improved:
            self.best_value = value
            self.counter = 0
        else:
            self.counter += 1

        return self.counter >= self.patience


# =============================================================================
# Main Entry Point
# =============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="PelvicScan AI - Phase 1 Training Pipeline"
    )
    parser.add_argument(
        '--config',
        type=str,
        default='configs/phase1_detection.yaml',
        help='Path to training configuration',
    )
    parser.add_argument(
        '--stage',
        type=str,
        choices=['pretrain', 'finetune'],
        default='finetune',
        help='Training stage',
    )
    parser.add_argument(
        '--data-dir',
        type=str,
        default='./data',
        help='Root data directory',
    )
    parser.add_argument(
        '--output-dir',
        type=str,
        default='./outputs',
        help='Output directory for checkpoints and logs',
    )
    parser.add_argument(
        '--device',
        type=str,
        default=None,
        help='Device (cuda, mps, cpu). Auto-detected if not specified.',
    )
    parser.add_argument(
        '--num-workers',
        type=int,
        default=4,
        help='Number of data loading workers',
    )

    args = parser.parse_args()

    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler(
                os.path.join(args.output_dir, f'{args.stage}_training.log')
            ),
        ],
    )

    logger.info("=" * 60)
    logger.info("PelvicScan AI - Phase 1: Fracture Detection Training")
    logger.info("=" * 60)

    # Create training engine
    engine = TrainingEngine(
        config_path=args.config,
        stage=args.stage,
        device=args.device,
        output_dir=args.output_dir,
    )

    # Create data loaders
    loaders = create_dataloaders(
        config_path=args.config,
        data_dir=args.data_dir,
        mode="2d",
        num_workers=args.num_workers,
    )

    # Train
    engine.train(loaders['train'], loaders['val'])

    logger.info("Training pipeline complete.")


if __name__ == '__main__':
    main()
