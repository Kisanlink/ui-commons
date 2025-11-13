# Theming System Architecture

## Overview

KisanLink UI Commons uses a **CSS Variables-based theming system** that enables:
- Runtime theme switching (no rebuild required)
- Dark mode support
- Per-application brand customization
- Server-side rendering compatibility
- Minimal JavaScript overhead

---

## Design Token Structure

### File Organization

```
src/theme/
├── tokens/
│   ├── colors.css          # Color palette tokens
│   ├── typography.css      # Font and text tokens
│   ├── spacing.css         # Spacing scale
│   ├── borders.css         # Border radius, widths
│   ├── shadows.css         # Elevation system
│   ├── motion.css          # Animation timing
│   └── index.css           # Aggregates all tokens
├── themes/
│   ├── light.css           # Light theme variables
│   ├── dark.css            # Dark theme variables
│   └── kisanlink.ts        # KisanLink brand theme (TypeScript config)
├── Provider.tsx            # ThemeProvider component
├── useTheme.ts             # Theme hook
├── types.ts                # TypeScript types
└── index.ts                # Public exports
```

---

## Token Layers

### Layer 1: Primitive Tokens (Foundation)
Raw color, spacing, and typography values. These rarely change.

```css
/* tokens/colors.css */
:root {
  /* Palette - Green (Primary) */
  --palette-green-50: #f0fdf4;
  --palette-green-100: #dcfce7;
  --palette-green-200: #bbf7d0;
  --palette-green-300: #86efac;
  --palette-green-400: #4ade80;
  --palette-green-500: #22c55e;
  --palette-green-600: #16a34a;
  --palette-green-700: #15803d;
  --palette-green-800: #166534;
  --palette-green-900: #14532d;
  --palette-green-950: #052e16;

  /* Palette - Amber (Secondary) */
  --palette-amber-50: #fffbeb;
  --palette-amber-100: #fef3c7;
  /* ... rest of amber scale ... */

  /* Palette - Neutral (Gray) */
  --palette-neutral-50: #fafaf9;
  --palette-neutral-100: #f5f5f4;
  /* ... rest of neutral scale ... */

  /* Palette - Semantic */
  --palette-red-500: #ef4444;
  --palette-red-700: #b91c1c;
  --palette-blue-500: #3b82f6;
  --palette-blue-700: #1d4ed8;
}
```

### Layer 2: Semantic Tokens (Meaning)
Map primitives to semantic purposes. Change based on theme (light/dark).

```css
/* themes/light.css */
:root,
[data-theme="light"] {
  /* Brand Colors */
  --color-primary: var(--palette-green-600);
  --color-primary-hover: var(--palette-green-700);
  --color-primary-active: var(--palette-green-800);
  --color-on-primary: #ffffff; /* Text on primary color */

  --color-secondary: var(--palette-amber-500);
  --color-secondary-hover: var(--palette-amber-600);
  --color-on-secondary: var(--palette-neutral-900);

  /* Backgrounds */
  --color-background: #ffffff;
  --color-surface: var(--palette-neutral-50);
  --color-surface-hover: var(--palette-neutral-100);
  --color-surface-active: var(--palette-neutral-200);

  /* Text */
  --color-text-primary: var(--palette-neutral-900);
  --color-text-secondary: var(--palette-neutral-700);
  --color-text-tertiary: var(--palette-neutral-500);
  --color-text-disabled: var(--palette-neutral-400);
  --color-text-inverse: #ffffff;

  /* Borders */
  --color-border-light: var(--palette-neutral-200);
  --color-border-medium: var(--palette-neutral-300);
  --color-border-strong: var(--palette-neutral-400);
  --color-border-focus: var(--color-primary);

  /* Semantic States */
  --color-success: var(--palette-green-600);
  --color-success-bg: var(--palette-green-50);
  --color-success-border: var(--palette-green-200);

  --color-warning: var(--palette-amber-600);
  --color-warning-bg: var(--palette-amber-50);
  --color-warning-border: var(--palette-amber-200);

  --color-error: var(--palette-red-600);
  --color-error-bg: var(--palette-red-50);
  --color-error-border: var(--palette-red-200);

  --color-info: var(--palette-blue-600);
  --color-info-bg: var(--palette-blue-50);
  --color-info-border: var(--palette-blue-200);
}
```

