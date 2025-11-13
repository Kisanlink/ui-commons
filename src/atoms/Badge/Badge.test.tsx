import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge')).toBeInTheDocument();
    });

    it('should render with text content', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render with numeric content', () => {
      render(<Badge>123</Badge>);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should render with React node content', () => {
      render(
        <Badge>
          <span data-testid="custom-content">Custom</span>
        </Badge>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should render as a span element', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild;
      expect(badge?.nodeName).toBe('SPAN');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-primary');
    });

    it('should apply primary variant', () => {
      const { container } = render(<Badge variant="primary">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-primary');
    });

    it('should apply secondary variant', () => {
      const { container } = render(<Badge variant="secondary">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-secondary');
    });

    it('should apply success variant', () => {
      const { container } = render(<Badge variant="success">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-success');
    });

    it('should apply error variant', () => {
      const { container } = render(<Badge variant="error">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-error');
    });

    it('should apply warning variant', () => {
      const { container } = render(<Badge variant="warning">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-warning');
    });

    it('should apply info variant', () => {
      const { container } = render(<Badge variant="info">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-info');
    });

    it('should apply neutral variant', () => {
      const { container } = render(<Badge variant="neutral">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-neutral');
    });
  });

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('size-md');
    });

    it('should apply small size', () => {
      const { container } = render(<Badge size="sm">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('size-sm');
    });

    it('should apply medium size', () => {
      const { container } = render(<Badge size="md">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('size-md');
    });

    it('should apply large size', () => {
      const { container } = render(<Badge size="lg">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('size-lg');
    });
  });

  describe('Dot Indicator', () => {
    it('should not render dot by default', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const dot = container.querySelector('[class*="dot"]');
      expect(dot).not.toBeInTheDocument();
    });

    it('should render dot when dot prop is true', () => {
      const { container } = render(<Badge dot>Badge</Badge>);
      const dot = container.querySelector('[class*="dot"]');
      expect(dot).toBeInTheDocument();
    });

    it('should not render dot when dot prop is false', () => {
      const { container } = render(<Badge dot={false}>Badge</Badge>);
      const dot = container.querySelector('[class*="dot"]');
      expect(dot).not.toBeInTheDocument();
    });

    it('should render dot before text content', () => {
      const { container } = render(<Badge dot>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      const firstChild = badge.firstChild as HTMLElement;
      expect(firstChild.className).toContain('dot');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('custom-class');
    });

    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Badge className="custom-class" variant="success">
          Badge
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('custom-class');
      expect(badge.className).toContain('variant-success');
    });

    it('should pass through native span props', () => {
      render(
        <Badge data-testid="custom-badge" title="Custom title">
          Badge
        </Badge>
      );
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('title', 'Custom title');
    });

    it('should handle onClick event', () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Badge</Badge>);
      const badge = screen.getByText('Badge');
      badge.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should accept style prop', () => {
      render(
        <Badge data-testid="styled-badge" style={{ color: 'rgb(255, 0, 0)' }}>Badge</Badge>
      );
      const badge = screen.getByTestId('styled-badge');
      expect(badge).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('should accept id prop', () => {
      render(<Badge id="custom-id">Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Badge>Badge</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with primary variant', async () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with secondary variant', async () => {
      const { container } = render(
        <Badge variant="secondary">Secondary</Badge>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with success variant', async () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with error variant', async () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with warning variant', async () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with info variant', async () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with neutral variant', async () => {
      const { container } = render(<Badge variant="neutral">Neutral</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with dot indicator', async () => {
      const { container } = render(<Badge dot>Online</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with small size', async () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with large size', async () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should be readable by screen readers', () => {
      render(<Badge>3 notifications</Badge>);
      expect(screen.getByText('3 notifications')).toBeInTheDocument();
    });
  });

  describe('Combinations', () => {
    it('should handle multiple props together', () => {
      const { container } = render(
        <Badge variant="success" size="lg" dot className="custom">
          Online
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain('variant-success');
      expect(badge.className).toContain('size-lg');
      expect(badge.className).toContain('custom');
      const dot = container.querySelector('[class*="dot"]');
      expect(dot).toBeInTheDocument();
    });

    it('should render all sizes with all variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const variants = [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'neutral',
      ] as const;

      sizes.forEach((size) => {
        variants.forEach((variant) => {
          const { container } = render(
            <Badge size={size} variant={variant}>
              Test
            </Badge>
          );
          const badge = container.firstChild as HTMLElement;
          expect(badge.className).toContain(`size-${size}`);
          expect(badge.className).toContain(`variant-${variant}`);
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string children', () => {
      const { container } = render(<Badge>{''}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle zero as children', () => {
      render(<Badge>{0}</Badge>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle null as children gracefully', () => {
      const { container } = render(<Badge>{null}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle undefined className', () => {
      const { container } = render(<Badge className={undefined}>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toBeInTheDocument();
      expect(badge.className).not.toContain('undefined');
    });
  });
});
