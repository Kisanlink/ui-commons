import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'neutral',
      ],
      description: 'Visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    dot: {
      control: 'boolean',
      description: 'Show a dot indicator before the text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral',
    variant: 'neutral',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Badge',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Badge',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Badge',
    size: 'lg',
  },
};

export const WithDot: Story = {
  args: {
    children: 'Online',
    variant: 'success',
    dot: true,
  },
};

export const WithDotError: Story = {
  args: {
    children: 'Offline',
    variant: 'error',
    dot: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Badge size="sm">Small Badge</Badge>
      <Badge size="md">Medium Badge</Badge>
      <Badge size="lg">Large Badge</Badge>
    </div>
  ),
};

export const WithDotVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Badge variant="primary" dot>Primary</Badge>
      <Badge variant="secondary" dot>Secondary</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="error" dot>Error</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="info" dot>Info</Badge>
      <Badge variant="neutral" dot>Neutral</Badge>
    </div>
  ),
};

export const StatusExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>User Status:</span>
        <Badge variant="success" dot size="sm">Online</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>User Status:</span>
        <Badge variant="warning" dot size="sm">Away</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>User Status:</span>
        <Badge variant="error" dot size="sm">Offline</Badge>
      </div>
    </div>
  ),
};

export const NotificationExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Inbox</span>
        <Badge variant="error" size="sm">12</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Notifications</span>
        <Badge variant="primary" size="sm">3</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Updates</span>
        <Badge variant="info" size="sm">99+</Badge>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Badge Text',
    variant: 'primary',
    size: 'md',
    dot: false,
  },
};
