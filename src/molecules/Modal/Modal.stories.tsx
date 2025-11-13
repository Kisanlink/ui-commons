import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible modal dialog with portal rendering, focus management, and keyboard navigation. WCAG 2.1 AA compliant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size variant',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking overlay closes modal',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether pressing Escape closes modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Modal Title',
    children: <p>This is the modal content. You can add any content here.</p>,
  },
};

export const Small: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: <p>This is a small modal with limited width.</p>,
  },
};

export const Medium: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Medium Modal',
    size: 'md',
    children: <p>This is a medium-sized modal (default size).</p>,
  },
};

export const Large: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p>This is a large modal with more space for content.</p>
        <p>
          You can display more detailed information, forms, or complex layouts in
          this modal size.
        </p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Extra Large Modal',
    size: 'xl',
    children: (
      <div>
        <p>This is an extra large modal with even more space.</p>
        <p>Perfect for detailed forms, tables, or complex content structures.</p>
      </div>
    ),
  },
};

export const FullScreen: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Full Screen Modal',
    size: 'full',
    children: (
      <div>
        <p>This modal takes up almost the entire screen.</p>
        <p>Ideal for immersive experiences or complex workflows.</p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Modal with Footer',
    children: <p>This modal has action buttons in the footer.</p>,
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </>
    ),
  },
};

export const ConfirmationDialog: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    size: 'sm',
    children: (
      <p>
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </>
    ),
  },
};

export const FormModal: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Create New Item',
    children: (
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="description"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter description"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
            }}
          />
        </div>
      </form>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Create</Button>
      </>
    ),
  },
};

export const LongContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Terms and Conditions',
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    ),
    footer: (
      <>
        <Button variant="outline">Decline</Button>
        <Button variant="primary">Accept</Button>
      </>
    ),
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Important Notice',
    showCloseButton: false,
    closeOnOverlayClick: false,
    closeOnEsc: false,
    children: (
      <p>
        This modal requires explicit action. You must click one of the buttons
        below to proceed.
      </p>
    ),
    footer: (
      <>
        <Button variant="outline">Not Now</Button>
        <Button variant="primary">Continue</Button>
      </>
    ),
  },
};

export const NoOverlayClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'No Overlay Close',
    closeOnOverlayClick: false,
    children: (
      <p>
        Clicking outside this modal will not close it. Use the close button or
        press Escape.
      </p>
    ),
  },
};

export const NoEscapeClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'No Escape Close',
    closeOnEsc: false,
    children: (
      <p>
        Pressing the Escape key will not close this modal. Use the close button or
        click outside.
      </p>
    ),
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    'aria-label': 'Notification modal',
    children: (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
          }}
        >
          ✓
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>Success!</h3>
        <p>Your changes have been saved successfully.</p>
      </div>
    ),
  },
};

export const NestedContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Nested Content',
    size: 'lg',
    children: (
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Section 1</h3>
        <p style={{ marginBottom: '1rem' }}>
          This modal contains multiple sections with different types of content.
        </p>

        <h3 style={{ marginBottom: '1rem' }}>Section 2</h3>
        <ul style={{ marginBottom: '1rem' }}>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>

        <h3 style={{ marginBottom: '1rem' }}>Section 3</h3>
        <p>
          You can organize complex content in a structured way using proper HTML
          semantics.
        </p>
      </div>
    ),
    footer: <Button variant="primary">Got it</Button>,
  },
};

export const CompositionAPI: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalHeader onClose={() => setIsOpen(false)}>
              Using Composition
            </ModalHeader>
            <ModalBody>
              <p>
                This modal uses the composition API with separate ModalHeader,
                ModalBody, and ModalFooter components.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </>
    );
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setFirstOpen(true)}>Open First Modal</Button>

        <Modal
          isOpen={firstOpen}
          onClose={() => setFirstOpen(false)}
          title="First Modal"
        >
          <p>This is the first modal.</p>
          <Button
            onClick={() => setSecondOpen(true)}
            style={{ marginTop: '1rem' }}
          >
            Open Second Modal
          </Button>
        </Modal>

        <Modal
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          title="Second Modal"
          size="sm"
        >
          <p>This is a second modal opened from the first one.</p>
        </Modal>
      </>
    );
  },
};

export const Playground: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Interactive Playground',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    children: (
      <div>
        <p>
          Use the controls below to customize the modal behavior and appearance.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Try different sizes, toggle close options, and test the accessibility
          features with keyboard navigation.
        </p>
      </div>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Apply</Button>
      </>
    ),
  },
};