```css
/* themes/dark.css */
[data-theme="dark"] {
  /* Brand Colors - Adjusted for dark backgrounds */
  --color-primary: var(--palette-green-500);
  --color-primary-hover: var(--palette-green-400);
  --color-primary-active: var(--palette-green-300);
  --color-on-primary: var(--palette-neutral-900);

  --color-secondary: var(--palette-amber-400);
  --color-secondary-hover: var(--palette-amber-300);
  --color-on-secondary: var(--palette-neutral-900);

  /* Backgrounds */
  --color-background: var(--palette-neutral-950);
  --color-surface: var(--palette-neutral-900);
  --color-surface-hover: var(--palette-neutral-800);
  --color-surface-active: var(--palette-neutral-700);

  /* Text */
  --color-text-primary: var(--palette-neutral-50);
  --color-text-secondary: var(--palette-neutral-300);
  --color-text-tertiary: var(--palette-neutral-500);
  --color-text-disabled: var(--palette-neutral-600);
  --color-text-inverse: var(--palette-neutral-900);

  /* Borders */
  --color-border-light: var(--palette-neutral-800);
  --color-border-medium: var(--palette-neutral-700);
  --color-border-strong: var(--palette-neutral-600);
  --color-border-focus: var(--color-primary);

  /* Semantic States - Brighter for dark backgrounds */
  --color-success: var(--palette-green-500);
  --color-success-bg: rgba(34, 197, 94, 0.1);
  --color-success-border: var(--palette-green-800);

  --color-warning: var(--palette-amber-500);
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-warning-border: var(--palette-amber-800);

  --color-error: var(--palette-red-500);
  --color-error-bg: rgba(239, 68, 68, 0.1);
  --color-error-border: var(--palette-red-800);

  --color-info: var(--palette-blue-500);
  --color-info-bg: rgba(59, 130, 246, 0.1);
  --color-info-border: var(--palette-blue-800);

  /* Shadows - Darker, more pronounced */
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5);
  --shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5);
}
```

### Layer 3: Component Tokens (Scoped)
Component-specific tokens that reference semantic tokens.

```css
/* Component: Button */
.button {
  /* Local tokens (can be overridden per variant) */
  --button-bg: var(--color-primary);
  --button-text: var(--color-on-primary);
  --button-border: transparent;
  --button-shadow: var(--shadow-sm);

  background: var(--button-bg);
  color: var(--button-text);
  border: 1px solid var(--button-border);
  box-shadow: var(--button-shadow);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
}

.button:hover {
  --button-bg: var(--color-primary-hover);
  --button-shadow: var(--shadow-md);
}

.button[data-variant="secondary"] {
  --button-bg: var(--color-secondary);
  --button-text: var(--color-on-secondary);
}

.button[data-variant="ghost"] {
  --button-bg: transparent;
  --button-text: var(--color-primary);
  --button-border: var(--color-border-medium);
  --button-shadow: none;
}

.button:disabled {
  --button-bg: var(--color-surface-hover);
  --button-text: var(--color-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## ThemeProvider Component

### Implementation

```typescript
// src/theme/Provider.tsx
import React, { createContext, useEffect, useState } from 'react';
import type { Theme, ThemeMode } from './types';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme; // Custom theme object
  defaultMode?: ThemeMode;
  storageKey?: string; // LocalStorage key for persistence
}

export function ThemeProvider({
  children,
  theme: customTheme,
  defaultMode = 'light',
  storageKey = 'kisanlink-theme-mode',
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') return stored;
    }
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return defaultMode;
  });

  const [theme, setTheme] = useState<Theme>(customTheme || defaultKisanLinkTheme);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newMode);
    }
  };

  // Apply theme mode to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);

    // Optional: Add theme class for mode-specific CSS
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }, [mode]);

  // Apply custom theme CSS variables
  useEffect(() => {
    if (!customTheme) return;

    const root = document.documentElement;
    const style = root.style;

    // Apply color overrides
    if (customTheme.colors) {
      Object.entries(customTheme.colors).forEach(([key, value]) => {
        style.setProperty(`--color-${key}`, value);
      });
    }

    // Apply spacing overrides
    if (customTheme.spacing) {
      Object.entries(customTheme.spacing).forEach(([key, value]) => {
        style.setProperty(`--spacing-${key}`, value);
      });
    }

    // Apply typography overrides
    if (customTheme.typography?.fontFamily) {
      style.setProperty('--font-sans', customTheme.typography.fontFamily);
    }

    // Apply border radius overrides
    if (customTheme.borderRadius) {
      Object.entries(customTheme.borderRadius).forEach(([key, value]) => {
        style.setProperty(`--radius-${key}`, value);
      });
    }
  }, [customTheme]);

  // Listen to system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem(storageKey);
      if (!hasManualPreference) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [storageKey]);

  const contextValue: ThemeContextValue = {
    theme,
    mode,
    setMode,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Hook

```typescript
// src/theme/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from './Provider';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

---

## Theme Type Definitions

```typescript
// src/theme/types.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary?: string;
  'primary-hover'?: string;
  secondary?: string;
  'secondary-hover'?: string;
  background?: string;
  surface?: string;
  'text-primary'?: string;
  'text-secondary'?: string;
  // ... other color overrides
}

