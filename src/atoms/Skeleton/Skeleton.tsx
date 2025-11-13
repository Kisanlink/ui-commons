import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the skeleton
   */
  variant?: 'text' | 'rectangular' | 'circular';

  /**
   * Animation type
   */
  animation?: 'pulse' | 'wave';

  /**
   * Width of the skeleton (string or number in px)
   */
  width?: string | number;

  /**
   * Height of the skeleton (string or number in px)
   */
  height?: string | number;
}

/**
 * Skeleton component for loading states
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="75%" />
 * <Skeleton variant="rectangular" width={200} height={100} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton animation="wave" width="100%" height={200} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangular',
      animation = 'pulse',
      width,
      height,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyles: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.skeleton,
          styles[`skeleton--${variant}`],
          animation === 'wave' && styles['skeleton--wave'],
          className
        )}
        style={inlineStyles}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
