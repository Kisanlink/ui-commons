import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/atoms/Button';

import { EmptyState } from './EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'No data found',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <EmptyState {...args} />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <EmptyState {...args} />
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <EmptyState
        {...args}
        action={<Button>Create Item</Button>}
      />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    title: 'No notifications',
    description: 'You\'re all caught up!',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <EmptyState
        {...args}
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            🔔
          </div>
        }
      />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    title: 'No comments',
    description: 'Be the first to comment',
    size: 'sm',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <EmptyState
        {...args}
        action={<Button size="sm">Add Comment</Button>}
      />
    </div>
  ),
};

export const LargeSize: Story = {
  args: {
    title: 'Welcome to your dashboard',
    description: 'Start by adding your first project to get insights and analytics.',
    size: 'lg',
  },
  render: (args) => (
    <div style={{ width: '800px' }}>
      <EmptyState
        {...args}
        action={<Button size="lg">Create Project</Button>}
      />
    </div>
  ),
};

export const NoSearchResults: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="No results found"
        description="We couldn't find any matches for your search. Try different keywords or clear your filters."
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            🔍
          </div>
        }
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary">Clear Filters</Button>
            <Button>Try Again</Button>
          </div>
        }
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="Unable to load data"
        description="An error occurred while loading the data. Please try again later or contact support if the problem persists."
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            ⚠️
          </div>
        }
        action={<Button>Retry</Button>}
      />
    </div>
  ),
};

export const EmptyInbox: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="Inbox Zero!"
        description="You've read all your messages. Take a break or start a new conversation."
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            ✉️
          </div>
        }
      />
    </div>
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet. Browse our products to get started."
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            🛒
          </div>
        }
        action={<Button>Start Shopping</Button>}
      />
    </div>
  ),
};

export const NoFavorites: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="No favorites yet"
        description="Save your favorite items here for quick access later."
        icon={
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            ❤️
          </div>
        }
        action={<Button>Browse Items</Button>}
      />
    </div>
  ),
};

export const ComingSoon: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="Coming Soon"
        description="This feature is currently under development. Check back soon for updates!"
        size="lg"
        icon={
          <div style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
          }}>
            🚀
          </div>
        }
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '800px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>Small</h4>
        <EmptyState
          size="sm"
          title="No data"
          description="Small empty state"
          action={<Button size="sm">Action</Button>}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>Medium (Default)</h4>
        <EmptyState
          size="md"
          title="No data"
          description="Medium empty state"
          action={<Button>Action</Button>}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>Large</h4>
        <EmptyState
          size="lg"
          title="No data"
          description="Large empty state"
          action={<Button size="lg">Action</Button>}
        />
      </div>
    </div>
  ),
};

export const InContainer: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        height: '400px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EmptyState
        title="No items to display"
        description="This list is currently empty"
        action={<Button>Add Item</Button>}
      />
    </div>
  ),
};

export const WithLinkAction: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <EmptyState
        title="No projects found"
        description="Start by creating a new project or import an existing one."
        action={
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button>Create Project</Button>
            <a
              href="#"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Learn more
            </a>
          </div>
        }
      />
    </div>
  ),
};
