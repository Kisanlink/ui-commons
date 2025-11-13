import React from 'react';
import { cn } from '@/utils/cn';

import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumb = ({
  items,
  separator = '/',
  maxItems,
  className,
  ...props
}: BreadcrumbProps) => {
  let displayItems = items;

  // Collapse middle items if maxItems is set
  if (maxItems && items.length > maxItems) {
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(maxItems - 1));
    displayItems = [...firstItems, { label: '...', href: undefined }, ...lastItems];
  }

  return (
    <nav aria-label="breadcrumb" className={cn(styles.breadcrumb, className)} {...props}>
      <ol className={styles.list}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} className={styles.item}>
              {!isLast && !isEllipsis && (item.href || item.onClick) ? (
                <>
                  {item.href ? (
                    <a href={item.href} className={styles.link}>
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className={styles.button}
                    >
                      {item.label}
                    </button>
                  )}
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                </>
              ) : isEllipsis ? (
                <>
                  <span className={styles.ellipsis}>{item.label}</span>
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                </>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
