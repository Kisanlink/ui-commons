import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '@/utils/cn';

import styles from './Dropdown.module.css';

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown');
  }
  return context;
};

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DropdownRoot = ({ children, className, ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
    return undefined;
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef} className={cn(styles.dropdown, className)} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({ children, className, ...props }: DropdownTriggerProps) => {
  const { toggle } = useDropdown();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownMenu = ({ children, className, ...props }: DropdownMenuProps) => {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <div className={cn(styles.menu, className)} role="menu" {...props}>
      {children}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className, ...props }: DropdownItemProps) => {
  const { close } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    close();
  };

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleClick}
      className={cn(styles.item, className)}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownDivider = () => <div className={styles.divider} role="separator" />;

DropdownRoot.displayName = 'Dropdown';
DropdownTrigger.displayName = 'DropdownTrigger';
DropdownMenu.displayName = 'DropdownMenu';
DropdownItem.displayName = 'DropdownItem';
DropdownDivider.displayName = 'DropdownDivider';

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Divider: DropdownDivider,
});

export { DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider };
