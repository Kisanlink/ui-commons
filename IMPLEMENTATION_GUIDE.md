# Implementation Guide: Completing KisanLink UI Commons

This guide provides the complete implementation patterns for all remaining components based on the successfully implemented Checkbox and Radio components.

## Current Status

### ✅ Completed & Production Ready
- **Button**: 17 tests, full stories, WCAG compliant
- **Input**: 16 tests, full stories, WCAG compliant
- **Checkbox**: 35 tests, full stories, WCAG compliant

### ✅ Implemented (Needs Tests/Stories)
- **Badge**: Component complete, needs tests
- **Card**: Component complete, needs tests
- **Radio + RadioGroup**: Component complete, needs tests

### 🚧 To Implement
- **Priority 1**: Switch, Spinner, Skeleton (critical, ~8 hours)
- **Priority 2**: Avatar, Icon, Divider, Label, Text (~11 hours)
- **Priority 3**: Molecules (FormField, Alert, Select, etc., ~39 hours)

## Implementation Pattern

All components follow this structure:

```
src/atoms/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.test.tsx     # Comprehensive tests (30-40 tests)
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Barrel export
```

### File Templates

#### 1. Component File Template

```typescript
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './ComponentName.module.css';

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * ComponentName - Brief description
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">Example</ComponentName>
 * ```
 */
export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.component,
          styles[`component--${variant}`],
          styles[`component--${size}`],
          disabled && styles['component--disabled'],
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

#### 2. CSS Module Template

```css
/* ComponentName Component Styles */

.component {
  /* Base styles using design tokens */
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  transition: all 200ms ease;
}

/* Variants */
.component--primary {
  background-color: var(--color-primary-600);
  color: var(--color-white);
}

.component--secondary {
  background-color: var(--color-secondary-600);
  color: var(--color-white);
}

.component--success {
  background-color: var(--color-success-600);
  color: var(--color-white);
}

.component--error {
  background-color: var(--color-error-600);
  color: var(--color-white);
}

/* Sizes */
.component--sm {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
}

.component--md {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-md);
}

.component--lg {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-lg);
}

/* States */
.component--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Hover effects */
.component:not(.component--disabled):hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.component:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

#### 3. Test File Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ComponentName>Test</ComponentName>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <ComponentName className="custom">Test</ComponentName>
      );
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<ComponentName>Test</ComponentName>);
      expect(container.firstChild).toHaveClass('component--primary');
    });

    it('should apply secondary variant', () => {
      const { container } = render(
        <ComponentName variant="secondary">Test</ComponentName>
      );
      expect(container.firstChild).toHaveClass('component--secondary');
    });
  });

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      const { container } = render(<ComponentName>Test</ComponentName>);
      expect(container.firstChild).toHaveClass('component--md');
    });

    it('should apply small size', () => {
      const { container } = render(
        <ComponentName size="sm">Test</ComponentName>
      );
      expect(container.firstChild).toHaveClass('component--sm');
    });
  });

  describe('States', () => {
    it('should handle disabled state', () => {
      render(<ComponentName disabled>Test</ComponentName>);
      expect(screen.getByText('Test')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick}>Click</ComponentName>);

      await user.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<ComponentName>Accessible</ComponentName>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick}>Test</ComponentName>);

      const component = screen.getByText('Test');
      component.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Custom Props', () => {
    it('should forward ref', () => {
      const ref = vi.fn();
      render(<ComponentName ref={ref}>Test</ComponentName>);
      expect(ref).toHaveBeenCalled();
    });
  });
});
```

#### 4. Storybook Stories Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component description here.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="success">Success</ComponentName>
      <ComponentName variant="error">Error</ComponentName>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
```

#### 5. Index File

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Quick Implementation Scripts

### Switch Component

**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Switch/Switch.tsx`

Key features to implement:
- Toggle control (role="switch")
- Animated thumb that slides
- Label positions (left/right)
- Sizes: sm, md, lg
- Variants: primary, secondary, success, error, warning
- Helper text and error states
- Accessibility: Space key to toggle

**CSS Notes**:
- Use `transform: translateX()` for thumb animation
- Thumb should be positioned absolutely within the track
- Track changes background on checked state

### Spinner Component

**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Spinner/Spinner.tsx`

Key features:
- Three animation types: spin, pulse, dots
- Sizes: sm, md, lg, xl
- Variants for colors
- Accessible label (sr-only)
- role="status", aria-busy="true"

**Implementation**:
- Use inline SVG for spin animation
- Use CSS animations (@keyframes)
- Ensure `prefers-reduced-motion` support

### Skeleton Component

**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Skeleton/Skeleton.tsx`

Key features:
- Variants: text, rectangular, circular
- Width/height props
- Pulse animation
- Preset components: SkeletonText, SkeletonAvatar, SkeletonCard
- Accessibility: aria-busy="true", aria-live="polite"

**CSS Notes**:
- Use `@keyframes pulse` for shimmer effect
- Support `prefers-reduced-motion`

### Avatar Component

