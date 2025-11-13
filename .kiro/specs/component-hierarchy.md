# Component Hierarchy & Architecture

## Atomic Design Structure

### Philosophy
We follow Brad Frost's Atomic Design methodology with KisanLink-specific adaptations:
- **Atoms**: Indivisible UI primitives
- **Molecules**: Simple combinations of atoms
- **Organisms**: Complex, standalone components (deferred to consumer apps)
- **Templates/Pages**: Application-level (NOT in this library)

**Library Scope**: Atoms + Molecules only. Organisms are too application-specific and should be composed by consumers.

---

## Component Catalog

### ATOMS (20 components)

#### 1. Button
**Purpose**: Primary interaction element

**Variants**:
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
```

**API Design**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType; // Polymorphic: render as 'a', 'Link', etc.
}

// Usage examples
<Button variant="primary" size="md">Submit</Button>
<Button variant="ghost" leftIcon={<IconPlus />}>Add Item</Button>
<Button as="a" href="/login">Login</Button>
<Button loading>Processing...</Button>
```

**Visual Specs**:
- **sm**: height 32px, padding 8px 12px, font 14px
- **md**: height 40px, padding 10px 16px, font 16px (default)
- **lg**: height 48px, padding 12px 24px, font 18px

**States**: default, hover, active, focus, disabled, loading

**Accessibility**:
- Proper ARIA labels
- Disabled state uses `aria-disabled` (keeps in tab order with tooltip explaining why)
- Loading state announces "Loading" to screen readers

---

#### 2. Input
**Purpose**: Text data entry

**Variants**:
```typescript
type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'filled' | 'unstyled';
```

**API Design**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  variant?: InputVariant;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// Usage
<Input placeholder="Enter email" type="email" />
<Input error leftIcon={<IconUser />} />
<Input size="sm" variant="filled" />
```

**Related Components**: InputGroup (molecule), FormField (molecule)

---

#### 3. Label
**Purpose**: Accessible form labels

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Usage
<Label htmlFor="email" required>Email Address</Label>
```

**Visual**:
- Font weight: 500 (medium)
- Required indicator: red asterisk with `aria-label="required"`
- Error state: red color

---

#### 4. Text (Typography)
**Purpose**: Semantic text rendering

```typescript
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5'
          | 'body-large' | 'body' | 'body-small' | 'caption';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'disabled';
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

// Usage
<Text as="h1" variant="heading-1">Page Title</Text>
<Text as="p" variant="body" color="secondary">Description text</Text>
<Text as="span" variant="caption" color="tertiary">Helper text</Text>
```

---

#### 5. Icon
**Purpose**: SVG icon wrapper

```typescript
interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  'aria-label'?: string; // Required for standalone icons
}

// Usage
<Icon as={IconCheck} size="md" aria-label="Success" />
<Icon as={IconUser} size={24} color="var(--color-primary-500)" />
```

**Icon Library**: Lucide React (tree-shakeable, consistent style)

---

#### 6. Badge
**Purpose**: Status indicators, counts

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean; // Show as small dot indicator
}

// Usage
<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">3</Badge>
<Badge dot variant="info" />
```

---

#### 7. Spinner
**Purpose**: Loading indicator

```typescript
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  'aria-label'?: string;
}

// Usage
<Spinner size="md" aria-label="Loading content" />
```

**Animation**: Smooth rotation using CSS animation, respects `prefers-reduced-motion`

---

#### 8. Avatar
**Purpose**: User representation

```typescript
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: React.ReactNode; // Initials or icon
  status?: 'online' | 'offline' | 'away' | 'busy'; // Status indicator dot
}

// Usage
<Avatar src="/user.jpg" alt="John Doe" size="md" status="online" />
<Avatar fallback="JD" alt="John Doe" />
```

---

#### 9. Checkbox
**Purpose**: Boolean selection

```typescript
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean; // Partial selection state
  error?: boolean;
  label?: string;
}

// Usage
<Checkbox checked onChange={handler} label="I agree to terms" />
<Checkbox indeterminate label="Select all" />
```

**Accessibility**: Associated label, keyboard operable, ARIA states

---

#### 10. Radio
**Purpose**: Single selection from group

```typescript
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  label?: string;
}

