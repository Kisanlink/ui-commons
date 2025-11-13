import React, { useState, useRef, cloneElement, isValidElement } from 'react';
import { cn } from '@/utils/cn';
import { Portal } from '@/utils/Portal';

import styles from './Popover.module.css';

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface PopoverProps {
  content: React.ReactNode;
  placement?: PopoverPlacement;
  trigger?: 'click' | 'hover';
  children: React.ReactElement;
  offset?: number;
  className?: string;
}

export const Popover = ({
  content,
  placement = 'bottom',
  trigger = 'click',
  children,
  offset = 8,
  className,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = scrollY + triggerRect.top - offset;
        left = scrollX + triggerRect.left + triggerRect.width / 2;
        break;
      case 'bottom':
        top = scrollY + triggerRect.bottom + offset;
        left = scrollX + triggerRect.left + triggerRect.width / 2;
        break;
      case 'left':
        top = scrollY + triggerRect.top + triggerRect.height / 2;
        left = scrollX + triggerRect.left - offset;
        break;
      case 'right':
        top = scrollY + triggerRect.top + triggerRect.height / 2;
        left = scrollX + triggerRect.right + offset;
        break;
    }

    setPosition({ top, left });
  };

  const open = () => {
    setIsOpen(true);
    setTimeout(calculatePosition, 0);
  };

  const close = () => setIsOpen(false);

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  if (!isValidElement(children)) {
    return children;
  }

  const triggerProps: any = {
    ref: triggerRef,
  };

  if (trigger === 'click') {
    triggerProps.onClick = (e: React.MouseEvent) => {
      toggle();
      const originalHandler = (children.props as any).onClick;
      originalHandler?.(e);
    };
  } else {
    triggerProps.onMouseEnter = (e: React.MouseEvent) => {
      open();
      const originalHandler = (children.props as any).onMouseEnter;
      originalHandler?.(e);
    };
    triggerProps.onMouseLeave = (e: React.MouseEvent) => {
      close();
      const originalHandler = (children.props as any).onMouseLeave;
      originalHandler?.(e);
    };
  }

  const triggerElement = cloneElement(children, triggerProps);

  return (
    <>
      {triggerElement}
      {isOpen && (
        <Portal>
          <div
            ref={popoverRef}
            className={cn(
              styles.popover,
              styles[`placement-${placement}`],
              className
            )}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {content}
            <div className={cn(styles.arrow, styles[`arrow-${placement}`])} />
          </div>
        </Portal>
      )}
    </>
  );
};

Popover.displayName = 'Popover';
