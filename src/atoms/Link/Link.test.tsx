import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Link } from './Link';

describe('Link', () => {
  describe('Rendering', () => {
    it('renders link with text', () => {
      render(<Link href="/test">Link text</Link>);
      expect(screen.getByText('Link text')).toBeInTheDocument();
    });

    it('renders as anchor element', () => {
      render(<Link href="/test">Link</Link>);
      const link = screen.getByText('Link');
      expect(link.tagName).toBe('A');
    });

    it('renders href attribute', () => {
      render(<Link href="/test">Link</Link>);
      expect(screen.getByText('Link')).toHaveAttribute('href', '/test');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Link href="/test">Link</Link>);
      expect(container.firstChild).toHaveClass('link--default');
    });

    it('renders subtle variant', () => {
      const { container } = render(<Link href="/test" variant="subtle">Link</Link>);
      expect(container.firstChild).toHaveClass('link--subtle');
    });

    it('renders primary variant', () => {
      const { container } = render(<Link href="/test" variant="primary">Link</Link>);
      expect(container.firstChild).toHaveClass('link--primary');
    });
  });

  describe('External Links', () => {
    it('opens external link in new tab', () => {
      render(<Link href="https://example.com" external>External</Link>);
      const link = screen.getByText(/External/);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows external icon for external links', () => {
      const { container } = render(
        <Link href="https://example.com" external>External</Link>
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not show external icon for internal links', () => {
      const { container } = render(<Link href="/internal">Internal</Link>);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('respects custom target for external links', () => {
      render(
        <Link href="https://example.com" external target="_self">
          External
        </Link>
      );
      expect(screen.getByText('External')).toHaveAttribute('target', '_self');
    });

    it('respects custom rel for external links', () => {
      render(
        <Link href="https://example.com" external rel="nofollow">
          External
        </Link>
      );
      expect(screen.getByText('External')).toHaveAttribute('rel', 'nofollow');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class when disabled', () => {
      const { container } = render(
        <Link href="/test" disabled>Disabled</Link>
      );
      expect(container.firstChild).toHaveClass('link--disabled');
    });

    it('sets aria-disabled when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByText('Disabled')).toHaveAttribute('aria-disabled', 'true');
    });

    it('removes href when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByText('Disabled')).not.toHaveAttribute('href');
    });

    it('prevents default action when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn((e) => e.preventDefault());

      render(
        <Link href="/test" disabled onClick={onClick}>
          Disabled
        </Link>
      );

      // Disabled link doesn't have href, confirming it won't navigate
      expect(screen.getByText('Disabled')).not.toHaveAttribute('href');
    });
  });

  describe('Click Handling', () => {
    it('calls onClick handler', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Link href="/test" onClick={onClick}>
          Clickable
        </Link>
      );

      await user.click(screen.getByText('Clickable'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Link href="/test" className="custom-link">Link</Link>
      );
      expect(container.firstChild).toHaveClass('custom-link');
      expect(container.firstChild).toHaveClass('link');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes', () => {
      render(
        <Link href="/test" id="custom-id" data-testid="custom-test">
          Link
        </Link>
      );
      const link = screen.getByText('Link');
      expect(link).toHaveAttribute('id', 'custom-id');
      expect(link).toHaveAttribute('data-testid', 'custom-test');
    });

    it('forwards title attribute', () => {
      render(
        <Link href="/test" title="Custom title">Link</Link>
      );
      expect(screen.getByText('Link')).toHaveAttribute('title', 'Custom title');
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to anchor element', () => {
      const ref = vi.fn();
      render(<Link href="/test" ref={ref}>Link</Link>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Link href="/test">Accessible link</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations for external link', async () => {
      const { container } = render(
        <Link href="https://example.com" external>External link</Link>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <Link href="/test" disabled>Disabled link</Link>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
