# Component Hierarchy Visual Diagram

## Complete Component Tree

```
@kisanlink/ui-commons
│
├── ATOMS (20 Primitive Components)
│   │
│   ├── Interactive Elements
│   │   ├── Button
│   │   │   └── Variants: primary, secondary, tertiary, ghost, danger
│   │   │   └── Sizes: sm, md, lg
│   │   │   └── States: default, hover, active, focus, disabled, loading
│   │   │
│   │   ├── Link
│   │   │   └── Variants: default, muted, primary
│   │   │   └── Polymorphic: supports 'as' prop for routing libraries
│   │   │
│   │   ├── IconButton (derived from Button)
│   │   │   └── Icon-only variant with accessible label
│   │   │
│   │   └── Checkbox
│   │       └── States: unchecked, checked, indeterminate
│   │       └── Supports label prop
│   │
│   ├── Form Controls
│   │   ├── Input
│   │   │   └── Types: text, email, password, number, tel, url
│   │   │   └── Variants: outline, filled, unstyled
│   │   │   └── Sizes: sm, md, lg
│   │   │   └── Supports: leftIcon, rightIcon, error state
│   │   │
│   │   ├── Radio
│   │   │   └── Used within RadioGroup molecule
│   │   │   └── Single selection from group
│   │   │
│   │   ├── Switch (Toggle)
│   │   │   └── Sizes: sm, md
│   │   │   └── iOS-style toggle design
│   │   │
│   │   └── Label
│   │       └── Associated with form controls
│   │       └── Supports: required indicator, error state, disabled state
│   │
│   ├── Typography
│   │   └── Text
│   │       └── Polymorphic: renders as h1-h6, p, span
│   │       └── Variants: heading-1 through heading-5, body-large, body, body-small, caption
│   │       └── Color options: primary, secondary, tertiary, inverse, disabled
│   │       └── Alignment: left, center, right
│   │
│   ├── Visual Elements
│   │   ├── Icon
│   │   │   └── Wraps Lucide React icons
│   │   │   └── Sizes: xs (12px), sm (16px), md (20px), lg (24px), xl (32px), 2xl (40px)
│   │   │   └── Requires aria-label for standalone use
│   │   │
│   │   ├── Badge
│   │   │   └── Variants: default, success, warning, error, info
│   │   │   └── Sizes: sm, md, lg
│   │   │   └── dot prop for indicator-only display
│   │   │
│   │   ├── Avatar
│   │   │   └── Displays user image or fallback (initials/icon)
│   │   │   └── Sizes: xs, sm, md, lg, xl
│   │   │   └── Status indicators: online, offline, away, busy
│   │   │
│   │   ├── Image
│   │   │   └── Optimized image rendering
│   │   │   └── Aspect ratios: 1:1, 16:9, 4:3, auto
│   │   │   └── Object fit: cover, contain, fill
│   │   │   └── Lazy loading support
│   │   │   └── Fallback on error
│   │   │
│   │   └── Divider
│   │       └── Orientations: horizontal, vertical
│   │       └── Variants: solid, dashed, dotted
│   │       └── Optional centered label
│   │
│   ├── Feedback Elements
│   │   ├── Spinner
│   │   │   └── Loading indicator
│   │   │   └── Sizes: sm, md, lg
│   │   │   └── Respects prefers-reduced-motion
│   │   │
│   │   ├── Skeleton
│   │   │   └── Loading placeholder
│   │   │   └── Variants: text, circular, rectangular
│   │   │   └── Animation: pulse, wave, none
│   │   │
│   │   └── ProgressBar
│   │       └── Linear progress indicator
│   │       └── Sizes: sm, md, lg
│   │       └── Variants: default, success, warning, error
│   │       └── Determinate (value prop) or indeterminate
│   │
│   ├── Content Display
│   │   └── Code
│   │       └── Monospace text display
│   │       └── Inline (<code>) or block (<pre><code>)
│   │       └── Optional syntax highlighting integration
│   │
│   └── Utility Components
│       ├── Portal
│       │   └── Renders children outside DOM hierarchy
│       │   └── Used by Modal, Tooltip, Popover, Dropdown
│       │
│       ├── FocusTrap
│       │   └── Traps keyboard focus within element
│       │   └── Used by Modal, Dropdown for accessibility
│       │
│       └── VisuallyHidden
│           └── Screen reader only content
│           └── CSS clip technique (not display:none)
│
│
├── MOLECULES (15 Composed Components)
│   │
│   ├── Form Components
│   │   ├── FormField
│   │   │   └── Composition: Label + Input/Control + HintText + ErrorText
│   │   │   └── Props: label, required, error, hint
│   │   │   └── Accepts any form control as child (Input, Textarea, Select, etc.)
│   │   │   └── Auto-generates IDs for accessibility (aria-describedby)
│   │   │
│   │   ├── RadioGroup
│   │   │   └── Composition: Multiple Radio atoms
│   │   │   └── Orientations: horizontal, vertical
│   │   │   └── Controlled/Uncontrolled: value, defaultValue, onValueChange
│   │   │   └── Keyboard navigation: Arrow keys
│   │   │
│   │   └── SearchBar
│   │       └── Composition: Input + IconSearch (left) + IconX (right) + Spinner
│   │       └── Props: onSearch, onClear, loading
│   │       └── Shows clear button when input has value
│   │
│   ├── Container Components
│   │   └── Card
│   │       └── Compound Component Structure:
│   │       │   ├── Card.Root (container)
│   │       │   ├── Card.Header (optional)
│   │       │   ├── Card.Body (content)
│   │       │   └── Card.Footer (optional actions)
│   │       └── Variants: elevated, outlined, filled
│   │       └── Padding options: none, sm, md, lg
│   │       └── Hoverable prop for interactive cards
│   │
│   ├── Feedback Components
│   │   ├── Alert
│   │   │   └── Composition: Icon + Title + Description + CloseButton
│   │   │   └── Variants: info, success, warning, error
│   │   │   └── Closable prop with onClose callback
│   │   │   └── ARIA: role="alert" for errors, role="status" for info
│   │   │
│   │   └── Toast (Notification)
│   │       └── Based on Radix UI Toast primitive
│   │       └── Props: title, description, variant, duration, action, onClose
│   │       └── Auto-dismisses after duration
│   │       └── Positioned via ToastProvider (top-right, bottom-center, etc.)
│   │       └── Accessible: ARIA live regions
│   │
│   ├── Overlay Components (Radix UI based)
│   │   ├── Tooltip
│   │   │   └── Composition: Trigger (child) + Content (tooltip text)
│   │   │   └── Sides: top, right, bottom, left
│   │   │   └── Delay duration configurable
│   │   │   └── Triggered by hover AND focus (accessible)
│   │   │
│   │   ├── Popover
│   │   │   └── Composition: Trigger + Content
│   │   │   └── More substantial than Tooltip (interactive content)
│   │   │   └── Side and alignment options
│   │   │   └── Modal prop: trap focus, close on outside click
│   │   │
│   │   ├── DropdownMenu
│   │   │   └── Compound Component Structure:
│   │   │   │   ├── DropdownMenu.Root
│   │   │   │   ├── DropdownMenu.Trigger
│   │   │   │   ├── DropdownMenu.Content
│   │   │   │   ├── DropdownMenu.Item
│   │   │   │   ├── DropdownMenu.Separator
│   │   │   │   ├── DropdownMenu.Label
│   │   │   │   ├── DropdownMenu.CheckboxItem
│   │   │   │   ├── DropdownMenu.RadioGroup
│   │   │   │   └── DropdownMenu.RadioItem
│   │   │   └── Full keyboard navigation (Arrow keys, Enter, Esc)
│   │   │   └── ARIA: role="menu", role="menuitem"
│   │   │
│   │   └── Modal (Dialog)
│   │       └── Compound Component Structure:
│   │       │   ├── Modal.Root
│   │       │   ├── Modal.Trigger
│   │       │   ├── Modal.Content
│   │       │   ├── Modal.Header
│   │       │   ├── Modal.Body
│   │       │   ├── Modal.Footer
│   │       │   └── Modal.Close
│   │       └── Sizes: sm, md, lg, full
│   │       └── Features:
│   │       │   ├── Focus trap (FocusTrap atom)
│   │       │   ├── Scroll lock on body
│   │       │   ├── Overlay click handling
│   │       │   ├── ESC key closes
│   │       │   ├── Restores focus on close
│   │       │   └── Portal rendering
│   │       └── ARIA: role="dialog", aria-modal="true"
│   │
│   ├── Navigation Components
│   │   ├── Tabs
│   │   │   └── Compound Component Structure:
│   │   │   │   ├── Tabs.Root
│   │   │   │   ├── Tabs.List
│   │   │   │   ├── Tabs.Trigger
│   │   │   │   └── Tabs.Content
│   │   │   └── Keyboard: Arrow Left/Right, Home/End
│   │   │   └── ARIA: role="tablist", role="tab", role="tabpanel"
│   │   │
│   │   ├── Breadcrumb
│   │   │   └── Composition: Multiple Breadcrumb.Item with separators
│   │   │   └── Custom separator (default: chevron)
│   │   │   └── Last item marked with aria-current="page"
│   │   │   └── ARIA: aria-label="breadcrumb"
│   │   │
│   │   └── Pagination
│   │       └── Composition: Buttons for page numbers + First/Last/Prev/Next
│   │       └── Props: currentPage, totalPages, onPageChange, siblingCount
│   │       └── Sizes: sm, md, lg
│   │       └── Smart ellipsis display ([1] ... [5] [6] [7] ... [20])
│   │
│   ├── Interactive Collections
│   │   ├── ButtonGroup
│   │   │   └── Composition: Multiple Button atoms
│   │   │   └── Orientations: horizontal, vertical
│   │   │   └── Attached prop: visually connected buttons
│   │   │   └── Ensures adequate spacing for touch targets
│   │   │
│   │   └── Accordion
│   │       └── Compound Component Structure:
│   │       │   ├── Accordion.Root
│   │       │   ├── Accordion.Item
│   │       │   ├── Accordion.Trigger
│   │       │   └── Accordion.Content
│   │       └── Type: single (one open) or multiple (many open)
│   │       └── Collapsible prop (allow all to close)
│   │       └── Keyboard: Enter/Space toggles, Arrow keys navigate
│   │       └── ARIA: aria-expanded, aria-controls
│   │
│   └── (Total: 15 Molecules)
│
│
├── ORGANISMS (Intentionally Excluded)
│   └── Complex components left to consumer applications:
│       ├── DataTable (integrate TanStack Table with our primitives)
│       ├── Navigation Bar (application-specific routing)
│       ├── Sidebar/Drawer (layout-specific)
│       ├── Complex Forms (business logic specific)
│       ├── File Upload (backend integration required)
│       ├── Rich Text Editor (heavy, specialized)
│       ├── Date/Time Picker (recommend react-day-picker integration)
│       └── Autocomplete/Multi-Select (complex async state)
│
│       Note: We provide integration guides showing how to build
│             these using our atoms and molecules
│
│
└── THEME SYSTEM
    ├── ThemeProvider (React Context)
    ├── Design Tokens (CSS Variables)
    │   ├── Primitive Tokens (--palette-*)
    │   ├── Semantic Tokens (--color-*, --spacing-*)
    │   └── Component Tokens (--button-*, --input-*)
    ├── Theme Configurations
    │   ├── kisanlink.ts (default brand)
    │   ├── light.css
    │   └── dark.css
    └── Utilities
        ├── createTheme()
        ├── useTheme()
        └── useReducedMotion()
```