export interface ThemeSpacing {
  0?: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  6?: string;
  8?: string;
  // ... other spacing overrides
}

export interface ThemeTypography {
  fontFamily?: string;
  fontFamilyMono?: string;
  fontSize?: {
    xs?: string;
    sm?: string;
    base?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
    '3xl'?: string;
  };
}

export interface ThemeBorderRadius {
  none?: string;
  sm?: string;
  base?: string;
  md?: string;
  lg?: string;
  xl?: string;
  full?: string;
}

export interface Theme {
  colors?: ThemeColors;
  spacing?: ThemeSpacing;
  typography?: ThemeTypography;
  borderRadius?: ThemeBorderRadius;
}
```

---

## Brand Theme Configuration

### KisanLink Default Theme

```typescript
// src/theme/themes/kisanlink.ts
import type { Theme } from '../types';

export const kisanlinkTheme: Theme = {
  colors: {
    // Override default primary to KisanLink's brand green
    primary: '#16a34a',
    'primary-hover': '#15803d',
    secondary: '#f59e0b',
    'secondary-hover': '#d97706',
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  borderRadius: {
    base: '4px',
    md: '6px',
    lg: '8px',
  },
};
```

### Custom Theme for Admin Panel

```typescript
// admin-panel/src/theme.ts
import { createTheme } from '@kisanlink/ui-commons/theme';

export const adminTheme = createTheme({
  colors: {
    primary: '#6366f1', // Indigo for admin
    'primary-hover': '#4f46e5',
    secondary: '#8b5cf6', // Purple
  },
  spacing: {
    // Use tighter spacing for dense admin interfaces
    4: '14px', // Override default 16px
  },
});
```

### Usage in Application

```typescript
// App.tsx
import { ThemeProvider } from '@kisanlink/ui-commons';
import { adminTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={adminTheme} defaultMode="light">
      <YourAppContent />
    </ThemeProvider>
  );
}
```

---

## Theme Customization API

### createTheme() Helper

```typescript
// src/theme/createTheme.ts
import type { Theme } from './types';
import { kisanlinkTheme } from './themes/kisanlink';

/**
 * Creates a theme by merging custom overrides with the default KisanLink theme
 */
export function createTheme(overrides: Theme): Theme {
  return {
    colors: {
      ...kisanlinkTheme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...kisanlinkTheme.spacing,
      ...overrides.spacing,
    },
    typography: {
      ...kisanlinkTheme.typography,
      ...overrides.typography,
      fontSize: {
        ...kisanlinkTheme.typography?.fontSize,
        ...overrides.typography?.fontSize,
      },
    },
    borderRadius: {
      ...kisanlinkTheme.borderRadius,
      ...overrides.borderRadius,
    },
  };
}
```

---

## Dark Mode Implementation

### Automatic Detection

```typescript
// Handled by ThemeProvider automatically
<ThemeProvider defaultMode="light">
  <App />
</ThemeProvider>

