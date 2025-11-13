import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning'],
      description: 'Visual variant of the switch',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    error: {
      control: 'text',
      description: 'Error message (replaces helper text)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'helper-switch',
    label: 'Enable feature',
    helperText: 'This will enable the experimental feature for your account',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-switch',
    label: 'Terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

export const LabelOnLeft: Story = {
  args: {
    label: 'Label on left',
    labelPosition: 'left',
  },
};

export const LabelOnLeftWithHelper: Story = {
  args: {
    id: 'left-helper-switch',
    label: 'Label on left',
    labelPosition: 'left',
    helperText: 'Helper text aligned correctly',
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small switch',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium switch',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large switch',
    size: 'lg',
  },
};

// Color variants
export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    checked: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    checked: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    variant: 'error',
    checked: true,
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
    checked: true,
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch label="Small" size="sm" checked />
      <Switch label="Medium (default)" size="md" checked />
      <Switch label="Large" size="lg" checked />
    </div>
  ),
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch label="Primary" variant="primary" checked />
      <Switch label="Secondary" variant="secondary" checked />
      <Switch label="Success" variant="success" checked />
      <Switch label="Error" variant="error" checked />
      <Switch label="Warning" variant="warning" checked />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Switch
          id="interactive-switch"
          label="Toggle me"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          helperText={checked ? 'Currently enabled' : 'Currently disabled'}
        />
        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
          State: {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      newsletter: false,
      updates: true,
      marketing: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
          Notification Settings
        </h3>
        <Switch
          id="notifications"
          label="Push notifications"
          checked={settings.notifications}
          onChange={(e) =>
            setSettings({ ...settings, notifications: e.target.checked })
          }
          helperText="Receive push notifications on your device"
        />
        <Switch
          id="newsletter"
          label="Newsletter"
          checked={settings.newsletter}
          onChange={(e) =>
            setSettings({ ...settings, newsletter: e.target.checked })
          }
          helperText="Receive our weekly newsletter"
        />
        <Switch
          id="updates"
          label="Product updates"
          checked={settings.updates}
          onChange={(e) =>
            setSettings({ ...settings, updates: e.target.checked })
          }
          helperText="Get notified about new features"
        />
        <Switch
          id="marketing"
          label="Marketing emails"
          checked={settings.marketing}
          onChange={(e) =>
            setSettings({ ...settings, marketing: e.target.checked })
          }
          helperText="Receive promotional offers and tips"
        />
      </div>
    );
  },
};

// States showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Normal States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch label="Unchecked" checked={false} />
          <Switch label="Checked" checked={true} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Disabled States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch label="Disabled unchecked" disabled checked={false} />
          <Switch label="Disabled checked" disabled checked={true} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Helper Text
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch
            id="helper1"
            label="With helper"
            helperText="This is helpful information"
          />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Error State
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch
            id="error1"
            label="Required setting"
            error="This setting must be enabled"
          />
        </div>
      </div>
    </div>
  ),
};
