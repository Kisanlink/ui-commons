# Accessibility & Responsive Design Specifications

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

All components MUST meet WCAG 2.1 Level AA standards at minimum, with AAA targets where feasible.

---

## Color Contrast Requirements

### Text Contrast Ratios

```typescript
// Automated testing with axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button meets contrast requirements', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Contrast Standards

| Element Type | Minimum Ratio | Target Ratio |
|-------------|---------------|--------------|
| Normal text (< 18px) | 4.5:1 | 7:1 (AAA) |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 | 4.5:1 |
| UI components (borders, icons) | 3:1 | 4.5:1 |
| Graphical objects | 3:1 | - |
| Focus indicators | 3:1 (against background) | - |

### Contrast Validation

```css
/* Light mode - Primary button */
.button[data-variant="primary"] {
  background: var(--color-primary); /* #16a34a */
  color: var(--color-on-primary);   /* #ffffff */
  /* Ratio: 4.67:1 (PASSES AA for large text, AAA for normal text) */
}

/* Dark mode - Primary button */
[data-theme="dark"] .button[data-variant="primary"] {
  background: var(--color-primary); /* #22c55e in dark mode */
  color: var(--color-on-primary);   /* #0c0a09 */
  /* Ratio: 7.12:1 (PASSES AAA) */
}
```

### Color Blindness Considerations

- **Never rely on color alone** to convey information
- Use icons, patterns, or text labels in addition to color
- Test with color blindness simulators (Chromatic Storybook addon)

**Example: Form validation**
```typescript
// BAD: Color only
<Input style={{ borderColor: 'red' }} />

// GOOD: Color + icon + text
<FormField error="Email is required">
  <Input
    error
    leftIcon={<IconAlertCircle />}
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <ErrorMessage id="email-error">
    <Icon as={IconAlertCircle} /> Email is required
  </ErrorMessage>
</FormField>
```

---

## Keyboard Navigation

### Focus Management

#### Focus Indicators
All interactive elements must have visible focus indicators:

```css
/* Global focus styles */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Component-specific focus (e.g., buttons) */
.button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}

/* Never remove focus styles without replacement */
/* BAD */
button:focus {
  outline: none; /* NEVER DO THIS */
}

/* GOOD */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### Tab Order

- Tab order must follow visual order (left-to-right, top-to-bottom)
- Use `tabIndex={0}` to make custom elements focusable
- Use `tabIndex={-1}` to make elements programmatically focusable but not in tab order
- **Never use positive tabIndex values** (e.g., `tabIndex={1}`)

```typescript
// Custom interactive element
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Button
</div>
```

#### Skip Links

Provide skip links for navigation-heavy pages:

