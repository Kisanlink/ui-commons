import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import React from 'react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with default label', () => {
      render(<Spinner />);
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<Spinner label="Please wait" />);
      expect(screen.getByLabelText('Please wait')).toBeInTheDocument();
    });

    it('has screen reader only text', () => {
      const { container } = render(<Spinner label="Loading data" />);
      const srText = container.querySelector('.srOnly');
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent('Loading data');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Spinner size="sm" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Spinner size="md" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Spinner size="lg" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      render(<Spinner size="xl" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders primary variant (default)', () => {
      render(<Spinner variant="primary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      render(<Spinner variant="secondary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Spinner variant="success" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Spinner variant="error" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Spinner variant="warning" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(<Spinner variant="info" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders neutral variant', () => {
      render(<Spinner variant="neutral" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders white variant', () => {
      render(<Spinner variant="white" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Animations', () => {
    it('renders spin animation (default)', () => {
      render(<Spinner animation="spin" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner.querySelector('svg')).toBeInTheDocument();
    });

    it('renders pulse animation', () => {
      render(<Spinner animation="pulse" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner.querySelector('svg')).toBeInTheDocument();
    });

    it('renders dots animation', () => {
      render(<Spinner animation="dots" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      // Dots animation has 3 spans
      const dots = spinner.querySelectorAll('span:not(.srOnly)');
      expect(dots).toHaveLength(3);
    });
  });

  describe('SVG Elements', () => {
    it('renders SVG for spin animation', () => {
      const { container } = render(<Spinner animation="spin" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders circle element in spin animation', () => {
      const { container } = render(<Spinner animation="spin" />);
      const circle = container.querySelector('circle');
      expect(circle).toBeInTheDocument();
    });

    it('renders path element in spin animation', () => {
      const { container } = render(<Spinner animation="spin" />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
    });

    it('renders SVG for pulse animation', () => {
      const { container } = render(<Spinner animation="pulse" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders two circles in pulse animation', () => {
      const { container } = render(<Spinner animation="pulse" />);
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has role="status"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('has aria-label attribute', () => {
      render(<Spinner label="Loading content" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading content');
    });

    it('has screen reader accessible text', () => {
      render(<Spinner label="Please wait" />);
      expect(screen.getByText('Please wait')).toBeInTheDocument();
    });

    it('has no accessibility violations - spin', async () => {
      const { container } = render(<Spinner animation="spin" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - pulse', async () => {
      const { container } = render(<Spinner animation="pulse" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - dots', async () => {
      const { container } = render(<Spinner animation="dots" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-spinner');
    });

    it('preserves base classes when custom className is applied', () => {
      const { container } = render(<Spinner className="custom-class" animation="spin" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to container element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('ref has role attribute', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toHaveAttribute('role', 'status');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards data attributes', () => {
      render(<Spinner data-testid="test-spinner" data-custom="value" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('data-testid', 'test-spinner');
      expect(spinner).toHaveAttribute('data-custom', 'value');
    });

    it('forwards id attribute', () => {
      render(<Spinner id="custom-spinner-id" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('id', 'custom-spinner-id');
    });
  });

  describe('Size and Variant Combinations', () => {
    it('renders small primary spinner', () => {
      render(<Spinner size="sm" variant="primary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders large success spinner', () => {
      render(<Spinner size="lg" variant="success" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders extra large error spinner', () => {
      render(<Spinner size="xl" variant="error" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Animation and Variant Combinations', () => {
    it('renders pulse animation with success variant', () => {
      render(<Spinner animation="pulse" variant="success" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders dots animation with error variant', () => {
      render(<Spinner animation="dots" variant="error" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders spin animation with warning variant', () => {
      render(<Spinner animation="spin" variant="warning" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
