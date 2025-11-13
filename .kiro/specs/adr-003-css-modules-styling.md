# ADR-003: CSS Modules for Styling

**Status**: Accepted
**Date**: 2025-11-13
**Deciders**: Backend Architecture Team
**Consulted**: Frontend Team, UX Team

## Context

We need to select a styling solution for the KisanLink UI Commons component library. The solution must:
- Support component-scoped styles (no global namespace pollution)
- Enable theming and customization
- Provide excellent performance (minimal runtime overhead)
- Work well with TypeScript
- Support SSR (Server-Side Rendering)
- Be maintainable and familiar to team

Options considered:
1. **CSS Modules** + CSS Variables
2. **Styled-components** (CSS-in-JS)
3. **Emotion** (CSS-in-JS)
4. **Tailwind CSS** (utility-first)
5. **Vanilla Extract** (type-safe CSS-in-TS)
6. **Sass/SCSS Modules**

## Decision

We will use **CSS Modules** with **CSS Variables** for theming.

## Rationale

### CSS Modules Advantages

1. **Zero Runtime Overhead**
   - Styles extracted at build time to static CSS files
   - No JavaScript execution required for styling
   - Minimal bundle size impact (~0 bytes JS, only CSS)
   - No hydration issues in SSR

2. **Scoped Styles by Default**
   - Class names automatically scoped to component
   - No naming conflicts between components
   - No need for naming conventions (BEM, etc.)
   - Example: `.button` → `.Button__button__a3c2f`

3. **Performance**
   - Browser-native CSS parsing (faster than JS-based)
   - CSS loaded in parallel with JS (non-blocking)
   - No FOUC (Flash of Unstyled Content) when using SSR
   - No runtime style injection overhead

4. **TypeScript Support**
   - Type definitions can be auto-generated for class names
   - IDE autocomplete for CSS classes
   - Type-safe imports

5. **Familiar Developer Experience**
   - Standard CSS syntax (low learning curve)
   - Works with existing CSS tools (PostCSS, autoprefixer)
   - Easy to debug in DevTools (static CSS classes)
   - No special JSX syntax required

6. **SSR Safe**
   - Static CSS works perfectly with SSR
   - No hydration mismatches
   - No server/client style duplication
   - Predictable output

7. **Build Tool Integration**
   - First-class support in Vite, Webpack, Rollup
   - CSS code-splitting out of the box
   - Minification and optimization built-in

### CSS Variables for Theming

1. **Runtime Customization**
   - Theme changes without rebuilding CSS
   - JavaScript can modify CSS variables
   - Browser-native, performant

2. **Cascading & Inheritance**
   - Variables inherit through DOM tree
   - Easy to create themed sections
   - Natural scoping with CSS

3. **No Duplication**
   - Single CSS file works with multiple themes
   - Themes only define variable values (minimal size)
   - No theme-specific CSS builds needed

### Comparison with Alternatives

