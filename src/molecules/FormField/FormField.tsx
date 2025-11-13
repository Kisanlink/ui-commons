import { forwardRef, ReactElement, ReactNode, useId, cloneElement, isValidElement } from 'react';

import { cn } from '@/utils/cn';

import styles from './FormField.module.css';

export interface FormFieldProps {
  /**
   * Label text to display above the form control
   */
  label?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message to display below the form control
   */
  error?: string;

  /**
   * Helper text to display below the form control
   */
  helperText?: string;

  /**
   * The form control to render (Input, Select, Checkbox, etc.)
   */
  children: ReactNode;

  /**
   * HTML id to associate label with input
   */
  htmlFor?: string;

  /**
   * Additional CSS classes for the wrapper
   */
  className?: string;
}

/**
 * FormField component that wraps any form control with Label, Error, and Helper text.
 * Uses composition pattern - pass any form control as children.
 *
 * @example
 * <FormField label="Email" required error="Invalid email">
 *   <Input type="email" />
 * </FormField>
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { label, required, error, helperText, children, htmlFor, className },
    ref
  ) => {
    // Generate unique ID for accessibility
    const generatedId = useId();
    const fieldId = htmlFor || generatedId;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    // Clone child element and pass the id and aria attributes
    const childElement = isValidElement(children)
      ? cloneElement(children as ReactElement<any>, {
          id: (children as ReactElement<any>).props.id || fieldId,
          'aria-describedby': error
            ? errorId
            : helperText
            ? helperId
            : undefined,
          'aria-invalid': error ? true : undefined,
        })
      : children;

    return (
      <div ref={ref} className={cn(styles.formField, className)}>
        {label && (
          <label htmlFor={fieldId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={cn(styles.control, error && styles.controlError)}>
          {childElement}
        </div>

        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
