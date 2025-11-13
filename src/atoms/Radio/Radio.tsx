import React, { forwardRef, createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';
import styles from './Radio.module.css';

// Context for RadioGroup
interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
);

const useRadioGroup = () => {
  return useContext(RadioGroupContext);
};

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant of the radio
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';

  /**
   * Label text for the radio button
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
   * Additional CSS classes for the wrapper
   */
  wrapperClassName?: string;
}

/**
 * Radio button component for exclusive selections within a group
 *
 * @example
 * ```tsx
 * <Radio name="size" value="small" label="Small" />
 * <Radio name="size" value="medium" label="Medium" />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant,
      label,
      helperText,
      error,
      className,
      wrapperClassName,
      disabled,
      name: nameProp,
      value,
      checked: checkedProp,
      onChange: onChangeProp,
      id,
      ...props
    },
    ref
  ) => {
    const group = useRadioGroup();
    const hasError = !!error;

    const name = nameProp || group?.name;
    const isDisabled = disabled || group?.disabled;
    const variantToUse = (variant || group?.variant || 'primary') as NonNullable<
      RadioProps['variant']
    >;

    const checked = group ? group.value === value : checkedProp;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeProp?.(e);
      if (group?.onChange && value !== undefined) {
        group.onChange(String(value));
      }
    };

    const radioElement = (
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={cn(
          styles.radio,
          styles[`radio--${variantToUse}`],
          hasError && styles['radio--error'],
          isDisabled && styles['radio--disabled'],
          className
        )}
        disabled={isDisabled}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        {...props}
      />
    );

    if (!label) {
      return radioElement;
    }

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        <label
          className={cn(
            styles.label,
            isDisabled && styles['label--disabled']
          )}
          htmlFor={id}
        >
          {radioElement}
          <span className={styles.labelText}>{label}</span>
        </label>

        {helperText && !error && (
          <p id={`${id}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {error && (
          <p id={`${id}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// RadioGroup Component
export interface RadioGroupProps {
  /**
   * Name attribute for the radio group
   */
  name?: string;

  /**
   * Selected value (controlled)
   */
  value?: string;

  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Disable all radios in the group
   */
  disabled?: boolean;

  /**
   * Visual variant for all radios
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';

  /**
   * Radio buttons
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Layout direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Error message for the group
   */
  error?: string;

  /**
   * Label for the group
   */
  label?: string;
}

/**
 * RadioGroup component for managing a group of radio buttons
 *
 * @example
 * ```tsx
 * <RadioGroup name="size" value={size} onChange={setSize}>
 *   <Radio value="small" label="Small" />
 *   <Radio value="medium" label="Medium" />
 *   <Radio value="large" label="Large" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value: valueProp,
      defaultValue,
      onChange,
      disabled,
      variant,
      children,
      className,
      direction = 'vertical',
      error,
      label,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || '');

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : value;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(styles.groupWrapper, className)}
        {...props}
      >
        {label && <span className={styles.groupLabel}>{label}</span>}

        <RadioGroupContext.Provider
          value={{
            name,
            value: currentValue,
            onChange: handleChange,
            disabled,
            variant,
          }}
        >
          <div
            className={cn(
              styles.group,
              direction === 'horizontal' && styles['group--horizontal']
            )}
            role="radiogroup"
            aria-invalid={!!error}
          >
            {children}
          </div>
        </RadioGroupContext.Provider>

        {error && (
          <p className={styles.groupError} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