#### Styled-components / Emotion (CSS-in-JS)
- ❌ **Runtime Overhead**: 10-15KB JS minimum
- ❌ **Performance**: Style injection on every render
- ❌ **SSR Complexity**: Requires server-side style collection
- ❌ **Bundle Size**: Significant JS bundle increase
- ❌ **Hydration**: Can cause FOUC if not configured perfectly
- ✅ **Co-location**: Styles next to components (CSS Modules can do this too)
- ✅ **Dynamic Styles**: Easy prop-based styling (we don't need this often)
- **Verdict**: Performance cost not justified for component library

#### Tailwind CSS
- ❌ **Design System Mismatch**: Utility classes don't match component API
- ❌ **Class Name Explosion**: Long className strings
- ❌ **Customization Difficulty**: Overriding utilities is verbose
- ❌ **Learning Curve**: Team needs to learn Tailwind conventions
- ✅ **Rapid Prototyping**: Fast for applications (not libraries)
- ✅ **Consistency**: Built-in design tokens
- **Verdict**: Better for applications consuming our library, not for library itself

#### Vanilla Extract
- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Zero Runtime**: Extracted at build time like CSS Modules
- ✅ **Modern**: Cutting-edge technology
- ❌ **Ecosystem Maturity**: Newer, less battle-tested
- ❌ **Migration Cost**: Different from standard CSS
- ❌ **Tooling Support**: Less IDE support than CSS
- **Verdict**: Interesting but adds complexity without clear benefits

#### Sass/SCSS Modules
- ✅ **Variables & Mixins**: Powerful preprocessing
- ✅ **Scoped**: Works like CSS Modules
- ❌ **Build Step**: Requires Sass compiler (additional dependency)
- ❌ **CSS Variables Better**: CSS variables provide runtime theming
- ❌ **Not Needed**: PostCSS provides nesting and other features
- **Verdict**: Adds complexity, CSS + PostCSS sufficient

## Implementation

### Component Style Structure

```
src/atoms/Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx
└── index.ts
```

### CSS Module Example

```css
/* Button.module.css */
.button {
  /* Use CSS variables for themeable values */
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);

  /* Spacing from theme */
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);

  /* Colors from theme */
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease);

  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  white-space: nowrap;
  user-select: none;
}

.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Variants */
.button--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.button--primary:active:not(:disabled) {
  background-color: var(--color-primary-darker);
}

.button--secondary {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

/* Sizes */
.button--sm {
  font-size: var(--font-size-sm);
  padding: var(--spacing-1) var(--spacing-3);
}

.button--lg {
  font-size: var(--font-size-lg);
  padding: var(--spacing-3) var(--spacing-6);
}

/* States */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button--loading {
  position: relative;
  color: transparent;
}

.button--fullWidth {
  width: 100%;
}

/* Icon spacing */
.icon {
  display: inline-flex;
  flex-shrink: 0;
}
```

### TypeScript Component

```typescript
// Button.tsx
import React from 'react';
import clsx from 'clsx'; // Tiny utility for conditional classes
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClassName = clsx(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      loading && styles['button--loading'],
      fullWidth && styles['button--fullWidth'],
      className // Allow consumer overrides
    );

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner className={styles.icon} size="sm" />}
        {!loading && startIcon && <span className={styles.icon}>{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className={styles.icon}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### TypeScript Definitions for CSS Modules

```typescript
// vite-env.d.ts
/// <reference types="vite/client" />

// CSS Module type definitions
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

**Auto-generation** (optional with `typescript-plugin-css-modules`):
```typescript
// Button.module.css.d.ts (auto-generated)
export const button: string;
export const button__primary: string;
export const button__secondary: string;
export const button__sm: string;
export const button__md: string;
export const button__lg: string;
export const button__loading: string;
export const button__fullWidth: string;
export const icon: string;
```

### Theme System with CSS Variables

```typescript
// theme/tokens.ts
export const lightTheme = {
  colors: {
    primary: '#007A3D',
    primaryDark: '#005A2D',
    primaryDarker: '#004020',
    primaryLight: '#E6F5ED',
    primaryContrast: '#FFFFFF',

    secondary: '#F59E0B',
    // ... more colors

    focus: '#3B82F6', // Focus ring color
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    // ...
  },
  typography: {
    fontFamily: {
      base: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'Fira Code, monospace',
    },
    fontSize: {
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      // ...
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      base: '1.5',
      tight: '1.25',
      loose: '1.75',
    },
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#00A850',
    primaryDark: '#008A40',
    // ... dark mode overrides
  },
};
```

```typescript
// theme/ThemeProvider.tsx
import React, { useEffect } from 'react';

export interface Theme {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: any;
  radius: Record<string, string>;
  duration: Record<string, string>;
  easing: Record<string, string>;
}

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

const flattenTheme = (theme: Theme): Record<string, string> => {
  const flattened: Record<string, string> = {};

  // Flatten colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    flattened[`--color-${key}`] = value;
  });

  // Flatten spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    flattened[`--spacing-${key}`] = value;
  });

  // Flatten typography
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    flattened[`--font-family-${key}`] = value;
  });
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    flattened[`--font-size-${key}`] = value;
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    flattened[`--font-weight-${key}`] = value;
  });
  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    flattened[`--line-height-${key}`] = value;
  });

  // Flatten radius, duration, easing
  Object.entries(theme.radius).forEach(([key, value]) => {
    flattened[`--radius-${key}`] = value;
  });
  Object.entries(theme.duration).forEach(([key, value]) => {
    flattened[`--duration-${key}`] = value;
  });
  Object.entries(theme.easing).forEach(([key, value]) => {
    flattened[`--easing-${key}`] = value;
  });

  return flattened;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = lightTheme,
  children,
}) => {
  useEffect(() => {
    const variables = flattenTheme(theme);
    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return <>{children}</>;
};
```

### Base Styles (CSS Reset)

```css
/* styles/base.css */
:root {
  /* Default theme variables (light theme) */
  --color-primary: #007A3D;
  --color-primary-dark: #005A2D;
  /* ... all other variables with defaults */
}

/* CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font: inherit;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
textarea,
select {
  font: inherit;
}
```

### PostCSS Configuration

```javascript
// postcss.config.js
export default {
  plugins: {
    'postcss-nesting': {}, // CSS nesting support
    autoprefixer: {}, // Vendor prefixes
    cssnano: process.env.NODE_ENV === 'production' ? {} : false, // Minification
  },
};
```

## Performance Metrics

### Bundle Size Impact
- **CSS Modules**: ~0 bytes JS overhead (only CSS file size)
- **Styled-components**: ~12KB min+gzip baseline + style injection runtime
- **Emotion**: ~7KB min+gzip baseline + style injection runtime
- **Verdict**: CSS Modules = 100% savings on JS bundle

### Runtime Performance
- **CSS Modules**: Native browser CSS parsing (~instant)
- **CSS-in-JS**: Style injection + serialization (~5-10ms per component)
- **Verdict**: CSS Modules = no runtime overhead

### First Contentful Paint (FCP)
- **CSS Modules**: CSS loaded in parallel, no blocking JS
- **CSS-in-JS**: Styles injected after JS execution
- **Verdict**: CSS Modules = faster FCP

### Server-Side Rendering
- **CSS Modules**: Static CSS, works perfectly
- **CSS-in-JS**: Requires style collection, hydration complexity
- **Verdict**: CSS Modules = simpler SSR

## Consequences

### Positive
- ✅ Zero runtime JavaScript for styling
- ✅ Optimal performance (native CSS)
- ✅ Familiar developer experience (standard CSS)
- ✅ Simple SSR implementation
- ✅ Type-safe with auto-generated definitions
- ✅ Easy debugging (static class names in DevTools)
- ✅ Works with all bundlers (Vite, Webpack, Rollup)

### Negative
- ❌ No dynamic prop-based styles (use variants instead)
- ❌ Separate files for styles (not co-located in TS)
- ❌ Need to learn CSS variable pattern for theming

### Mitigations
- **Dynamic Styles**: Use data attributes + CSS or inline styles for rare dynamic values
- **Co-location**: Place `.module.css` next to `.tsx` (still co-located)
- **Learning Curve**: Minimal, CSS variables are web standards

## Consumer Usage

### Basic Import
```typescript
import { Button } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css'; // Import once in app root
```

### With Custom Theme
```typescript
import { ThemeProvider, createTheme } from '@kisanlink/ui-commons/theme';

const customTheme = createTheme({
  colors: {
    primary: '#007A3D',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Overriding Styles (Consumer)
```typescript
// Consumer can extend with their own CSS
import { Button } from '@kisanlink/ui-commons';
import './custom-button.css';

<Button className="my-custom-button">Click Me</Button>
```

```css
/* custom-button.css */
.my-custom-button {
  /* Override CSS variables for this instance */
  --color-primary: #FF0000;

  /* Or add additional styles */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Compliance

### Accessibility
- ✅ CSS-only styles don't affect accessibility
- ✅ Focus styles easily customizable with CSS
- ✅ High contrast mode compatible

### Security
- ✅ No runtime code injection (unlike CSS-in-JS)
- ✅ CSP-compatible (no inline styles)
- ✅ No XSS vectors from styling

### Performance
- ✅ Minimal bundle size impact
- ✅ Native browser performance
- ✅ No hydration overhead

## References

- [CSS Modules Specification](https://github.com/css-modules/css-modules)
- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [PostCSS Nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting)
- [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules)

## Decision Outcome

**Accepted** - CSS Modules + CSS Variables for styling and theming.

**Review Trigger**:
- Need for complex dynamic styles arises (evaluate inline styles or data attributes)
- Team requests CSS-in-JS for specific reasons
- Performance issues related to CSS (highly unlikely)

**Next Steps**: See ADR-004 for testing strategy.
