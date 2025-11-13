import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from '../../atoms/Spinner';

import styles from './SearchBar.module.css';

export type SearchBarSize = 'sm' | 'md' | 'lg';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSubmit'> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  loading?: boolean;
  debounceMs?: number;
  showClearButton?: boolean;
  size?: SearchBarSize;
}

export const SearchBar = ({
  value: valueProp,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  loading = false,
  debounceMs = 300,
  showClearButton = true,
  size = 'md',
  disabled = false,
  className,
  ...props
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState(valueProp || '');
  const debounceRef = useRef<NodeJS.Timeout>();
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debounced onChange
    if (onChange) {
      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onChange?.('');
  };

  return (
    <form onSubmit={handleSubmit} className={cn(styles.form, className)} role="search">
      <div className={cn(styles.searchBar, styles[`size-${size}`], disabled && styles.disabled)}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>

        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Search"
          className={styles.input}
          {...props}
        />

        {loading && (
          <div className={styles.loader}>
            <Spinner size="sm" />
          </div>
        )}

        {!loading && showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear search"
            className={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

SearchBar.displayName = 'SearchBar';
