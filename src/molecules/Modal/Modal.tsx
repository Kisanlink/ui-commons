/**
 * Modal Component
 * Accessible overlay dialog with portal rendering, focus management, and keyboard navigation
 * WCAG 2.1 AA compliant
 */

import React, { useEffect, useRef, forwardRef } from 'react';
import { Portal } from '../../utils/Portal';
import { cn } from '../../utils/cn';
import styles from './Modal.module.css';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal body content
   */
  children: React.ReactNode;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Whether clicking the overlay closes the modal
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing Escape closes the modal
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Additional CSS class for modal content
   */
  className?: string;
  /**
   * ARIA label for the modal (required if no title)
   */
  'aria-label'?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  function Modal(
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Body scroll lock
    useEffect(() => {
      if (!isOpen) return;

      // Store current overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;

        // Focus the modal or first focusable element
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          focusableElements[0]?.focus();
        } else {
          modalRef.current?.focus();
        }
      } else {
        // Return focus to previously focused element
        previousActiveElement.current?.focus();
      }
    }, [isOpen]);

    // ESC key handler
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEsc, onClose]);

    // Focus trap
    useEffect(() => {
      if (!isOpen) return;

      const handleTab = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <Portal>
        <div className={styles.modalOverlay} data-testid="modal-overlay">
          {/* Backdrop */}
          <div
            className={styles.backdrop}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className={styles.modalContainer} onClick={handleOverlayClick}>
            {/* Modal */}
            <div
              ref={ref || modalRef}
              className={cn(styles.modal, styles[`modal--${size}`], className)}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-label={!title ? ariaLabel : undefined}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={styles.header}>
                  {title && (
                    <h2 id="modal-title" className={styles.title}>
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className={styles.closeButton}
                      aria-label="Close modal"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={styles.body}>{children}</div>

              {/* Footer */}
              {footer && <div className={styles.footer}>{footer}</div>}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
);

// Composition components for better structure
export interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
  showCloseButton = true,
  className,
}) => {
  return (
    <div className={cn(styles.header, className)}>
      <div className={styles.title}>{children}</div>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return <div className={cn(styles.body, className)}>{children}</div>;
};

ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return <div className={cn(styles.footer, className)}>{children}</div>;
};

ModalFooter.displayName = 'ModalFooter';
