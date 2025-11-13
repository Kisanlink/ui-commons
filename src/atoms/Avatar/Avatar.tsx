import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Name to generate initials from
   */
  name?: string;

  /**
   * Custom initials (overrides generated ones)
   */
  initials?: string;

  /**
   * Size of the avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Shape of the avatar
   */
  shape?: 'circle' | 'square';

  /**
   * Color variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

  /**
   * Status indicator
   */
  status?: 'online' | 'offline' | 'busy' | 'away';

  /**
   * Show status indicator
   */
  showStatus?: boolean;

  /**
   * Fallback content when image fails to load
   */
  fallback?: React.ReactNode;
}

/**
 * Generates initials from a name
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(p => p.length > 0);
  if (parts.length >= 2) {
    const first = parts[0]?.[0] || '';
    const last = parts[parts.length - 1]?.[0] || '';
    return `${first}${last}`.toUpperCase() || '?';
  }
  const single = parts[0] || '';
  return single.substring(0, 2).toUpperCase() || '?';
};

/**
 * Avatar component for displaying user profile images with fallback to initials
 *
 * @example
 * ```tsx
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 * <Avatar name="John Doe" />
 * <Avatar name="Jane Smith" status="online" showStatus />
 * <Avatar initials="AB" variant="success" />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      initials,
      size = 'md',
      shape = 'circle',
      variant = 'primary',
      status,
      showStatus = false,
      fallback,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const displayInitials = initials || (name ? getInitials(name) : '?');
    const displayAlt = alt || name || 'Avatar';

    const showImage = src && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          styles.avatar,
          styles[`avatar--${size}`],
          styles[`avatar--${shape}`],
          styles[`avatar--${variant}`],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={displayAlt}
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : fallback ? (
          <div className={styles.fallback}>{fallback}</div>
        ) : (
          <span className={styles.initials}>{displayInitials}</span>
        )}

        {showStatus && status && (
          <span
            className={cn(
              styles.status,
              styles[`status--${size}`],
              styles[`status--${status}`]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * Avatar Group for displaying multiple avatars with overflow count
 */
export interface AvatarGroupProps {
  /**
   * Maximum number of avatars to display
   */
  max?: number;

  /**
   * Avatar children
   */
  children: React.ReactNode;

  /**
   * Size of avatars in the group
   */
  size?: AvatarProps['size'];

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 5,
  children,
  size = 'md',
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remaining = childrenArray.length - displayChildren.length;

  return (
    <div className={cn(styles.avatarGroup, className)}>
      {displayChildren.map((child, index) => (
        <div key={index} className={styles.avatarGroupItem}>
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className={styles.avatarGroupItem}>
          <Avatar
            size={size}
            initials={`+${remaining}`}
            variant="neutral"
          />
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