---

## Component Relationships

### Direct Composition (Molecules use Atoms)

```
FormField
├── uses Label (atom)
├── wraps Input/Textarea/Select (atom)
└── displays ErrorText (Text atom with error styling)

Card
├── uses Divider (atom) between sections
└── can contain any content (Buttons, Text, Images, etc.)

Alert
├── uses Icon (atom) for visual indicator
├── uses Text (atom) for title and description
└── uses IconButton (atom) for close button

SearchBar
├── uses Input (atom) as base
├── uses Icon (atom) for search icon (left)
├── uses IconButton (atom) for clear (right)
└── uses Spinner (atom) for loading state

Modal
├── uses Portal (atom) for rendering
├── uses FocusTrap (atom) for accessibility
├── uses Text (atom) for title/description
└── typically contains Buttons (atom) in footer

ButtonGroup
├── uses multiple Button (atom) instances
└── manages spacing and visual connection

RadioGroup
├── uses multiple Radio (atom) instances
└── manages selection state and keyboard navigation

Breadcrumb
├── uses Link (atom) for breadcrumb items
└── uses Icon (atom) for separators

Pagination
├── uses Button (atom) for page numbers and navigation
└── uses Text (atom) for ellipsis display

Toast
├── uses Icon (atom) for status indicator
├── uses Text (atom) for title/description
├── uses Button (atom) for action
└── uses Portal (atom) for rendering
```

