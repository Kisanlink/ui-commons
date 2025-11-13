import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';

import { render, screen } from '@/test/test-utils';
import { Input } from '@/atoms/Input';
import { Checkbox } from '@/atoms/Checkbox';
import { Switch } from '@/atoms/Switch';

import { FormField } from './FormField';

describe('FormField', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <FormField>
          <Input placeholder="Enter text" />
        </FormField>
      );
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(
        <FormField>
          <Input placeholder="No label" />
        </FormField>
      );
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('renders label when provided', () => {
      render(
        <FormField label="Email Address">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('associates label with input using htmlFor', () => {
      render(
        <FormField label="Username" htmlFor="username-input">
          <Input id="username-input" />
        </FormField>
      );
      const label = screen.getByText('Username') as HTMLLabelElement;
      expect(label.htmlFor).toBe('username-input');
    });

    it('generates unique ID when htmlFor is not provided', () => {
      render(
        <FormField label="Email">
          <Input />
        </FormField>
      );
      const label = screen.getByText('Email') as HTMLLabelElement;
      expect(label.htmlFor).toBeTruthy();
      expect(label.htmlFor).toMatch(/^:r\d+:$/);
    });
  });

  describe('Required Indicator', () => {
    it('shows required indicator when required is true', () => {
      render(
        <FormField label="Password" required>
          <Input type="password" />
        </FormField>
      );
      const label = screen.getByText('Password');
      expect(label.textContent).toContain('*');
    });

    it('does not show required indicator when required is false', () => {
      render(
        <FormField label="Optional Field">
          <Input />
        </FormField>
      );
      const label = screen.getByText('Optional Field');
      expect(label.textContent).not.toContain('*');
    });

    it('shows required indicator with correct styling', () => {
      const { container } = render(
        <FormField label="Required" required>
          <Input />
        </FormField>
      );
      const requiredSpan = container.querySelector('.required');
      expect(requiredSpan).toBeInTheDocument();
      expect(requiredSpan?.textContent).toBe('*');
    });
  });

  describe('Error Message', () => {
    it('shows error message when provided', () => {
      render(
        <FormField label="Email" error="Invalid email format">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('error message has role="alert"', () => {
      render(
        <FormField error="This field is required">
          <Input />
        </FormField>
      );
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('This field is required');
    });

    it('applies error styling to control wrapper', () => {
      const { container } = render(
        <FormField error="Error message">
          <Input />
        </FormField>
      );
      const controlWrapper = container.querySelector('.control');
      expect(controlWrapper?.className).toContain('controlError');
    });

    it('does not show error styling when no error', () => {
      const { container } = render(
        <FormField>
          <Input />
        </FormField>
      );
      const controlWrapper = container.querySelector('.control');
      expect(controlWrapper?.className).not.toContain('controlError');
    });
  });

  describe('Helper Text', () => {
    it('shows helper text when provided', () => {
      render(
        <FormField helperText="Enter your email address">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('hides helper text when error is present', () => {
      render(
        <FormField
          helperText="This should not appear"
          error="Error message"
        >
          <Input />
        </FormField>
      );
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('shows helper text when no error', () => {
      render(
        <FormField helperText="Helper text visible">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Helper text visible')).toBeInTheDocument();
    });

    it('helper text has correct ID for aria-describedby', () => {
      render(
        <FormField htmlFor="test-input" helperText="Helper">
          <Input id="test-input" />
        </FormField>
      );
      const helperText = screen.getByText('Helper');
      expect(helperText.id).toBe('test-input-helper');
    });
  });

  describe('Error vs Helper Text Priority', () => {
    it('error message replaces helper text', () => {
      render(
        <FormField
          label="Email"
          helperText="Enter valid email"
          error="Invalid email"
        >
          <Input />
        </FormField>
      );
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.queryByText('Enter valid email')).not.toBeInTheDocument();
    });

    it('shows only error when both error and helper text provided', () => {
      const { container } = render(
        <FormField
          helperText="Helper"
          error="Error"
        >
          <Input />
        </FormField>
      );
      const errorElement = screen.getByRole('alert');
      const helperElement = container.querySelector('.helperText');

      expect(errorElement).toBeInTheDocument();
      expect(helperElement).not.toBeInTheDocument();
    });
  });

  describe('Integration with Different Form Controls', () => {
    it('works with Input component', () => {
      render(
        <FormField label="Text Input" helperText="Enter text">
          <Input placeholder="Type here" />
        </FormField>
      );
      expect(screen.getByText('Text Input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
      expect(screen.getByText('Enter text')).toBeInTheDocument();
    });

    it('works with Checkbox component', () => {
      render(
        <FormField label="Terms and Conditions" error="You must agree">
          <Checkbox label="I agree to terms" />
        </FormField>
      );
      expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();
      expect(screen.getByText('I agree to terms')).toBeInTheDocument();
      expect(screen.getByText('You must agree')).toBeInTheDocument();
    });

    it('works with Switch component', () => {
      render(
        <FormField label="Notifications" helperText="Enable email notifications">
          <Switch />
        </FormField>
      );
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Enable email notifications')).toBeInTheDocument();
    });

    it('works with multiple inputs', () => {
      render(
        <>
          <FormField label="First Name">
            <Input placeholder="First" />
          </FormField>
          <FormField label="Last Name">
            <Input placeholder="Last" />
          </FormField>
        </>
      );
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className to wrapper', () => {
      const { container } = render(
        <FormField className="custom-class">
          <Input />
        </FormField>
      );
      const wrapper = container.querySelector('.formField');
      expect(wrapper?.className).toContain('custom-class');
    });

    it('applies base formField class', () => {
      const { container } = render(
        <FormField>
          <Input />
        </FormField>
      );
      expect(container.querySelector('.formField')).toBeInTheDocument();
    });

    it('label has correct styling class', () => {
      const { container } = render(
        <FormField label="Styled Label">
          <Input />
        </FormField>
      );
      const label = container.querySelector('.label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes axe accessibility tests - basic', async () => {
      const { container } = render(
        <FormField label="Accessible Field">
          <Input />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - with error', async () => {
      const { container } = render(
        <FormField label="Email" error="Invalid email">
          <Input type="email" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - with helper text', async () => {
      const { container } = render(
        <FormField label="Password" helperText="Min 8 characters">
          <Input type="password" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - required field', async () => {
      const { container } = render(
        <FormField label="Required Field" required>
          <Input />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe accessibility tests - with checkbox', async () => {
      const { container } = render(
        <FormField label="Agree to terms">
          <Checkbox label="I agree" />
        </FormField>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(
        <FormField label="Empty">
          <div />
        </FormField>
      );
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('handles long error messages', () => {
      const longError = 'This is a very long error message that should still display correctly without breaking the layout or causing any visual issues.';
      render(
        <FormField error={longError}>
          <Input />
        </FormField>
      );
      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it('handles long helper text', () => {
      const longHelper = 'This is a very long helper text that provides detailed instructions about what the user should enter in this field.';
      render(
        <FormField helperText={longHelper}>
          <Input />
        </FormField>
      );
      expect(screen.getByText(longHelper)).toBeInTheDocument();
    });

    it('handles multiple required indicators correctly', () => {
      render(
        <>
          <FormField label="Field 1" required>
            <Input />
          </FormField>
          <FormField label="Field 2" required>
            <Input />
          </FormField>
        </>
      );
      const labels = screen.getAllByText('*');
      expect(labels).toHaveLength(2);
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to the wrapper div', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <FormField ref={ref}>
          <Input />
        </FormField>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('formField');
    });
  });
});
