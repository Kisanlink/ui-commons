# Documentation & Migration Strategy

## Component Documentation Standards

### Documentation Structure

Each component must include:

1. **README.md** - Overview and quick start
2. **API Reference** - Auto-generated from TSDoc
3. **Storybook Stories** - Interactive examples
4. **Usage Guidelines** - Best practices and patterns
5. **Accessibility Notes** - WCAG compliance details
6. **Migration Guide** - Breaking changes and upgrades

---

## TSDoc Comment Standards

### Component Documentation

```typescript
/**
 * A versatile button component supporting multiple variants, sizes, and states.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 *
 * @example
 * With icons:
 * ```tsx
 * <Button leftIcon={<IconPlus />} variant="secondary">
 *   Add Item
 * </Button>
 * ```
 *
 * @example
 * Loading state:
 * ```tsx
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * ```
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button.
   *
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';

  /**
   * Size of the button affecting padding and font size.
   *
   * - `sm`: Compact size for tight spaces (height: 32px)
   * - `md`: Standard size for most use cases (height: 40px)
   * - `lg`: Large size for emphasis (height: 48px)
   *
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button should take full width of its container.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Displays a loading spinner and disables interaction.
   * When true, the button shows a spinner and becomes non-interactive.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display before the button text.
   *
   * @example
   * ```tsx
   * <Button leftIcon={<IconDownload />}>Download</Button>
   * ```
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text.
   *
   * @example
   * ```tsx
   * <Button rightIcon={<IconArrowRight />}>Continue</Button>
   * ```
   */
  rightIcon?: React.ReactNode;

  /**
   * Polymorphic prop to render as a different element.
   *
   * @example
   * Render as a link:
   * ```tsx
   * <Button as="a" href="/page">Link Button</Button>
   * ```
   *
   * @example
   * With React Router:
   * ```tsx
   * <Button as={Link} to="/page">Router Link</Button>
   * ```
   */
  as?: React.ElementType;
}

/**
 * Primary button component for user interactions.
 *
 * Supports multiple variants, sizes, loading states, and can be polymorphic
 * to render as different HTML elements or React components.
 *
 * @see {@link https://kisanlink-ui.com/components/button | Button Documentation}
 *
 * @accessibility
 * - Keyboard navigable with Tab
 * - Activates with Enter or Space
 * - Announces loading state to screen readers
 * - Visible focus indicator meets WCAG 2.1 AA
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      as: Component = 'button',
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Implementation
  }
);

Button.displayName = 'Button';
```

---

## Storybook Stories Structure

### Story File Organization

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconPlus, IconArrowRight, IconDownload } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Primary button component for user interactions. Supports multiple variants, sizes, and loading states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size affecting padding and font',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner and disable',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Default/Primary story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// 2. All variants showcase
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// 3. All sizes showcase
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// 4. With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button leftIcon={<IconPlus />}>Add Item</Button>
      <Button rightIcon={<IconArrowRight />}>Continue</Button>
      <Button leftIcon={<IconDownload />} rightIcon={<IconArrowRight />}>
        Download Report
      </Button>
    </div>
  ),
};

// 5. Loading states
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button loading>Loading</Button>
      <Button loading variant="secondary">Processing</Button>
      <Button loading variant="ghost">Submitting</Button>
    </div>
  ),
};

// 6. Disabled states
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button disabled>Disabled Primary</Button>
      <Button disabled variant="secondary">Disabled Secondary</Button>
      <Button disabled variant="ghost">Disabled Ghost</Button>
    </div>
  ),
};

// 7. Full width
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

// 8. As link (polymorphic)
export const AsLink: Story = {
  render: () => (
    <Button as="a" href="https://example.com" target="_blank">
      External Link
    </Button>
  ),
};

// 9. Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button aria-label="Close dialog">
        <IconX />
      </Button>
      <Button aria-pressed={true}>Toggle Active</Button>
      <Button aria-pressed={false}>Toggle Inactive</Button>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

// 10. Dark mode showcase
export const DarkMode: Story = {
  render: () => (
    <>
      <div data-theme="light" style={{ padding: '2rem', background: 'white' }}>
        <h3>Light Mode</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div data-theme="dark" style={{ padding: '2rem', background: '#0c0a09' }}>
        <h3 style={{ color: 'white' }}>Dark Mode</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
    </>
  ),
};
```

---

## Usage Guidelines Documentation

### Component Usage Guide Template

```markdown
# Button Component

## Overview
The Button component is the primary way users interact with your application. It supports multiple visual variants, sizes, and states to accommodate different use cases.

