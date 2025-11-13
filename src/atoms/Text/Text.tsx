/**
 * Text Component
 * Polymorphic typography component with semantic variants
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Text.module.css';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'label'
  | 'overline';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'inherit';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

// Polymorphic component props
type TextOwnProps<E extends React.ElementType = React.ElementType> = {
  /**
   * Typography variant
   * @default 'body1'
   */
  variant?: TextVariant;
  /**
   * Text color
   * @default 'primary'
   */
  color?: TextColor;
  /**
   * Text alignment
   */
  align?: TextAlign;
  /**
   * Font weight
   */
  weight?: TextWeight;
  /**
   * Text content
   */
  children?: React.ReactNode;
  /**
   * Component to render as
   */
  as?: E;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Whether text should not wrap
   */
  noWrap?: boolean;
  /**
   * Whether to show ellipsis for overflow
   */
  ellipsis?: boolean;
};

export type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps>;

const defaultElement = 'p';

const variantElementMap: Record<TextVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  label: 'label',
  overline: 'span',
};

export const Text = forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      variant = 'body1',
      color = 'primary',
      align,
      weight,
      children,
      as,
      className,
      noWrap,
      ellipsis,
      ...props
    }: TextProps<E>,
    ref: React.Ref<any>
  ) => {
    const Component = as || variantElementMap[variant] || defaultElement;

    return (
      <Component
        ref={ref}
        className={cn(
          styles.text,
          styles[`text--${variant}`],
          styles[`text--${color}`],
          align && styles[`text--align-${align}`],
          weight && styles[`text--weight-${weight}`],
          noWrap && styles['text--no-wrap'],
          ellipsis && styles['text--ellipsis'],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
