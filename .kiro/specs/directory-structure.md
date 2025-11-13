# KisanLink UI Commons - Directory Structure

**Version**: 1.0.0
**Last Updated**: 2025-11-13

## Complete Directory Structure

```
kisanlink-ui-commons/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Main CI pipeline
│   │   ├── release.yml               # Automated releases
│   │   ├── chromatic.yml             # Visual regression
│   │   └── security.yml              # Security scanning
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── component_request.md
│   └── pull_request_template.md
│
├── .husky/
│   ├── pre-commit                    # Lint-staged hook
│   └── commit-msg                    # Commit message validation
│
├── .storybook/
│   ├── main.ts                       # Storybook configuration
│   ├── preview.ts                    # Global decorators
│   └── manager.ts                    # Storybook UI customization
│
├── .kiro/                            # Project management (per instructions)
│   ├── steering/
│   │   ├── product.md                # Product vision
│   │   ├── tech.md                   # Technical direction
│   │   └── testing.md                # Testing strategy
│   ├── specs/
│   │   ├── adr-001-single-package-structure.md
│   │   ├── adr-002-vite-build-system.md
│   │   ├── adr-003-css-modules-styling.md
│   │   ├── adr-004-vitest-testing-stack.md
│   │   ├── package-specification.md
│   │   └── directory-structure.md
│   ├── docs/
│   │   ├── architecture.md           # Comprehensive architecture doc
│   │   ├── implementation-roadmap.md # Phased implementation plan
│   │   └── risk-assessment.md        # Risk register
│   └── tasks/
│       └── (task tracking files)
│
├── docs/                             # Docusaurus documentation site (optional)
│   ├── docs/
│   │   ├── getting-started.md
│   │   ├── components/
│   │   ├── theming.md
│   │   └── migration.md
│   ├── blog/
│   ├── src/
│   ├── docusaurus.config.js
│   └── package.json
│
├── src/
│   ├── atoms/                        # Atomic components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.a11y.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.module.css
│   │   │   ├── Input.test.tsx
│   │   │   ├── Input.a11y.test.tsx
│   │   │   ├── Input.stories.tsx
│   │   │   └── index.ts
│   │   ├── Label/
│   │   ├── Badge/
│   │   ├── Spinner/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   └── index.ts                  # Barrel export
│   │
│   ├── molecules/                    # Molecule components
│   │   ├── FormField/
│   │   │   ├── FormField.tsx
│   │   │   ├── FormField.module.css
│   │   │   ├── FormField.test.tsx
│   │   │   ├── FormField.integration.test.tsx
│   │   │   ├── FormField.a11y.test.tsx
│   │   │   ├── FormField.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Alert/
│   │   ├── Dropdown/
│   │   ├── Tooltip/
│   │   ├── Popover/
│   │   └── index.ts
│   │
│   ├── organisms/                    # Organism components
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.module.css
│   │   │   ├── ModalHeader.tsx
│   │   │   ├── ModalBody.tsx
│   │   │   ├── ModalFooter.tsx
│   │   │   ├── Modal.test.tsx
│   │   │   ├── Modal.integration.test.tsx
│   │   │   ├── Modal.a11y.test.tsx
│   │   │   ├── Modal.stories.tsx
│   │   │   └── index.ts
│   │   ├── Table/
│   │   ├── Tabs/
│   │   ├── Accordion/
│   │   ├── Drawer/
│   │   └── index.ts
│   │
│   ├── theme/                        # Theme system
│   │   ├── tokens.ts                 # Design tokens
│   │   ├── ThemeProvider.tsx         # Theme context provider
│   │   ├── createTheme.ts            # Theme factory
│   │   ├── types.ts                  # Theme types
│   │   ├── lightTheme.ts             # Light theme preset
│   │   ├── darkTheme.ts              # Dark theme preset
│   │   └── index.ts
│   │
│   ├── utils/                        # Utility functions
│   │   ├── classnames.ts             # Class name utilities
│   │   ├── formatters.ts             # Formatting utilities
│   │   ├── validators.ts             # Validation utilities
│   │   ├── accessibility.ts          # A11y helpers
│   │   ├── formatters.test.ts
│   │   ├── validators.test.ts
│   │   └── index.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useTheme.ts               # Theme hook
│   │   ├── useMediaQuery.ts          # Media query hook
│   │   ├── useFocusTrap.ts           # Focus trap hook
│   │   ├── useDisclosure.ts          # Open/close state hook
│   │   ├── useClickOutside.ts        # Outside click detection
│   │   ├── useTheme.test.ts
│   │   └── index.ts
│   │
│   ├── styles/                       # Global styles
│   │   ├── base.css                  # CSS reset + base styles
│   │   ├── variables.css             # CSS variables (fallback)
│   │   └── utilities.css             # Utility classes (if needed)
│   │
│   ├── test/                         # Test utilities
│   │   ├── setup.ts                  # Vitest setup file
│   │   ├── test-utils.tsx            # Custom render, factories
│   │   ├── mocks.ts                  # Common mocks
│   │   └── index.ts
│   │
│   ├── testing/                      # Exported testing utilities
│   │   ├── index.ts                  # Re-export testing-library
│   │   ├── render.tsx                # Custom render with providers
│   │   └── factories.ts              # Test data factories
│   │
│   ├── types/                        # Shared TypeScript types
│   │   ├── common.ts                 # Common types
│   │   ├── components.ts             # Component prop types
│   │   └── index.ts
│   │
│   └── index.ts                      # Main entry point (barrel export)
│
├── dist/                             # Build output (generated, gitignored)
│   ├── index.js                      # ESM bundle
│   ├── index.cjs                     # CommonJS bundle
│   ├── index.d.ts                    # TypeScript declarations
│   ├── theme.js
│   ├── theme.cjs
│   ├── theme.d.ts
│   ├── testing.js
│   ├── testing.d.ts
│   └── styles.css                    # Bundled styles
│
├── coverage/                         # Test coverage (generated, gitignored)
│   ├── lcov.info
│   ├── index.html
│   └── ...
│
├── storybook-static/                 # Built Storybook (generated, gitignored)
│
├── .eslintrc.cjs                     # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── .prettierignore
├── .gitignore
├── .npmignore
├── .nvmrc                            # Node version
├── .releaserc.json                   # Semantic release config
├── tsconfig.json                     # TypeScript config
├── tsconfig.node.json                # TypeScript config for build scripts
├── vite.config.ts                    # Vite build configuration
├── vitest.config.ts                  # Vitest test configuration
├── postcss.config.js                 # PostCSS configuration
├── package.json                      # Package metadata
├── package-lock.json                 # Dependency lock file
├── README.md                         # Project readme
├── LICENSE                           # MIT License
├── CHANGELOG.md                      # Auto-generated changelog
└── CONTRIBUTING.md                   # Contribution guidelines
```