## When to Use
- Primary actions (form submission, confirmation)
- Navigation between pages or views
- Triggering modals, dropdowns, or other UI elements
- Any user-initiated action

## When NOT to Use
- For navigation between pages, consider using a Link component styled as a button (via polymorphic `as` prop)
- For switching between views in the same page, use Tabs
- For showing/hiding content, use Accordion or Disclosure

---

## Basic Usage

\`\`\`typescript
import { Button } from '@kisanlink/ui-commons';

function Example() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
}
\`\`\`

---

## Variants

### Primary
Use for the main action on a page. Typically only one primary button per section.

\`\`\`tsx
<Button variant="primary">Save Changes</Button>
\`\`\`

**Use cases:**
- Form submission
- Confirm actions
- Primary call-to-action

**Don't:**
- Don't use multiple primary buttons in close proximity
- Don't use for destructive actions (use variant="danger")

### Secondary
Use for secondary actions that complement the primary action.

\`\`\`tsx
<Button variant="secondary">Cancel</Button>
\`\`\`

### Ghost
Use for tertiary actions or when you need a subtle button.

\`\`\`tsx
<Button variant="ghost">Learn More</Button>
\`\`\`

### Danger
Use for destructive or irreversible actions.

\`\`\`tsx
<Button variant="danger">Delete Account</Button>
\`\`\`

**Important:** Always confirm destructive actions with a modal or confirmation dialog.

---

## Sizes

Choose size based on context and importance:

\`\`\`tsx
<Button size="sm">Small</Button>   {/* Compact UIs, toolbars */}
<Button size="md">Medium</Button>  {/* Default, most common */}
<Button size="lg">Large</Button>   {/* Hero sections, emphasis */}
\`\`\`

---

## Loading States

Show loading state during async operations:

\`\`\`tsx
function SubmitForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} disabled={loading} onClick={handleSubmit}>
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}
\`\`\`

---

## Icons

Add icons to provide visual context:

\`\`\`tsx
import { IconPlus, IconDownload } from 'lucide-react';

<Button leftIcon={<IconPlus />}>Add Item</Button>
<Button rightIcon={<IconDownload />}>Download</Button>
\`\`\`

**Icon-only buttons:**
\`\`\`tsx
<Button aria-label="Close dialog">
  <IconX />
</Button>
\`\`\`

**Important:** Always provide an `aria-label` for icon-only buttons.

---

## Polymorphic Usage

Render as different HTML elements or React components:

\`\`\`tsx
// As a link
<Button as="a" href="/page">Go to Page</Button>

// With React Router
import { Link as RouterLink } from 'react-router-dom';
<Button as={RouterLink} to="/page">Navigate</Button>

// With Next.js
import Link from 'next/link';
<Button as={Link} href="/page">Next Page</Button>
\`\`\`

---

## Accessibility

### Keyboard Support
- `Enter`: Activates the button
- `Space`: Activates the button
- `Tab`: Moves focus to/from button

### Screen Reader Support
- Button role is automatically announced
- Loading state announces "Loading" to screen readers
- Disabled buttons announce disabled state

### Best Practices
- Use descriptive button text (avoid "Click here")
- Provide `aria-label` for icon-only buttons
- Don't disable buttons without explanation (use tooltip or helper text)
- Ensure sufficient color contrast (all variants meet WCAG AA)

---

## Common Patterns

### Button Group
\`\`\`tsx
<ButtonGroup attached>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>
\`\`\`

### Form Actions
\`\`\`tsx
<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
    <Button type="button" variant="ghost" onClick={handleCancel}>
      Cancel
    </Button>
    <Button type="submit" variant="primary" loading={isSubmitting}>
      Submit
    </Button>
  </div>
</form>
\`\`\`

### Confirmation Dialogs
\`\`\`tsx
<Modal.Footer>
  <Button variant="ghost" onClick={closeModal}>
    Cancel
  </Button>
  <Button variant="danger" onClick={handleDelete}>
    Delete
  </Button>
</Modal.Footer>
\`\`\`

---

## Visual Design Guidelines

### Spacing
- Minimum 8px between adjacent buttons
- Use `ButtonGroup` component for connected buttons
- In forms, align buttons to the right for primary actions

### Hierarchy
- Only one primary button per section
- Use secondary/ghost for less important actions
- Place primary action on the right in LTR layouts

### Text
- Use action-oriented text ("Save", "Delete", "Continue")
- Keep text short (1-3 words ideally)
- Use sentence case, not title case

---

## Do's and Don'ts

### Do
✓ Use descriptive, action-oriented text
✓ Provide visual feedback (hover, active states)
✓ Show loading state during async operations
✓ Use appropriate variant for action importance
✓ Ensure sufficient touch target size (44x44px minimum)

### Don't
✗ Don't use multiple primary buttons in one section
✗ Don't use ambiguous text like "OK" or "Submit"
✗ Don't disable without explanation
✗ Don't use for navigation (use Link component)
✗ Don't stack buttons vertically unless necessary

---

## Related Components
- **Link**: For navigation between pages
- **IconButton**: For toolbar actions
- **ButtonGroup**: For related button collections
- **Tooltip**: To explain icon-only buttons
\`\`\`

---

## Migration Strategy

### Phase 1: Audit Existing Components (Week 1-2)

#### Discovery Process

```bash
# Find all button implementations across applications
git clone admin-panel
git clone ecommerce-frontend
git clone erp-frontend

