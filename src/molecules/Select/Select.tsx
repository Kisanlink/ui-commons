import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Select options
   */
  options: SelectOption[];

  /**
   * Current value (single) or values (multiple)
   */
  value?: string | string[];

  /**
   * Change handler
   */
  onChange?: (value: string | string[]) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Enable multi-select
   */
  multiple?: boolean;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Enable search/filter
   */
  searchable?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label
   */
  'aria-label'?: string;

  /**
   * ARIA described by
   */
  'aria-describedby'?: string;

  /**
   * ID for form integration
   */
  id?: string;

  /**
   * Name for form integration
   */
  name?: string;

  /**
   * Required field
   */
  required?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      disabled = false,
      error = false,
      multiple = false,
      size = 'md',
      searchable = false,
      className,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      id,
      name,
      required = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    // Normalize value to always be an array for easier handling
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

    // Filter options based on search term
    const filteredOptions = searchable && searchTerm
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Get enabled options for keyboard navigation
    const enabledOptions = filteredOptions.filter(opt => !opt.disabled);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
      return undefined;
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Reset highlighted index when search changes
    useEffect(() => {
      setHighlightedIndex(0);
    }, [searchTerm]);

    const handleToggle = useCallback(() => {
      if (!disabled) {
        setIsOpen(prev => !prev);
        if (isOpen) {
          setSearchTerm('');
        }
      }
    }, [disabled, isOpen]);

    const handleOptionClick = useCallback((optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        onChange?.(newValues);
      } else {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm('');
      }
    }, [multiple, selectedValues, onChange]);

    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : '');
    }, [multiple, onChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          } else if (enabledOptions[highlightedIndex]) {
            e.preventDefault();
            handleOptionClick(enabledOptions[highlightedIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev =>
              prev < enabledOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          }
          break;
        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
            setSearchTerm('');
          }
          break;
      }
    }, [disabled, isOpen, highlightedIndex, enabledOptions, handleOptionClick]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (isOpen && listboxRef.current) {
        const highlightedElement = listboxRef.current.children[highlightedIndex] as HTMLElement;
        if (highlightedElement && typeof highlightedElement.scrollIntoView === 'function') {
          highlightedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, isOpen]);

    const getDisplayValue = (): string => {
      if (selectedValues.length === 0) return placeholder;
      if (multiple) {
        return selectedValues
          .map(v => options.find(opt => opt.value === v)?.label)
          .filter(Boolean)
          .join(', ');
      }
      return options.find(opt => opt.value === selectedValues[0])?.label || placeholder;
    };

    const hasValue = selectedValues.length > 0;

    return (
      <div
        ref={ref}
        className={clsx(
          styles.select,
          styles[`size-${size}`],
          disabled && styles.disabled,
          error && styles.error,
          isOpen && styles.open,
          className
        )}
      >
        <div
          ref={containerRef}
          className={styles.container}
          onKeyDown={handleKeyDown}
        >
          {/* Hidden input for form integration */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={Array.isArray(value) ? value.join(',') : value || ''}
              required={required}
            />
          )}

          {/* Trigger button */}
          <button
            type="button"
            className={clsx(styles.trigger, !hasValue && styles.placeholder)}
            onClick={handleToggle}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            id={id}
          >
            <span className={styles.value}>{getDisplayValue()}</span>
            <span className={styles.icons}>
              {hasValue && multiple && !disabled && (
                <span
                  className={styles.clearIcon}
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  ×
                </span>
              )}
              <span
                className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
                aria-hidden="true"
              >
                ▼
                </span>
            </span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className={styles.dropdown}>
              {searchable && (
                <div className={styles.searchWrapper}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <ul
                ref={listboxRef}
                className={styles.listbox}
                role="listbox"
                aria-multiselectable={multiple}
                aria-label={ariaLabel || 'Select options'}
              >
                {filteredOptions.length === 0 ? (
                  <li className={styles.noOptions}>No options found</li>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isHighlighted = enabledOptions[highlightedIndex]?.value === option.value;

                    return (
                      <li
                        key={option.value}
                        className={clsx(
                          styles.option,
                          isSelected && styles.selected,
                          isHighlighted && styles.highlighted,
                          option.disabled && styles.optionDisabled
                        )}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        onClick={() => !option.disabled && handleOptionClick(option.value)}
                        onMouseEnter={() => {
                          if (!option.disabled) {
                            const enabledIndex = enabledOptions.findIndex(
                              opt => opt.value === option.value
                            );
                            if (enabledIndex !== -1) {
                              setHighlightedIndex(enabledIndex);
                            }
                          }
                        }}
                      >
                        {multiple && (
                          <span className={styles.checkbox}>
                            {isSelected && '✓'}
                          </span>
                        )}
                        <span className={styles.optionLabel}>{option.label}</span>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
