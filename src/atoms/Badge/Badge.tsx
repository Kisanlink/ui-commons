import { cn } from '@/utils/cn';

import styles from './Badge.module.css';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        styles.badge,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className
      )}
      {...props}
    >
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
