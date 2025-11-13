import React from 'react';
import { cn } from '@/utils/cn';

import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  striped?: boolean;
  animated?: boolean;
}

export const ProgressBar = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  striped = false,
  animated = false,
  className,
  ...props
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className={cn(styles.container, className)} {...props}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={displayLabel}
        className={cn(
          styles.progressBar,
          styles[`size-${size}`],
          styles[`variant-${variant}`]
        )}
      >
        <div
          className={cn(
            styles.fill,
            striped && styles.striped,
            animated && striped && styles.animated
          )}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && <span className={styles.label}>{displayLabel}</span>}
        </div>
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