// Usage (typically wrapped in RadioGroup molecule)
<Radio name="option" value="1" label="Option 1" />
<Radio name="option" value="2" label="Option 2" />
```

---

#### 11. Switch (Toggle)
**Purpose**: On/off state

```typescript
interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  size?: 'sm' | 'md';
  label?: string;
  labelPosition?: 'left' | 'right';
}

// Usage
<Switch checked onChange={handler} label="Enable notifications" />
```

**Visual**: iOS-style toggle with smooth transition

---

#### 12. Divider
**Purpose**: Visual separation

```typescript
interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: React.ReactNode; // Center label
}

// Usage
<Divider />
<Divider orientation="vertical" />
<Divider label="OR" spacing="md" />
```

---

#### 13. Skeleton
**Purpose**: Loading placeholder

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

// Usage
<Skeleton variant="text" width="200px" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height="200px" />
```

---

#### 14. Image
**Purpose**: Optimized image rendering

```typescript
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode; // Show on error
  loading?: 'lazy' | 'eager';
  aspectRatio?: '1:1' | '16:9' | '4:3' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
}

// Usage
<Image src="/photo.jpg" alt="Product" aspectRatio="16:9" loading="lazy" />
<Image src="/avatar.jpg" fallback={<IconUser />} />
```

---

#### 15. Link
**Purpose**: Navigation element

```typescript
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'primary';
  underline?: 'always' | 'hover' | 'none';
  external?: boolean; // Opens in new tab, adds rel="noopener"
  as?: React.ElementType; // Support for Next.js Link, React Router Link
}

// Usage
<Link href="/page">Internal Link</Link>
<Link href="https://example.com" external>External Link</Link>
<Link as={NextLink} href="/about">Next.js Link</Link>
```

---

#### 16. VisuallyHidden
**Purpose**: Screen reader only content

```typescript
interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

// Usage
<button>
  <Icon as={IconTrash} />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>
```

**Implementation**: CSS clip technique (not `display: none` which hides from screen readers)

---

#### 17. FocusTrap
**Purpose**: Trap keyboard focus (for modals, dialogs)

```typescript
interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  returnFocus?: boolean; // Return focus to trigger element on unmount
}
```

---

#### 18. Portal
**Purpose**: Render outside DOM hierarchy

```typescript
interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement; // Default: document.body
}
```

---

#### 19. ProgressBar
**Purpose**: Linear progress indicator

```typescript
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  indeterminate?: boolean; // Unknown duration
}

// Usage
<ProgressBar value={65} showLabel />
<ProgressBar indeterminate variant="primary" />
```

---

#### 20. Code
**Purpose**: Code/monospace text display

```typescript
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean; // <code> vs <pre><code>
  language?: string; // For syntax highlighting integration
  children: string;
}

// Usage
<Code inline>npm install</Code>
<Code language="typescript">{codeString}</Code>
```

---

## MOLECULES (15 components)

#### 1. FormField
**Purpose**: Complete form input with label, error, hint

**Composition**: Label + Input + ErrorText + HintText

```typescript
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactElement<InputProps>; // Input, Textarea, Select, etc.
}

// Usage
<FormField
  label="Email"
  required
  error="Invalid email format"
  hint="We'll never share your email"
>
  <Input type="email" />
</FormField>
```

**Visual Layout**:
```
[Label] (required indicator)
[Input field]
[Hint text in muted color] OR [Error text in red]
```

---

#### 2. Card
**Purpose**: Content container

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean; // Lift on hover
}

// Compound component structure
Card.Root
Card.Header
Card.Body
Card.Footer

// Usage
<Card variant="elevated" hoverable>
  <Card.Header>
    <Text variant="heading-3">Card Title</Text>
  </Card.Header>
  <Card.Body>
    <Text>Card content goes here</Text>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

#### 3. Alert
**Purpose**: Inline feedback messages

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

// Usage
<Alert variant="success" title="Success!" closable>
  Your changes have been saved.
</Alert>
<Alert variant="error" icon={<IconAlertTriangle />}>
  Something went wrong.
</Alert>
```

**Visual**: Color-coded left border, icon, title, description, optional close button

---

#### 4. Tooltip
**Purpose**: Contextual help on hover/focus

**Uses Radix UI Tooltip primitive**

```typescript
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
  maxWidth?: number;
}

// Usage
<Tooltip content="This is a helpful tooltip" side="top">
  <Button>Hover me</Button>
