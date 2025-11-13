import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from '@/atoms/Input';
import { Checkbox } from '@/atoms/Checkbox';
import { Switch } from '@/atoms/Switch';
import { Radio, RadioGroup } from '@/atoms/Radio';

import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: 'Email Address',
    helperText: 'Enter your email address',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input type="email" placeholder="john@example.com" />
      </FormField>
    </div>
  ),
};

export const RequiredField: Story = {
  args: {
    label: 'Password',
    required: true,
    helperText: 'Minimum 8 characters',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input type="password" placeholder="Enter password" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Username',
    required: true,
    error: 'Username is already taken',
    helperText: 'This helper text should not appear',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input placeholder="Enter username" />
      </FormField>
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Phone Number',
    helperText: 'Include country code (e.g., +1)',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input type="tel" placeholder="+1 (555) 000-0000" />
      </FormField>
    </div>
  ),
};

export const WithCheckbox: Story = {
  args: {
    label: 'Preferences',
    helperText: 'Select your notification preferences',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox label="Email notifications" />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Push notifications" />
        </div>
      </FormField>
    </div>
  ),
};

export const WithSwitch: Story = {
  args: {
    label: 'Enable Notifications',
    helperText: 'Receive updates about your account',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Switch label="Send me email notifications" />
      </FormField>
    </div>
  ),
};

export const WithRadioGroup: Story = {
  args: {
    label: 'Account Type',
    required: true,
    helperText: 'Choose the type of account you want to create',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <RadioGroup name="accountType">
          <Radio value="personal" label="Personal" />
          <Radio value="business" label="Business" />
          <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
      </FormField>
    </div>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FormField label="First Name" required>
        <Input placeholder="John" />
      </FormField>

      <FormField label="Last Name" required>
        <Input placeholder="Doe" />
      </FormField>

      <FormField label="Email" required error="Invalid email format">
        <Input type="email" placeholder="john@example.com" />
      </FormField>

      <FormField label="Phone" helperText="Optional">
        <Input type="tel" placeholder="+1 (555) 000-0000" />
      </FormField>

      <FormField label="Subscribe to newsletter">
        <Checkbox label="Yes, send me updates" />
      </FormField>
    </div>
  ),
};

export const ComplexForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      accountType: '',
      notifications: false,
    });

    const [errors, setErrors] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
      if (formData.email && !validateEmail(formData.email)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    };

    const handlePasswordBlur = () => {
      if (formData.password && formData.password.length < 8) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    };

    const handleConfirmPasswordBlur = () => {
      if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    };

    return (
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Create Account</h3>

        <FormField
          label="Email"
          required
          error={errors.email}
          helperText="We'll never share your email"
        >
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            onBlur={handleEmailBlur}
          />
        </FormField>

        <FormField
          label="Password"
          required
          error={errors.password}
          helperText="Minimum 8 characters"
        >
          <Input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            onBlur={handlePasswordBlur}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          required
          error={errors.confirmPassword}
        >
          <Input
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            onBlur={handleConfirmPasswordBlur}
          />
        </FormField>

        <FormField
          label="Account Type"
          required
          helperText="Choose the type of account"
        >
          <RadioGroup
            name="accountType"
            value={formData.accountType}
            onChange={(value) => setFormData((prev) => ({ ...prev, accountType: value }))}
          >
            <Radio value="personal" label="Personal" />
            <Radio value="business" label="Business" />
          </RadioGroup>
        </FormField>

        <FormField helperText="Receive updates about new features">
          <Checkbox
            label="Enable email notifications"
            checked={formData.notifications}
            onChange={(checked) => setFormData((prev) => ({ ...prev, notifications: checked }))}
          />
        </FormField>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FormField label="Extra Small" helperText="Size: xs">
        <Input size="xs" placeholder="Extra small input" />
      </FormField>

      <FormField label="Small" helperText="Size: sm">
        <Input size="sm" placeholder="Small input" />
      </FormField>

      <FormField label="Medium (Default)" helperText="Size: md">
        <Input size="md" placeholder="Medium input" />
      </FormField>

      <FormField label="Large" helperText="Size: lg">
        <Input size="lg" placeholder="Large input" />
      </FormField>

      <FormField label="Extra Large" helperText="Size: xl">
        <Input size="xl" placeholder="Extra large input" />
      </FormField>
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    helperText: 'Search for products...',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input placeholder="Type to search" />
      </FormField>
    </div>
  ),
};

export const LongErrorMessage: Story = {
  args: {
    label: 'Card Number',
    required: true,
    error: 'The card number you entered is invalid. Please check the number and try again. Make sure to enter all 16 digits without spaces.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input placeholder="1234 5678 9012 3456" />
      </FormField>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    helperText: 'This field is disabled',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args}>
        <Input disabled placeholder="Cannot edit" value="Disabled value" />
      </FormField>
    </div>
  ),
};
