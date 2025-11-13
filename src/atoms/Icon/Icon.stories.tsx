import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon component wrapper around lucide-react with size variants and color support. Provides access to 1000+ high-quality icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the icon from lucide-react',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the icon',
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the icon is decorative (aria-hidden)',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Check',
  },
};

export const ExtraSmall: Story = {
  args: {
    name: 'Heart',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    name: 'Heart',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    name: 'Heart',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    name: 'Heart',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'Heart',
    size: 'xl',
  },
};

export const ExtraExtraLarge: Story = {
  args: {
    name: 'Heart',
    size: '2xl',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'Star',
    size: 64,
  },
};

export const WithColor: Story = {
  args: {
    name: 'Heart',
    size: 'xl',
    color: '#ef4444',
  },
};

export const MultipleColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="Heart" size="xl" color="#ef4444" />
      <Icon name="Star" size="xl" color="#f59e0b" />
      <Icon name="CheckCircle" size="xl" color="#10b981" />
      <Icon name="Info" size="xl" color="#3b82f6" />
      <Icon name="AlertCircle" size="xl" color="#8b5cf6" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="xs" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>XS (12px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="sm" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>SM (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="md" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>MD (20px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="lg" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>LG (24px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="xl" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>XL (32px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Star" size="2xl" />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>2XL (40px)</div>
      </div>
    </div>
  ),
};

const commonIcons: IconName[] = [
  // Actions
  'Check', 'X', 'Plus', 'Minus', 'Edit', 'Trash2', 'Save', 'Copy',
  // Navigation
  'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight',
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
  // Status
  'AlertCircle', 'AlertTriangle', 'Info', 'CheckCircle', 'XCircle',
  // UI
  'Search', 'Menu', 'MoreVertical', 'MoreHorizontal', 'Settings',
  'Filter', 'Eye', 'EyeOff',
  // Content
  'Download', 'Upload', 'ExternalLink', 'Link', 'Share2',
  'FileText', 'Image', 'File', 'Folder',
  // User
  'User', 'Users', 'Mail', 'Phone', 'MapPin', 'Home',
  // Time
  'Calendar', 'Clock',
  // Social
  'Heart', 'Star', 'Bell',
  // Sorting
  'SortAsc', 'SortDesc',
  // Loading
  'Loader2', 'RefreshCw',
  // Auth
  'LogIn', 'LogOut',
];

export const IconGallery: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Common Icons</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '1rem',
        }}
      >
        {commonIcons.map((iconName) => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <Icon name={iconName} size="lg" />
            <div
              style={{
                fontSize: '11px',
                marginTop: '0.5rem',
                textAlign: 'center',
                wordBreak: 'break-word',
              }}
            >
              {iconName}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="CheckCircle" size="sm" color="#10b981" />
        <span>Success message</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="AlertCircle" size="sm" color="#ef4444" />
        <span>Error message</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="Info" size="sm" color="#3b82f6" />
        <span>Info message</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="AlertTriangle" size="sm" color="#f59e0b" />
        <span>Warning message</span>
      </div>
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon name="Download" size="sm" />
        Download
      </button>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon name="Save" size="sm" />
        Save
      </button>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon name="Trash2" size="sm" />
        Delete
      </button>
    </div>
  ),
};

export const CustomStrokeWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Heart" size="xl" strokeWidth={1} />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>Thin (1)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Heart" size="xl" strokeWidth={2} />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>Regular (2)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="Heart" size="xl" strokeWidth={3} />
        <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>Bold (3)</div>
      </div>
    </div>
  ),
};

export const DecorativeIcons: Story = {
  render: () => (
    <div>
      <p>
        Icons marked as decorative (decorative=true) have aria-hidden="true" and are
        ignored by screen readers:
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Icon name="Heart" size="lg" decorative />
        <Icon name="Star" size="lg" decorative />
        <Icon name="Bell" size="lg" decorative />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    name: 'Heart',
    size: 'lg',
    color: '#ef4444',
    decorative: false,
  },
};
