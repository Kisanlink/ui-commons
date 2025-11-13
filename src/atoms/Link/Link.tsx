/**
 * Link Component
 * Accessible link with variants and external link support
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Link.module.css';

export type LinkVariant = 'default' | 'subtle' | 'primary';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link variant
   * @default 'default'
   */
  variant?: LinkVariant;
  /**
   * Whether the link is external (opens in new tab)
   */
  external?: boolean;
  /**
   * Whether link is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Link content
   */
  children: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      external = false,
      disabled = false,
      className,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const externalProps = external
      ? {
          target: target || '_blank',
          rel: rel || 'noopener noreferrer',
        }
      : {
          target,
          rel,
        };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      props.onClick?.(e);
    };

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={cn(
          styles.link,
          styles[`link--${variant}`],
          disabled && styles['link--disabled'],
          className
        )}
        aria-disabled={disabled}
        onClick={handleClick}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <svg
            className={styles.externalIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
