import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component for binary selections with support for indeterminate state, labels, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Visual variant of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    error: {
      control: 'text',
      description: 'Error message displayed in error state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (for "select all" scenarios)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'default-checkbox',
    label: 'Accept terms and conditions',
  },
};

export const WithoutLabel: Story = {
  args: {
    id: 'no-label-checkbox',
    'aria-label': 'Checkbox without visible label',
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'helper-checkbox',
    label: 'Subscribe to newsletter',
    helperText: 'Get weekly updates about new features',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-checkbox',
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-checkbox',
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: 'disabled-checked-checkbox',
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    id: 'indeterminate-checkbox',
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    label: 'Checked checkbox',
    checked: true,
  },
};

// Variants
export const PrimaryVariant: Story = {
  args: {
    id: 'primary-checkbox',
    label: 'Primary variant',
    variant: 'primary',
    checked: true,
  },
};

export const SecondaryVariant: Story = {
  args: {
    id: 'secondary-checkbox',
    label: 'Secondary variant',
    variant: 'secondary',
    checked: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    id: 'success-checkbox',
    label: 'Success variant',
    variant: 'success',
    checked: true,
  },
};

export const ErrorVariant: Story = {
  args: {
    id: 'error-variant-checkbox',
    label: 'Error variant',
    variant: 'error',
    checked: true,
  },
};

// Interactive examples
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          id="controlled-checkbox"
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#f0f0f0',
            cursor: 'pointer',
          }}
        >
          Toggle Programmatically
        </button>
      </div>
    );
  },
};

export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Item 1', checked: false },
      { id: '2', label: 'Item 2', checked: false },
      { id: '3', label: 'Item 3', checked: false },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleSelectAll = () => {
      setItems(items.map((item) => ({ ...item, checked: !allChecked })));
    };

    const handleItemChange = (id: string) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          id="select-all"
          label="Select all"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={handleSelectAll}
        />
        <div
          style={{
            marginLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              id={`item-${item.id}`}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        id="primary"
        label="Primary variant"
        variant="primary"
        checked
      />
      <Checkbox
        id="secondary"
        label="Secondary variant"
        variant="secondary"
        checked
      />
      <Checkbox
        id="success"
        label="Success variant"
        variant="success"
        checked
      />
      <Checkbox
        id="error"
        label="Error variant"
        variant="error"
        checked
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox id="unchecked" label="Unchecked" />
      <Checkbox id="checked" label="Checked" checked />
      <Checkbox id="indeterminate" label="Indeterminate" indeterminate />
      <Checkbox id="disabled-unchecked" label="Disabled" disabled />
      <Checkbox
        id="disabled-checked"
        label="Disabled checked"
        disabled
        checked
      />
      <Checkbox
        id="with-error"
        label="With error"
        error="This field is required"
      />
    </div>
  ),
};
