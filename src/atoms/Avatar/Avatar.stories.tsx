import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Jane Smith',
  },
};

export const CustomInitials: Story = {
  args: {
    initials: 'AB',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'John Doe',
    status: 'online',
    showStatus: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Avatar name="PR" variant="primary" />
      <Avatar name="SC" variant="secondary" />
      <Avatar name="SU" variant="success" />
      <Avatar name="ER" variant="error" />
      <Avatar name="WA" variant="warning" />
      <Avatar name="IN" variant="info" />
      <Avatar name="NE" variant="neutral" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John" status="online" showStatus />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Online</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Jane" status="offline" showStatus />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Offline</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Bob" status="busy" showStatus />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Busy</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Alice" status="away" showStatus />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Away</p>
      </div>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
      <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=5" />
      <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=8" />
      <Avatar name="Alice Williams" />
    </AvatarGroup>
  ),
};

export const GroupWithOverflow: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="User 1" />
      <Avatar name="User 2" />
      <Avatar name="User 3" />
      <Avatar name="User 4" />
      <Avatar name="User 5" />
      <Avatar name="User 6" />
    </AvatarGroup>
  ),
};

export const SquareShape: Story = {
  args: {
    name: 'JD',
    shape: 'square',
  },
};