---

## Directory Descriptions

### Root Level

- **`.github/`**: GitHub-specific configurations (workflows, issue templates)
- **`.husky/`**: Git hooks for pre-commit, commit-msg validation
- **`.storybook/`**: Storybook configuration for component development/documentation
- **`.kiro/`**: Project management documents (steering, specs, tasks)
- **`docs/`**: Docusaurus documentation site (optional, comprehensive docs)
- **`src/`**: Source code (components, theme, utilities, tests)
- **`dist/`**: Build output (generated, not committed)
- **`coverage/`**: Test coverage reports (generated, not committed)
- **`storybook-static/`**: Built Storybook (generated, deployed to hosting)

### Source Code (`src/`)

#### `atoms/`
Atomic components - smallest building blocks that cannot be broken down further.

**Naming Convention**: PascalCase for directory and component name.

**Structure per component**:
```
ComponentName/
├── ComponentName.tsx          # Main component file
├── ComponentName.module.css   # Scoped styles
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.a11y.test.tsx # Accessibility tests (optional)
├── ComponentName.stories.tsx  # Storybook stories
├── types.ts                   # Component-specific types (if complex)
└── index.ts                   # Re-export
```

**Example Components**:
- Button, Input, Label, Badge, Spinner, Icon
- Checkbox, Radio, Switch, Avatar, Divider

#### `molecules/`
Molecule components - combinations of atoms forming functional units.

**Structure**: Same as atoms.