</Tooltip>
```

**Accessibility**: Triggered by hover AND focus, respects ESC key

---

#### 5. Popover
**Purpose**: Floating content panel

**Uses Radix UI Popover primitive**

```typescript
interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  modal?: boolean; // Trap focus, close on outside click
}

// Usage
<Popover
  trigger={<Button>Open</Button>}
  side="bottom"
  align="start"
>
  <div>Popover content</div>
</Popover>
```

---

#### 6. Dropdown Menu
**Purpose**: Action menu

**Uses Radix UI Dropdown primitive**

```typescript
// Compound component
DropdownMenu.Root
DropdownMenu.Trigger
DropdownMenu.Content
DropdownMenu.Item
DropdownMenu.Separator
DropdownMenu.Label
DropdownMenu.CheckboxItem
DropdownMenu.RadioGroup
DropdownMenu.RadioItem

// Usage
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button>Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={handleEdit}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={handleDuplicate}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item variant="danger" onSelect={handleDelete}>
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

**Accessibility**: Full keyboard navigation, ARIA menu role

---

#### 7. Tabs
**Purpose**: Content organization

**Uses Radix UI Tabs primitive**

```typescript
// Compound component
Tabs.Root
Tabs.List
Tabs.Trigger
Tabs.Content

// Usage
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Settings</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Account content</Tabs.Content>
  <Tabs.Content value="tab2">Settings content</Tabs.Content>
  <Tabs.Content value="tab3">Billing content</Tabs.Content>
</Tabs.Root>
```

---

#### 8. RadioGroup
**Purpose**: Grouped radio inputs

```typescript
interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

// Usage
<RadioGroup value={value} onValueChange={setValue} orientation="vertical">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>
```

---

#### 9. ButtonGroup
**Purpose**: Related button collection

```typescript
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean; // Visually connected buttons
  children: React.ReactNode;
}

// Usage
<ButtonGroup attached>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
```

---

#### 10. SearchBar
**Purpose**: Search input with icon

```typescript
interface SearchBarProps extends Omit<InputProps, 'leftIcon'> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
}

// Usage
<SearchBar
  placeholder="Search products..."
  onSearch={handleSearch}
  loading={isSearching}
/>
```

**Composition**: Input + IconSearch (left) + IconX (right, clears input) + Spinner (when loading)

---

#### 11. Modal
**Purpose**: Dialog overlay

**Uses Radix UI Dialog primitive**

```typescript
interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// Compound component
Modal.Root
Modal.Trigger
Modal.Content
Modal.Header
Modal.Body
Modal.Footer
Modal.Close

// Usage
<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Content size="md">
    <Modal.Header>
      <Text variant="heading-3">Confirm Action</Text>
    </Modal.Header>
    <Modal.Body>
      <Text>Are you sure you want to proceed?</Text>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>
```

**Features**: Focus trap, scroll lock, overlay click handling, ESC key

---

#### 12. Breadcrumb
**Purpose**: Navigation trail

```typescript
interface BreadcrumbProps {
  separator?: React.ReactNode;
  children: React.ReactNode;
}

interface BreadcrumbItemProps {
  href?: string;
  as?: React.ElementType;
  current?: boolean;
  children: React.ReactNode;
}

// Usage
<Breadcrumb separator={<IconChevronRight />}>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
  <Breadcrumb.Item current>Item Detail</Breadcrumb.Item>
</Breadcrumb>
```

**Accessibility**: `aria-label="breadcrumb"`, `aria-current="page"` on last item

---

#### 13. Pagination
**Purpose**: Navigate paged content

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Pages shown around current
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Usage
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  siblingCount={1}
/>
```

**Visual**: « First < Prev [1] ... [5] [6] [7] ... [20] Next > Last »

---

#### 14. Toast (Notification)
**Purpose**: Temporary feedback message

**Uses Radix UI Toast primitive**

```typescript
interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  duration?: number; // Auto-dismiss duration
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

// Usage (via hook)
const { showToast } = useToast();

showToast({
  title: "Success",
  description: "Your changes have been saved.",
  variant: "success",
  duration: 3000,
});
```

**Position**: Configurable via ToastProvider (top-right, bottom-center, etc.)

---

#### 15. Accordion
**Purpose**: Collapsible content sections

**Uses Radix UI Accordion primitive**

```typescript
interface AccordionProps {
  type?: 'single' | 'multiple'; // Single or multiple panels open
  defaultValue?: string | string[];
  collapsible?: boolean;
  children: React.ReactNode;
}