# Search for button patterns
grep -r "button" --include="*.tsx" --include="*.jsx" admin-panel/src
grep -r "className.*btn" --include="*.css" --include="*.scss" ecommerce-frontend/src
```

#### Inventory Template

Create inventory spreadsheet:

| Application | Component Path | Current Implementation | Props Used | Migration Complexity | Notes |
|------------|----------------|----------------------|-----------|---------------------|-------|
| admin-panel | src/components/Button.tsx | Custom component | variant, size, onClick | Medium | Uses styled-components |
| ecommerce-frontend | src/ui/Button.jsx | Material-UI Button | color, variant, fullWidth | Easy | Direct mapping |
| erp-frontend | src/common/ActionButton.tsx | Custom + Ant Design | type, loading, icon | Medium | Complex loading logic |

---

### Phase 2: Create Migration Plan (Week 3)

#### Component Mapping

```typescript
// migration-guide.ts

/**
 * Migration mapping from existing implementations to KisanLink UI Commons
 */

// Admin Panel (styled-components)
export const adminPanelMapping = {
  Button: {
    oldImport: "import { Button } from '@/components/Button'",
    newImport: "import { Button } from '@kisanlink/ui-commons'",
    propMappings: {
      type: 'variant', // type="primary" → variant="primary"
      isLoading: 'loading', // isLoading={true} → loading={true}
      fullWidth: 'fullWidth', // Same
    },
  },
};

// Ecommerce Frontend (Material-UI)
export const ecommerceMappings = {
  Button: {
    oldImport: "import { Button } from '@mui/material'",
    newImport: "import { Button } from '@kisanlink/ui-commons'",
    propMappings: {
      color: (value: string) => {
        // color="primary" → variant="primary"
        // color="error" → variant="danger"
        const map = { primary: 'primary', secondary: 'secondary', error: 'danger' };
        return { variant: map[value] || 'primary' };
      },
      variant: (value: string) => {
        // variant="contained" → variant="primary"
        // variant="outlined" → variant="secondary"
        // variant="text" → variant="ghost"
        const map = { contained: 'primary', outlined: 'secondary', text: 'ghost' };
        return { variant: map[value] || 'primary' };
      },
    },
  },
};

// ERP Frontend (Ant Design)
export const erpMappings = {
  Button: {
    oldImport: "import { Button } from 'antd'",
    newImport: "import { Button } from '@kisanlink/ui-commons'",
    propMappings: {
      type: (value: string) => {
        // type="primary" → variant="primary"
        // type="default" → variant="secondary"
        // type="dashed" → variant="ghost"
        // type="link" → use Link component instead
        const map = { primary: 'primary', default: 'secondary', dashed: 'ghost' };
        return { variant: map[value] || 'primary' };
      },
      danger: (value: boolean) => value ? { variant: 'danger' } : {},
      icon: 'leftIcon', // icon={<Icon />} → leftIcon={<Icon />}
    },
  },
};
```

---

### Phase 3: Codemod Development (Week 4)

Create automated migration scripts using jscodeshift:

```javascript
// transforms/migrate-button.js

