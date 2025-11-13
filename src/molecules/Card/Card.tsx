import { cn } from '@/utils/cn';

import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  clickable?: boolean;
  children: React.ReactNode;
}

export interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({ className, children, ...props }: CardSubComponentProps) => (
  <div className={cn(styles.header, className)} {...props}>
    {children}
  </div>
);

const CardBody = ({ className, children, ...props }: CardSubComponentProps) => (
  <div className={cn(styles.body, className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }: CardSubComponentProps) => (
  <div className={cn(styles.footer, className)} {...props}>
    {children}
  </div>
);

export const Card = ({
  variant = 'default',
  clickable = false,
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        styles.card,
        styles[`variant-${variant}`],
        clickable && styles.clickable,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