// Compound component
Accordion.Root
Accordion.Item
Accordion.Trigger
Accordion.Content

// Usage
<Accordion.Root type="single" defaultValue="item-1" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## Excluded Components (Consumer Responsibility)

These are too application-specific:

### Organisms
- **Data Tables**: Complex state, sorting, filtering, pagination logic
- **Navigation Bars**: Application-specific structure, routing
- **Sidebars/Drawers**: Layout-specific
- **Forms**: Business logic, validation, submission
- **File Upload**: Backend integration
- **Rich Text Editor**: Heavy dependency, niche use case
- **Date/Time Picker**: Complex, heavy (recommend integration guide for react-day-picker)
- **Multi-select/Autocomplete**: Complex state, async data

### Why Exclude?
1. **State Management**: Too opinionated (Redux, Zustand, Context?)
2. **Data Fetching**: Should be handled by consumer (React Query, SWR, etc.)
3. **Routing**: Consumer's choice (Next.js, React Router, etc.)
4. **Bundle Size**: Complex components add significant weight
5. **Customization**: High variation across applications

### Integration Guides Instead
Provide documentation on how to build these using our primitives:

```markdown
# Building a Data Table

Recommended approach:
1. Use our `Card` component as container
2. Use our `Button`, `Badge`, `Dropdown` for actions
3. Integrate TanStack Table for data logic
4. Use our `Pagination` component
5. Style with our design tokens

[Code example...]
```

---

## Component API Patterns

### 1. Polymorphic Components (as prop)
Allow rendering as different elements:

```typescript
interface PolymorphicProps<T extends React.ElementType> {
  as?: T;
}

type ButtonProps<T extends React.ElementType = 'button'> =
  PolymorphicProps<T> &
  Omit<React.ComponentPropsWithRef<T>, 'as'>;

// Usage
<Button as="a" href="/page">Link Button</Button>
<Button as={NextLink} to="/page">Next.js Link</Button>
```

### 2. Controlled vs Uncontrolled
Support both patterns:

```typescript
interface InputProps {
  // Controlled
  value?: string;
  onChange?: (value: string) => void;

  // Uncontrolled
  defaultValue?: string;
}

// Internal logic
const [internalValue, setInternalValue] = useState(defaultValue);
const isControlled = value !== undefined;
const currentValue = isControlled ? value : internalValue;
```

### 3. Compound Components
For complex components with sub-components:

```typescript
// Implementation
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

// Context-based data sharing
const CardContext = createContext<CardContextValue>();

// Usage
<Card>
  <Card.Header>Header</Card.Header>
  <Card.Body>Body</Card.Body>
</Card>
```

### 4. Render Props / Children as Function
For maximum flexibility:

```typescript
interface SelectProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  // OR
  children: (item: T) => React.ReactNode;
}

// Usage
<Select items={users} renderItem={(user) => (
  <div>{user.name}</div>
)} />
```

### 5. Ref Forwarding
Always forward refs:

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
```

### 6. Default Props Pattern
Use defaultProps or default parameters:

```typescript
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  // ...
};
```

### 7. Event Handler Naming
Consistent conventions:

```typescript
interface ComponentProps {
  // User actions
  onClick?: () => void;
  onChange?: (value: T) => void;
  onSubmit?: () => void;

  // Lifecycle
  onOpen?: () => void;
  onClose?: () => void;
  onMount?: () => void;

  // State changes (controlled components)
  onValueChange?: (value: T) => void;
  onOpenChange?: (open: boolean) => void;
}
```

---

## Composition Examples

### Building a Login Form (Consumer Code)

```typescript
import { FormField, Input, Button, Card, Text, Divider } from '@kisanlink/ui-commons';

function LoginForm() {
  return (
    <Card variant="elevated" padding="lg">
      <Card.Body>
        <Text variant="heading-2">Login</Text>
        <Text variant="body" color="secondary">
          Enter your credentials to continue
        </Text>

        <FormField label="Email" required error={errors.email}>
          <Input
            type="email"
            placeholder="you@example.com"
            leftIcon={<IconMail />}
          />
        </FormField>

        <FormField label="Password" required error={errors.password}>
          <Input
            type="password"
            placeholder="Enter password"
            leftIcon={<IconLock />}
          />
        </FormField>

        <Button variant="primary" fullWidth loading={isLoading}>
          Sign In
        </Button>

        <Divider label="OR" spacing="md" />

        <Button variant="ghost" fullWidth leftIcon={<IconGoogle />}>
          Continue with Google
        </Button>
      </Card.Body>
    </Card>
  );
}
```

### Building a Product Card

```typescript
import { Card, Image, Text, Badge, Button, ButtonGroup } from '@kisanlink/ui-commons';

