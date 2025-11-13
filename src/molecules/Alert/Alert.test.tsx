import { describe, it, expect, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { render, screen } from '@/test/test-utils';

import { Alert } from './Alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Alert>This is an alert message</Alert>);
      expect(screen.getByText('This is an alert message')).toBeInTheDocument();
    });

    it('renders with title and message', () => {
      render(
        <Alert title="Alert Title">
          Alert message content
        </Alert>
      );
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Alert message content')).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(<Alert>Just a message</Alert>);
      expect(screen.getByText('Just a message')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('has role="alert"', () => {
      render(<Alert>Alert</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders info variant by default', () => {
      const { container } = render(<Alert>Info message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('variant-info');
    });

    it('renders success variant', () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>
      );
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('variant-success');
    });

    it('renders warning variant', () => {
      const { container } = render(
        <Alert variant="warning">Warning message</Alert>
      );
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('variant-warning');
    });

    it('renders error variant', () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>
      );
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('variant-error');
    });
  });

  describe('Icon', () => {
    it('shows icon by default', () => {
      const { container } = render(<Alert>Message</Alert>);
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
    });

    it('shows default info icon', () => {
      const { container } = render(
        <Alert variant="info">Info message</Alert>
      );
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('shows default success icon', () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>
      );
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('shows default warning icon', () => {
      const { container } = render(
        <Alert variant="warning">Warning message</Alert>
      );
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('shows default error icon', () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>
      );
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(
        <Alert showIcon={false}>Message without icon</Alert>
      );
      const icon = container.querySelector('.icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      const CustomIcon = () => <span data-testid="custom-icon">⚡</span>;
      render(
        <Alert icon={<CustomIcon />}>
          Message with custom icon
        </Alert>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('uses custom icon over default icon', () => {
      const { container } = render(
        <Alert icon={<span data-testid="custom">Custom</span>}>
          Message
        </Alert>
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
      const icon = container.querySelector('.icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Closable', () => {
    it('does not show close button by default', () => {
      render(<Alert>Message</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('does not show close button when closable is false', () => {
      render(<Alert closable={false}>Message</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('shows close button when closable is true and onClose is provided', () => {
      const handleClose = vi.fn();
      render(
        <Alert closable onClose={handleClose}>
          Message
        </Alert>
      );
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('does not show close button when closable is true but onClose is not provided', () => {
      render(<Alert closable>Message</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      const { user } = render(
        <Alert closable onClose={handleClose}>
          Closable message
        </Alert>
      );

      const closeButton = screen.getByLabelText('Close alert');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('close button has correct type attribute', () => {
      const handleClose = vi.fn();
      render(
        <Alert closable onClose={handleClose}>
          Message
        </Alert>
      );
      const closeButton = screen.getByLabelText('Close alert');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Alert className="custom-class">Message</Alert>
      );
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('custom-class');
    });

    it('applies base alert class', () => {
      const { container } = render(<Alert>Message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert?.className).toContain('alert');
    });

    it('title has correct styling class', () => {
      const { container } = render(
        <Alert title="Title">Message</Alert>
      );
      const title = container.querySelector('.title');
      expect(title).toBeInTheDocument();
    });

    it('description has correct styling class', () => {
      const { container } = render(<Alert>Description</Alert>);
      const description = container.querySelector('.description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders long message correctly', () => {
      const longMessage = 'This is a very long alert message that should still display correctly without breaking the layout or causing any visual issues. It should wrap naturally.';
      render(<Alert>{longMessage}</Alert>);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('renders multiline content', () => {
      render(
        <Alert>
          <div>Line 1</div>
          <div>Line 2</div>
        </Alert>
      );
      expect(screen.getByText('Line 1')).toBeInTheDocument();
      expect(screen.getByText('Line 2')).toBeInTheDocument();
    });

    it('renders with JSX content', () => {
      render(
        <Alert>
          <strong>Bold text</strong> and <em>italic text</em>
        </Alert>
      );
      expect(screen.getByText('Bold text')).toBeInTheDocument();
      expect(screen.getByText('italic text')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes axe accessibility tests - info variant', async () => {
      const { container } = render(
        <Alert variant="info" title="Information">
          This is an informational message
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - success variant', async () => {
      const { container } = render(
        <Alert variant="success" title="Success">
          Operation completed successfully
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - warning variant', async () => {
      const { container } = render(
        <Alert variant="warning" title="Warning">
          Please be careful
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - error variant', async () => {
      const { container } = render(
        <Alert variant="error" title="Error">
          An error occurred
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - closable', async () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Alert closable onClose={handleClose}>
          Closable alert
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - without icon', async () => {
      const { container } = render(
        <Alert showIcon={false}>
          Alert without icon
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('close button has aria-label', () => {
      const handleClose = vi.fn();
      render(
        <Alert closable onClose={handleClose}>
          Message
        </Alert>
      );
      const closeButton = screen.getByLabelText('Close alert');
      expect(closeButton).toHaveAttribute('aria-label', 'Close alert');
    });

    it('icons have aria-hidden', () => {
      const { container } = render(<Alert>Message</Alert>);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Alert>{''}</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('handles missing onClose with closable true', () => {
      render(<Alert closable>Message</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('handles all props together', () => {
      const handleClose = vi.fn();
      render(
        <Alert
          variant="success"
          title="Complete"
          showIcon
          closable
          onClose={handleClose}
          className="custom"
          data-testid="full-alert"
        >
          All features enabled
        </Alert>
      );

      expect(screen.getByTestId('full-alert')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('All features enabled')).toBeInTheDocument();
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to the alert div', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Alert ref={ref}>Message</Alert>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute('role')).toBe('alert');
    });
  });

  describe('Multiple Alerts', () => {
    it('renders multiple alerts with different variants', () => {
      render(
        <>
          <Alert variant="info">Info</Alert>
          <Alert variant="success">Success</Alert>
          <Alert variant="warning">Warning</Alert>
          <Alert variant="error">Error</Alert>
        </>
      );

      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});
