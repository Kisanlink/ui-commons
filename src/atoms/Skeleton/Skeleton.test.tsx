import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import React from 'react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('has aria-busy attribute', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('aria-busy', 'true');
    });

    it('has aria-live attribute', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Variants', () => {
    it('renders text variant', () => {
      const { container } = render(<Skeleton variant="text" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders rectangular variant (default)', () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders circular variant', () => {
      const { container } = render(<Skeleton variant="circular" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Animations', () => {
    it('renders with pulse animation (default)', () => {
      const { container } = render(<Skeleton animation="pulse" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with wave animation', () => {
      const { container } = render(<Skeleton animation="wave" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Dimensions', () => {
    it('applies width as number', () => {
      const { container } = render(<Skeleton width={200} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('200px');
    });

    it('applies width as string', () => {
      const { container } = render(<Skeleton width="75%" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('75%');
    });

    it('applies height as number', () => {
      const { container } = render(<Skeleton height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe('100px');
    });

    it('applies height as string', () => {
      const { container } = render(<Skeleton height="50px" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe('50px');
    });

    it('applies both width and height', () => {
      const { container } = render(<Skeleton width={200} height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('200px');
      expect(skeleton.style.height).toBe('100px');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<Skeleton className="custom-skeleton" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('custom-skeleton');
    });

    it('applies custom inline styles', () => {
      const { container } = render(<Skeleton style={{ backgroundColor: 'red' }} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.backgroundColor).toBe('red');
    });

    it('merges custom styles with dimension styles', () => {
      const { container } = render(
        <Skeleton width={100} style={{ margin: '10px' }} />
      );
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('100px');
      expect(skeleton.style.margin).toBe('10px');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('ref has aria-busy attribute', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards data attributes', () => {
      const { container } = render(<Skeleton data-testid="test-skeleton" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('data-testid', 'test-skeleton');
    });

    it('forwards id attribute', () => {
      const { container } = render(<Skeleton id="skeleton-id" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('id', 'skeleton-id');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations - text variant', async () => {
      const { container } = render(<Skeleton variant="text" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - rectangular variant', async () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - circular variant', async () => {
      const { container } = render(<Skeleton variant="circular" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - wave animation', async () => {
      const { container } = render(<Skeleton animation="wave" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Common Use Cases', () => {
    it('renders as text line', () => {
      const { container } = render(<Skeleton variant="text" width="75%" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
      expect(skeleton.style.width).toBe('75%');
    });

    it('renders as avatar placeholder', () => {
      const { container } = render(<Skeleton variant="circular" width={40} height={40} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
      expect(skeleton.style.width).toBe('40px');
      expect(skeleton.style.height).toBe('40px');
    });

    it('renders as image placeholder', () => {
      const { container } = render(<Skeleton width={300} height={200} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe('300px');
      expect(skeleton.style.height).toBe('200px');
    });
  });
});
