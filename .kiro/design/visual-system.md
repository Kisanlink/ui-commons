# Visual Design System Specification

## Design Tokens

### Color System

#### Primary Palette
Based on agricultural/nature themes appropriate for KisanLink brand:

```css
:root {
  /* Primary - Agricultural Green */
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-200: #bbf7d0;
  --color-primary-300: #86efac;
  --color-primary-400: #4ade80;
  --color-primary-500: #22c55e;  /* Base primary */
  --color-primary-600: #16a34a;  /* Primary dark */
  --color-primary-700: #15803d;
  --color-primary-800: #166534;
  --color-primary-900: #14532d;
  --color-primary-950: #052e16;

  /* Secondary - Harvest Orange/Amber */
  --color-secondary-50: #fffbeb;
  --color-secondary-100: #fef3c7;
  --color-secondary-200: #fde68a;
  --color-secondary-300: #fcd34d;
  --color-secondary-400: #fbbf24;
  --color-secondary-500: #f59e0b;  /* Base secondary */
  --color-secondary-600: #d97706;
  --color-secondary-700: #b45309;
  --color-secondary-800: #92400e;
  --color-secondary-900: #78350f;
  --color-secondary-950: #451a03;

  /* Neutral - Soil/Earth tones */
  --color-neutral-50: #fafaf9;
  --color-neutral-100: #f5f5f4;
  --color-neutral-200: #e7e5e4;
  --color-neutral-300: #d6d3d1;
  --color-neutral-400: #a8a29e;
  --color-neutral-500: #78716c;
  --color-neutral-600: #57534e;
  --color-neutral-700: #44403c;
  --color-neutral-800: #292524;
  --color-neutral-900: #1c1917;
  --color-neutral-950: #0c0a09;

  /* Semantic Colors */
  --color-success-light: #86efac;
  --color-success: #22c55e;
  --color-success-dark: #15803d;

  --color-warning-light: #fcd34d;
  --color-warning: #f59e0b;
  --color-warning-dark: #b45309;

  --color-error-light: #fca5a5;
  --color-error: #ef4444;
  --color-error-dark: #b91c1c;

  --color-info-light: #93c5fd;
  --color-info: #3b82f6;
  --color-info-dark: #1d4ed8;

  /* Surface Colors */
  --color-background: #ffffff;
  --color-surface: #fafaf9;
  --color-surface-hover: #f5f5f4;
  --color-surface-active: #e7e5e4;

  /* Text Colors */
  --color-text-primary: #1c1917;
  --color-text-secondary: #57534e;
  --color-text-tertiary: #a8a29e;
  --color-text-inverse: #ffffff;
  --color-text-disabled: #d6d3d1;

  /* Border Colors */
  --color-border-light: #e7e5e4;
  --color-border-medium: #d6d3d1;
  --color-border-strong: #a8a29e;
  --color-border-focus: var(--color-primary-500);
}

/* Dark Mode */
[data-theme="dark"] {
  --color-background: #0c0a09;
  --color-surface: #1c1917;
  --color-surface-hover: #292524;
  --color-surface-active: #44403c;

  --color-text-primary: #fafaf9;
  --color-text-secondary: #d6d3d1;
  --color-text-tertiary: #78716c;
  --color-text-inverse: #1c1917;
  --color-text-disabled: #57534e;

  --color-border-light: #292524;
  --color-border-medium: #44403c;
  --color-border-strong: #57534e;
}
```

#### Color Contrast Ratios (WCAG AA Compliance)
- **Primary text**: 7:1 minimum (AAA level)
- **Secondary text**: 4.5:1 minimum (AA level)
- **Large text (18px+)**: 3:1 minimum
- **UI components**: 3:1 minimum
- **Focus indicators**: 3:1 minimum

#### Color Application Rules
1. **Primary**: Call-to-action buttons, links, focus states
2. **Secondary**: Highlights, accents, secondary actions
3. **Neutral**: Backgrounds, borders, disabled states
4. **Semantic**: Feedback messages, status indicators
5. **Maximum 3 colors per component** (excluding neutral)