function ProductCard({ product }) {
  return (
    <Card variant="outlined" hoverable>
      <Image
        src={product.image}
        alt={product.name}
        aspectRatio="4:3"
        loading="lazy"
      />
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text variant="heading-4">{product.name}</Text>
          <Badge variant={product.inStock ? 'success' : 'error'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        <Text variant="body" color="secondary">
          {product.description}
        </Text>

        <Text variant="heading-3" color="primary">
          ${product.price}
        </Text>
      </Card.Body>

      <Card.Footer>
        <ButtonGroup attached fullWidth>
          <Button variant="ghost" leftIcon={<IconHeart />}>
            Wishlist
          </Button>
          <Button variant="primary" leftIcon={<IconShoppingCart />}>
            Add to Cart
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
}
```

---

## Bundle Size Strategy

### Tree-Shaking Setup
```typescript
// index.ts - Named exports only (no default export)
export { Button } from './atoms/Button';
export { Input } from './atoms/Input';
export type { ButtonProps } from './atoms/Button';
export type { InputProps } from './atoms/Input';

// Consumer imports only what they need
import { Button, Input } from '@kisanlink/ui-commons';
```

### Code Splitting for Heavy Components
```typescript
// For large components (Modal, Accordion), provide lazy-loadable versions
export const Modal = lazy(() => import('./molecules/Modal'));
export const ModalPreload = () => import('./molecules/Modal'); // Preload utility

// Usage
import { Suspense } from 'react';
import { Modal, Skeleton } from '@kisanlink/ui-commons';

<Suspense fallback={<Skeleton />}>
  <Modal>...</Modal>
</Suspense>
```

### Size Budget
- **Core atoms** (Button, Input, Text, etc.): < 15KB gzipped
- **All atoms**: < 30KB gzipped
- **Atoms + Molecules**: < 50KB gzipped
- **Individual component**: < 5KB gzipped (except complex molecules like Modal)

---

## Testing Requirements

Each component must have:

1. **Unit Tests** (Vitest + React Testing Library)
   - Renders without crashing
   - Props work as expected
   - Variants render correctly
   - Events fire correctly
   - Refs work correctly

2. **Accessibility Tests** (axe-core)
   - No WCAG violations
   - Keyboard navigation works
   - Screen reader announcements
   - Focus management

3. **Visual Regression Tests** (Chromatic/Percy)
   - All variants
   - All states (hover, focus, disabled, etc.)
   - All sizes
   - Dark mode

4. **Type Tests**
   - TypeScript compiles
   - Prop types are correct
   - Generics work as expected

---

## Documentation Requirements

Each component must have:

1. **Storybook Stories**
   - Default story
   - All variants
   - All sizes
   - Interactive controls
   - Accessibility audit panel

2. **API Documentation** (Auto-generated from TSDoc)
```typescript
/**
 * A button component that handles user interactions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * Visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;
}
```

3. **Usage Guidelines**
   - When to use
   - When NOT to use
   - Accessibility considerations
   - Composition examples
   - Common pitfalls

---

## Versioning & Deprecation

### Deprecation Process
```typescript
/**
 * @deprecated Use `variant="primary"` instead. Will be removed in v3.0
 */
export interface ButtonProps {
  /** @deprecated */
  type?: 'primary' | 'secondary';

  /** New prop */
  variant?: 'primary' | 'secondary' | 'ghost';
}

// Runtime warning
if (process.env.NODE_ENV === 'development' && props.type) {
  console.warn(
    'Button: `type` prop is deprecated. Use `variant` instead. ' +
    'This will be removed in v3.0'
  );
}
```

### Version Migration
- **Patch (1.0.x)**: Bug fixes, no API changes
- **Minor (1.x.0)**: New components, new props (backward compatible)
- **Major (x.0.0)**: Breaking changes (removal of deprecated APIs)

---

This completes the component hierarchy specification. Next, I'll create the theming system architecture.
