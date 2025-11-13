import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Visual style variant of the card',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card has hover effects for interaction',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Body>
        This is a default card with simple content.
      </Card.Body>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Body>
        This card has an outlined variant with a border.
      </Card.Body>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Body>
        This card has an elevated variant with shadow.
      </Card.Body>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Card Title</h3>
      </Card.Header>
      <Card.Body>
        This card has a header section with a title.
      </Card.Body>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <Card.Body>
        This card has a footer section with actions.
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

export const CompleteCard: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Complete Card</h3>
      </Card.Header>
      <Card.Body>
        This card demonstrates all three sections: header, body, and footer working together.
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card clickable onClick={() => alert('Card clicked!')}>
      <Card.Body>
        This card is clickable. Hover over it to see the effect.
      </Card.Body>
    </Card>
  ),
};

export const ClickableWithContent: Story = {
  render: () => (
    <Card clickable onClick={() => alert('Card clicked!')}>
      <Card.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Clickable Card</h3>
          <Badge variant="info" size="sm">New</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        Click anywhere on this card to trigger an action. The entire card is interactive.
      </Card.Body>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '320px' }}>
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: '1.25rem'
          }}>
            JD
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>John Doe</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Software Engineer</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: 0, lineHeight: 1.5, color: '#444' }}>
          Full-stack developer with 5 years of experience in building scalable web applications.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Badge variant="primary" size="sm">React</Badge>
          <Badge variant="success" size="sm">Node.js</Badge>
          <Badge variant="info" size="sm">TypeScript</Badge>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button fullWidth size="sm">View Profile</Button>
      </Card.Footer>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="outlined" clickable style={{ width: '280px' }}>
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem'
      }}>
        📦
      </div>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Premium Package</h3>
          <Badge variant="success" size="sm">In Stock</Badge>
        </div>
        <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.875rem' }}>
          High-quality product with excellent features and warranty.
        </p>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333', marginTop: '0.75rem' }}>
          $99.99
        </div>
      </Card.Body>
      <Card.Footer>
        <Button fullWidth>Add to Cart</Button>
      </Card.Footer>
    </Card>
  ),
};

export const StatisticsCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '240px' }}>
      <Card.Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Total Revenue</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>$45,231</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>↑ 12.5%</span>
            <span style={{ fontSize: '0.75rem', color: '#666' }}>from last month</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card clickable style={{ width: '360px' }}>
      <Card.Body>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            flexShrink: 0
          }}>
            🔔
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600 }}>New Update Available</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: 1.4 }}>
              Version 2.0 is now available with new features and improvements.
            </p>
            <span style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem', display: 'block' }}>
              2 hours ago
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default</h3>
        <Card>
          <Card.Body>Default card variant with no border or shadow.</Card.Body>
        </Card>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Outlined</h3>
        <Card variant="outlined">
          <Card.Body>Outlined card variant with border.</Card.Body>
        </Card>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Elevated</h3>
        <Card variant="elevated">
          <Card.Body>Elevated card variant with shadow.</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'default',
    clickable: false,
    children: (
      <>
        <Card.Header>
          <h3 style={{ margin: 0 }}>Card Title</h3>
        </Card.Header>
        <Card.Body>
          Card content goes here. You can customize the variant and clickable props in the controls.
        </Card.Body>
        <Card.Footer>
          <Button size="sm">Action</Button>
        </Card.Footer>
      </>
    ),
  },
};
