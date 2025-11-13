import { forwardRef, ReactNode } from 'react';

import { cn } from '@/utils/cn';

import styles from './EmptyState.module.css';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps {
  /**
   * Custom icon to display
   */
  icon?: ReactNode;

  /**
   * Title text (required)
   */
  title: string;

  /**
   * Description text (optional)
   */
  description?: string;

  /**
   * Action button or link (optional)
   */
  action?: ReactNode;

  /**
   * Size variant
   * @default 'md'
   */
  size?: EmptyStateSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Default icon (simple inbox icon)
const DefaultIcon = () => (
  <div className={styles.defaultIconWrapper}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M40 12H8c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4zm0 4v4h-8l-4 4H20l-4-4H8v-4h32zM8 32V24h6.83l4 4h10.34l4-4H40v8H8z"
        fill="currentColor"
      />
    </svg>
  </div>
);

/**
 * EmptyState component for displaying empty states in lists, tables, or search results.
 * Provides visual feedback and optional actions when no data is available.
 *
 * @example
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search or filters"
 *   action={<Button>Clear filters</Button>}
 * />
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      size = 'md',
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          styles.emptyState,
          styles[`size-${size}`],
          className
        )}
      >
        <div className={styles.icon}>
          {icon || <DefaultIcon />}
        </div>

        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {action && (
          <div className={styles.action}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
