import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 200,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    width: 300,
    height: 200,
  },
};

export const Avatar: Story = {
  render: () => (
    <Skeleton variant="circular" width={48} height={48} />
  ),
};

export const TextLines: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Skeleton variant="circular" width={56} height={56} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} style={{ marginBottom: '0.75rem' }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="65%" />
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Skeleton variant="rectangular" height={300} style={{ marginBottom: '1.5rem' }} />
      <Skeleton variant="text" width="80%" height={32} style={{ marginBottom: '1rem' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="98%" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
};

export const ProductGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '1rem' }}>
          <Skeleton variant="rectangular" height={150} style={{ marginBottom: '0.75rem' }} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="70%" />
        </div>
      ))}
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #E5E7EB' }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Text</h4>
        <Skeleton variant="text" width={300} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Rectangular</h4>
        <Skeleton variant="rectangular" width={300} height={150} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Circular</h4>
        <Skeleton variant="circular" width={60} height={60} />
      </div>
    </div>
  ),
};

export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Pulse</h4>
        <Skeleton animation="pulse" width={200} height={150} />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Wave</h4>
        <Skeleton animation="wave" width={200} height={150} />
      </div>
    </div>
  ),
};
