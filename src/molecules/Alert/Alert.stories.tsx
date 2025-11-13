import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: {
      control: 'text',
    },
    showIcon: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message to keep you updated.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully!',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your settings before proceeding.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This alert includes both a title and a message for better context.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    showIcon: false,
    children: 'This alert is displayed without an icon.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon instead of the default.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} icon={<span style={{ fontSize: '20px' }}>🚀</span>} />
    </div>
  ),
};

export const Closable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <div style={{ maxWidth: '600px' }}>
          <button
            onClick={() => setVisible(true)}
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Alert
          </button>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '600px' }}>
        <Alert
          variant="info"
          title="Dismissible Alert"
          closable
          onClose={() => setVisible(false)}
        >
          Click the close button to dismiss this alert.
        </Alert>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>

      <Alert variant="success" title="Success">
        Your action was completed successfully!
      </Alert>

      <Alert variant="warning" title="Warning">
        Please review this warning carefully.
      </Alert>

      <Alert variant="error" title="Error">
        An error occurred during processing.
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children:
      'This is a much longer alert message that demonstrates how the component handles extensive content. It should wrap properly and maintain good readability even with multiple lines of text. The layout should remain clean and organized regardless of content length.',
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Alert {...args} />
    </div>
  ),
};

export const MultilineContent: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Alert variant="error" title="Validation Errors">
        <p style={{ margin: '0 0 8px 0' }}>Please fix the following issues:</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Email address is required</li>
          <li>Password must be at least 8 characters</li>
          <li>Terms and conditions must be accepted</li>
        </ul>
      </Alert>
    </div>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Alert variant="info" title="Update Available">
        A new version is available.{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 600 }}>
          Update now
        </a>
        {' '}or{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 600 }}>
          learn more
        </a>
        .
      </Alert>
    </div>
  ),
};

export const StackedAlerts: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'success' as const, title: 'Success', message: 'Profile updated successfully' },
      { id: 2, variant: 'warning' as const, title: 'Warning', message: 'Your session will expire in 5 minutes' },
      { id: 3, variant: 'info' as const, title: 'Info', message: 'You have 3 new notifications' },
    ]);

    const handleClose = (id: number) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    return (
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.length === 0 && (
          <button
            onClick={() =>
              setAlerts([
                { id: 1, variant: 'success', title: 'Success', message: 'Profile updated successfully' },
                { id: 2, variant: 'warning', title: 'Warning', message: 'Your session will expire in 5 minutes' },
                { id: 3, variant: 'info', title: 'Info', message: 'You have 3 new notifications' },
              ])
            }
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Reset Alerts
          </button>
        )}

        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            closable
            onClose={() => handleClose(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  },
};

export const AllTitleVariations: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info" title="With Title">
        Message with a title
      </Alert>

      <Alert variant="info">
        Message without a title
      </Alert>

      <Alert variant="success" title="Short">
        Short title
      </Alert>

      <Alert variant="warning" title="This is a Very Long Title That Tests How the Component Handles Extended Title Content">
        Content with a very long title
      </Alert>
    </div>
  ),
};

export const IconVariations: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info" title="Default Icon">
        Alert with default info icon
      </Alert>

      <Alert variant="success" showIcon={false} title="No Icon">
        Alert without any icon
      </Alert>

      <Alert variant="warning" title="Custom Emoji" icon={<span style={{ fontSize: '20px' }}>⚠️</span>}>
        Alert with custom emoji icon
      </Alert>

      <Alert
        variant="error"
        title="Custom SVG"
        icon={
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        }
      >
        Alert with custom SVG icon
      </Alert>
    </div>
  ),
};