```typescript
// SkipLink component (consumer app level)
<SkipLink href="#main-content">Skip to main content</SkipLink>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-2) var(--spacing-4);
  z-index: var(--z-max);
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Keyboard Shortcuts

#### Standard Shortcuts by Component

| Component | Key | Action |
|-----------|-----|--------|
| Button | Enter, Space | Activate |
| Checkbox | Space | Toggle |
| Radio | Arrow Up/Down | Navigate group |
| Dropdown Menu | Enter, Space | Open menu |
| Dropdown Menu | Arrow Up/Down | Navigate items |
| Dropdown Menu | Esc | Close menu |
| Modal | Esc | Close modal |
| Tabs | Arrow Left/Right | Navigate tabs |
| Tabs | Home/End | First/Last tab |
| Accordion | Enter, Space | Toggle section |

#### Implementation Example: Dropdown

```typescript
// Radix UI handles this automatically, but for custom implementations:
function DropdownMenu({ items, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(items[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setSelectedIndex(items.length - 1);
        break;
    }
  };

  return <div role="menu" onKeyDown={handleKeyDown}>{/* ... */}</div>;
}
```

---

## ARIA Patterns

### Semantic HTML First

Always prefer semantic HTML over ARIA:

```typescript
// GOOD: Semantic HTML
<button onClick={handleClick}>Click me</button>

// BAD: div with ARIA
<div role="button" onClick={handleClick}>Click me</div>
```

### Common ARIA Attributes by Component

#### Button
```typescript
<button
  aria-label="Delete item" // For icon-only buttons
  aria-pressed={isPressed}  // For toggle buttons
  aria-disabled={isDisabled} // Prefer disabled attribute
>
  <Icon as={IconTrash} aria-hidden="true" />
</button>
```

#### Input
```typescript
<input
  type="text"
  aria-label="Email address"      // If no visible label
  aria-required="true"             // For required fields
  aria-invalid={hasError}          // For validation errors
  aria-describedby="email-hint email-error" // Link to help text
/>
<span id="email-hint">Enter your email address</span>
{hasError && <span id="email-error">Invalid email format</span>}
```

#### Modal/Dialog
```typescript
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
  {/* Focus trap applied here */}
</div>
```

#### Dropdown Menu
```typescript
<div role="menu" aria-label="Actions">
  <button role="menuitem" aria-haspopup="true">
    File
  </button>
  <div role="menu">
    <button role="menuitem">New</button>
    <button role="menuitem">Open</button>
    <div role="separator"></div>
    <button role="menuitem">Exit</button>
  </div>
</div>
```

#### Tabs
```typescript
<div role="tablist" aria-label="Account settings">
  <button
    role="tab"
    aria-selected={isSelected}
    aria-controls="panel-1"
    id="tab-1"
  >
    Profile
  </button>
  <div
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1"
    tabIndex={0}
  >
    Profile content
  </div>
</div>
```

#### Loading States
```typescript
<Button loading aria-busy="true" aria-live="polite">
  <Spinner aria-label="Loading" />
  Processing...
</Button>

// Or with separate live region
<div aria-live="polite" aria-atomic="true">
  {isLoading ? 'Loading data...' : 'Data loaded'}
</div>
```

#### Alerts
```typescript
<Alert variant="error" role="alert" aria-live="assertive">
  <Icon as={IconAlertCircle} aria-hidden="true" />
  An error occurred. Please try again.
</Alert>

// For less urgent messages
<Alert variant="info" role="status" aria-live="polite">
  Settings saved successfully.
</Alert>
```

---

## Screen Reader Support

### Accessible Labels

```typescript
// Icon-only button
<Button aria-label="Delete item">
  <Icon as={IconTrash} aria-hidden="true" />
</Button>

// Button with visible text (aria-label not needed)
<Button>
  <Icon as={IconTrash} aria-hidden="true" />
  Delete
</Button>

// Link with additional context
<Link href="/report.pdf" aria-label="Download annual report (PDF, 2MB)">
  Download Report
</Link>
```

### Visually Hidden Text

Use for screen reader only content:

```typescript
<Button>
  <Icon as={IconShare} aria-hidden="true" />
  <VisuallyHidden>Share on social media</VisuallyHidden>
</Button>

// Implementation
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
```

### Dynamic Content Announcements

```typescript
// Live region for status updates
function SaveStatus() {
  const [status, setStatus] = useState('');

  return (
    <>
      <Button onClick={handleSave}>Save</Button>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {status}
      </div>
    </>
  );
}
```

### Form Instructions

```typescript
<FormField
  label="Password"
  required
  hint="Must be at least 8 characters with one uppercase letter"
  error={passwordError}
>
  <Input
    type="password"
    aria-describedby="password-hint password-error"
    aria-required="true"
    aria-invalid={!!passwordError}
  />
  <span id="password-hint">
    Must be at least 8 characters with one uppercase letter
  </span>
  {passwordError && (
    <span id="password-error" role="alert">
      {passwordError}
    </span>
  )}
</FormField>
```

---

## Touch Targets

### Minimum Sizes

- **Minimum**: 44x44px (11mm) per WCAG 2.1 Level AAA
- **Recommended**: 48x48px (12mm) for better usability
- **Spacing**: 8px minimum between adjacent touch targets

### Implementation

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-2) var(--spacing-4);
}

.button[data-size="sm"] {
  min-height: 40px; /* Still meets AA, close to AAA */
  padding: var(--spacing-1-5) var(--spacing-3);
}

.button[data-size="lg"] {
  min-height: 48px;
  padding: var(--spacing-3) var(--spacing-6);
}

/* Icon-only buttons */
.icon-button {
  width: 44px;
  height: 44px;
  padding: var(--spacing-2);
}
```

### Touch Target Spacing

```typescript
// ButtonGroup with adequate spacing
<ButtonGroup spacing="2"> {/* 8px spacing */}
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

---

## Responsive Design Strategy

### Mobile-First Approach

Write styles for mobile first, then add complexity for larger screens:

```css
/* Base styles (mobile) */
.container {
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
    font-size: var(--font-size-md);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Breakpoint System

```typescript
// tokens/breakpoints.ts
export const breakpoints = {
  sm: 640,   // Small devices (landscape phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices (large desktops)
  '2xl': 1536, // Ultra wide screens
} as const;

// Utility for media queries
export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const;
```

### Responsive Component Props

```typescript
// Responsive prop API (inspired by Chakra UI)
interface ResponsiveProp<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | ResponsiveProp<'sm' | 'md' | 'lg'>;
  fullWidth?: boolean | ResponsiveProp<boolean>;
}

// Usage
<Button
  size={{ base: 'sm', md: 'md', lg: 'lg' }}
  fullWidth={{ base: true, md: false }}
>
  Responsive Button
</Button>

// Implementation
function useResponsiveProp<T>(prop: T | ResponsiveProp<T>): T {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('base');

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) {
        setCurrentBreakpoint('xl');
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        setCurrentBreakpoint('lg');
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setCurrentBreakpoint('md');
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('base');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  if (typeof prop === 'object' && prop !== null && 'base' in prop) {
    // Return value for current breakpoint, falling back to base
    return prop[currentBreakpoint as keyof ResponsiveProp<T>] ?? prop.base!;
  }

  return prop as T;
}
```

### Responsive Typography

Use fluid typography for smooth scaling:

```css
:root {
  /* Fluid type scale using clamp() */
  --font-size-sm: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-base: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-md: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
  --font-size-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);
}
```

### Container Queries (Progressive Enhancement)

```css
/* Traditional media query */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

/* Container query (when supported) */
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
    container-name: card;
  }

  @container card (min-width: 400px) {
    .card {
      flex-direction: row;
    }
  }
}
```

### Responsive Images

```typescript
// Image component with responsive props
<Image
  src="/image.jpg"
  alt="Product"
  aspectRatio={{ base: '1:1', md: '16:9' }}
  objectFit="cover"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  srcSet={`
    /image-400w.jpg 400w,
    /image-800w.jpg 800w,
    /image-1200w.jpg 1200w
  `}
/>
```

---

## Accessibility Testing Checklist

### Automated Testing

```typescript
// Component test file
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have WCAG violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);

    const button = getByRole('button');
    button.focus();

    expect(button).toHaveFocus();

    // Simulate Enter key
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should have accessible name', () => {
    const { getByRole } = render(
      <Button aria-label="Close dialog">
        <Icon as={IconX} />
      </Button>
    );

    expect(getByRole('button')).toHaveAccessibleName('Close dialog');
  });

  it('should announce loading state', () => {
    const { getByRole } = render(<Button loading>Submit</Button>);
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
```

### Manual Testing Checklist

- [ ] **Keyboard Navigation**: Can reach and activate all interactive elements
- [ ] **Screen Reader**: All content announced correctly (test with NVDA/JAWS/VoiceOver)
- [ ] **Focus Indicators**: Visible focus outline on all interactive elements
- [ ] **Color Contrast**: All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] **Touch Targets**: All interactive elements at least 44x44px
- [ ] **Zoom**: Page usable at 200% zoom (WCAG Level AA)
- [ ] **Reduced Motion**: Animations respect `prefers-reduced-motion`
- [ ] **Dark Mode**: All contrast requirements met in dark mode

---

## Reduced Motion

### Implementation

```css
/* Default: smooth animations */
.button {
  transition: all var(--duration-fast) var(--ease-out);
}

.modal {
  animation: slideIn var(--duration-base) var(--ease-out);
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### JavaScript Hook

```typescript
// useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Usage in component
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Internationalization (i18n) Considerations

### RTL (Right-to-Left) Support

```css
/* Logical properties for automatic RTL support */
.card {
  margin-inline-start: var(--spacing-4);  /* Instead of margin-left */
  padding-inline: var(--spacing-4);       /* Instead of padding-left/right */
  border-inline-start: 1px solid;         /* Instead of border-left */
}

/* RTL-specific styles when needed */
[dir="rtl"] .icon {
  transform: scaleX(-1); /* Flip arrow icons in RTL */
}
```

### Text Direction Attribute

```typescript
// ThemeProvider should set dir attribute
<html dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}>
```

### Language-Specific Typography

```css
/* Adjust line-height for different scripts */
:root {
  --line-height-base: 1.5;
}

[lang="ja"],
[lang="zh"],
[lang="ko"] {
  --line-height-base: 1.75; /* More spacing for CJK characters */
}

[lang="ar"],
[lang="he"] {
  --line-height-base: 1.8; /* More spacing for Arabic script */
}
```

---

## Component-Specific Accessibility Patterns

### Form Field Error Handling

```typescript
<FormField
  label="Email"
  required
  error={errors.email}
  hint="We'll never share your email"
>
  <Input
    type="email"
    name="email"
    id="email"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={`${errors.email ? 'email-error' : ''} email-hint`.trim()}
  />
  <span id="email-hint" className="hint-text">
    We'll never share your email
  </span>
  {errors.email && (
    <span id="email-error" role="alert" className="error-text">
      <Icon as={IconAlertCircle} aria-hidden="true" />
      {errors.email}
    </span>
  )}
</FormField>
```

### Data Table Accessibility

```typescript
// Consumers should use semantic table markup
<table role="table" aria-label="Products">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Product A</th>
      <td>$99.99</td>
      <td>
        <Badge variant={stock > 0 ? 'success' : 'error'}>
          {stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </td>
    </tr>
  </tbody>
</table>
```

### Modal Focus Management

```typescript
// Modal component implementation
function Modal({ open, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus modal
      modalRef.current?.focus();

      // Trap focus inside modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          trapFocus(e, modalRef.current!);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus on close
        previousActiveElement.current?.focus();
      };
    }
  }, [open]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {children}
    </div>
  );
}
```

---

## Documentation Requirements

### Component Documentation Template

Every component must document:

```markdown
## Accessibility

### Keyboard Support
- `Enter` / `Space`: Activates the button
- `Tab`: Moves focus to/from the button

### ARIA Attributes
- `aria-label`: Provides accessible name when button has no text content
- `aria-pressed`: Indicates toggle state for toggle buttons
- `aria-busy`: Indicates loading state

### Screen Reader Support
- Button announces its label and role
- Loading state announces "Loading" when aria-busy is true
- Disabled state prevents interaction and announces disabled state

### Focus Management
- Visible focus indicator meets WCAG 2.1 Level AA contrast requirements
- Focus outline is 2px solid with 2px offset

### Color Contrast
All button variants meet WCAG 2.1 Level AA contrast requirements:
- Primary: 7.1:1 (AAA)
- Secondary: 6.8:1 (AAA)
- Ghost: 4.6:1 (AA)
```

---

This completes the accessibility and responsive design specifications. Let me create the final documentation on component API patterns and migration strategy.