---

## Component Dependency Graph

```
Level 0: Foundation (No Dependencies)
├── Text (base typography)
├── Icon (base visual element)
├── Spinner (base loading)
├── Divider (base separator)
├── Portal (base utility)
├── FocusTrap (base utility)
└── VisuallyHidden (base utility)

Level 1: Simple Atoms (Depend on Level 0)
├── Button (uses Icon optionally, uses Spinner for loading)
├── Link (extends Text styling)
├── Label (extends Text styling)
├── Badge (uses Text)
├── ProgressBar (visual only)
└── Skeleton (visual only)

Level 2: Form Atoms (Depend on Level 0-1)
├── Input (can use Icon for leftIcon/rightIcon)
├── Checkbox (uses Icon for check mark)
├── Radio (uses Icon for selection indicator)
├── Switch (visual only)
└── Image (uses fallback rendering)

Level 3: Complex Atoms (Depend on Level 0-2)
├── Avatar (uses Image, uses Text for fallback)
├── IconButton (extends Button with icon-only styling)
└── Code (extends Text with monospace styling)

Level 4: Simple Molecules (Depend on Level 0-3 atoms)
├── ButtonGroup (uses Button)
├── Breadcrumb (uses Link, Icon)
├── SearchBar (uses Input, Icon, Spinner)
└── Alert (uses Icon, Text, IconButton)

Level 5: Form Molecules (Depend on Level 0-4)
├── FormField (uses Label, Input/any control, Text for errors)
└── RadioGroup (uses Radio)

Level 6: Container Molecules (Depend on Level 0-5)
├── Card (can contain any lower-level components)
└── Pagination (uses Button, Text)

Level 7: Overlay Molecules (Depend on all previous + Radix)
├── Tooltip (uses Portal, wraps any trigger)
├── Popover (uses Portal, FocusTrap, wraps any content)
├── DropdownMenu (uses Portal, FocusTrap, uses Button/Text internally)
├── Modal (uses Portal, FocusTrap, uses Button, Text)
├── Tabs (uses Button for triggers, wraps any content)
├── Accordion (uses Button for triggers, wraps any content)
└── Toast (uses Portal, Icon, Text, Button)
```

