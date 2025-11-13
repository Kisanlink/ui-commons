import React, { createContext, useContext, useState, useRef } from 'react';
import { cn } from '@/utils/cn';

import styles from './Accordion.module.css';

export type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  value: string[];
  onValueChange: (value: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion component');
  }
  return context;
};

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export interface AccordionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AccordionRoot = ({
  type = 'single',
  defaultValue,
  value: valueProp,
  onValueChange,
  collapsible = false,
  children,
  className,
  ...props
}: AccordionProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const isControlled = valueProp !== undefined;
  const value = isControlled
    ? Array.isArray(valueProp)
      ? valueProp
      : [valueProp]
    : internalValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string[];

    if (type === 'single') {
      if (value.includes(itemValue)) {
        newValue = collapsible ? [] : value;
      } else {
        newValue = [itemValue];
      }
    } else {
      if (value.includes(itemValue)) {
        newValue = value.filter((v) => v !== itemValue);
      } else {
        newValue = [...value, itemValue];
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(type === 'single' ? newValue[0] || '' : newValue);
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        value,
        onValueChange: handleValueChange,
        collapsible,
      }}
    >
      <div className={cn(styles.accordion, className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext<string | undefined>(undefined);

const AccordionItem = ({ value, children, className, ...props }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn(styles.item, className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

const AccordionButton = ({ children, className, ...props }: AccordionButtonProps) => {
  const { value: expandedValues, onValueChange } = useAccordion();
  const itemValue = useContext(AccordionItemContext);

  if (!itemValue) {
    throw new Error('AccordionButton must be used within AccordionItem');
  }

  const isExpanded = expandedValues.includes(itemValue);

  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      aria-controls={`panel-${itemValue}`}
      id={`button-${itemValue}`}
      onClick={() => onValueChange(itemValue)}
      className={cn(styles.button, isExpanded && styles.expanded, className)}
      {...props}
    >
      {children}
      <span className={cn(styles.icon, isExpanded && styles.iconExpanded)}>
        ▼
      </span>
    </button>
  );
};

const AccordionPanel = ({ children, className, ...props }: AccordionPanelProps) => {
  const { value: expandedValues } = useAccordion();
  const itemValue = useContext(AccordionItemContext);
  const panelRef = useRef<HTMLDivElement>(null);

  if (!itemValue) {
    throw new Error('AccordionPanel must be used within AccordionItem');
  }

  const isExpanded = expandedValues.includes(itemValue);

  return (
    <div
      ref={panelRef}
      role="region"
      id={`panel-${itemValue}`}
      aria-labelledby={`button-${itemValue}`}
      className={cn(
        styles.panel,
        isExpanded ? styles.panelExpanded : styles.panelCollapsed,
        className
      )}
      {...props}
    >
      <div className={styles.panelContent}>{children}</div>
    </div>
  );
};

AccordionRoot.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionButton.displayName = 'AccordionButton';
AccordionPanel.displayName = 'AccordionPanel';

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Button: AccordionButton,
  Panel: AccordionPanel,
});

export { AccordionItem, AccordionButton, AccordionPanel };
