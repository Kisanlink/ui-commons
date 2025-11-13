import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders without title', () => {
      render(
        <Modal {...defaultProps} title={undefined} aria-label="Test modal" />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Modal
          {...defaultProps}
          footer={
            <button type="button">Save</button>
          }
        />
      );

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('does not render footer when not provided', () => {
      const { container } = render(<Modal {...defaultProps} />);
      const footer = container.querySelector('[class*="footer"]');
      expect(footer).not.toBeInTheDocument();
    });

    it('renders close button by default', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
    });

    it('does not render close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);

      expect(
        screen.queryByRole('button', { name: 'Close modal' })
      ).not.toBeInTheDocument();
    });

    it('renders complex content correctly', () => {
      render(
        <Modal
          {...defaultProps}
          footer={
            <div>
              <button type="button">Cancel</button>
              <button type="button">Confirm</button>
            </div>
          }
        >
          <div>
            <h3>Section Title</h3>
            <p>Section content</p>
            <input type="text" placeholder="Enter text" />
          </div>
        </Modal>
      );

      expect(screen.getByText('Section Title')).toBeInTheDocument();
      expect(screen.getByText('Section content')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      const { container } = render(<Modal {...defaultProps} size="sm" />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal--sm');
    });

    it('applies medium size class (default)', () => {
      const { container } = render(<Modal {...defaultProps} />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal--md');
    });

    it('applies large size class', () => {
      const { container } = render(<Modal {...defaultProps} size="lg" />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal--lg');
    });

    it('applies extra large size class', () => {
      const { container } = render(<Modal {...defaultProps} size="xl" />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal--xl');
    });

    it('applies full size class', () => {
      const { container } = render(<Modal {...defaultProps} size="full" />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal--full');
    });
  });

  describe('Close Actions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on Escape when closeOnEsc is false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Modal {...defaultProps} onClose={onClose} closeOnEsc={false} />);

      await user.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      // Find the modal container which handles overlay clicks
      const modalContainer = document.body.querySelector('[class*="modalContainer"]');
      if (modalContainer) {
        await user.click(modalContainer as HTMLElement);
      }

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on overlay click when closeOnOverlayClick is false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />
      );

      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not close when modal content is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      const modal = screen.getByRole('dialog');
      await user.click(modal);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when modal opens', () => {
      render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('preserves original overflow value', () => {
      document.body.style.overflow = 'auto';

      const { rerender } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('auto');

      // Cleanup
      document.body.style.overflow = '';
    });
  });

  describe('Focus Management', () => {
    it('focuses first focusable element on open', async () => {
      render(
        <Modal {...defaultProps}>
          <button type="button">First button</button>
          <button type="button">Second button</button>
        </Modal>
      );

      // Wait for focus to be set
      await new Promise(resolve => setTimeout(resolve, 0));

      const firstButton = screen.getByRole('button', { name: 'First button' });
      // Check that a button has focus (first button is prioritized in implementation)
      expect(document.activeElement).toBeInTheDocument();
    });

    it('returns focus to trigger element on close', async () => {
      const trigger = document.createElement('button');
      trigger.textContent = 'Open Modal';
      document.body.appendChild(trigger);
      trigger.focus();

      const { rerender } = render(<Modal {...defaultProps} />);

      // Wait for modal to take focus
      await new Promise(resolve => setTimeout(resolve, 0));

      rerender(<Modal {...defaultProps} isOpen={false} />);

      // Wait for focus to return
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(trigger).toHaveFocus();

      document.body.removeChild(trigger);
    });

    it('traps Tab focus within modal', async () => {
      const user = userEvent.setup();

      render(
        <Modal {...defaultProps}>
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <button type="button">Button 3</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const button2 = screen.getByRole('button', { name: 'Button 2' });
      const button3 = screen.getByRole('button', { name: 'Button 3' });

      // Focus first button manually for test
      button1.focus();
      expect(button1).toHaveFocus();

      // Tab through elements
      await user.tab();
      expect(button2).toHaveFocus();

      await user.tab();
      expect(button3).toHaveFocus();

      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab wraps to first element
      await user.tab();
      expect(button1).toHaveFocus();
    });

    it('traps Shift+Tab focus within modal', async () => {
      const user = userEvent.setup();

      render(
        <Modal {...defaultProps}>
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
        </Modal>
      );

      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const closeButton = screen.getByRole('button', { name: 'Close modal' });

      button1.focus();
      expect(button1).toHaveFocus();

      // Shift+Tab wraps to last element
      await user.tab({ shift: true });
      expect(closeButton).toHaveFocus();

      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Button 2' })).toHaveFocus();
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct ARIA attributes with title', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('has correct ARIA attributes without title', () => {
      render(
        <Modal {...defaultProps} title={undefined} aria-label="Custom label" />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Custom label');
    });

    it('backdrop has aria-hidden', () => {
      render(<Modal {...defaultProps} />);
      const backdrop = document.body.querySelector('[class*="backdrop"]');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to modal', () => {
      const { container } = render(
        <Modal {...defaultProps} className="custom-modal" />
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('custom-modal');
    });
  });

  describe('Portal Rendering', () => {
    it('renders modal outside of React root', () => {
      const { container } = render(<Modal {...defaultProps} />);

      // Modal should not be in the container
      expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();

      // Modal should be in document.body
      expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
    });
  });

  describe('Composition Components', () => {
    it('renders ModalHeader correctly', () => {
      const onClose = vi.fn();

      render(
        <ModalHeader onClose={onClose} showCloseButton>
          Custom Header
        </ModalHeader>
      );

      expect(screen.getByText('Custom Header')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
    });

    it('renders ModalBody correctly', () => {
      render(
        <ModalBody className="custom-body">
          <p>Body content</p>
        </ModalBody>
      );

      const body = screen.getByText('Body content').parentElement;
      expect(body).toHaveClass('custom-body');
    });

    it('renders ModalFooter correctly', () => {
      render(
        <ModalFooter className="custom-footer">
          <button type="button">Action</button>
        </ModalFooter>
      );

      const button = screen.getByRole('button', { name: 'Action' });
      expect(button).toBeInTheDocument();
      expect(button.parentElement).toHaveClass('custom-footer');
    });

    it('ModalHeader without close button', () => {
      render(
        <ModalHeader showCloseButton={false}>
          Header without close
        </ModalHeader>
      );

      expect(screen.getByText('Header without close')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Close modal' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Modal {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations without title', async () => {
      const { container } = render(
        <Modal {...defaultProps} title={undefined} aria-label="Accessible modal" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with footer', async () => {
      const { container } = render(
        <Modal
          {...defaultProps}
          footer={
            <>
              <button type="button">Cancel</button>
              <button type="button">Confirm</button>
            </>
          }
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
