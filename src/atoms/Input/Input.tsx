import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

import styles from './Input.module.css';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input size
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Left icon element
   */
  leftIcon?: React.ReactNode;

  /**
   * Right icon element
   */
  rightIcon?: React.ReactNode;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Additional wrapper classes
   */
  wrapperClassName?: string;

  /**
   * Additional CSS classes for input
   */
  className?: string;
}

/**
 * Input component with support for icons, error states, and helper text
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      leftIcon,
      rightIcon,
      errorMessage,
      helperText,
      className,
      wrapperClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = error || !!errorMessage;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const inputClasses = cn(
      styles.input,
      styles[`size-${size}`],
      hasError && styles.error,
      leftIcon && styles.withLeftIcon,
      rightIcon && styles.withRightIcon,
      className
    );

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            errorMessage ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        {errorMessage && (
          <p id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
