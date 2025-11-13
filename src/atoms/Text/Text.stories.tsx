import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Polymorphic typography component with semantic variants, colors, and text modifiers. Supports all heading levels, body text, captions, and labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'label', 'overline'],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'inherit'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    noWrap: {
      control: 'boolean',
      description: 'Prevent text wrapping',
    },
    ellipsis: {
      control: 'boolean',
      description: 'Show ellipsis for overflow',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the default body text.',
  },
};

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

export const AllHeadings: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Text variant="h1">Heading 1 - Main page title</Text>
      <Text variant="h2" style={{ marginTop: '1rem' }}>
        Heading 2 - Section title
      </Text>
      <Text variant="h3" style={{ marginTop: '1rem' }}>
        Heading 3 - Subsection title
      </Text>
      <Text variant="h4" style={{ marginTop: '1rem' }}>
        Heading 4 - Minor section
      </Text>
      <Text variant="h5" style={{ marginTop: '1rem' }}>
        Heading 5 - Card title
      </Text>
      <Text variant="h6" style={{ marginTop: '1rem' }}>
        Heading 6 - Smallest heading
      </Text>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Text variant="body1">
        Body 1 is the standard body text size. It's perfect for main content,
        paragraphs, and long-form text. The line height is optimized for
        readability.
      </Text>
      <Text variant="body2" style={{ marginTop: '1rem' }}>
        Body 2 is slightly smaller and great for secondary content, descriptions,
        or supporting text that doesn't need as much emphasis.
      </Text>
    </div>
  ),
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is a caption or helper text',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Form Label',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'Overline Text',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text color="primary">Primary color text (default)</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="error">Error color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="info">Info color text</Text>
      <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
        <Text color="inherit" style={{ color: 'white' }}>
          Inherit color (inherits from parent)
        </Text>
      </div>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div style={{ width: '600px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <Text align="left">Left aligned text (default)</Text>
      </div>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <Text align="center">Center aligned text</Text>
      </div>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <Text align="right">Right aligned text</Text>
      </div>
      <div style={{ padding: '1rem' }}>
        <Text align="justify">
          Justified text stretches to fill the width. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua.
        </Text>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const NoWrapText: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px solid #e5e7eb', padding: '1rem' }}>
      <Text noWrap>
        This is a very long text that will not wrap and will overflow the container
      </Text>
    </div>
  ),
};

export const EllipsisText: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px solid #e5e7eb', padding: '1rem' }}>
      <Text ellipsis>
        This is a very long text that will be truncated with an ellipsis
      </Text>
    </div>
  ),
};

export const PolymorphicComponent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text variant="h1" as="div">
        H1 styled div (not semantic h1)
      </Text>
      <Text variant="body1" as="span">
        Body text as inline span
      </Text>
      <Text variant="label" as="label" htmlFor="example">
        Label element with for attribute
      </Text>
    </div>
  ),
};

export const CombinedStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h2" color="primary" weight="bold" align="center">
        Bold Centered Heading
      </Text>
      <Text variant="body1" color="secondary" align="justify">
        Secondary colored justified body text with multiple style combinations
        applied at once.
      </Text>
      <Text variant="caption" color="error" weight="medium">
        Medium weight error caption
      </Text>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Text variant="overline" color="secondary">
        Article
      </Text>
      <Text variant="h2" style={{ marginTop: '0.5rem' }}>
        Understanding Typography in Design
      </Text>
      <Text variant="caption" color="secondary" style={{ marginTop: '0.5rem', display: 'block' }}>
        Published on January 15, 2024 · 5 min read
      </Text>
      <Text variant="body1" style={{ marginTop: '1.5rem' }}>
        Typography is one of the most important aspects of user interface design.
        Good typography makes content readable, scannable, and aesthetically
        pleasing.
      </Text>
      <Text variant="body2" color="secondary" style={{ marginTop: '1rem' }}>
        When choosing fonts and text styles, consider hierarchy, contrast, and
        spacing to create a harmonious reading experience.
      </Text>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'body1',
    color: 'primary',
    align: 'left',
    weight: 'normal',
    noWrap: false,
    ellipsis: false,
    children: 'Customize this text with the controls below',
  },
};
