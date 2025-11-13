import { describe, it, expect, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { render, screen } from '@/test/test-utils';
import { Button } from '@/atoms/Button';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('renders title correctly', () => {
      render(<EmptyState title="No data found" />);
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <EmptyState
          title="No results"
          description="Try adjusting your search"
        />
      );
      expect(screen.getByText('Try adjusting your search')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<EmptyState title="No data" />);
      const description = container.querySelector('.description');
      expect(description).not.toBeInTheDocument();
    });

    it('has role="status"', () => {
      render(<EmptyState title="Empty" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live="polite"', () => {
      const { container } = render(<EmptyState title="Empty" />);
      const emptyState = container.querySelector('[role="status"]');
      expect(emptyState).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Icon', () => {
    it('shows default icon when no icon provided', () => {
      const { container } = render(<EmptyState title="No data" />);
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      const CustomIcon = () => <span data-testid="custom-icon">📦</span>;
      render(
        <EmptyState
          title="No data"
          icon={<CustomIcon />}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('uses custom icon over default icon', () => {
      const { container } = render(
        <EmptyState
          title="No data"
          icon={<div data-testid="custom">Custom</div>}
        />
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
      const defaultIconWrapper = container.querySelector('.defaultIconWrapper');
      expect(defaultIconWrapper).not.toBeInTheDocument();
    });

    it('default icon has aria-hidden', () => {
      const { container } = render(<EmptyState title="No data" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Action', () => {
    it('renders action button when provided', () => {
      render(
        <EmptyState
          title="No data"
          action={<Button>Add Item</Button>}
        />
      );
      expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
    });

    it('does not render action when not provided', () => {
      const { container } = render(<EmptyState title="No data" />);
      const actionWrapper = container.querySelector('.action');
      expect(actionWrapper).not.toBeInTheDocument();
    });

    it('renders custom action element', () => {
      render(
        <EmptyState
          title="No data"
          action={<a href="/add" data-testid="custom-action">Add Link</a>}
        />
      );
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    it('action button click works', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <EmptyState
          title="No data"
          action={<Button onClick={handleClick}>Click me</Button>}
        />
      );

      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Size Variants', () => {
    it('renders medium size by default', () => {
      const { container } = render(<EmptyState title="No data" />);
      const emptyState = container.querySelector('.emptyState');
      expect(emptyState?.className).toContain('size-md');
    });

    it('renders small size', () => {
      const { container } = render(
        <EmptyState title="No data" size="sm" />
      );
      const emptyState = container.querySelector('.emptyState');
      expect(emptyState?.className).toContain('size-sm');
    });

    it('renders large size', () => {
      const { container } = render(
        <EmptyState title="No data" size="lg" />
      );
      const emptyState = container.querySelector('.emptyState');
      expect(emptyState?.className).toContain('size-lg');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <EmptyState title="No data" className="custom-class" />
      );
      const emptyState = container.querySelector('.emptyState');
      expect(emptyState?.className).toContain('custom-class');
    });

    it('applies base emptyState class', () => {
      const { container } = render(<EmptyState title="No data" />);
      const emptyState = container.querySelector('.emptyState');
      expect(emptyState?.className).toContain('emptyState');
    });

    it('title has correct styling class', () => {
      const { container } = render(<EmptyState title="Title" />);
      const title = container.querySelector('.title');
      expect(title).toBeInTheDocument();
    });

    it('description has correct styling class', () => {
      const { container } = render(
        <EmptyState title="Title" description="Description" />
      );
      const description = container.querySelector('.description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders long title correctly', () => {
      const longTitle = 'This is a very long title that should still display correctly without breaking the layout';
      render(<EmptyState title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders long description correctly', () => {
      const longDescription = 'This is a very long description that provides detailed information about the empty state and what the user should do next. It should wrap naturally and maintain good readability.';
      render(
        <EmptyState
          title="No data"
          description={longDescription}
        />
      );
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('renders multiline description', () => {
      render(
        <EmptyState
          title="No data"
          description="Line 1. Line 2. Line 3."
        />
      );
      expect(screen.getByText(/Line 1. Line 2. Line 3./)).toBeInTheDocument();
    });
  });

  describe('Complete Examples', () => {
    it('renders with all props', () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          title="No items found"
          description="Get started by adding your first item"
          icon={<span data-testid="icon">📦</span>}
          action={<Button onClick={handleAction}>Add Item</Button>}
          size="lg"
          className="custom"
        />
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
      expect(screen.getByText('Get started by adding your first item')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
    });

    it('renders minimal example with just title', () => {
      render(<EmptyState title="Empty" />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });
  });

  describe('Common Use Cases', () => {
    it('renders no data scenario', () => {
      render(
        <EmptyState
          title="No data available"
          description="There is no data to display at this time."
        />
      );
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders no search results scenario', () => {
      render(
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters"
          action={<Button>Clear filters</Button>}
        />
      );
      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
    });

    it('renders error scenario', () => {
      render(
        <EmptyState
          title="Unable to load data"
          description="An error occurred while loading the data. Please try again."
          action={<Button>Retry</Button>}
        />
      );
      expect(screen.getByText('Unable to load data')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('renders empty list scenario', () => {
      render(
        <EmptyState
          title="No items yet"
          description="Get started by creating your first item"
          action={<Button>Create Item</Button>}
        />
      );
      expect(screen.getByText('No items yet')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create item/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes axe accessibility tests - basic', async () => {
      const { container } = render(
        <EmptyState title="No data" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - with description', async () => {
      const { container } = render(
        <EmptyState
          title="No data"
          description="Please add some data"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - with action', async () => {
      const { container } = render(
        <EmptyState
          title="No data"
          action={<Button>Add data</Button>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - complete', async () => {
      const { container } = render(
        <EmptyState
          title="No data"
          description="Get started"
          action={<Button>Add</Button>}
          size="lg"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - custom icon', async () => {
      const { container } = render(
        <EmptyState
          title="No data"
          icon={<span>🔍</span>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty title gracefully', () => {
      render(<EmptyState title="" />);
      const emptyState = screen.getByRole('status');
      expect(emptyState).toBeInTheDocument();
    });

    it('handles undefined description', () => {
      render(<EmptyState title="Title" description={undefined} />);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('handles undefined action', () => {
      render(<EmptyState title="Title" action={undefined} />);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to the wrapper div', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<EmptyState ref={ref} title="Empty" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute('role')).toBe('status');
    });
  });
});
