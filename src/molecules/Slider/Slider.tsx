import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';

import styles from './Slider.module.css';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeCommit?: (value: number) => void;
  disabled?: boolean;
  size?: SliderSize;
  showValue?: boolean;
  showTicks?: boolean;
}

export const Slider = ({
  value: valueProp,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeCommit,
  disabled = false,
  size = 'md',
  showValue = false,
  showTicks = false,
  className,
  ...props
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (newValue: number) => {
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.min(Math.max(steppedValue, min), max);

      if (!isControlled) {
        setInternalValue(clampedValue);
      }

      onChange?.(clampedValue);
      return clampedValue;
    },
    [step, min, max, isControlled, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;

    const updatePosition = (clientX: number) => {
      const rect = sliderRef.current!.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const newValue = min + percentage * (max - min);
      return updateValue(newValue);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX);
    };

    const handleMouseUp = (e: MouseEvent) => {
      const finalValue = updatePosition(e.clientX);
      onChangeCommit?.(finalValue);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    updatePosition(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      newValue = Math.min(value + step, max);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      newValue = Math.max(value - step, min);
    } else if (e.key === 'Home') {
      e.preventDefault();
      newValue = min;
    } else if (e.key === 'End') {
      e.preventDefault();
      newValue = max;
    }

    if (newValue !== value) {
      updateValue(newValue);
      onChangeCommit?.(newValue);
    }
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      <div
        ref={sliderRef}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        className={cn(
          styles.slider,
          styles[`size-${size}`],
          disabled && styles.disabled
        )}
      >
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${percentage}%` }} />
        </div>
        <div
          className={styles.thumb}
          style={{ left: `${percentage}%` }}
          aria-label={`Value: ${value}`}
        />
      </div>
      {showValue && <div className={styles.value}>{value}</div>}
    </div>
  );
};

Slider.displayName = 'Slider';
