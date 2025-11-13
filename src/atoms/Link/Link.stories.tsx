import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default link',
  },
};

export const Subtle: Story = {
  args: {
    href: '#',
    variant: 'subtle',
    children: 'Subtle link',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    variant: 'primary',
    children: 'Primary link',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'External link',
  },
};

export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true,
    children: 'Disabled link',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="subtle">Subtle link</Link>
      <Link href="#" variant="primary">Primary link</Link>
      <Link href="https://example.com" external>External link</Link>
      <Link href="#" disabled>Disabled link</Link>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <p style={{ maxWidth: '400px' }}>
      This is a paragraph with an <Link href="#">inline link</Link> and another{' '}
      <Link href="https://example.com" external>external link</Link> within the text flow.
    </p>
  ),
};