**Example Components**:
- FormField (Label + Input + Error)
- Card, Alert, Dropdown, Tooltip, Popover
- SearchBar, Breadcrumbs, Skeleton

#### `organisms/`
Organism components - complex, self-contained components.

**Structure**: May have sub-components.

**Example**:
```
Modal/
├── Modal.tsx                 # Main component
├── Modal.module.css
├── ModalHeader.tsx           # Sub-component
├── ModalBody.tsx
├── ModalFooter.tsx
├── Modal.test.tsx
├── Modal.integration.test.tsx
├── Modal.a11y.test.tsx
├── Modal.stories.tsx
└── index.ts
```

**Example Components**:
- Modal, Drawer, Table, Tabs, Accordion
- Navbar, Sidebar, Pagination

#### `theme/`
Theme system for design tokens and theming.

**Files**:
- `tokens.ts`: Design token definitions (colors, spacing, typography)
- `ThemeProvider.tsx`: React context provider for theme
- `createTheme.ts`: Factory function for custom themes
- `lightTheme.ts`, `darkTheme.ts`: Theme presets
- `types.ts`: Theme-related TypeScript types

**Usage**:
```typescript
import { ThemeProvider, lightTheme } from '@kisanlink/ui-commons/theme';
```

#### `utils/`
Pure utility functions (no React dependencies).

**Examples**:
- `classnames.ts`: Conditional class name builder
- `formatters.ts`: Date, number, currency formatters
- `validators.ts`: Form validation functions
- `accessibility.ts`: A11y helper functions

**Testing**: Each utility file has corresponding `.test.ts`.

#### `hooks/`
Custom React hooks.

**Examples**:
- `useTheme.ts`: Access theme values
- `useMediaQuery.ts`: Responsive breakpoint detection
- `useFocusTrap.ts`: Focus management for modals
- `useDisclosure.ts`: Open/close state management
- `useClickOutside.ts`: Detect clicks outside element

**Testing**: Each hook has corresponding `.test.ts`.

#### `styles/`
Global styles (applied once at app root).

**Files**:
- `base.css`: CSS reset, base element styles
- `variables.css`: CSS variable fallbacks
- `utilities.css`: Utility classes (use sparingly)

**Usage**:
```typescript
import '@kisanlink/ui-commons/styles.css';
```

#### `test/`
Internal testing utilities (not exported).

**Files**:
- `setup.ts`: Vitest global setup
- `test-utils.tsx`: Custom render functions with providers
- `mocks.ts`: Common mock objects (ResizeObserver, IntersectionObserver)

#### `testing/` (exported)
Testing utilities for consumer projects.

**Files**:
- `index.ts`: Re-export @testing-library/react
- `render.tsx`: Custom render with ThemeProvider
- `factories.ts`: Test data factories

**Usage**:
```typescript
import { renderWithTheme } from '@kisanlink/ui-commons/testing';
```

#### `types/`
Shared TypeScript types used across components.

**Files**:
- `common.ts`: Common types (Size, Variant, etc.)
- `components.ts`: Shared component prop types
- `index.ts`: Re-export all types

---

## File Naming Conventions

### TypeScript/TSX Files
- **Components**: PascalCase (e.g., `Button.tsx`, `FormField.tsx`)
- **Utilities**: camelCase (e.g., `formatters.ts`, `validators.ts`)
- **Tests**: `*.test.tsx` or `*.test.ts`
- **Storybook**: `*.stories.tsx`
- **Types**: `types.ts` or specific (e.g., `buttonTypes.ts`)

### CSS Files
- **CSS Modules**: `ComponentName.module.css`
- **Global styles**: `base.css`, `variables.css`

### Configuration Files
- **JavaScript config**: `.js` or `.cjs` (CommonJS for tools)
- **TypeScript config**: `.ts` (e.g., `vite.config.ts`)
- **JSON config**: `.json` (e.g., `tsconfig.json`)

---

## Import Path Conventions

### Consumer Imports

```typescript
// Main components (tree-shaken)
import { Button, Input, Card } from '@kisanlink/ui-commons';

// Styles (import once in app root)
import '@kisanlink/ui-commons/styles.css';

// Theme
import { ThemeProvider, createTheme } from '@kisanlink/ui-commons/theme';

// Testing utilities
import { renderWithTheme } from '@kisanlink/ui-commons/testing';
```

