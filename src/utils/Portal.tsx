/**
 * Portal Component
 * Renders children into a DOM node outside of the parent component's DOM hierarchy
 * Used for modals, tooltips, popovers, and other overlay components
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /**
   * The content to render in the portal
   */
  children: React.ReactNode;
  /**
   * The DOM element to render into (defaults to document.body)
   */
  container?: HTMLElement;
}

export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container || document.body);
}

Portal.displayName = 'Portal';
