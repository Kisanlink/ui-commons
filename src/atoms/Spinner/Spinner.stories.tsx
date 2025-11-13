import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral', 'white'],
      description: 'Color variant of the spinner',
    },
    animation: {
      control: 'select',
      options: ['spin', 'pulse', 'dots'],
      description: 'Animation type',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Animations
export const SpinAnimation: Story = {
  args: {
    animation: 'spin',
  },
};

export const PulseAnimation: Story = {
  args: {
    animation: 'pulse',
  },
};

export const DotsAnimation: Story = {
  args: {
    animation: 'dots',
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="sm" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Small
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="md" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Medium
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Large
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="xl" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Extra Large
        </p>
      </div>
    </div>
  ),
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="primary" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Primary
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="secondary" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Secondary
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="success" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Success
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="error" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Error
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="warning" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Warning
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="info" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Info
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="neutral" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Neutral
        </p>
      </div>
    </div>
  ),
};

// All animations comparison
export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="spin" size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Spin
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="pulse" size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Pulse
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="dots" size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
          Dots
        </p>
      </div>
    </div>
  ),
};

// In context examples
export const InButton: Story = {
  render: () => (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#3B82F6',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'not-allowed',
      }}
      disabled
    >
      <Spinner size="sm" variant="white" />
      Loading...
    </button>
  ),
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '3rem',
        backgroundColor: 'white',
        border: '1px solid #E5E7EB',
        borderRadius: '0.5rem',
        textAlign: 'center',
      }}
    >
      <Spinner size="lg" variant="primary" />
      <p style={{ marginTop: '1rem', color: '#6B7280', fontSize: '0.875rem' }}>
        Loading your data...
      </p>
    </div>
  ),
};

export const FullPageLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '600px',
        backgroundColor: '#F9FAFB',
      }}
    >
      <Spinner size="xl" variant="primary" />
      <h3 style={{ marginTop: '1.5rem', fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
        Loading Application
      </h3>
      <p style={{ marginTop: '0.5rem', color: '#6B7280', fontSize: '0.875rem' }}>
        Please wait while we fetch your content...
      </p>
    </div>
  ),
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Loading user profile data',
    size: 'lg',
  },
};

export const DotsVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Spinner animation="dots" size="sm" variant="primary" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Small dots</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Spinner animation="dots" size="md" variant="success" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Medium dots</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Spinner animation="dots" size="lg" variant="error" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Large dots</span>
      </div>
    </div>
  ),
};
