import { forwardRef, ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert variant/type
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Alert title (optional)
   */
  title?: string;

  /**
   * Alert content/message
   */
  children: ReactNode;

  /**
   * Custom icon to display
   */
  icon?: ReactNode;

  /**
   * Show default icon based on variant
   * @default true
   */
  showIcon?: boolean;

  /**
   * Show close button
   * @default false
   */
  closable?: boolean;

  /**
   * Close button click handler
   */
  onClose?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Default icons (simple SVG icons)
const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 15H9V9h2v6zm0-8H9V5h2v2z"
      fill="currentColor"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm-1.5 14.5L4 10l1.5-1.5L9 12l5.5-5.5L16 8l-7.5 6.5z"
      fill="currentColor"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 0L0 18h20L10 0zm1 15H9v-2h2v2zm0-4H9V7h2v4z"
      fill="currentColor"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 13.5L13.5 15 10 11.5 6.5 15 5 13.5 8.5 10 5 6.5 6.5 5 10 8.5 13.5 5 15 6.5 11.5 10 15 13.5z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.5 3.5L8 8l4.5 4.5L11 14l-4.5-4.5L2 14l-1.5-1.5L5 8 .5 3.5 2 2l4.5 4.5L11 2l1.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * Alert component for displaying notifications and messages.
 *
 * @example
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved successfully.
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      children,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          styles.alert,
          styles[`variant-${variant}`],
          className
        )}
        {...props}
      >
        <div className={styles.content}>
          {showIcon && (
            <div className={styles.icon}>
              {displayIcon}
            </div>
          )}

          <div className={styles.message}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.description}>{children}</div>
          </div>

          {closable && onClose && (
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close alert"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
