import React, { createContext, useContext, useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@/utils/cn';

import styles from './Tabs.module.css';

export type TabsVariant = 'underline' | 'pills' | 'solid';
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  registerTab: (value: string, ref: React.RefObject<HTMLButtonElement>) => void;
  unregisterTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  children: React.ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const TabsRoot = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = 'underline',
  orientation = 'horizontal',
  children,
  className,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  // Store tab refs for keyboard navigation
  const tabRefsMap = useRef<Map<string, React.RefObject<HTMLButtonElement>>>(new Map());

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTab = (tabValue: string, ref: React.RefObject<HTMLButtonElement>) => {
    tabRefsMap.current.set(tabValue, ref);
  };

  const unregisterTab = (tabValue: string) => {
    tabRefsMap.current.delete(tabValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        variant,
        orientation,
        registerTab,
        unregisterTab,
      }}
    >
      <div className={cn(styles.tabs, className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className, ...props }: TabsListProps) => {
  const { variant, orientation } = useTabs();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        styles.tabsList,
        styles[`variant-${variant}`],
        styles[`orientation-${orientation}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  className,
  disabled,
  icon,
  ...props
}: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange, variant, orientation, registerTab, unregisterTab } = useTabs();
  const isActive = selectedValue === value;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Register/unregister this tab
  React.useEffect(() => {
    registerTab(value, buttonRef);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const tablistElement = buttonRef.current?.parentElement;
    if (!tablistElement) return;

    const tabs = Array.from(tablistElement.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    ));
    const currentIndex = tabs.indexOf(buttonRef.current!);

    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
    }

    if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== currentIndex) {
      tabs[nextIndex]?.focus();
      const nextValue = tabs[nextIndex]?.getAttribute('data-value');
      if (nextValue) {
        onValueChange(nextValue);
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        styles.tabsTrigger,
        styles[`trigger-variant-${variant}`],
        isActive && styles.active,
        disabled && styles.disabled,
        className
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className, ...props }: TabsContentProps) => {
  const { value: selectedValue } = useTabs();

  if (selectedValue !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn(styles.tabsContent, className)}
      {...props}
    >
      {children}
    </div>
  );
};

TabsRoot.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsList, TabsTrigger, TabsContent };
