import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color variant of the spinner
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'white';

  /**
   * Animation type
   */
  animation?: 'spin' | 'pulse' | 'dots';

  /**
   * Accessible label for screen readers
   */
  label?: string;
}

/**
 * Spinner component for loading states
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" />
 * <Spinner animation="dots" label="Loading content..." />
 * <Spinner animation="pulse" variant="success" />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      animation = 'spin',
      label = 'Loading...',
      className,
      ...props
    },
    ref
  ) => {
    // Dots animation
    if (animation === 'dots') {
      return (
        <div
          ref={ref}
          className={cn(styles.dotsContainer, className)}
          role="status"
          aria-label={label}
          {...props}
        >
          <span
            className={cn(
              styles.dot,
              styles[`spinner--${size}`],
              styles[`spinner--${variant}`]
            )}
          />
          <span
            className={cn(
              styles.dot,
              styles[`spinner--${size}`],
              styles[`spinner--${variant}`]
            )}
          />
          <span
            className={cn(
              styles.dot,
              styles[`spinner--${size}`],
              styles[`spinner--${variant}`]
            )}
          />
          <span className={styles.srOnly}>{label}</span>
        </div>
      );
    }

    // Pulse animation
    if (animation === 'pulse') {
      return (
        <div
          ref={ref}
          className={cn(
            styles.spinner,
            styles[`spinner--${size}`],
            styles[`spinner--${variant}`],
            styles['spinner--pulse'],
            className
          )}
          role="status"
          aria-label={label}
          {...props}
        >
          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className={styles.circle}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className={styles.path}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="30 70"
            />
          </svg>
          <span className={styles.srOnly}>{label}</span>
        </div>
      );
    }

    // Default spin animation
    return (
      <div
        ref={ref}
        className={cn(
          styles.spinner,
          styles[`spinner--${size}`],
          styles[`spinner--${variant}`],
          styles['spinner--spin'],
          className
        )}
        role="status"
        aria-label={label}
        {...props}
      >
        <svg
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className={styles.circle}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={styles.path}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
