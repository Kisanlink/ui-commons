import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';
import { Card } from '../Card';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Notifications</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <h3 style={{ marginTop: 0 }}>Account Settings</h3>
        <p>Make changes to your account here. Click save when you're done.</p>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <h3 style={{ marginTop: 0 }}>Password Settings</h3>
        <p>Change your password here. After saving, you'll be logged out.</p>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <h3 style={{ marginTop: 0 }}>Notification Preferences</h3>
        <p>Manage how you receive notifications.</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="underline">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content goes here.</Tabs.Content>
      <Tabs.Content value="analytics">Analytics content goes here.</Tabs.Content>
      <Tabs.Content value="reports">Reports content goes here.</Tabs.Content>
      <Tabs.Content value="settings">Settings content goes here.</Tabs.Content>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="all" variant="pills">
      <Tabs.List>
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        <Tabs.Trigger value="active">Active</Tabs.Trigger>
        <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
        <Tabs.Trigger value="archived">Archived</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="all">All items are displayed here.</Tabs.Content>
      <Tabs.Content value="active">Active items only.</Tabs.Content>
      <Tabs.Content value="pending">Pending items only.</Tabs.Content>
      <Tabs.Content value="archived">Archived items only.</Tabs.Content>
    </Tabs>
  ),
};

export const Solid: Story = {
  render: () => (
    <Tabs defaultValue="code" variant="solid">
      <Tabs.List>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="console">Console</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="code">
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '0.5rem' }}>
          {`function hello() {
  console.log("Hello World");
}`}
        </pre>
      </Tabs.Content>
      <Tabs.Content value="preview">Preview area</Tabs.Content>
      <Tabs.Content value="console">Console output</Tabs.Content>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tabs defaultValue="profile" orientation="vertical" style={{ width: '200px' }}>
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          <Tabs.Trigger value="team">Team</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile">
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <p>Update your profile information.</p>
        </Tabs.Content>
        <Tabs.Content value="security">
          <h3 style={{ marginTop: 0 }}>Security</h3>
          <p>Manage your security settings.</p>
        </Tabs.Content>
        <Tabs.Content value="billing">
          <h3 style={{ marginTop: 0 }}>Billing</h3>
          <p>View and manage billing information.</p>
        </Tabs.Content>
        <Tabs.Content value="team">
          <h3 style={{ marginTop: 0 }}>Team</h3>
          <p>Manage your team members.</p>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');

    return (
      <div>
        <p>Current tab: {value}</p>
        <Button onClick={() => setValue('tab2')} style={{ marginBottom: '1rem' }}>
          Switch to Tab 2
        </Button>
        <Tabs value={value} onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
          <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
          <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
        </Tabs>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="enabled1">
      <Tabs.List>
        <Tabs.Trigger value="enabled1">Enabled</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
        <Tabs.Trigger value="enabled2">Also Enabled</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="enabled1">First enabled tab content.</Tabs.Content>
      <Tabs.Content value="disabled">This content won't be shown.</Tabs.Content>
      <Tabs.Content value="enabled2">Second enabled tab content.</Tabs.Content>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Trigger value="home" icon={<span>🏠</span>}>
          Home
        </Tabs.Trigger>
        <Tabs.Trigger value="messages" icon={<span>✉️</span>}>
          Messages
        </Tabs.Trigger>
        <Tabs.Trigger value="settings" icon={<span>⚙️</span>}>
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="home">Home content</Tabs.Content>
      <Tabs.Content value="messages">Messages content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List style={{ overflowX: 'auto' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Tabs.Trigger key={i + 1} value={`tab${i + 1}`}>
            Tab {i + 1}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {Array.from({ length: 12 }, (_, i) => (
        <Tabs.Content key={i + 1} value={`tab${i + 1}`}>
          Content for Tab {i + 1}
        </Tabs.Content>
      ))}
    </Tabs>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>User Settings</Card.Header>
      <Card.Body>
        <Tabs defaultValue="personal">
          <Tabs.List>
            <Tabs.Trigger value="personal">Personal Info</Tabs.Trigger>
            <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
            <Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="personal">
            <p>Update your personal information here.</p>
          </Tabs.Content>
          <Tabs.Content value="preferences">
            <p>Customize your preferences.</p>
          </Tabs.Content>
          <Tabs.Content value="privacy">
            <p>Manage your privacy settings.</p>
          </Tabs.Content>
        </Tabs>
      </Card.Body>
    </Card>
  ),
};

export const FormWithTabs: Story = {
  render: () => (
    <Tabs defaultValue="basic">
      <Tabs.List>
        <Tabs.Trigger value="basic">Basic Info</Tabs.Trigger>
        <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
        <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="basic">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem' }}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            />
          </div>
        </form>
      </Tabs.Content>
      <Tabs.Content value="contact">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            />
          </div>
        </form>
      </Tabs.Content>
      <Tabs.Content value="preferences">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label htmlFor="language" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Language
            </label>
            <select
              id="language"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </form>
      </Tabs.Content>
    </Tabs>
  ),
};

export const VerticalPills: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tabs defaultValue="dashboard" orientation="vertical" variant="pills" style={{ width: '200px' }}>
        <Tabs.List>
          <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
          <Tabs.Trigger value="products">Products</Tabs.Trigger>
          <Tabs.Trigger value="orders">Orders</Tabs.Trigger>
          <Tabs.Trigger value="customers">Customers</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="dashboard">Dashboard content</Tabs.Content>
        <Tabs.Content value="products">Products content</Tabs.Content>
        <Tabs.Content value="orders">Orders content</Tabs.Content>
        <Tabs.Content value="customers">Customers content</Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        <strong>Try keyboard navigation:</strong>
        <br />
        • Arrow Left/Right: Navigate between tabs (horizontal)
        <br />
        • Arrow Up/Down: Navigate between tabs (vertical)
        <br />
        • Home: Jump to first tab
        <br />
        • End: Jump to last tab
        <br />• Tab key: Focus on tabs
      </p>
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          <Tabs.Trigger value="tab4">Tab 4</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1 - Use arrow keys to navigate!</Tabs.Content>
        <Tabs.Content value="tab2">Content 2 - Try Home and End keys too!</Tabs.Content>
        <Tabs.Content value="tab3">Content 3 - Keyboard navigation works!</Tabs.Content>
        <Tabs.Content value="tab4">Content 4 - Great accessibility!</Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    defaultValue: 'tab1',
    variant: 'underline',
    orientation: 'horizontal',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">First Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Second Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Third Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <p>This is the content for the first tab.</p>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <p>This is the content for the second tab.</p>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <p>This is the content for the third tab.</p>
      </Tabs.Content>
    </Tabs>
  ),
};
