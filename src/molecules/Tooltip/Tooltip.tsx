import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { cn } from '@/utils/cn';
import { Portal } from '@/utils/Portal';

import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  offset?: number;
  children: React.ReactElement;
  disabled?: boolean;
  showArrow?: boolean;
  className?: string;
}

interface Position {
  top: number;
  left: number;
  placement: Exclude<TooltipPlacement, 'auto'>;
}

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 200,
  offset = 8,
  children,
  disabled = false,
  showArrow = true,
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = (preferredPlacement: TooltipPlacement): Position => {
    if (!triggerRef.current || !tooltipRef.current) {
      return { top: 0, left: 0, placement: 'top' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const positions: Record<Exclude<TooltipPlacement, 'auto'>, Position> = {
      top: {
        top: scrollY + triggerRect.top - tooltipRect.height - offset,
        left: scrollX + triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        placement: 'top',
      },
      bottom: {
        top: scrollY + triggerRect.bottom + offset,
        left: scrollX + triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        placement: 'bottom',
      },
      left: {
        top: scrollY + triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: scrollX + triggerRect.left - tooltipRect.width - offset,
        placement: 'left',
      },
      right: {
        top: scrollY + triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: scrollX + triggerRect.right + offset,
        placement: 'right',
      },
    };

    // Check if tooltip fits in viewport for preferred placement
    const checkFits = (pos: Position): boolean => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const fitsHorizontally = pos.left >= 0 && pos.left + tooltipRect.width <= viewportWidth;
      const fitsVertically = pos.top - scrollY >= 0 && pos.top - scrollY + tooltipRect.height <= viewportHeight;

      return fitsHorizontally && fitsVertically;
    };

    // Auto-positioning logic
    if (preferredPlacement === 'auto' || !checkFits(positions[preferredPlacement as Exclude<TooltipPlacement, 'auto'>])) {
      // Try placements in order: top, bottom, right, left
      const tryOrder: Array<Exclude<TooltipPlacement, 'auto'>> = ['top', 'bottom', 'right', 'left'];

      for (const tryPlacement of tryOrder) {
        if (checkFits(positions[tryPlacement])) {
          return positions[tryPlacement];
        }
      }

      // If nothing fits, use preferred or top
      return positions[preferredPlacement !== 'auto' ? preferredPlacement as Exclude<TooltipPlacement, 'auto'> : 'top'];
    }

    return positions[preferredPlacement as Exclude<TooltipPlacement, 'auto'>];
  };

  const show = () => {
    if (disabled) return;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hide();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const pos = calculatePosition(placement);
      setPosition(pos);
    }
  }, [isVisible, placement, offset]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clone the child element and add event handlers
  if (!isValidElement(children)) {
    return children;
  }

  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      const originalHandler = (children.props as any).onMouseEnter;
      originalHandler?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      const originalHandler = (children.props as any).onMouseLeave;
      originalHandler?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      const originalHandler = (children.props as any).onFocus;
      originalHandler?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      const originalHandler = (children.props as any).onBlur;
      originalHandler?.(e);
    },
    'aria-describedby': isVisible ? 'tooltip-content' : undefined,
  } as any);

  return (
    <>
      {trigger}
      {isVisible && position && (
        <Portal>
          <div
            ref={tooltipRef}
            role="tooltip"
            id="tooltip-content"
            className={cn(
              styles.tooltip,
              styles[`placement-${position.placement}`],
              className
            )}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  styles.arrow,
                  styles[`arrow-${position.placement}`]
                )}
              />
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
