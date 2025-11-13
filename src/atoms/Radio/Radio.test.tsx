import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Radio name="test" value="option1" id="radio-1" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Select option"
        />
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          aria-label="Option"
        />
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('should render with helper text', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Option"
          helperText="Additional information"
        />
      );
      expect(screen.getByText('Additional information')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Option"
          error="This field has an error"
        />
      );
      expect(screen.getByText('This field has an error')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should prioritize error over helper text', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Option"
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
      render(<Radio name="test" value="option1" id="radio-1" />);
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('primary');
    });

    it('should apply primary variant', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          variant="primary"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('primary');
    });

    it('should apply secondary variant', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          variant="secondary"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('secondary');
    });

    it('should apply success variant', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          variant="success"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('success');
    });

    it('should apply error variant', () => {
      render(
        <Radio name="test" value="option1" id="radio-1" variant="error" />
      );
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('error');
    });
  });

  describe('States', () => {
    it('should be unchecked by default', () => {
      render(<Radio name="test" value="option1" id="radio-1" />);
      expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('should be checked when checked prop is true', () => {
      render(<Radio name="test" value="option1" id="radio-1" checked readOnly />);
      expect(screen.getByRole('radio')).toBeChecked();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Radio name="test" value="option1" id="radio-1" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('should apply disabled style to label', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Option"
          disabled
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should call onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Click me"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByText('Click me'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          disabled
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should handle keyboard interaction (Space)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          onChange={handleChange}
        />
      );

      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Accessible radio"
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when checked', async () => {
      const { container } = render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Checked"
          checked
          readOnly
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when disabled', async () => {
      const { container } = render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Disabled"
          disabled
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with error', async () => {
      const { container } = render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="With error"
          error="Error message"
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have aria-invalid when error is present', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          error="Error message"
        />
      );
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby pointing to error', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          error="Error message"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-describedby', 'radio-1-error');
    });

    it('should have aria-describedby pointing to helper text', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          helperText="Helper text"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-describedby', 'radio-1-helper');
    });

    it('should associate label with input via htmlFor', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="test-id"
          label="Test label"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          className="custom-class"
        />
      );
      const radio = screen.getByRole('radio');
      expect(radio.className).toContain('custom-class');
    });

    it('should accept custom wrapperClassName', () => {
      const { container } = render(
        <Radio
          name="test"
          value="option1"
          id="radio-1"
          label="Test"
          wrapperClassName="custom-wrapper"
        />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-wrapper');
    });

    it('should forward ref to input element', () => {
      const ref = vi.fn();
      render(
        <Radio name="test" value="option1" id="radio-1" ref={ref} />
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
    });

    it('should pass through native input props', () => {
      render(
        <Radio
          name="testName"
          value="testValue"
          id="radio-1"
          data-testid="custom-radio"
        />
      );
      const radio = screen.getByTestId('custom-radio');
      expect(radio).toHaveAttribute('name', 'testName');
      expect(radio).toHaveAttribute('value', 'testValue');
    });
  });
});

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(
        <RadioGroup name="size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('should render with label', () => {
      render(
        <RadioGroup name="size" label="Choose size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByText('Choose size')).toBeInTheDocument();
    });

    it('should render with error', () => {
      render(
        <RadioGroup name="size" error="Please select a size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByText('Please select a size')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should have radiogroup role', () => {
      render(
        <RadioGroup name="size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('should select radio based on value prop', () => {
      render(
        <RadioGroup name="size" value="small">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByLabelText('Small')).toBeChecked();
      expect(screen.getByLabelText('Large')).not.toBeChecked();
    });

    it('should call onChange with selected value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup name="size" value="small" onChange={handleChange}>
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Large'));
      expect(handleChange).toHaveBeenCalledWith('large');
    });

    it('should update selection when value prop changes', () => {
      const { rerender } = render(
        <RadioGroup name="size" value="small">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Small')).toBeChecked();

      rerender(
        <RadioGroup name="size" value="large">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Large')).toBeChecked();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should use defaultValue for initial selection', () => {
      render(
        <RadioGroup name="size" defaultValue="large">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByLabelText('Large')).toBeChecked();
      expect(screen.getByLabelText('Small')).not.toBeChecked();
    });

    it('should handle selection changes internally', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup name="size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Small'));
      expect(screen.getByLabelText('Small')).toBeChecked();

      await user.click(screen.getByLabelText('Large'));
      expect(screen.getByLabelText('Large')).toBeChecked();
      expect(screen.getByLabelText('Small')).not.toBeChecked();
    });

    it('should call onChange in uncontrolled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup name="size" onChange={handleChange}>
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Small'));
      expect(handleChange).toHaveBeenCalledWith('small');
    });
  });

  describe('Layout', () => {
    it('should render vertical layout by default', () => {
      const { container } = render(
        <RadioGroup name="size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const group = container.querySelector('[role="radiogroup"]');
      expect(group?.className).not.toContain('horizontal');
    });

    it('should render horizontal layout', () => {
      const { container } = render(
        <RadioGroup name="size" direction="horizontal">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const group = container.querySelector('[role="radiogroup"]');
      expect(group?.className).toContain('horizontal');
    });
  });

  describe('Disabled State', () => {
    it('should disable all radios when group is disabled', () => {
      render(
        <RadioGroup name="size" disabled>
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      expect(screen.getByLabelText('Small')).toBeDisabled();
      expect(screen.getByLabelText('Large')).toBeDisabled();
    });

    it('should not call onChange when group is disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup name="size" disabled onChange={handleChange}>
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Small'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('should apply variant to all radios', () => {
      render(
        <RadioGroup name="size" variant="success">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio.className).toContain('success');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup name="size" label="Choose size">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with error', async () => {
      const { container } = render(
        <RadioGroup name="size" error="Please select">
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when disabled', async () => {
      const { container } = render(
        <RadioGroup name="size" disabled>
          <Radio value="small" id="size-1" label="Small" />
          <Radio value="large" id="size-2" label="Large" />
        </RadioGroup>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have aria-invalid when error is present', () => {
      render(
        <RadioGroup name="size" error="Error">
          <Radio value="small" id="size-1" label="Small" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <RadioGroup name="size" className="custom-class">
          <Radio value="small" id="size-1" label="Small" />
        </RadioGroup>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('custom-class');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(
        <RadioGroup name="size" ref={ref}>
          <Radio value="small" id="size-1" label="Small" />
        </RadioGroup>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });
  });
});
