import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '../../atoms/Button';

import styles from './Pagination.module.css';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  disabled?: boolean;
}

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  // Calculate range
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  // Add first boundary pages
  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    pages.push(i);
  }

  // Add left ellipsis if needed
  if (leftSibling > boundaryCount + 2) {
    pages.push('...');
  } else if (leftSibling === boundaryCount + 2) {
    pages.push(boundaryCount + 1);
  }

  // Add sibling pages
  const start = Math.max(leftSibling, boundaryCount + 1);
  const end = Math.min(rightSibling, totalPages - boundaryCount);

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Add right ellipsis if needed
  if (rightSibling < totalPages - boundaryCount - 1) {
    pages.push('...');
  } else if (rightSibling === totalPages - boundaryCount - 1) {
    pages.push(totalPages - boundaryCount);
  }

  // Add last boundary pages
  for (let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1); i <= totalPages; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  className,
  ...props
}: PaginationProps) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages, siblingCount, boundaryCount);

  const handlePageChange = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(styles.pagination, className)}
      {...props}
    >
      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          aria-label="Go to first page"
          className={styles.navButton}
        >
          «
        </Button>
      )}

      {showPrevNext && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Go to previous page"
          className={styles.navButton}
        >
          ‹
        </Button>
      )}

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              disabled={disabled}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(styles.pageButton, isActive && styles.active)}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {showPrevNext && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to next page"
          className={styles.navButton}
        >
          ›
        </Button>
      )}

      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to last page"
          className={styles.navButton}
        >
          »
        </Button>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
