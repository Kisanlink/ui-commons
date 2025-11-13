import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Visual style variant of the radio',
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the label',
    },
    error: {
      control: 'text',
      description: 'Error message - displays in error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    name: 'radio',
    value: 'option1',
    id: 'radio-1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'radio',
    value: 'option1',
    id: 'radio-checked',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Radio option',
    helperText: 'This is helper text to provide additional information',
    name: 'radio',
    value: 'option1',
    id: 'radio-helper',
  },
};

export const WithError: Story = {
  args: {
    label: 'Radio option',
    error: 'This field has an error',
    name: 'radio',
    value: 'option1',
    id: 'radio-error',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    name: 'radio',
    value: 'option1',
    id: 'radio-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled selected option',
    name: 'radio',
    value: 'option1',
    id: 'radio-disabled-checked',
    disabled: true,
    checked: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio label="Primary (default)" variant="primary" name="variants" value="primary" id="variant-primary" checked />
      <Radio label="Secondary" variant="secondary" name="variants" value="secondary" id="variant-secondary" />
      <Radio label="Success" variant="success" name="variants" value="success" id="variant-success" />
      <Radio label="Error" variant="error" name="variants" value="error" id="variant-error" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    name: 'radio',
    value: 'option1',
    id: 'radio-no-label',
    'aria-label': 'Radio option without visible label',
  },
};

// RadioGroup Stories
const RadioGroupMeta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Visual variant for all radios',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of the radio group',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radios in the group',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export const BasicGroup: StoryObj<typeof RadioGroupMeta> = {
  render: (args) => (
    <RadioGroup {...args} name="size">
      <Radio value="small" label="Small" id="size-small" />
      <Radio value="medium" label="Medium" id="size-medium" />
      <Radio value="large" label="Large" id="size-large" />
    </RadioGroup>
  ),
  args: {
    label: 'Choose a size',
  },
};

export const ControlledGroup: StoryObj<typeof RadioGroupMeta> = {
  render: () => {
    const [value, setValue] = useState('medium');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <RadioGroup
          name="controlled-size"
          value={value}
          onChange={setValue}
          label="Controlled Selection"
        >
          <Radio value="small" label="Small" id="controlled-small" />
          <Radio value="medium" label="Medium" id="controlled-medium" />
          <Radio value="large" label="Large" id="controlled-large" />
        </RadioGroup>
        <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f0f0', borderRadius: '4px' }}>
          Selected value: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const UncontrolledGroup: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <RadioGroup name="uncontrolled-size" defaultValue="medium" label="Uncontrolled Selection">
      <Radio value="small" label="Small" id="uncontrolled-small" />
      <Radio value="medium" label="Medium" id="uncontrolled-medium" />
      <Radio value="large" label="Large" id="uncontrolled-large" />
    </RadioGroup>
  ),
};

export const HorizontalGroup: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <RadioGroup name="horizontal-size" direction="horizontal" label="Horizontal Layout">
      <Radio value="small" label="Small" id="horizontal-small" />
      <Radio value="medium" label="Medium" id="horizontal-medium" />
      <Radio value="large" label="Large" id="horizontal-large" />
    </RadioGroup>
  ),
};

export const DisabledGroup: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <RadioGroup name="disabled-size" disabled defaultValue="medium" label="Disabled Group">
      <Radio value="small" label="Small" id="disabled-small" />
      <Radio value="medium" label="Medium" id="disabled-medium" />
      <Radio value="large" label="Large" id="disabled-large" />
    </RadioGroup>
  ),
};

export const WithGroupError: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <RadioGroup
      name="error-size"
      error="Please select a size to continue"
      label="Size Selection (Required)"
    >
      <Radio value="small" label="Small" id="error-small" />
      <Radio value="medium" label="Medium" id="error-medium" />
      <Radio value="large" label="Large" id="error-large" />
    </RadioGroup>
  ),
};

export const WithIndividualHelperText: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <RadioGroup name="helper-size" label="Choose your plan">
      <Radio value="basic" label="Basic" id="helper-basic" helperText="Perfect for individuals" />
      <Radio value="pro" label="Pro" id="helper-pro" helperText="Best for small teams" />
      <Radio value="enterprise" label="Enterprise" id="helper-enterprise" helperText="For large organizations" />
    </RadioGroup>
  ),
};

export const PaymentMethodExample: StoryObj<typeof RadioGroupMeta> = {
  render: () => {
    const [method, setMethod] = useState('card');
    return (
      <div style={{ maxWidth: '400px' }}>
        <RadioGroup
          name="payment-method"
          value={method}
          onChange={setMethod}
          label="Payment Method"
        >
          <Radio
            value="card"
            label="Credit/Debit Card"
            id="payment-card"
            helperText="Visa, Mastercard, Amex accepted"
          />
          <Radio
            value="upi"
            label="UPI"
            id="payment-upi"
            helperText="Pay using any UPI app"
          />
          <Radio
            value="netbanking"
            label="Net Banking"
            id="payment-netbanking"
            helperText="All major banks supported"
          />
          <Radio
            value="wallet"
            label="Wallet"
            id="payment-wallet"
            helperText="Paytm, PhonePe, Google Pay"
          />
        </RadioGroup>
      </div>
    );
  },
};

export const VariantGroup: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup name="variant-primary" variant="primary" label="Primary Variant">
        <Radio value="option1" label="Option 1" id="variant-p-1" />
        <Radio value="option2" label="Option 2" id="variant-p-2" />
      </RadioGroup>
      <RadioGroup name="variant-secondary" variant="secondary" label="Secondary Variant">
        <Radio value="option1" label="Option 1" id="variant-s-1" />
        <Radio value="option2" label="Option 2" id="variant-s-2" />
      </RadioGroup>
      <RadioGroup name="variant-success" variant="success" label="Success Variant">
        <Radio value="option1" label="Option 1" id="variant-su-1" />
        <Radio value="option2" label="Option 2" id="variant-su-2" />
      </RadioGroup>
      <RadioGroup name="variant-error" variant="error" label="Error Variant">
        <Radio value="option1" label="Option 1" id="variant-e-1" />
        <Radio value="option2" label="Option 2" id="variant-e-2" />
      </RadioGroup>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: 'Radio Label',
    helperText: '',
    error: '',
    disabled: false,
    variant: 'primary',
    name: 'playground',
    value: 'option1',
    id: 'radio-playground',
  },
};
