import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const TopPlacement: Story = {
  render: () => (
    <Tooltip content="Tooltip on top" placement="top">
      <Button>Top</Button>
    </Tooltip>
  ),
};

export const BottomPlacement: Story = {
  render: () => (
    <Tooltip content="Tooltip on bottom" placement="bottom">
      <Button>Bottom</Button>
    </Tooltip>
  ),
};

export const LeftPlacement: Story = {
  render: () => (
    <Tooltip content="Tooltip on left" placement="left">
      <Button>Left</Button>
    </Tooltip>
  ),
};

export const RightPlacement: Story = {
  render: () => (
    <Tooltip content="Tooltip on right" placement="right">
      <Button>Right</Button>
    </Tooltip>
  ),
};

export const AutoPlacement: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="This tooltip will find the best position automatically" placement="auto">
        <Button>Auto Placement</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        padding: '4rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Tooltip content="Top placement" placement="top">
          <Button>Top</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip content="Bottom placement" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip content="Left placement" placement="left">
          <Button>Left</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip content="Right placement" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip content="Auto placement" placement="auto">
          <Button>Auto</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip content="Tooltip with arrow" showArrow>
      <Button>With Arrow</Button>
    </Tooltip>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Tooltip content="Tooltip without arrow" showArrow={false}>
      <Button>Without Arrow</Button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a much longer tooltip content that will wrap to multiple lines when displayed. It demonstrates how the tooltip handles longer text.">
      <Button>Long Content</Button>
    </Tooltip>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Rich Content</strong>
          <p style={{ margin: 0 }}>Tooltips can contain any React nodes, not just text.</p>
        </div>
      }
    >
      <Button>Rich Content</Button>
    </Tooltip>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="No delay" delay={0}>
        <Button>No Delay</Button>
      </Tooltip>
      <Tooltip content="Default delay (200ms)">
        <Button>Default (200ms)</Button>
      </Tooltip>
      <Tooltip content="Long delay (1000ms)" delay={1000}>
        <Button>Long Delay (1s)</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="This tooltip is enabled">
        <Button>Enabled</Button>
      </Tooltip>
      <Tooltip content="This won't show" disabled>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const OnButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Primary action">
        <Button variant="primary">Primary</Button>
      </Tooltip>
      <Tooltip content="Secondary action">
        <Button variant="secondary">Secondary</Button>
      </Tooltip>
      <Tooltip content="Danger action">
        <Button variant="danger">Danger</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Tooltip content="Help">
        <span
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
          }}
        >
          ?
        </span>
      </Tooltip>
      <Tooltip content="Settings">
        <span
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
          }}
        >
          ⚙
        </span>
      </Tooltip>
      <Tooltip content="Notifications">
        <span
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
          }}
        >
          🔔
        </span>
      </Tooltip>
    </div>
  ),
};

export const OnLink: Story = {
  render: () => (
    <p>
      This is a paragraph with a{' '}
      <Tooltip content="Click to learn more">
        <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
          link
        </a>
      </Tooltip>{' '}
      that has a tooltip.
    </p>
  ),
};

export const InDifferentPositions: Story = {
  render: () => (
    <div style={{ padding: '4rem', minHeight: '400px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
        <Tooltip content="Top of page" placement="bottom">
          <Button size="sm">Top</Button>
        </Tooltip>
      </div>
      <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
        <Tooltip content="Bottom of page" placement="top">
          <Button size="sm">Bottom</Button>
        </Tooltip>
      </div>
      <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
        <Tooltip content="Left side" placement="right">
          <Button size="sm">Left</Button>
        </Tooltip>
      </div>
      <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
        <Tooltip content="Right side" placement="left">
          <Button size="sm">Right</Button>
        </Tooltip>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Tooltip content="Center">
          <Button>Center</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        <strong>Try keyboard navigation:</strong>
        <br />
        • Tab to focus the button
        <br />
        • Tooltip will appear on focus
        <br />• Press Escape to hide the tooltip
      </p>
      <Tooltip content="I appear on focus too!">
        <Button>Focus me with Tab</Button>
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Tooltip key={i} content={`Tooltip ${i + 1}`}>
          <Button size="sm">Button {i + 1}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: {
    content: 'Tooltip content',
    placement: 'top',
    delay: 200,
    offset: 8,
    showArrow: true,
    disabled: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover or focus me</Button>
    </Tooltip>
  ),
};