### Internal Imports (within library)

```typescript
// Use path alias
import { Button } from '@/atoms/Button';
import { formatDate } from '@/utils/formatters';
import { useTheme } from '@/hooks/useTheme';

// Relative imports within same directory
import { ButtonProps } from './types';
import styles from './Button.module.css';
```

---

## Barrel Exports

Each category directory has an `index.ts` that re-exports all components:

```typescript
// src/atoms/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
export { Input } from './Input';
export type { InputProps } from './Input';
// ...

// src/index.ts (main entry point)
export * from './atoms';
export * from './molecules';
export * from './organisms';
```

**Benefits**:
- Clean consumer imports
- Enables tree-shaking
- Single import path

---

## Build Output Structure

```
dist/
├── index.js                  # ESM bundle (tree-shakeable)
├── index.cjs                 # CommonJS bundle (compatibility)
├── index.d.ts                # TypeScript declarations (bundled)
├── theme.js                  # Theme exports (ESM)
├── theme.cjs                 # Theme exports (CJS)
├── theme.d.ts                # Theme types
├── testing.js                # Testing utilities (ESM)
├── testing.d.ts              # Testing types
└── styles.css                # All component styles bundled
```

**Package.json exports**:
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css",
    "./theme": {
      "import": "./dist/theme.js",
      "require": "./dist/theme.cjs",
      "types": "./dist/theme.d.ts"
    },
    "./testing": {
      "import": "./dist/testing.js",
      "types": "./dist/testing.d.ts"
    }
  }
}
```

---

## Ignored Files/Directories

### .gitignore
```
node_modules/
dist/
coverage/
storybook-static/
.DS_Store
*.log
.env*
```

### .npmignore
```
src/
.storybook/
.github/
.husky/
.kiro/
docs/
coverage/
*.test.ts
*.test.tsx
*.stories.tsx
.eslintrc.cjs
.prettierrc
tsconfig.json
vite.config.ts
vitest.config.ts
```

**Rationale**: Only ship `dist/`, `README.md`, `LICENSE`, `CHANGELOG.md`.

---

## Best Practices

### Component Organization

1. **Self-Contained**: Each component directory contains everything related to that component
2. **Co-Located Tests**: Tests live next to components, not in separate `__tests__` directory
3. **Barrel Exports**: Each level has `index.ts` for clean imports
4. **Type Safety**: Separate `types.ts` for complex type definitions

### File Size Guidelines

- **Components**: <300 lines (split into sub-components if larger)
- **Utilities**: <200 lines (split into multiple files if needed)
- **Test files**: No limit (comprehensive tests encouraged)
- **CSS files**: <400 lines (split into multiple modules if needed)

### Dependency Rules

- **Atoms**: No dependencies on other components
- **Molecules**: Can depend on atoms only
- **Organisms**: Can depend on atoms and molecules
- **No Circular Dependencies**: Enforced by ESLint

### Import Order (ESLint enforced)

1. Node built-ins (`path`, `fs`)
2. External dependencies (`react`, `clsx`)
3. Internal absolute imports (`@/atoms/Button`)
4. Parent imports (`../utils`)
5. Sibling imports (`./types`)
6. Index imports (`./`)

---

## Scalability Considerations

### When to Split

**Atoms** exceed 15 components → consider grouping (e.g., `form-atoms/`, `feedback-atoms/`)

**Molecules** exceed 15 components → same grouping strategy

**Utils** grow large → create subdirectories (`formatters/`, `validators/`)

**Example**:
```
utils/
├── formatters/
│   ├── date.ts
│   ├── number.ts
│   └── index.ts
├── validators/
│   ├── email.ts
│   ├── phone.ts
│   └── index.ts
└── index.ts (re-export all)
```

---

## Summary

This directory structure provides:
- **Clear organization**: Components grouped by atomic design principles
- **Maintainability**: Each component is self-contained with tests and stories
- **Scalability**: Easy to add new components without restructuring
- **Developer Experience**: Intuitive paths, clean imports, good defaults
- **Production Ready**: Proper build output, documentation, CI/CD integration

All files and directories serve a specific purpose and follow consistent naming conventions.
