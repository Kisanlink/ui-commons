import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { cn } from '../../utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant of the checkbox
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';

  /**
   * Label text for the checkbox
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
   * Indeterminate state (for "select all" scenarios)
   */
  indeterminate?: boolean;

  /**
   * Additional CSS classes for the wrapper
   */
  wrapperClassName?: string;
}

/**
 * Checkbox component for binary selections with optional indeterminate state
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox label="Select all" indeterminate={someSelected && !allSelected} />
 * <Checkbox label="Email notifications" error="Please accept to continue" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'primary',
      label,
      helperText,
      error,
      indeterminate = false,
      className,
      wrapperClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const inputRef = useRef<HTMLInputElement>(null);

    // Combine refs
    useImperativeHandle(ref, () => inputRef.current!);

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const checkboxElement = (
      <div className={styles.checkboxContainer}>
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          className={cn(
            styles.checkbox,
            styles[`checkbox--${variant}`],
            hasError && styles['checkbox--error'],
            disabled && styles['checkbox--disabled'],
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
        <div className={styles.checkboxIcon}>
          {indeterminate ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="3"
                y1="6"
                x2="9"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={styles.checkIcon}
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    );

    // Return checkbox without label wrapper if no label provided
    if (!label) {
      return checkboxElement;
    }

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        <label
          className={cn(
            styles.label,
            disabled && styles['label--disabled']
          )}
          htmlFor={id}
        >
          {checkboxElement}
          <span className={styles.labelText}>{label}</span>
        </label>

        {helperText && !error && (
          <p id={`${id}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={`${id}-error`}
            className={styles.errorText}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
