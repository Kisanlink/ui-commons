# KisanLink UI Commons - Architecture Document

**Version**: 1.0.0
**Status**: Approved
**Last Updated**: 2025-11-13
**Authors**: Backend Architecture Team

## Executive Summary

KisanLink UI Commons is a production-grade React component library designed to provide a unified design system across the KisanLink ecosystem (admin-panel, ecommerce-frontend, erp-frontend). This document outlines the comprehensive architecture ensuring consistency, maintainability, performance, and security.

**Key Decisions**:
- Single-package monolith with tree-shaking support
- Vite-based build system with ESM/CJS outputs
- Zero runtime dependencies (React as peer dependency)
- CSS Modules for styling (no runtime CSS-in-JS)
- Comprehensive testing with Vitest, Chromatic, and axe
- Semantic versioning with automated releases

---

## 1. System Overview

### 1.1 Purpose
Provide a centralized, production-ready component library that:
- Ensures UI/UX consistency across all KisanLink applications
- Reduces development time through reusable, well-tested components
- Maintains a single source of truth for design system implementation
- Enables rapid feature development with confidence

### 1.2 Scope
**In Scope**:
- Atomic design components (atoms, molecules, organisms)
- Theme system with customization API
- TypeScript type definitions
- Accessibility compliance (WCAG 2.1 AA)
- Comprehensive documentation and examples
- Automated testing and CI/CD

**Out of Scope**:
- Application-specific business logic
- State management solutions (Redux, Zustand)
- Routing libraries
- Backend API integrations
- Application scaffolding

### 1.3 Stakeholders
- **Frontend Developers**: Primary consumers, need easy-to-use components
- **Product Designers**: Ensure design system fidelity
- **DevOps Engineers**: Reliable builds, security, automated releases
- **QA Engineers**: Test coverage and quality assurance
- **End Users**: Benefit from consistent, accessible UX

---

## 2. Architecture Decisions

### 2.1 Package Structure: Single Package (Monolith)

**Decision**: Use a single npm package (`@kisanlink/ui-commons`) with internal modular structure.

**Rationale**:
- **Simpler versioning**: Single version number, no dependency hell
- **Easier refactoring**: Cross-component changes don't require coordinated releases
- **Consumer simplicity**: One dependency to manage
- **Lower maintenance**: Single CI/CD pipeline, single changelog
- **Tree-shaking**: Modern bundlers eliminate unused code

**Structure**:
```
@kisanlink/ui-commons/
├── src/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Badge/
│   │   └── index.ts
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── Card/
│   │   ├── Dropdown/
│   │   └── index.ts
│   ├── organisms/
│   │   ├── Modal/
│   │   ├── Table/
│   │   ├── Navbar/
│   │   └── index.ts
│   ├── theme/
│   │   ├── tokens.ts
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   └── index.ts (barrel export)
├── dist/ (generated)
├── .storybook/
├── vitest.config.ts
├── vite.config.ts
└── package.json
```

**Migration Path**: If package exceeds 200KB or distinct teams emerge, split into:
- `@kisanlink/ui-core` (atoms, molecules)
- `@kisanlink/ui-data` (tables, grids)
- `@kisanlink/ui-forms` (form components)
- `@kisanlink/ui-theme` (theme system)

### 2.2 Build System: Vite + SWC

**Decision**: Use Vite 5.x in library mode with SWC for transpilation.

**Rationale**:
- **Performance**: 10-100x faster than Webpack for development
- **Modern Defaults**: ESM-first, native TypeScript support
- **Developer Experience**: Instant HMR, instant server start
- **Production Ready**: Rollup-based production builds
- **Tree-Shaking**: Automatic with ESM
- **SWC**: Rust-based transpiler, 20x faster than Babel