// ThemeProvider will:
// 1. Check localStorage for saved preference
// 2. Check system preference (prefers-color-scheme)
// 3. Fall back to defaultMode
```

### Manual Toggle

```typescript
// In your app's theme toggle button
import { useTheme } from '@kisanlink/ui-commons';

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={toggleTheme} leftIcon={mode === 'light' ? <IconMoon /> : <IconSun />}>
      {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

### Respecting User Preference

```typescript
// ThemeProvider automatically listens to system changes
// But won't override if user has manually set a preference

// To reset to system preference:
const { setMode } = useTheme();

function ResetTheme() {
  const resetToSystem = () => {
    localStorage.removeItem('kisanlink-theme-mode'); // Clear manual preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(systemPrefersDark ? 'dark' : 'light');
  };

  return <Button onClick={resetToSystem}>Reset to System</Button>;
}
```

---

## Component-Level Theme Overrides

### Using CSS Variables Directly

```typescript
// Override a single component instance
<Button
  style={{
    '--button-bg': '#8b5cf6',
    '--button-text': '#ffffff',
  } as React.CSSProperties}
>
  Custom Purple Button
</Button>
```

### Creating Themed Component Variants

```css
/* Custom variant in consumer app */
.button[data-variant="admin-primary"] {
  --button-bg: var(--color-admin-primary);
  --button-text: white;
}
```

```typescript
// Use in component
<Button data-variant="admin-primary">Admin Action</Button>
```

---

## Theme Tokens Reference

### Complete Token List

```css
:root {
  /* ========================================
     COLORS
     ======================================== */

  /* Brand */
  --color-primary: ...;
  --color-primary-hover: ...;
  --color-primary-active: ...;
  --color-on-primary: ...;

  --color-secondary: ...;
  --color-secondary-hover: ...;
  --color-secondary-active: ...;
  --color-on-secondary: ...;

  /* Backgrounds */
  --color-background: ...;
  --color-surface: ...;
  --color-surface-hover: ...;
  --color-surface-active: ...;

  /* Text */
  --color-text-primary: ...;
  --color-text-secondary: ...;
  --color-text-tertiary: ...;
  --color-text-disabled: ...;
  --color-text-inverse: ...;

  /* Borders */
  --color-border-light: ...;
  --color-border-medium: ...;
  --color-border-strong: ...;
  --color-border-focus: ...;

  /* Semantic */
  --color-success: ...;
  --color-success-bg: ...;
  --color-success-border: ...;

  --color-warning: ...;
  --color-warning-bg: ...;
  --color-warning-border: ...;

  --color-error: ...;
  --color-error-bg: ...;
  --color-error-border: ...;

  --color-info: ...;
  --color-info-bg: ...;
  --color-info-border: ...;

  /* ========================================
     SPACING
     ======================================== */
  --spacing-0: 0;
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* ========================================
     TYPOGRAPHY
     ======================================== */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-md: 1.125rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 1.875rem;
  --font-size-3xl: 2.25rem;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ========================================
     BORDERS
     ======================================== */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;

  /* ========================================
     SHADOWS
     ======================================== */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --shadow-focus: 0 0 0 3px var(--color-primary-200);

  /* ========================================
     MOTION
     ======================================== */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;

  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* ========================================
     Z-INDEX
     ======================================== */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-overlay: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  --z-toast: 1700;

  /* ========================================
     BREAKPOINTS (for reference, not CSS vars)
     ======================================== */
  /* Use in media queries: @media (min-width: 768px) */
  /* --breakpoint-sm: 640px; */
  /* --breakpoint-md: 768px; */
  /* --breakpoint-lg: 1024px; */
  /* --breakpoint-xl: 1280px; */
}
```

---

## SSR Considerations

### Preventing Flash of Unstyled Content (FOUC)

```html
<!-- In <head> before React hydrates -->
<script>
  (function() {
    // Read theme preference immediately
    const storageKey = 'kisanlink-theme-mode';
    const stored = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');

    // Apply theme attribute immediately
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add(theme);
  })();
</script>
```

### Next.js Integration

```typescript
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/_next/static/css/tokens.css" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const stored = localStorage.getItem('kisanlink-theme-mode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

---

## Performance Optimization

### CSS Variable Scoping
Avoid setting variables on deeply nested elements; use `:root` or `[data-theme]` for theme-level changes.

### Avoid JavaScript-Heavy Theming
CSS variables update in the browser's rendering engine, not JavaScript. This makes theme switching instant.

### Critical CSS Inlining
Inline token CSS in `<head>` for first paint:

```html
<style>
  /* Critical tokens only */
  :root {
    --color-primary: #16a34a;
    --color-background: #ffffff;
    --spacing-4: 1rem;
    /* ... essential tokens ... */
  }
</style>
```

---

## Testing Themes

### Visual Regression Tests
Test both light and dark modes:

```typescript
// Button.stories.tsx
export const AllThemes: Story = {
  render: () => (
    <>
      <div data-theme="light">
        <Button>Light Mode</Button>
      </div>
      <div data-theme="dark">
        <Button>Dark Mode</Button>
      </div>
    </>
  ),
};
```

### Accessibility Tests
Ensure contrast ratios meet WCAG AA in both themes:

```typescript
import { axe } from 'jest-axe';

test('Button has sufficient contrast in light mode', async () => {
  const { container } = render(
    <div data-theme="light">
      <Button>Click me</Button>
    </div>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Button has sufficient contrast in dark mode', async () => {
  const { container } = render(
    <div data-theme="dark">
      <Button>Click me</Button>
    </div>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Migration Guide for Consumers

### From Hardcoded Colors

**Before:**
```css
.my-component {
  background: #22c55e;
  color: #ffffff;
}
```

**After:**
```css
.my-component {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

### From Component-Specific Themes

**Before:**
```typescript
<Button style={{ backgroundColor: '#16a34a' }}>Click</Button>
```

**After:**
```typescript
<Button>Click</Button> {/* Uses theme's primary color */}

{/* Or override with theme token */}
<Button style={{ '--button-bg': 'var(--color-secondary)' }}>Click</Button>
```

---

This completes the theming system architecture. Next, I'll create accessibility and responsive design specifications.
