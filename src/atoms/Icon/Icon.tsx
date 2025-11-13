/**
 * Icon Component
 * Wrapper around lucide-react icons with size variants and color support
 */

import { forwardRef } from 'react';
import { icons, LucideProps } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Icon.module.css';

export type IconName = keyof typeof icons;

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps extends Omit<LucideProps, 'size'> {
  /**
   * Name of the icon from lucide-react
   */
  name: IconName;
  /**
   * Size of the icon
   * @default 'md'
   */
  size?: IconSize | number;
  /**
   * Color of the icon (CSS color value)
   */
  color?: string;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Whether the icon is decorative (sets aria-hidden)
   * @default false
   */
  decorative?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color,
      className,
      decorative = false,
      ...props
    },
    ref
  ) => {
    const LucideIcon = icons[name];

    if (!LucideIcon) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon "${name}" not found in lucide-react`);
      }
      return null;
    }

    const iconSize = typeof size === 'number' ? size : sizeMap[size];

    return (
      <LucideIcon
        ref={ref}
        size={iconSize}
        color={color}
        className={cn(styles.icon, className)}
        aria-hidden={decorative}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

// Re-export commonly used icons for convenience
export {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Home,
  Settings,
  Menu,
  MoreVertical,
  MoreHorizontal,
  ExternalLink,
  Link,
  Copy,
  Share2,
  Heart,
  Star,
  Bell,
  Filter,
  SortAsc,
  SortDesc,
  Loader2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  LogOut,
  LogIn,
  FileText,
  Image,
  File,
  Folder,
} from 'lucide-react';
