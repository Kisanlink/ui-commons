# @kisanlink/ui-commons

Production-grade React component library for the KisanLink ecosystem.

## Features

- 🎨 **Design System**: Comprehensive design tokens and theming
- 📦 **Tree-shakeable**: Import only what you need
- 🎯 **TypeScript**: Full type safety with TypeScript definitions
- ♿ **Accessible**: WCAG 2.1 AA compliant components
- 🧪 **Tested**: Comprehensive unit and accessibility tests
- 📚 **Documented**: Storybook with interactive examples
- 🎭 **CSS Modules**: Scoped styles with zero runtime overhead
- 🌗 **Dark Mode**: Built-in theme support

## Installation

```bash
npm install @kisanlink/ui-commons
```

## Usage

### Basic Example

```tsx
import { Button, Input, Card } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css';

function App() {
  return (
    <Card variant="elevated">
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <Input placeholder="Enter your email" />
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}
```

### With Theme Provider

```tsx
import { ThemeProvider, Button } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button variant="primary">Click Me</Button>
    </ThemeProvider>
  );
}
```

## Components

### Atoms (10 components)
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger), sizes, loading states, icons
- **Input**: Form inputs with icons, validation states, sizes
- **Badge**: Status indicators and labels with variants
- **Checkbox**: Checkboxes with indeterminate state, labels, error handling
- **Radio**: Radio buttons with RadioGroup for grouped selections
- **Switch**: Toggle switches with labels, helper text, error states
- **Spinner**: Loading indicators with 3 animations (spin, pulse, dots), multiple sizes and colors
- **Skeleton**: Loading placeholders with variants (text, rectangular, circular), wave animation
- **Avatar**: User profile images with fallback to initials, status indicators, sizes, AvatarGroup for stacking

### Molecules (1 component)
- **Card**: Container component with Card.Header, Card.Body, Card.Footer composition

## Theming

The library uses CSS variables for theming. You can customize the theme by overriding CSS variables:

```css
:root {
  --color-primary-600: #your-color;
  --font-family-sans: 'Your Font', sans-serif;
}
```

Or use the ThemeProvider for light/dark mode:

```tsx
import { ThemeProvider, useTheme } from '@kisanlink/ui-commons';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm test

# Build library
npm run build
```

## Documentation

Visit [Storybook](http://localhost:6006) for interactive component documentation and examples.

## License

MIT © KisanLink
