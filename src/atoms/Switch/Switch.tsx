import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Switch.module.css';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size variant of the switch
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant of the switch
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';

  /**
   * Label text for the switch
   */
  label?: string;

  /**
   * Helper text below the label
   */
  helperText?: string;

  /**
   * Error message - displays in error state
   */
  error?: string;

  /**
   * Label position relative to switch
   */
  labelPosition?: 'left' | 'right';

  /**
   * Additional CSS classes for the wrapper
   */
  wrapperClassName?: string;
}

/**
 * Switch component for toggle controls with on/off states
 *
 * @example
 * ```tsx
 * <Switch label="Enable notifications" />
 * <Switch label="Dark mode" checked={isDark} onChange={setIsDark} />
 * <Switch label="Required field" error="This setting must be enabled" />
 * <Switch label="Airplane mode" labelPosition="left" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      label,
      helperText,
      error,
      labelPosition = 'right',
      className,
      wrapperClassName,
      disabled,
      checked,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    const switchElement = (
      <div className={styles.switchContainer}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          checked={checked}
          className={cn(
            styles.switch,
            styles[`switch--${size}`],
            styles[`switch--${variant}`],
            hasError && styles['switch--hasError'],
            disabled && styles['switch--disabled'],
            className
          )}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${id}-error`
              : helperText
                ? `${id}-helper`
                : undefined
          }
          {...props}
        />
        <span
          className={cn(
            styles.thumb,
            styles[`thumb--${size}`]
          )}
        />
      </div>
    );

    // Return switch without label wrapper if no label provided
    if (!label) {
      return switchElement;
    }

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        <label
          className={cn(
            styles.label,
            disabled && styles['label--disabled'],
            labelPosition === 'left' && styles['label--reverse']
          )}
          htmlFor={id}
        >
          {switchElement}
          <span className={styles.labelText}>{label}</span>
        </label>

        {helperText && !error && (
          <p
            id={`${id}-helper`}
            className={cn(
              styles.helperText,
              labelPosition === 'right'
                ? styles['helperText--offset']
                : styles['helperText--offsetReverse']
            )}
          >
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={`${id}-error`}
            className={cn(
              styles.errorText,
              labelPosition === 'right'
                ? styles['errorText--offset']
                : styles['errorText--offsetReverse']
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