/**
 * Codemod to migrate Button components to @kisanlink/ui-commons
 *
 * Usage:
 * npx jscodeshift -t transforms/migrate-button.js src/**\/*.tsx
 */

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Find all Button imports from old locations
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value;

    // Material-UI Button
    if (source === '@mui/material' || source === '@mui/material/Button') {
      const specifiers = path.node.specifiers;
      const buttonSpecifier = specifiers.find(
        (s) => s.imported && s.imported.name === 'Button'
      );

      if (buttonSpecifier) {
        // Replace import
        j(path).replaceWith(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('Button'))],
            j.literal('@kisanlink/ui-commons')
          )
        );
        hasChanges = true;
      }
    }

    // Custom Button component (update path)
    if (source.match(/components\/Button/) || source === '@/components/Button') {
      j(path).replaceWith(
        j.importDeclaration(
          path.node.specifiers,
          j.literal('@kisanlink/ui-commons')
        )
      );
      hasChanges = true;
    }
  });

  // Transform Button JSX elements
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.node.openingElement;

    if (openingElement.name.name !== 'Button') return;

    const attributes = openingElement.attributes;

    // Material-UI: color prop → variant prop
    const colorAttr = attributes.find(
      (attr) => attr.name && attr.name.name === 'color'
    );
    if (colorAttr) {
      const colorValue = colorAttr.value.value;
      const variantMap = {
        primary: 'primary',
        secondary: 'secondary',
        error: 'danger',
      };

      colorAttr.name.name = 'variant';
      if (variantMap[colorValue]) {
        colorAttr.value.value = variantMap[colorValue];
      }
      hasChanges = true;
    }

    // Material-UI: variant prop (contained/outlined/text) → variant prop
    const variantAttr = attributes.find(
      (attr) => attr.name && attr.name.name === 'variant'
    );
    if (variantAttr) {
      const variantValue = variantAttr.value.value;
      const variantMap = {
        contained: 'primary',
        outlined: 'secondary',
        text: 'ghost',
      };

      if (variantMap[variantValue]) {
        variantAttr.value.value = variantMap[variantValue];
        hasChanges = true;
      }
    }

    // Custom: isLoading → loading
    const isLoadingAttr = attributes.find(
      (attr) => attr.name && attr.name.name === 'isLoading'
    );
    if (isLoadingAttr) {
      isLoadingAttr.name.name = 'loading';
      hasChanges = true;
    }

    // Ant Design: icon → leftIcon
    const iconAttr = attributes.find(
      (attr) => attr.name && attr.name.name === 'icon'
    );
    if (iconAttr) {
      iconAttr.name.name = 'leftIcon';
      hasChanges = true;
    }
  });

  return hasChanges ? root.toSource() : null;
};
```

**Run codemod:**
```bash
npx jscodeshift -t transforms/migrate-button.js --extensions=tsx,jsx src/
```

---

### Phase 4: Pilot Migration (Week 5-6)

#### Step 1: Choose Pilot Application
Start with the least complex application (e.g., admin-panel).

#### Step 2: Install Package

```bash
cd admin-panel
npm install @kisanlink/ui-commons
```

#### Step 3: Run Codemod

```bash
npx jscodeshift -t ../codemods/migrate-button.js --extensions=tsx src/
```

#### Step 4: Manual Review

Review changes and fix edge cases:

```bash
git diff
```

Look for:
- Complex prop combinations not handled by codemod
- Custom styling that needs to be migrated
- Event handlers with different signatures

#### Step 5: Update Styles

Replace custom CSS with theme tokens:

```css
/* Before */
.custom-button {
  background: #16a34a;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
}

/* After */
.custom-button {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-2-5) var(--spacing-5);
  border-radius: var(--radius-md);
}
```

#### Step 6: Test

```bash
npm run test
npm run build
npm run dev
```

Manual testing checklist:
- [ ] Visual regression (compare screenshots before/after)
- [ ] Keyboard navigation still works
- [ ] Loading states behave correctly
- [ ] Form submissions work
- [ ] Dark mode (if applicable)

---

### Phase 5: Gradual Rollout (Week 7-12)

#### Week 7-8: Admin Panel Complete
- Migrate all components (not just Button)
- Deploy to staging
- QA testing
- Deploy to production

#### Week 9-10: E-commerce Frontend
- Follow same process
- Extra testing on checkout flow (critical path)
- A/B test to ensure conversion rates unchanged

#### Week 11-12: ERP Frontend
- Most complex application
- Migrate section by section
- Longer QA cycle

---

### Phase 6: Post-Migration (Ongoing)

#### Remove Old Dependencies

```bash
npm uninstall @mui/material styled-components antd
```

#### Update Documentation

```markdown
# Component Usage

All UI components should now be imported from `@kisanlink/ui-commons`:

\`\`\`typescript
import { Button, Input, Card } from '@kisanlink/ui-commons';
\`\`\`

See component documentation at: https://ui.kisanlink.com
\`\`\`

#### Establish Governance

**New Component Checklist:**
- [ ] Check if component exists in `@kisanlink/ui-commons`
- [ ] If not, propose addition to design system team
- [ ] If very application-specific, build using commons primitives
- [ ] Document any custom styling/extensions

**Review Process:**
- All PRs with custom UI components flagged for review
- Monthly audit of unused custom components

---

## Breaking Change Management

### Semantic Versioning

```
MAJOR.MINOR.PATCH

1.0.0 → 1.0.1 (patch: bug fix)
1.0.1 → 1.1.0 (minor: new feature, backward compatible)
1.1.0 → 2.0.0 (major: breaking change)
```

### Deprecation Process

#### Step 1: Mark as Deprecated (Minor Version)

```typescript
/**
 * @deprecated Use `variant="primary"` instead. This prop will be removed in v3.0.0.
 */
export interface ButtonProps {
  /** @deprecated */
  type?: 'primary' | 'secondary';

  /** Replaces deprecated `type` prop */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}
```

#### Step 2: Runtime Warning (Minor Version)

```typescript
export const Button = ({ type, variant, ...props }: ButtonProps) => {
  // Warn in development
  if (process.env.NODE_ENV === 'development' && type !== undefined) {
    console.warn(
      'Button: `type` prop is deprecated and will be removed in v3.0.0. ' +
      'Use `variant` prop instead. ' +
      'See migration guide: https://ui.kisanlink.com/migration/v2-to-v3'
    );
  }

  // Support both during transition
  const actualVariant = variant || type || 'primary';

  return <button data-variant={actualVariant} {...props} />;
};
```

#### Step 3: Remove in Major Version

```typescript
// v3.0.0 - type prop removed entirely
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}
```

### Migration Guide Template

```markdown
# Migration Guide: v2.x to v3.0

## Breaking Changes

### Button Component

**Removed `type` prop**

\`\`\`diff
- <Button type="primary">Click</Button>
+ <Button variant="primary">Click</Button>
\`\`\`

**Why:** Standardizing on `variant` terminology across all components.

**Automated Migration:**
\`\`\`bash
npx @kisanlink/ui-commons-codemod v2-to-v3 ./src
\`\`\`

---

### Input Component

**Changed `error` prop type**

\`\`\`diff
- <Input error="Error message" />
+ <Input error={true} />
+ {error && <ErrorText>{error}</ErrorText>}
\`\`\`

**Why:** Separating concerns - Input handles styling, FormField handles error text.

**Manual Migration Required:** Review all Input components with error messages.

---

## Deprecations (warnings only, removed in v4.0)

### Card Component

**Deprecated `raised` prop**

\`\`\`diff
- <Card raised>Content</Card>
+ <Card variant="elevated">Content</Card>
\`\`\`

---

## New Features

### Button Component

**Added `leftIcon` and `rightIcon` props**

\`\`\`typescript
<Button leftIcon={<IconPlus />}>Add Item</Button>
\`\`\`

**Added polymorphic rendering with `as` prop**

\`\`\`typescript
<Button as="a" href="/page">Link Button</Button>
\`\`\`

---

## Upgrade Steps

1. **Update package:**
   \`\`\`bash
   npm install @kisanlink/ui-commons@3.0.0
   \`\`\`

2. **Run codemod:**
   \`\`\`bash
   npx @kisanlink/ui-commons-codemod v2-to-v3 ./src
   \`\`\`

3. **Review automated changes:**
   \`\`\`bash
   git diff
   \`\`\`

4. **Address remaining deprecation warnings:**
   - Run application in development mode
   - Check console for deprecation warnings
   - Manually update flagged components

5. **Test thoroughly:**
   - Visual regression tests
   - E2E tests
   - Manual QA

6. **Deploy:**
   - Deploy to staging first
   - Monitor for issues
   - Roll out to production

---

## Support

- **Documentation:** https://ui.kisanlink.com
- **GitHub Issues:** https://github.com/kisanlink/ui-commons/issues
- **Slack Channel:** #ui-commons-support
\`\`\`

---

## Visual Regression Testing Strategy

### Setup Chromatic

```bash
npm install --save-dev chromatic
```

```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=<token>"
  }
}
```

### CI Integration

```yaml
# .github/workflows/chromatic.yml
name: Visual Regression Tests

on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Full git history for Chromatic

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          autoAcceptChanges: main # Auto-accept on main branch
```

### Review Process

1. PR opened → Chromatic runs automatically
2. Visual changes detected → Review in Chromatic UI
3. Accept or reject changes
4. Merge only after approval

---

This completes the comprehensive documentation and migration strategy. Let me create a final visual summary document.