**Build Configuration**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KisanLinkUICommons',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name;
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
```

**Output Formats**:
- **ESM** (primary): Modern bundlers, tree-shaking
- **CJS**: Legacy support, SSR compatibility
- **No UMD**: Browser CDN usage not a requirement

### 2.3 Styling: CSS Modules + CSS Variables

**Decision**: Use CSS Modules for component styles, CSS Variables for theming.

**Rationale**:
- **Zero Runtime Cost**: Styles extracted at build time
- **Scoped Styles**: No global namespace pollution
- **Type Safety**: TypeScript definitions for class names
- **Performance**: No JS execution for styling
- **SSR Safe**: Static CSS, no hydration issues
- **Theming**: CSS Variables for runtime customization

**CSS Module Example**:
```css
/* Button.module.css */
.button {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
}

.button--primary:hover {
  background-color: var(--color-primary-dark);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```typescript
// Button.tsx
import styles from './Button.module.css';

export const Button = ({ variant = 'primary', ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      {...props}
    />
  );
};
```

**Theme System**:
```typescript
// theme/tokens.ts
export const defaultTheme = {
  colors: {
    primary: '#007A3D',
    primaryDark: '#005A2D',
    primaryContrast: '#FFFFFF',
    // ... more tokens
  },
  spacing: {
    1: '4px',
    2: '8px',
    4: '16px',
    // ...
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
  },
};

// ThemeProvider.tsx
export const ThemeProvider = ({ theme, children }) => {
  useEffect(() => {
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    // Set other tokens...
  }, [theme]);

  return <>{children}</>;
};
```

**Alternative Rejected**: Styled-components, Emotion
- Reason: Runtime overhead, bundle size increase, SSR complexity

### 2.4 TypeScript Strategy: Strict Mode + Comprehensive Types

**Decision**: TypeScript 5.x with strict mode enabled, comprehensive type definitions.

**Configuration**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

**Type Safety Patterns**:
```typescript
// Polymorphic component types
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// Usage
export type ButtonProps<C extends React.ElementType = 'button'> =
  PolymorphicComponentProp<
    C,
    {
      variant?: 'primary' | 'secondary' | 'danger';
      size?: 'sm' | 'md' | 'lg';
      loading?: boolean;
    }
  >;

export const Button = <C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  loading,
  children,
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';
  return <Component {...props}>{loading ? 'Loading...' : children}</Component>;
};

// Type-safe usage
<Button as="a" href="/link">Link Button</Button>
```

### 2.5 Testing Strategy: Multi-Layered

**Decision**: Comprehensive testing with unit, integration, visual, and accessibility tests.

**Testing Stack**:
- **Unit/Integration**: Vitest + React Testing Library
- **Visual Regression**: Chromatic (cloud-based)
- **Accessibility**: vitest-axe + manual testing
- **Type Testing**: tsd for type definition validation
- **E2E**: Playwright (consumer project level)

**Coverage Requirements**:
- Unit tests: >85% coverage
- All components: Accessibility tests
- All components: Visual regression baselines
- Critical paths: Integration tests

(See `/Users/kaushik/kisanlink-ui-commons/.kiro/steering/testing.md` for comprehensive strategy)

### 2.6 Documentation: Storybook + Docusaurus

**Decision**: Storybook for component playground, Docusaurus for comprehensive documentation site.

**Storybook Usage**:
- Component playground for development
- Visual regression test cases
- Design review and approval
- Generated prop documentation
- Deployed per PR for preview

**Docusaurus Usage**:
- Getting started guides
- Migration guides
- Best practices
- API reference
- Changelog with migration notes

---

## 3. Component Architecture

### 3.1 Atomic Design Principles

**Atoms**: Indivisible building blocks
- Button, Input, Label, Icon, Badge, Spinner

**Molecules**: Combinations of atoms
- FormField (Input + Label + Error)
- SearchBar (Input + Icon + Button)
- Card (Container + Title + Content)

**Organisms**: Complex, self-contained components
- Modal (Overlay + Card + Button group)
- Table (Header + Body + Pagination)
- Navbar (Logo + Nav items + User menu)

### 3.2 Component API Design

**Principles**:
1. **Intuitive Props**: Self-explanatory, consistent naming
2. **Controlled & Uncontrolled**: Support both patterns
3. **Composability**: Components work together seamlessly
4. **Accessibility First**: ARIA attributes by default
5. **TypeScript First**: Props fully typed with JSDoc

**Example - Button Component**:
```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';

  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  /** Show loading spinner and disable */
  loading?: boolean;

  /** Icon to display before text */
  startIcon?: React.ReactNode;

  /** Icon to display after text */
  endIcon?: React.ReactNode;

  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Button component for user actions
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const className = clsx(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      fullWidth && styles['button--fullWidth'],
      loading && styles['button--loading']
    );

    return (
      <button
        ref={ref}
        className={className}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {!loading && startIcon && <span className={styles.icon}>{startIcon}</span>}
        <span className={styles.text}>{children}</span>
        {!loading && endIcon && <span className={styles.icon}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 3.3 Composition Patterns

**Compound Components**:
```typescript
// Card with sub-components
export const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

Card.Header = ({ children }) => (
  <div className={styles.cardHeader}>{children}</div>
);

Card.Body = ({ children }) => (
  <div className={styles.cardBody}>{children}</div>
);

Card.Footer = ({ children }) => (
  <div className={styles.cardFooter}>{children}</div>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

**Render Props** (for complex logic):
```typescript
<Table
  data={users}
  renderRow={(user) => (
    <Table.Row key={user.id}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
    </Table.Row>
  )}
/>
```

---

## 4. Distribution & Consumption

### 4.1 NPM Package Configuration

```json
{
  "name": "@kisanlink/ui-commons",
  "version": "1.0.0",
  "description": "Production-grade React component library for KisanLink",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.cjs"
      }
    },
    "./styles.css": "./dist/styles.css",
    "./theme": {
      "import": {
        "types": "./dist/theme.d.ts",
        "default": "./dist/theme.js"
      }
    },
    "./testing": {
      "import": {
        "types": "./dist/testing.d.ts",
        "default": "./dist/testing.js"
      }
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": false,
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 4.2 Consumer Integration

**Installation**:
```bash
npm install @kisanlink/ui-commons
```

**Basic Usage**:
```typescript
// App.tsx
import { Button, Card, ThemeProvider } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Card.Header>Welcome</Card.Header>
        <Card.Body>
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
}
```

**Custom Theme**:
```typescript
import { createTheme, ThemeProvider } from '@kisanlink/ui-commons/theme';

const customTheme = createTheme({
  colors: {
    primary: '#007A3D',
    secondary: '#F59E0B',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

**Tree-Shaking Verification**:
```bash
# Consumer project
npm run build -- --analyze

# Only imported components bundled
# Example: Importing only Button → ~5KB gzipped
```

### 4.3 Versioning & Releases

**Semantic Versioning**:
- **Major (1.0.0 → 2.0.0)**: Breaking changes (API removal, prop changes)
- **Minor (1.0.0 → 1.1.0)**: New features (new components, new props)
- **Patch (1.0.0 → 1.0.1)**: Bug fixes, performance improvements

**Automated Releases** (semantic-release):
```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Commit Convention** (Conventional Commits):
```
feat: add Tooltip component
fix: Button loading state accessibility
docs: update migration guide for v2
chore: upgrade Vite to 5.1
BREAKING CHANGE: remove deprecated size prop from Input
```

**Changelog Generation**:
Automatically generated from commits:
```markdown
## [1.2.0] - 2025-11-13

### Added
- Tooltip component with customizable placement
- Dark mode support for all components

### Fixed
- Button loading state now properly announces to screen readers
- Input focus ring visibility on dark backgrounds

### Changed
- Table now uses virtualization for >1000 rows (performance)

### Migration Guide
No breaking changes. Dark mode requires opt-in via ThemeProvider.
```

---

## 5. Security Architecture

### 5.1 Dependency Management

**Principles**:
1. **Minimal Dependencies**: Only essential packages
2. **Peer Dependencies**: React, ReactDOM (not bundled)
3. **Dev Dependencies**: Testing, building (not shipped)
4. **Lock Files**: Committed for reproducible builds

**Current Dependencies** (production):
```json
{
  "dependencies": {
    "clsx": "^2.1.0" // Classname utility, ~500 bytes
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Rationale**: Zero unnecessary runtime dependencies = smaller bundle, fewer vulnerabilities

### 5.2 Vulnerability Scanning

**Automated Scanning**:
- **Dependabot**: GitHub-native, automatic PR for updates
- **npm audit**: Run in CI on every commit
- **Snyk**: Deep vulnerability analysis (optional)

**CI Pipeline**:
```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=moderate
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

**Response SLA**:
- **Critical**: Patch within 24 hours, emergency release
- **High**: Patch within 7 days, regular release
- **Medium/Low**: Patch in next scheduled release

### 5.3 Input Sanitization

**XSS Prevention**:
```typescript
// All user content rendered via React (auto-escaped)
<Button>{userInput}</Button> // Safe

// Dangerous pattern (avoided)
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Forbidden

// Sanitized HTML (if absolutely needed)
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

**Content Security Policy (CSP) Compatibility**:
- No inline styles or scripts
- All CSS extracted to static files
- No `eval()` or `Function()` usage

### 5.4 Supply Chain Security

**Package Integrity**:
- Lock files committed (npm-shrinkwrap.json or package-lock.json)
- npm publish with `--provenance` flag (SLSA compliance)
- GitHub Actions OIDC token for NPM publish (no long-lived tokens)

**Build Provenance**:
```yaml
# .github/workflows/release.yml
- run: npm publish --provenance --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 6. Performance Architecture

### 6.1 Bundle Size Optimization

**Targets**:
- Total library: <50KB gzipped (all components)
- Typical usage: <10KB gzipped (3-5 components)
- Individual component: <2KB gzipped average

**Strategies**:
1. **Tree-Shaking**: ESM exports, side-effect free
2. **Code Splitting**: Lazy load large components
3. **Minification**: esbuild minifier
4. **Compression**: Gzip + Brotli

**Bundle Analysis**:
```bash
# Automated in CI
npm run build
npx vite-bundle-visualizer

# Fail CI if bundle exceeds threshold
```

**Size Limit Configuration**:
```json
// package.json
{
  "size-limit": [
    {
      "path": "dist/index.js",
      "limit": "50 KB",
      "gzip": true
    },
    {
      "path": "dist/atoms/Button/index.js",
      "limit": "2 KB",
      "gzip": true
    }
  ]
}
```

### 6.2 Runtime Performance

**React Performance**:
```typescript
// Memoization for expensive components
export const Table = React.memo(({ data, columns }) => {
  const sortedData = useMemo(
    () => sortData(data),
    [data]
  );

  const handleRowClick = useCallback((row) => {
    console.log(row);
  }, []);

  return (
    <table>
      {sortedData.map(row => (
        <TableRow key={row.id} onClick={handleRowClick} />
      ))}
    </table>
  );
});
```

**Lazy Loading**:
```typescript
// Lazy load large components
const Modal = React.lazy(() => import('./Modal'));

// Usage with Suspense
<Suspense fallback={<Spinner />}>
  <Modal />
</Suspense>
```

**Virtualization**:
```typescript
// For large lists/tables
import { useVirtualizer } from '@tanstack/react-virtual';

export const VirtualTable = ({ data }) => {
  const parentRef = useRef();
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      {virtualizer.getVirtualItems().map(virtualRow => (
        <div key={virtualRow.index}>{data[virtualRow.index].name}</div>
      ))}
    </div>
  );
};
```

### 6.3 Monitoring

**Web Vitals Tracking**:
```typescript
// Consumer integration
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

**Lighthouse CI**:
```yaml
# .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:6006"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1 }]
      }
    }
  }
}
```

---

## 7. Accessibility Architecture

### 7.1 WCAG 2.1 AA Compliance

**Requirements**:
- Keyboard navigation for all interactive elements
- Screen reader compatibility (ARIA labels, roles)
- Color contrast ratios: 4.5:1 (normal text), 3:1 (large text)
- Focus indicators visible and styled
- No keyboard traps
- Logical tab order

### 7.2 Accessibility Testing

**Automated**:
```typescript
// vitest-axe integration
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Test</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Manual Testing Checklist**:
- [ ] Keyboard-only navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Screen reader testing (VoiceOver, NVDA, JAWS)
- [ ] Zoom to 200% (text remains readable)
- [ ] High contrast mode (Windows)
- [ ] Color blindness simulation

**Storybook Accessibility Addon**:
```javascript
// .storybook/main.js
export default {
  addons: ['@storybook/addon-a11y'],
};
```

### 7.3 Semantic HTML

**Principles**:
```typescript
// Good: Semantic HTML
<button onClick={handleClick}>Submit</button>

// Bad: Non-semantic with onClick
<div onClick={handleClick}>Submit</div>

// Good: Accessible form
<form>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" required />
  <button type="submit">Submit</button>
</form>

// Good: ARIA when needed
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>
```

---

## 8. CI/CD Architecture

### 8.1 Pipeline Stages

```
┌─────────────────────────────────────────────────────┐
│                   Pull Request                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Install Dependencies                    │
│              (npm ci, cache enabled)                 │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  Parallel Jobs                       │
├─────────────┬──────────────┬─────────────┬──────────┤
│   Lint &    │  Type Check  │  Unit Tests │  Build   │
│   Format    │  (tsc)       │  (Vitest)   │  Library │
└─────────────┴──────────────┴─────────────┴──────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Visual Regression Tests                 │
│              (Chromatic, baseline diff)              │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Bundle Size Check                       │
│              (size-limit, fail if exceeded)          │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Security Scan                           │
│              (npm audit, Snyk)                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Deploy Storybook Preview                │
│              (Chromatic or Vercel)                   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  PR Approved  │
                   └──────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  Merge to Main                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Semantic Release                        │
│              (version bump, changelog, git tag)      │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Publish to NPM                          │
│              (with provenance)                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              Deploy Documentation                    │
│              (Docusaurus to Vercel/Netlify)          │
└─────────────────────────────────────────────────────┘
```

### 8.2 GitHub Actions Configuration

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npm run type-check

      - name: Test
        run: npm run test:coverage

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      - name: Build
        run: npm run build

      - name: Bundle Size
        uses: andresz1/size-limit-action@v1

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Required for Chromatic
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_TOKEN }}

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=moderate
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## 9. Risk Assessment

### 9.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Breaking changes in React 19** | Medium | High | Monitor React roadmap, test with RC versions, maintain React 18 compatibility initially |
| **Vite major version breaking changes** | Low | Medium | Pin major version, maintain LTS support, gradual upgrade path |
| **TypeScript breaking changes** | Low | Medium | Pin major version, test with `next` tag periodically |
| **Bundle size creep** | High | High | Automated size-limit checks in CI, fail builds if exceeded |
| **Accessibility regressions** | Medium | High | Automated axe tests, manual QA checklist, Storybook a11y addon |
| **Security vulnerabilities in deps** | Medium | High | Dependabot, npm audit in CI, Snyk scanning, rapid patch releases |
| **Performance regressions** | Medium | Medium | Lighthouse CI, bundle analysis, React DevTools Profiler in Storybook |

### 9.2 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Uncontrolled breaking changes** | Medium | Critical | Strict semver, deprecation warnings, codemods, migration guides |
| **Insufficient documentation** | High | High | Docusaurus docs site, Storybook examples, TSDoc comments, changelog |
| **Low adoption by consumers** | Medium | Critical | Developer onboarding, migration support, clear benefits communication |
| **Maintenance burden** | Medium | Medium | Automated releases, comprehensive tests, clear contribution guidelines |
| **Inconsistent design system** | Low | Medium | Design review process, Figma integration, design tokens |

### 9.3 Contingency Plans

**Scenario: Critical Security Vulnerability**
1. Immediately patch vulnerability
2. Release emergency patch version (e.g., 1.2.3 → 1.2.4)
3. Notify consumers via Slack, email, npm deprecation warning
4. Publish security advisory (GitHub Security Advisories)
5. Document in changelog with CVE reference

**Scenario: Breaking Change Needed**
1. Deprecate old API in minor version (e.g., 1.5.0)
2. Add new API alongside old (both work)
3. Console warnings in development mode
4. Document migration path
5. Provide codemod for automated migration
6. Wait 2 minor versions (1.6.0, 1.7.0)
7. Remove in next major (2.0.0)

**Scenario: Performance Regression Detected**
1. Revert problematic change if recent
2. Create performance test case reproducing issue
3. Optimize and re-test
4. Release patch version
5. Add performance regression test to CI

---

## 10. Future Roadmap

### Phase 1: Foundation (Months 1-2)
- [ ] Setup project structure and build system
- [ ] Implement core atoms (Button, Input, Label, Badge)
- [ ] Setup Storybook and documentation
- [ ] CI/CD pipeline with automated testing
- [ ] Initial v0.1.0 release (alpha)

### Phase 2: Core Components (Months 3-4)
- [ ] Implement molecules (FormField, Card, Dropdown)
- [ ] Theme system and customization API
- [ ] Comprehensive testing (unit, visual, a11y)
- [ ] Developer onboarding documentation
- [ ] v1.0.0 release (stable)

### Phase 3: Advanced Components (Months 5-6)
- [ ] Implement organisms (Modal, Table, Navbar)
- [ ] Virtualization for large datasets
- [ ] Advanced accessibility features (keyboard shortcuts)
- [ ] Migration guides and codemods
- [ ] v1.1.0 release

### Phase 4: Optimization (Months 7-9)
- [ ] Performance optimization (bundle size, runtime)
- [ ] Dark mode support
- [ ] Internationalization (i18n) support
- [ ] Design token system refinement
- [ ] v1.2.0 release

### Phase 5: Ecosystem (Months 10-12)
- [ ] Form management integration (React Hook Form)
- [ ] Data fetching patterns (React Query)
- [ ] Animation library integration (Framer Motion)
- [ ] Advanced theming (CSS-in-JS option)
- [ ] v2.0.0 considerations

---

## 11. Appendices

### A. Technology Stack Summary
- **Framework**: React 18.x, TypeScript 5.x
- **Build**: Vite 5.x, SWC, Rollup
- **Styling**: CSS Modules, PostCSS
- **Testing**: Vitest, React Testing Library, Chromatic, vitest-axe
- **Documentation**: Storybook 8.x, Docusaurus
- **CI/CD**: GitHub Actions, semantic-release
- **Quality**: ESLint, Prettier, Husky, lint-staged

### B. Key Metrics
- **Bundle Size**: <50KB gzipped (full library)
- **Test Coverage**: >85% lines, >80% branches
- **Accessibility**: WCAG 2.1 AA compliant
- **Browser Support**: Last 2 versions (Chrome, Firefox, Safari, Edge)
- **Performance**: LCP <2.5s, FID <100ms

### C. References
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Document Approval**:
- Architecture Review: ✅ Approved
- Security Review: ✅ Approved
- Performance Review: ✅ Approved
- Design Review: Pending consumer design team
