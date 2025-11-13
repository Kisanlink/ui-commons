import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Checkbox id="test-checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Checkbox id="test" label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(<Checkbox id="test" aria-label="Checkbox without label" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('should render with helper text', () => {
      render(
        <Checkbox
          id="test"
          label="Subscribe"
          helperText="Get weekly updates"
        />
      );
      expect(screen.getByText('Get weekly updates')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(
        <Checkbox
          id="test"
          label="Accept terms"
          error="You must accept terms"
        />
      );
      expect(screen.getByText('You must accept terms')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should prioritize error over helper text', () => {
      render(
        <Checkbox
          id="test"
          label="Accept"
          helperText="Helper text"
          error="Error text"
        />
      );
      expect(screen.getByText('Error text')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('primary');
    });

    it('should apply secondary variant', () => {
      render(<Checkbox id="test" variant="secondary" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('secondary');
    });

    it('should apply success variant', () => {
      render(<Checkbox id="test" variant="success" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('success');
    });

    it('should apply error variant', () => {
      render(<Checkbox id="test" variant="error" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('error');
    });
  });

  describe('States', () => {
    it('should be unchecked by default', () => {
      render(<Checkbox id="test" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('should be checked when checked prop is true', () => {
      render(<Checkbox id="test" checked readOnly />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Checkbox id="test" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('should handle indeterminate state', () => {
      render(<Checkbox id="test" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('should update indeterminate state when prop changes', () => {
      const { rerender } = render(<Checkbox id="test" indeterminate={false} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox id="test" indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('should call onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" label="Click me" onChange={handleChange} />);

      await user.click(screen.getByText('Click me'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should toggle checked state in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('should handle keyboard interaction (Space)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Checkbox id="test" label="Accessible checkbox" />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when checked', async () => {
      const { container } = render(
        <Checkbox id="test" label="Checked" checked readOnly />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when disabled', async () => {
      const { container } = render(
        <Checkbox id="test" label="Disabled" disabled />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with error', async () => {
      const { container } = render(
        <Checkbox id="test" label="With error" error="Error message" />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have aria-invalid when error is present', () => {
      render(<Checkbox id="test" error="Error message" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });

    it('should have aria-describedby pointing to error', () => {
      render(<Checkbox id="test" error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-error');
    });

    it('should have aria-describedby pointing to helper text', () => {
      render(<Checkbox id="test" helperText="Helper text" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-helper');
    });

    it('should associate label with input via htmlFor', () => {
      render(<Checkbox id="test-id" label="Test label" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<Checkbox id="test" className="custom-class" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('custom-class');
    });

    it('should accept custom wrapperClassName', () => {
      const { container } = render(
        <Checkbox id="test" label="Test" wrapperClassName="custom-wrapper" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-wrapper');
    });

    it('should forward ref to input element', () => {
      const ref = vi.fn();
      render(<Checkbox id="test" ref={ref} />);
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
    });

    it('should pass through native input props', () => {
      render(<Checkbox id="test" name="testName" value="testValue" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'testName');
      expect(checkbox).toHaveAttribute('value', 'testValue');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined id gracefully', () => {
      render(<Checkbox label="No ID" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should handle empty string label', () => {
      render(<Checkbox id="test" label="" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should handle both checked and indeterminate simultaneously', () => {
      render(<Checkbox id="test" checked indeterminate readOnly />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
      expect(checkbox.indeterminate).toBe(true);
    });
  });
});