### Typography Scale

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  /* Font Sizes - Modular Scale (1.250 - Major Third) */
  --font-size-xs: 0.64rem;    /* 10.24px */
  --font-size-sm: 0.80rem;    /* 12.8px */
  --font-size-base: 1rem;     /* 16px - base */
  --font-size-md: 1.25rem;    /* 20px */
  --font-size-lg: 1.563rem;   /* 25px */
  --font-size-xl: 1.953rem;   /* 31.25px */
  --font-size-2xl: 2.441rem;  /* 39px */
  --font-size-3xl: 3.052rem;  /* 48.83px */

  /* Line Heights */
  --line-height-tight: 1.25;   /* Headings */
  --line-height-normal: 1.5;   /* Body text */
  --line-height-relaxed: 1.75; /* Long-form content */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}
```

#### Typography Hierarchy

```css
/* Heading Styles */
.heading-1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}

.heading-2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.heading-3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.heading-4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
}

.heading-5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
}

/* Body Text */
.body-large {
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}

.body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.body-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}
```

### Spacing Scale

```css
:root {
  /* Base unit: 4px */
  --spacing-0: 0;
  --spacing-0-5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;     /* 4px */
  --spacing-1-5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;      /* 8px */
  --spacing-3: 0.75rem;     /* 12px */
  --spacing-4: 1rem;        /* 16px */
  --spacing-5: 1.25rem;     /* 20px */
  --spacing-6: 1.5rem;      /* 24px */
  --spacing-8: 2rem;        /* 32px */
  --spacing-10: 2.5rem;     /* 40px */
  --spacing-12: 3rem;       /* 48px */
  --spacing-16: 4rem;       /* 64px */
  --spacing-20: 5rem;       /* 80px */
  --spacing-24: 6rem;       /* 96px */
  --spacing-32: 8rem;       /* 128px */
}
```

#### Spacing Guidelines
- **Component padding**: Use 2, 3, 4, 6 for most components
- **Section margins**: Use 8, 12, 16 for layout sections
- **Touch targets**: Minimum 44x44px (spacing-11 equivalent)
- **Text margins**: Use 1, 2, 3 for inline spacing
- **Form fields**: Use 4-6 for field heights

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;   /* Pills/Circles */
}
```

#### Border Radius Application
- **Buttons**: `--radius-md` (6px)
- **Input fields**: `--radius-base` (4px)
- **Cards**: `--radius-lg` (8px)
- **Modals**: `--radius-xl` (12px)
- **Badges**: `--radius-full` (pill shape)
- **Images**: `--radius-md` to `--radius-lg`

### Elevation System (Shadows)

```css
:root {
  /* Shadows - Subtle, natural elevation */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-2xl: 0 40px 80px -20px rgb(0 0 0 / 0.3);

  /* Focus Shadow */
  --shadow-focus: 0 0 0 3px var(--color-primary-200);
  --shadow-focus-dark: 0 0 0 3px var(--color-primary-800);
}

[data-theme="dark"] {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5);
  --shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
}
```

#### Shadow Application
- **Cards (resting)**: `--shadow-sm`
- **Cards (hover)**: `--shadow-md`
- **Dropdowns/Popovers**: `--shadow-lg`
- **Modals**: `--shadow-xl`
- **Focus rings**: `--shadow-focus`
- **Sticky headers**: `--shadow-base`

### Motion & Animation

```css
:root {
  /* Duration */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;

  /* Easing Functions */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);         /* Most common */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.5, 1.5, 0.5, 1);
}
```

#### Animation Guidelines
- **Micro-interactions** (hover, focus): `--duration-fast` + `--ease-out`
- **Transitions** (expand/collapse): `--duration-base` + `--ease-in-out`
- **Page transitions**: `--duration-slow` + `--ease-out`
- **Emphasized motion** (success states): `--duration-base` + `--ease-bounce`
- **Reduced motion**: Respect `prefers-reduced-motion` media query

#### Standard Transitions
```css
/* Common transition properties */
.transition-colors {
  transition: background-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

.transition-transform {
  transition: transform var(--duration-base) var(--ease-out);
}

.transition-shadow {
  transition: box-shadow var(--duration-fast) var(--ease-out);
}

.transition-all {
  transition: all var(--duration-base) var(--ease-in-out);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Breakpoints

```css
:root {
  --breakpoint-sm: 640px;   /* Mobile landscape, small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large desktop */
  --breakpoint-2xl: 1536px; /* Extra large desktop */
}
```

#### Media Query Strategy (Mobile-First)

```css
/* Mobile first (default) */
.container {
  padding: var(--spacing-4);
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
    max-width: 768px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
    max-width: 1024px;
  }
}
```

### Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-overlay: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  --z-toast: 1700;
  --z-max: 9999;
}
```

