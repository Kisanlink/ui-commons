import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names using clsx
 * Useful for conditionally combining CSS module classes
 *
 * @example
 * cn('base-class', condition && 'conditional-class', styles.module)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