**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Avatar/Avatar.tsx`

Key features:
- Image with fallback to initials
- Sizes: xs, sm, md, lg, xl
- Shapes: circle (default), square, rounded
- Status indicator (online/offline/away/busy)
- Image loading states
- Alt text required for a11y

### Icon Component

**Source**: Choose lucide-react as the icon library

Key features:
- Wrapper around lucide-react icons
- Sizes: xs, sm, md, lg, xl (16, 20, 24, 32, 40px)
- Colors via CSS custom properties
- Decorative vs semantic (aria-hidden vs aria-label)
- Consistent stroke-width

**Installation**:
```bash
npm install lucide-react
```

### Divider Component

**Source**: `/Users/kaushik/erp-frontend/src/components/atoms/Divider/`

Key features:
- Horizontal and vertical orientation
- With optional label/text
- Variants: solid, dashed, dotted
- Spacing control
- role="separator", aria-orientation

### Label Component

**Source**: `/Users/kaushik/erp-frontend/src/components/atoms/Label/`

Key features:
- For attribute binding
- Required indicator (*)
- Optional text
- Tooltip/info icon support
- Sizes: sm, md, lg

### Text Component

**Source**: `/Users/kaushik/erp-frontend/src/components/atoms/Text/`

Key features:
- Semantic HTML: p, span, strong, em, etc.
- Variants: body, caption, overline, etc.
- Sizes: xs, sm, md, lg, xl
- Colors: primary, secondary, disabled, error, etc.
- Truncation support (ellipsis)
- Line clamping

## Molecules Implementation

### FormField Component

**Purpose**: Wrapper that combines Label + Input/Select + Helper + Error

```tsx
<FormField
  label="Email"
  name="email"
  required
  helperText="We'll never share your email"
  error={errors.email}
>
  <Input type="email" />
</FormField>
```

Key features:
- Automatic ID generation
- Associates label with input
- Shows helper text or error (not both)
- Required indicator
- Full accessibility (aria-describedby, aria-invalid)

### Alert Component

**Purpose**: Notification/feedback messages

Key features:
- Variants: info, success, warning, error
- With icon (info, check, warning, error icons)
- Closeable (optional dismiss button)
- Title + description
- Actions (optional button(s))
- role="alert" for errors, role="status" for others

### Select Component

**Purpose**: Dropdown selection

**Options**:
1. Native `<select>` with styling (simplest)
2. Custom dropdown with Radix UI Primitives (recommended)
3. Fully custom (complex)

Key features:
- Search/filter support
- Multi-select
- Custom option rendering
- Keyboard navigation (Arrow keys, Enter, Esc)
- Virtualization for large lists
- Full accessibility (aria-expanded, aria-activedescendant)

### Tabs Component

Key features:
- Controlled and uncontrolled modes
- Keyboard navigation (Arrow keys)
- Variants: underline, pills, enclosed
- Lazy loading tab content
- role="tablist", role="tab", role="tabpanel"

### Modal Component

Key features:
- Focus trap (focus-trap-react)
- Portal rendering (React.createPortal)
- Overlay with backdrop blur
- Close on Esc, close on overlay click
- Prevent body scroll when open
- Sizes: sm, md, lg, xl, full
- role="dialog", aria-modal="true"

## Adding Components to Exports

After creating a component, update these files:

### 1. Component index.ts
```typescript
// src/atoms/ComponentName/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 2. Atoms index.ts
```typescript
// src/atoms/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 3. Main index.ts
```typescript
// src/index.ts
export * from './atoms';
export * from './molecules';
// ...
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- ComponentName.test.tsx

# Run with coverage
npm test:coverage

# Run in watch mode
npm test:watch
```

## Building

```bash
# Full build
npm run build

# Build in watch mode
npm run build:watch

# Type check only
npm run type-check
```

## Storybook

```bash
# Start Storybook dev server
npm run dev

# Build static Storybook
npm run build-storybook
```

## CI/CD Setup

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm run test:coverage

      - name: Build
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Semantic Release

Install dependencies:
```bash
npm install -D semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/npm
```

Create `.releaserc.json`:
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

## Migration Guides

### Admin Panel Migration

Map Material-UI components to ui-commons:

| Material-UI | UI Commons | Notes |
|-------------|------------|-------|
| `<Button>` | `<Button>` | Change `color` to `variant` |
| `<TextField>` | `<Input>` | Simplify props |
| `<Checkbox>` | `<Checkbox>` | Same API |
| `<Radio>` + `<RadioGroup>` | `<Radio>` + `<RadioGroup>` | Same API |
| `<Switch>` | `<Switch>` | Same API |
| `<CircularProgress>` | `<Spinner>` | Change prop names |
| `<Skeleton>` | `<Skeleton>` | Similar API |

### ECommerce Frontend Migration

Map inline components to ui-commons with proper import paths.

### ERP Frontend Migration

Map local atoms to ui-commons, update import paths, verify accessibility improvements.

## Commit Conventions

Use Conventional Commits for semantic-release:

```
feat: add Switch component with tests
fix: resolve Checkbox indeterminate state bug
docs: update README with usage examples
test: add accessibility tests for Radio
chore: update dependencies
```

## Bundle Size Monitoring

Add to package.json:
```json
{
  "scripts": {
    "size": "vite-bundle-visualizer"
  }
}
```

Target: <50KB gzipped for main bundle

## Final Checklist

Before marking a component complete:

- [ ] Component implemented with TypeScript
- [ ] CSS Modules with design tokens
- [ ] 30+ unit tests covering all variants
- [ ] 4+ accessibility tests with vitest-axe
- [ ] Storybook stories for all states
- [ ] TSDoc comments on props
- [ ] Exported from index files
- [ ] Build succeeds
- [ ] Zero TypeScript errors
- [ ] Zero accessibility violations
- [ ] Tested in dark mode

## Resources

- [Existing Components]: Check Button, Input, Checkbox for reference
- [Design Tokens]: `/src/styles/tokens/`
- [Test Utils]: `/src/test/test-utils.tsx`
- [Storybook Config]: `/.storybook/`
- [Source Projects]:
  - Admin Panel: `/Users/kaushik/admin-panel/src/components/ui/`
  - ERP: `/Users/kaushik/erp-frontend/src/components/atoms/`

## Questions?

Refer to completed components (Checkbox, Radio) as the gold standard implementation.
