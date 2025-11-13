import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type SelectOption } from './Select';

const meta = {
  title: 'Molecules/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'mango', label: 'Mango' },
  { value: 'grape', label: 'Grape' },
];

const rolesWithDisabled: SelectOption[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'owner', label: 'Owner', disabled: true },
  { value: 'guest', label: 'Guest', disabled: true },
];

// Controlled component wrapper for interactive stories
const ControlledSelect = (args: any) => {
  const [value, setValue] = useState<string | string[]>(args.value || (args.multiple ? [] : ''));

  return (
    <div style={{ width: '300px' }}>
      <Select {...args} value={value} onChange={setValue} />
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Selected: {JSON.stringify(value)}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    placeholder: 'Select a country',
  },
};

export const WithValue: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    value: 'us',
  },
};

export const Small: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: fruits,
    size: 'sm',
    placeholder: 'Choose a fruit',
  },
};

export const Medium: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: fruits,
    size: 'md',
    placeholder: 'Choose a fruit',
  },
};

export const Large: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: fruits,
    size: 'lg',
    placeholder: 'Choose a fruit',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    disabled: true,
    placeholder: 'Select a country',
  },
};

export const DisabledWithValue: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    disabled: true,
    value: 'ca',
  },
};

export const ErrorState: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    error: true,
    placeholder: 'Select a country',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: rolesWithDisabled,
    placeholder: 'Select a role',
  },
};

export const MultiSelect: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: fruits,
    multiple: true,
    placeholder: 'Select fruits',
  },
};

export const MultiSelectWithValues: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: fruits,
    multiple: true,
    value: ['apple', 'banana'],
  },
};

export const Searchable: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    searchable: true,
    placeholder: 'Search for a country',
  },
};

export const SearchableMultiple: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    searchable: true,
    multiple: true,
    placeholder: 'Search and select countries',
  },
};

export const LongList: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    })),
    searchable: true,
    placeholder: 'Select an item',
  },
};

export const Required: Story = {
  render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
      style={{ width: '300px' }}
    >
      <ControlledSelect {...args} />
      <button
        type="submit"
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: 'none',
          background: '#3b82f6',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  ),
  args: {
    options: countries,
    required: true,
    name: 'country',
    placeholder: 'Select a country (required)',
  },
};

export const InFormField: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <label
        htmlFor="country-select"
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        Country <span style={{ color: '#ef4444' }}>*</span>
      </label>
      <ControlledSelect {...args} />
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
        Select your country from the dropdown
      </p>
    </div>
  ),
  args: {
    options: countries,
    id: 'country-select',
    'aria-label': 'Select country',
    required: true,
  },
};

export const Playground: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    options: countries,
    placeholder: 'Select a country',
    size: 'md',
    searchable: false,
    multiple: false,
    disabled: false,
    error: false,
  },
};
