import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('Rendering', () => {
    it('renders icon by name', () => {
      const { container } = render(<Icon name="Check" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders different icon names', () => {
      const { container, rerender } = render(<Icon name="Check" />);
      expect(container.querySelector('svg')).toBeInTheDocument();

      rerender(<Icon name="X" />);
      expect(container.querySelector('svg')).toBeInTheDocument();

      rerender(<Icon name="Search" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('returns null for invalid icon name', () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(<Icon name={'InvalidIcon' as any} />);

      expect(container.querySelector('svg')).not.toBeInTheDocument();
      expect(consoleWarn).toHaveBeenCalledWith('Icon "InvalidIcon" not found in lucide-react');

      consoleWarn.mockRestore();
    });
  });

  describe('Sizes', () => {
    it('renders xs size (12px)', () => {
      const { container } = render(<Icon name="Check" size="xs" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '12');
      expect(svg).toHaveAttribute('height', '12');
    });

    it('renders sm size (16px)', () => {
      const { container } = render(<Icon name="Check" size="sm" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    it('renders md size (20px) - default', () => {
      const { container } = render(<Icon name="Check" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '20');
      expect(svg).toHaveAttribute('height', '20');
    });

    it('renders lg size (24px)', () => {
      const { container } = render(<Icon name="Check" size="lg" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('renders xl size (32px)', () => {
      const { container } = render(<Icon name="Check" size="xl" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('renders 2xl size (40px)', () => {
      const { container } = render(<Icon name="Check" size="2xl" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '40');
      expect(svg).toHaveAttribute('height', '40');
    });

    it('renders custom numeric size', () => {
      const { container } = render(<Icon name="Check" size={48} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '48');
      expect(svg).toHaveAttribute('height', '48');
    });
  });

  describe('Colors', () => {
    it('renders with custom color prop', () => {
      const { container } = render(<Icon name="Check" color="red" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders with hex color prop', () => {
      const { container } = render(<Icon name="Check" color="#ff0000" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders with rgb color prop', () => {
      const { container } = render(<Icon name="Check" color="rgb(255, 0, 0)" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders with currentColor prop', () => {
      const { container } = render(<Icon name="Check" color="currentColor" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(<Icon name="Check" className="custom-icon" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-icon');
    });

    it('preserves default className with custom', () => {
      const { container } = render(<Icon name="Check" className="custom-icon" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('icon');
      expect(svg).toHaveClass('custom-icon');
    });
  });

  describe('Accessibility', () => {
    it('is decorative by default (aria-hidden=false)', () => {
      const { container } = render(<Icon name="Check" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'false');
    });

    it('sets aria-hidden when decorative', () => {
      const { container } = render(<Icon name="Check" decorative />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Icon name="Check" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when decorative', async () => {
      const { container } = render(
        <div>
          <Icon name="Check" decorative />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Additional Props', () => {
    it('forwards strokeWidth prop', () => {
      const { container } = render(<Icon name="Check" strokeWidth={3} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('stroke-width', '3');
    });

    it('forwards other lucide props', () => {
      const { container } = render(
        <Icon name="Check" absoluteStrokeWidth />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Common Icons', () => {
    const commonIcons = [
      'Check',
      'X',
      'ChevronDown',
      'ChevronUp',
      'Search',
      'CircleAlert', // AlertCircle is now CircleAlert in lucide-react
      'Info',
      'CircleCheck', // CheckCircle is now CircleCheck
      'CircleX', // XCircle is now CircleX
      'Plus',
      'Minus',
      'Pencil', // Edit is now Pencil
      'Trash2',
      'Save',
      'Download',
      'Upload',
      'Eye',
      'EyeOff',
      'Calendar',
      'User',
      'Mail',
      'Settings',
      'Menu',
      'ExternalLink',
    ] as const;

    it.each(commonIcons)('renders %s icon', (iconName) => {
      const { container } = render(<Icon name={iconName} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to SVG element', () => {
      const ref = vi.fn();
      render(<Icon name="Check" ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