---

## Import Dependency Tree

```typescript
// Example: What gets imported when you import Modal

import { Modal } from '@kisanlink/ui-commons';

// Internally, Modal imports:
import { Portal } from '../atoms/Portal';          // Utility atom
import { FocusTrap } from '../atoms/FocusTrap';    // Utility atom
import { Text } from '../atoms/Text';              // Typography atom
import { Button } from '../atoms/Button';          // Interactive atom (for close)
import { Icon } from '../atoms/Icon';              // Visual atom (for close icon)
import * as Dialog from '@radix-ui/react-dialog'; // External dependency

// So when you import Modal, you effectively get:
// Modal + Portal + FocusTrap + Text + Button + Icon + Radix Dialog

// Estimated bundle size for this import chain:
// Modal component: ~3KB
// Portal: ~0.5KB
// FocusTrap: ~1KB
// Text: ~1KB
// Button: ~2KB
// Icon: ~0.5KB
// Radix Dialog: ~5KB
// Total: ~13KB gzipped

// This is why tree-shaking is important!
// If you only import Button:
import { Button } from '@kisanlink/ui-commons';
// You only get: Button + Icon (optional) + Spinner (optional)
// Total: ~5KB gzipped
```

---

## Composition Examples

### Example 1: User Profile Card

```
User Profile Card (Consumer's component)
└── Card (molecule)
    ├── Card.Header
    │   └── Avatar (atom) - User photo
    ├── Card.Body
    │   ├── Text (atom) - variant="heading-4" - User name
    │   ├── Text (atom) - variant="body-small" - User role
    │   └── Badge (atom) - variant="success" - "Active" status
    └── Card.Footer
        ├── Button (atom) - variant="ghost" - "View Profile"
        └── Button (atom) - variant="primary" - "Message"
```

