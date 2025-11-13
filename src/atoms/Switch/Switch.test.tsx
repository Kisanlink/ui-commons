import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import React, { useState } from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders correctly without label', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable feature" />);
      expect(screen.getByText('Enable feature')).toBeInTheDocument();
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(
        <Switch
          id="test-switch"
          label="Setting"
          helperText="This is helper text"
        />
      );
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(
        <Switch
          id="test-switch"
          label="Setting"
          error="This field is required"
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not show helper text when error is present', () => {
      render(
        <Switch
          id="test-switch"
          label="Setting"
          helperText="Helper text"
          error="Error message"
        />
      );
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Switch size="sm" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Switch size="md" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Switch size="lg" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders primary variant (default)', () => {
      render(<Switch variant="primary" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      render(<Switch variant="secondary" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Switch variant="success" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Switch variant="error" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Switch variant="warning" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();
    });

    it('renders checked when checked prop is true', () => {
      render(<Switch checked />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked();
    });

    it('renders as disabled', () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });

    it('renders as disabled with label', () => {
      render(<Switch label="Disabled switch" disabled />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });
  });

  describe('Label Position', () => {
    it('renders label on the right by default', () => {
      render(<Switch label="Right label" />);
      expect(screen.getByText('Right label')).toBeInTheDocument();
    });

    it('renders label on the left when labelPosition is left', () => {
      render(<Switch label="Left label" labelPosition="left" />);
      expect(screen.getByText('Left label')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('toggles on click', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).not.toBeChecked();
      await user.click(switchElement);
      expect(switchElement).toBeChecked();
      await user.click(switchElement);
      expect(switchElement).not.toBeChecked();
    });

    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Switch onChange={onChange} />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Switch disabled onChange={onChange} />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(onChange).not.toHaveBeenCalled();
      expect(switchElement).not.toBeChecked();
    });

    it('can be toggled with Space key', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      await user.keyboard(' ');
      expect(switchElement).toBeChecked();
    });

    it('can be toggled by clicking label', async () => {
      const user = userEvent.setup();
      render(<Switch id="test-switch" label="Click me" />);
      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Click me');

      expect(switchElement).not.toBeChecked();
      await user.click(label);
      expect(switchElement).toBeChecked();
    });
  });

  describe('Controlled Component', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const ControlledSwitch = () => {
        const [checked, setChecked] = useState(false);
        return (
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        );
      };

      render(<ControlledSwitch />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).not.toBeChecked();
      await user.click(switchElement);
      expect(switchElement).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole('switch');

      await user.tab();
      expect(switchElement).toHaveFocus();
    });

    it('sets aria-invalid when error is present', () => {
      render(<Switch id="test-switch" error="Error message" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid without error', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-invalid', 'false');
    });

    it('associates error message with aria-describedby', () => {
      render(<Switch id="test-switch" error="Error message" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'test-switch-error');
    });

    it('associates helper text with aria-describedby', () => {
      render(<Switch id="test-switch" helperText="Helper text" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'test-switch-helper');
    });

    it('prioritizes error over helper text in aria-describedby', () => {
      render(
        <Switch
          id="test-switch"
          helperText="Helper text"
          error="Error message"
        />
      );
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'test-switch-error');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(<Switch label="Test switch" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when checked', async () => {
      const { container } = render(<Switch label="Test switch" checked />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Switch label="Test switch" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <Switch id="test-switch" label="Test switch" error="Error message" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with helper text', async () => {
      const { container } = render(
        <Switch id="test-switch" label="Test switch" helperText="Helper text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Switch className="custom-class" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('custom-class');
    });

    it('applies custom wrapperClassName', () => {
      const { container } = render(
        <Switch label="Test" wrapperClassName="custom-wrapper" />
      );
      const wrapper = container.querySelector('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('can focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard HTML attributes', () => {
      render(<Switch id="custom-id" name="custom-name" value="custom-value" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'custom-id');
      expect(switchElement).toHaveAttribute('name', 'custom-name');
      expect(switchElement).toHaveAttribute('value', 'custom-value');
    });

    it('applies data attributes', () => {
      render(<Switch data-testid="test-switch" data-custom="value" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-testid', 'test-switch');
      expect(switchElement).toHaveAttribute('data-custom', 'value');
    });
  });
});