## Visual Hierarchy Principles

### 1. Contrast Through Scale
- **Primary actions**: Larger, bolder (e.g., 16px font, medium weight)
- **Secondary actions**: Standard size (e.g., 14px font, regular weight)
- **Tertiary actions**: Smaller, lighter (e.g., 12px font, light weight)

### 2. Contrast Through Color
- **High emphasis**: Primary color on neutral background
- **Medium emphasis**: Neutral dark on neutral light
- **Low emphasis**: Neutral medium on neutral light

### 3. Contrast Through Spacing
- **Related items**: Closer spacing (4-8px)
- **Grouped sections**: Medium spacing (16-24px)
- **Distinct sections**: Wide spacing (32-64px)

### 4. Contrast Through Weight
- **Headers**: Bold (700) or Semi-bold (600)
- **Body**: Regular (400) or Medium (500)
- **Captions**: Light (300) or Regular (400)

## Accessibility Standards

### Focus States
```css
/* All interactive elements must have visible focus */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}

/* Dark mode focus */
[data-theme="dark"] :focus-visible {
  box-shadow: var(--shadow-focus-dark);
}
```

### Keyboard Navigation
- Tab order follows visual order
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible
- Skip links for navigation sections

### Screen Reader Support
- Semantic HTML elements (button, nav, main, etc.)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content
- Descriptive link text (avoid "click here")

### Color Contrast Requirements
- **Normal text (< 18px)**: 4.5:1 minimum
- **Large text (>= 18px)**: 3:1 minimum
- **UI components**: 3:1 minimum
- **Graphical objects**: 3:1 minimum

### Touch Target Sizes
- **Minimum**: 44x44px (11mm)
- **Recommended**: 48x48px (12mm)
- **Spacing between targets**: 8px minimum

## Icon System

### Icon Sizes
```css
:root {
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-base: 20px;
  --icon-md: 24px;
  --icon-lg: 32px;
  --icon-xl: 40px;
}
```

### Icon Guidelines
- Use SVG for scalability
- Maintain 1:1 aspect ratio
- 2px stroke width for outline icons
- Align to 4px grid
- Provide text alternatives (aria-label or sr-only text)

### Icon Library
- **Preferred**: Lucide (consistent, open-source, tree-shakeable)
- **Alternative**: Heroicons, Phosphor Icons
- Custom icons follow same visual weight and style

## Brand Expression Points

### Where to Be Conservative
- Form inputs (usability > personality)
- Data tables (clarity > decoration)
- Error messages (directness > cleverness)
- Navigation (predictability > novelty)

### Where to Add Personality
- Empty states (illustration, friendly copy)
- Success confirmations (celebration animations)
- Loading states (branded spinners, progress)
- Onboarding flows (welcoming visuals)
- Marketing sections (bold colors, larger type)

### Rule-Breaking Guidelines
When deviating from system:
1. **Justify**: Document why standard pattern doesn't serve the use case
2. **Test**: Validate with usability testing
3. **Contain**: Limit scope to specific component/context
4. **Document**: Flag as intentional exception
5. **Review**: Periodic audit to ensure still valid

## Fluid Typography (Responsive Text)

```css
/* Fluid typography using clamp() */
:root {
  --fluid-text-sm: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --fluid-text-base: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --fluid-text-lg: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --fluid-text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem);
  --fluid-text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);
  --fluid-text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 3rem);
}
```

## Grid System

```css
:root {
  /* Grid columns */
  --grid-columns: 12;
  --grid-gap: var(--spacing-4);
  --grid-gap-lg: var(--spacing-6);

  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}
```

## Design System Governance

### Token Modification Process
1. Proposal with rationale
2. Impact analysis (which components affected)
3. Design review
4. Implementation with deprecation warnings
5. Major version bump for breaking changes

### Component Addition Criteria
- Solves a real need in 2+ consumer applications
- Cannot be easily composed from existing components
- Maintains design system consistency
- Meets accessibility standards
- Has comprehensive tests and documentation