### Example 2: Login Form

```
Login Form (Consumer's component)
└── Card (molecule)
    └── Card.Body
        ├── Text (atom) - variant="heading-2" - "Login"
        ├── Text (atom) - variant="body" - Description
        ├── FormField (molecule)
        │   ├── Label (atom) - "Email"
        │   ├── Input (atom) - type="email", leftIcon=<IconMail />
        │   └── Text (atom) - error message (if applicable)
        ├── FormField (molecule)
        │   ├── Label (atom) - "Password"
        │   ├── Input (atom) - type="password", leftIcon=<IconLock />
        │   └── Text (atom) - error message (if applicable)
        ├── Button (atom) - variant="primary", fullWidth, loading
        ├── Divider (atom) - label="OR"
        └── Button (atom) - variant="ghost", fullWidth, leftIcon=<IconGoogle />
```

### Example 3: Product Listing (Consumer's component)

```
Product List
└── For each product:
    └── Card (molecule) - hoverable
        ├── Image (atom) - aspectRatio="4:3", loading="lazy"
        ├── Card.Body
        │   ├── Text (atom) - variant="heading-4" - Product name
        │   ├── Badge (atom) - variant="success"/"error" - Stock status
        │   ├── Text (atom) - variant="body" - Description
        │   └── Text (atom) - variant="heading-3" - Price
        └── Card.Footer
            └── ButtonGroup (molecule) - attached, fullWidth
                ├── Button (atom) - variant="ghost", leftIcon=<IconHeart />
                └── Button (atom) - variant="primary", leftIcon=<IconCart />
```

---

## Component Selection Guide

### When building a new feature, ask:

1. **Can I use an existing atom?**
   - YES → Use it directly
   - NO → Go to step 2

2. **Can I compose from existing atoms/molecules?**
   - YES → Build your feature component
   - NO → Go to step 3

3. **Is this component reusable across 2+ applications?**
   - YES → Propose adding to ui-commons
   - NO → Build as application-specific component

4. **Is this an organism (complex, stateful, data-fetching)?**
   - YES → Build in consumer app using our primitives
   - NO → May be a good candidate for ui-commons

---

## Anti-Patterns to Avoid

### DON'T: Wrap ui-commons components unnecessarily

```typescript
// BAD: Creates unnecessary abstraction layer
export function MyButton(props) {
  return <Button {...props} />;
}

// GOOD: Use ui-commons Button directly
import { Button } from '@kisanlink/ui-commons';
<Button {...props} />
```

### DON'T: Override styles extensively

```typescript
// BAD: Fighting the design system
<Button className="my-custom-button" style={{ background: 'purple' }} />

// GOOD: Use theme customization
const theme = createTheme({
  colors: { primary: 'purple' }
});
<ThemeProvider theme={theme}>
  <Button variant="primary" />
</ThemeProvider>
```

### DON'T: Bypass composition patterns

```typescript
// BAD: Reinventing the wheel
<div className="card">
  <div className="card-header">...</div>
  <div className="card-body">...</div>
</div>

// GOOD: Use provided compound components
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
</Card>
```

---

This diagram provides a complete visual reference for the component hierarchy and their relationships.
