# KisanLink UI Commons: Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONSUMER APPLICATIONS                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │  Admin Panel  │  │  E-commerce   │  │  ERP Frontend │       │
│  │   (Internal)  │  │   (Customer)  │  │  (Business)   │       │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘       │
│          │                  │                  │                │
│          └──────────────────┼──────────────────┘                │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              │ import
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              @kisanlink/ui-commons (NPM Package)                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    PUBLIC API LAYER                        │ │
│  │                                                            │ │
│  │  import { Button, Input, Card } from '@kisanlink/ui-commons'│
│  │  import { ThemeProvider } from '@kisanlink/ui-commons'     │ │
│  │  import '@kisanlink/ui-commons/styles.css'                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │              COMPONENT LAYER (React + TypeScript)         │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │         ATOMS (20 components)                  │      │ │
│  │  │  ┌──────────┬──────────┬──────────┬─────────┐ │      │ │
│  │  │  │  Button  │  Input   │  Text    │  Icon   │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │  Badge   │  Avatar  │ Checkbox │  Radio  │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │  Switch  │ Spinner  │ Skeleton │  Link   │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │  Image   │ Divider  │   Code   │  Label  │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │ Progress │  Portal  │FocusTrap │VisHidden││      │ │
│  │  │  └──────────┴──────────┴──────────┴─────────┘ │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │       MOLECULES (15 components)               │      │ │
│  │  │  ┌──────────┬──────────┬──────────┬─────────┐ │      │ │
│  │  │  │FormField │   Card   │  Alert   │ Tooltip │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │ Popover  │ Dropdown │   Tabs   │  Modal  │ │      │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │RadioGroup│ButtonGrp │SearchBar │Breadcrumb││     │ │
│  │  │  ├──────────┼──────────┼──────────┼─────────┤ │      │ │
│  │  │  │Pagination│  Toast   │Accordion │         │ │      │ │
│  │  │  └──────────┴──────────┴──────────┴─────────┘ │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │     COMPOSITION PATTERNS (Radix UI)            │      │ │
│  │  │  • Compound components (Card.Header/Body)      │      │ │
│  │  │  • Polymorphic components (as prop)            │      │ │
│  │  │  • Controlled/Uncontrolled patterns            │      │ │
│  │  │  • Ref forwarding (React.forwardRef)           │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  └────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │                  STYLE LAYER                              │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │        CSS MODULES (Component Styles)          │      │ │
│  │  │  • button.module.css                           │      │ │
│  │  │  • input.module.css                            │      │ │
│  │  │  • card.module.css                             │      │ │
│  │  │  ↓ Uses CSS Variables                          │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │    CSS VARIABLES (Design Tokens)               │      │ │
│  │  │  ┌─────────────────────────────────────────┐   │      │ │
│  │  │  │ Layer 3: Component Tokens              │   │      │ │
│  │  │  │  --button-bg, --input-border, etc.     │   │      │ │
│  │  │  │  ↓                                      │   │      │ │
│  │  │  │ Layer 2: Semantic Tokens               │   │      │ │
│  │  │  │  --color-primary, --color-text-primary │   │      │ │
│  │  │  │  ↓                                      │   │      │ │
│  │  │  │ Layer 1: Primitive Tokens              │   │      │ │
│  │  │  │  --palette-green-500, --spacing-4      │   │      │ │
│  │  │  └─────────────────────────────────────────┘   │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  └────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │                  THEME SYSTEM                             │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │       ThemeProvider (React Context)            │      │ │
│  │  │  • Manages theme mode (light/dark)             │      │ │
│  │  │  • Applies custom theme overrides              │      │ │
│  │  │  • LocalStorage persistence                    │      │ │
│  │  │  • System preference detection                 │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  │                          │                                │ │
│  │  ┌───────────────────────┼────────────────────────┐      │ │
│  │  │         Theme Configurations                   │      │ │
│  │  │  • kisanlink.ts (default theme)                │      │ │
│  │  │  • light.css (light mode tokens)               │      │ │
│  │  │  • dark.css (dark mode tokens)                 │      │ │
│  │  │  • createTheme() utility                       │      │ │
│  │  └────────────────────────────────────────────────┘      │ │
│  └────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │               UTILITIES & HELPERS                         │ │
│  │  • cn() - className utility                               │ │
│  │  • cva() - Class Variance Authority                       │ │
│  │  • useReducedMotion() - Accessibility hook                │ │
│  │  • useResponsiveProp() - Responsive values                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                           │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Build      │  │   Testing    │  │   Docs       │          │
│  │  • Vite      │  │  • Vitest    │  │  • Storybook │          │
│  │  • TypeScript│  │  • RTL       │  │  • TSDoc     │          │
│  │  • PostCSS   │  │  • Axe       │  │  • MDX       │          │
│  │  • SWC       │  │  • Chromatic │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Quality    │  │   CI/CD      │  │   Publish    │          │
│  │  • ESLint    │  │  • GitHub    │  │  • NPM       │          │
│  │  • Prettier  │  │    Actions   │  │  • Semantic  │          │
│  │  • Husky     │  │  • Automated │  │    Release   │          │
│  │  • lint-      │  │    Tests     │  │  • Changelog │          │
│  │    staged    │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Theming System

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION STARTUP                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Load CSS Tokens (Primitive + Semantic)                      │
│     ↓                                                            │
│     :root { --palette-green-500: #22c55e; }                      │
│     :root { --color-primary: var(--palette-green-500); }         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ThemeProvider Initialization                                 │
│     ↓                                                            │
│     • Check localStorage for saved theme mode                    │
│     • Check system preference (prefers-color-scheme)             │
│     • Apply default or custom theme                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Apply Theme Mode                                             │
│     ↓                                                            │
│     document.documentElement.setAttribute('data-theme', 'dark')  │
│     ↓                                                            │
│     [data-theme="dark"] { --color-primary: #4ade80; }            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. Apply Custom Theme Overrides (if provided)                   │
│     ↓                                                            │
│     createTheme({ colors: { primary: '#8b5cf6' } })             │
│     ↓                                                            │
│     document.documentElement.style.setProperty(                  │
│       '--color-primary', '#8b5cf6'                               │
│     )                                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. Components Use CSS Variables                                 │
│     ↓                                                            │
│     .button { background: var(--color-primary); }                │
│     ↓                                                            │
│     Browser resolves: background: #8b5cf6;                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER ACTION: Toggle Theme Mode                                  │
│     ↓                                                            │
│     setMode('light')                                             │
│     ↓                                                            │
│     • Update data-theme attribute                                │
│     • Save to localStorage                                       │
│     • CSS variables automatically update                         │
│     • Components re-render with new colors                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Composition Example

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER'S LOGIN FORM                            │
│  (Consumer Application Code)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Composed from
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Card (Molecule from ui-commons)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Card.Body                                                  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Text (Atom) - "Login" heading                       │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ FormField (Molecule)                                │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │ Label (Atom) - "Email"                      │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │ Input (Atom) - Email input field            │   │  │  │
│  │  │  │  ┌──────────────────────────────────────┐   │   │  │  │
│  │  │  │  │ Icon (Atom) - Email icon (leftIcon)  │   │   │  │  │
│  │  │  │  └──────────────────────────────────────┘   │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │ Text (Atom) - Error message                 │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ FormField (Molecule) - Password field (similar)     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Button (Atom) - "Sign In" button                    │  │  │
│  │  │  ┌──────────────────────────────────────────────┐   │  │  │
│  │  │  │ Spinner (Atom) - Loading state (conditional) │   │  │  │
│  │  │  └──────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Divider (Atom) - "OR" separator                     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Button (Atom) - "Continue with Google"              │  │  │
│  │  │  ┌──────────────────────────────────────────────┐   │  │  │
│  │  │  │ Icon (Atom) - Google logo (leftIcon)         │   │  │  │
│  │  │  └──────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

LEGEND:
• Card, FormField → Molecules (composed from atoms)
• Button, Input, Icon, Text, Label, Divider, Spinner → Atoms (primitives)
• Login Form → Consumer's application-specific composition
```

---

## Bundle Size Breakdown

```
Total Package Size: ~45-50KB gzipped

┌─────────────────────────────────────────────────┐
│  Component Layer           │  Size (gzipped)    │
├────────────────────────────┼────────────────────┤
│  Core Atoms (20)           │  ~20KB             │
│  • Button, Input, Text     │                    │
│  • Icon, Badge, Avatar     │                    │
│  • Checkbox, Radio, Switch │                    │
│  • Spinner, Skeleton, etc. │                    │
├────────────────────────────┼────────────────────┤
│  Molecules (15)            │  ~15KB             │
│  • FormField, Card, Alert  │                    │
│  • Tooltip, Popover        │                    │
│  • Dropdown, Tabs, Modal   │                    │
│  • Accordion, Toast, etc.  │                    │
├────────────────────────────┼────────────────────┤
│  Theme System              │  ~5KB              │
│  • ThemeProvider           │                    │
│  • CSS Variables           │                    │
│  • Theme utilities         │                    │
├────────────────────────────┼────────────────────┤
│  Utilities                 │  ~3KB              │
│  • cn(), cva()             │                    │
│  • Hooks                   │                    │
├────────────────────────────┼────────────────────┤
│  Radix UI Primitives       │  ~7KB              │
│  • Dialog, Dropdown        │                    │
│  • Tabs, Accordion, etc.   │                    │
└────────────────────────────┴────────────────────┘
                              TOTAL: ~50KB

TREE-SHAKING:
If consumer imports only Button:
  Button + dependencies: ~5KB gzipped

If consumer imports Button + Input + Card:
  ~12KB gzipped

Full import (all components):
  ~50KB gzipped
```

---

## Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                      DEVELOPER WORKFLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. COMPONENT DEVELOPMENT
   ↓
   Developer creates new component:
   • src/components/atoms/Button/Button.tsx
   • src/components/atoms/Button/Button.module.css
   • src/components/atoms/Button/Button.test.tsx
   • src/components/atoms/Button/Button.stories.tsx
   ↓
   npm run dev (Storybook hot reload)
   ↓
   Visual development + testing in isolation

2. WRITE TESTS
   ↓
   npm run test (Vitest + RTL)
   • Unit tests (props, events, refs)
   • Accessibility tests (axe-core)
   • Keyboard navigation tests
   ↓
   npm run test:coverage (Ensure >85% coverage)

3. DOCUMENTATION
   ↓
   Add TSDoc comments
   ↓
   Create Storybook stories (all variants, states)
   ↓
   Write usage guidelines

4. COMMIT
   ↓
   git add .
   git commit -m "feat(button): add loading state support"
   ↓
   Pre-commit hooks run:
   • lint-staged (ESLint + Prettier)
   • Type checking
   • Unit tests
   ↓
   If all pass → Commit created

5. PUSH & PR
   ↓
   git push origin feature/button-loading
   ↓
   Create Pull Request
   ↓
   CI Pipeline runs:
   • Lint & format check
   • Type check
   • Unit tests + coverage
   • Build library (ensure no errors)
   • Build Storybook
   • Visual regression (Chromatic)
   • Bundle size check
   ↓
   If all pass → Ready for review

6. REVIEW & MERGE
   ↓
   Code review by maintainer
   ↓
   Visual review in Chromatic
   ↓
   Approve and merge to main

7. RELEASE (Automated)
   ↓
   Merge to main triggers:
   • semantic-release analyzes commits
   • Determines version bump (patch/minor/major)
   • Generates changelog
   • Creates git tag
   • Publishes to NPM
   • Deploys Storybook to docs site
   • Posts notification to Slack
   ↓
   New version available for consumers!

8. CONSUMER USAGE
   ↓
   npm install @kisanlink/ui-commons@latest
   ↓
   import { Button } from '@kisanlink/ui-commons'
   ↓
   <Button loading>Save</Button>
```

---

## Accessibility Testing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  ACCESSIBILITY TESTING LAYERS                    │
└─────────────────────────────────────────────────────────────────┘

LAYER 1: AUTOMATED TESTS (CI)
   ↓
   ┌─────────────────────────────────────┐
   │ axe-core via jest-axe               │
   │ • WCAG 2.1 AA violations            │
   │ • Color contrast                    │
   │ • ARIA attributes                   │
   │ • Semantic HTML                     │
   └─────────────────────────────────────┘
   ↓
   ┌─────────────────────────────────────┐
   │ React Testing Library               │
   │ • Keyboard navigation               │
   │ • Focus management                  │
   │ • Accessible names                  │
   │ • ARIA roles                        │
   └─────────────────────────────────────┘
   ↓
   ┌─────────────────────────────────────┐
   │ Storybook Accessibility Addon       │
   │ • Component-level audits            │
   │ • Visual feedback in dev            │
   └─────────────────────────────────────┘

LAYER 2: MANUAL TESTING (Pre-release)
   ↓
   ┌─────────────────────────────────────┐
   │ Keyboard Navigation                 │
   │ • Tab through all components        │
   │ • Test arrow keys, Enter, Space     │
   │ • Verify focus indicators           │
   └─────────────────────────────────────┘
   ↓
   ┌─────────────────────────────────────┐
   │ Screen Reader Testing               │
   │ • NVDA (Windows)                    │
   │ • JAWS (Windows)                    │
   │ • VoiceOver (macOS)                 │
   │ • TalkBack (Android)                │
   └─────────────────────────────────────┘
   ↓
   ┌─────────────────────────────────────┐
   │ Browser DevTools                    │
   │ • Lighthouse accessibility audit    │
   │ • Inspect ARIA tree                 │
   │ • Test reduced motion               │
   └─────────────────────────────────────┘

LAYER 3: USER TESTING (Major releases)
   ↓
   ┌─────────────────────────────────────┐
   │ Real Users with Disabilities        │
   │ • Screen reader users               │
   │ • Keyboard-only users               │
   │ • Low vision users                  │
   │ • Gather feedback                   │
   └─────────────────────────────────────┘
```

---

## Version Release Timeline

```
TIMELINE: Version 1.0.0 → 1.5.0 → 2.0.0

┌─────────────────────────────────────────────────────────────────┐
│  v1.0.0 (Initial Release)                                        │
│  ─────────────────────────                                       │
│  • 20 Atoms + 15 Molecules                                       │
│  • Light + Dark mode                                             │
│  • Full documentation                                            │
│  • WCAG 2.1 AA compliant                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (3 months)
┌─────────────────────────────────────────────────────────────────┐
│  v1.1.0 (Minor - New Features)                                   │
│  ─────────────────────────────────                               │
│  • Add DatePicker molecule (integration guide)                   │
│  • Add responsive prop API to Button, Input                      │
│  • Performance improvements (React.memo)                          │
│  • No breaking changes                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (2 months)
┌─────────────────────────────────────────────────────────────────┐
│  v1.2.0 (Minor - Enhancements)                                   │
│  ─────────────────────────────────────────────────────────────────┘
│  • Add polymorphic `as` prop to more components                  │
│  • Improved TypeScript types                                     │
│  • Bug fixes                                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (3 months)
┌─────────────────────────────────────────────────────────────────┐
│  v1.5.0 (Minor - Deprecations)                                   │
│  ─────────────────────────────────────────────────────────────────
│  • Deprecate Button `type` prop (use `variant`)                 │
│  • Deprecate Card `raised` prop (use `variant="elevated"`)       │
│  • Runtime warnings in development mode                          │
│  • Migration guide published                                     │
│  • No functionality broken yet                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (6 months grace period)
┌─────────────────────────────────────────────────────────────────┐
│  v2.0.0 (Major - Breaking Changes)                               │
│  ─────────────────────────────────────────────────────────────────
│  BREAKING:                                                       │
│  • Remove deprecated `type` prop from Button                     │
│  • Remove deprecated `raised` prop from Card                     │
│  • Change Input error prop behavior                              │
│                                                                  │
│  NEW:                                                            │
│  • Redesigned theme API                                          │
│  • Container query support                                       │
│  • React 19 support                                              │
│                                                                  │
│  MIGRATION:                                                      │
│  • Codemod provided: npx @kisanlink/ui-codemod v1-to-v2         │
│  • Detailed migration guide                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Success Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUCCESS METRICS (Goals)                       │
└─────────────────────────────────────────────────────────────────┘

ADOPTION METRICS
─────────────────
• Component reuse rate: >80% across applications
  └─ Measure: % of UI components from @kisanlink/ui-commons

• NPM downloads: Track weekly/monthly downloads
  └─ Goal: Increase 20% month-over-month

• Consumer applications: 3+ apps using library
  └─ Current: admin-panel, ecommerce-frontend, erp-frontend

QUALITY METRICS
───────────────
• Test coverage: >85%
  └─ Current target: All components have unit + accessibility tests

• Accessibility violations: 0 (automated)
  └─ Tool: axe-core in CI

• Bundle size: <50KB gzipped (full library)
  └─ Monitor with bundlephobia and size-limit

• Performance: LCP <2.5s for pages using components
  └─ Measure: Lighthouse scores in consumer apps

DEVELOPER EXPERIENCE
────────────────────
• Developer satisfaction: >4.5/5
  └─ Quarterly survey of library consumers

• Documentation completeness: 100% of components
  └─ Every component has Storybook + usage guide

• Time to implement feature: -40% (vs custom components)
  └─ Measure: Track feature completion time before/after library

MAINTENANCE METRICS
───────────────────
• Breaking changes: <2 per quarter (after v1.0)
  └─ Minimize disruption to consumers

• Vulnerability response time: <24 hours (critical)
  └─ Automated scanning with Snyk

• PR merge time: <3 days average
  └─ Keep library moving forward

• Release frequency: Weekly or bi-weekly
  └─ Continuous delivery of improvements
```

---

## Directory Structure (Final)

```
kisanlink-ui-commons/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   ├── preview.tsx
│   └── theme.ts
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Text/
│   │   │   └── ... (18 more atoms)
│   │   ├── molecules/
│   │   │   ├── FormField/
│   │   │   ├── Card/
│   │   │   ├── Alert/
│   │   │   └── ... (12 more molecules)
│   │   └── index.ts          # Public API exports
│   ├── theme/
│   │   ├── tokens/
│   │   │   ├── colors.css
│   │   │   ├── typography.css
│   │   │   ├── spacing.css
│   │   │   ├── borders.css
│   │   │   ├── shadows.css
│   │   │   ├── motion.css
│   │   │   └── index.css
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   └── kisanlink.ts
│   │   ├── Provider.tsx
│   │   ├── useTheme.ts
│   │   ├── createTheme.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── cn.ts             # className utility
│   │   ├── variants.ts       # CVA utilities
│   │   ├── useReducedMotion.ts
│   │   └── useResponsiveProp.ts
│   └── index.ts              # Main entry point
├── tests/
│   ├── setup.ts              # Test setup
│   └── utils.tsx             # Test utilities
├── .kiro/                    # Project documentation
│   ├── steering/
│   │   ├── product.md        # Product vision
│   │   └── tech.md           # Technical architecture
│   ├── specs/
│   │   ├── component-hierarchy.md
│   │   ├── theming-system.md
│   │   ├── accessibility-responsive.md
│   │   └── documentation-migration.md
│   └── design/
│       ├── visual-system.md
│       └── architecture-overview.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## Quick Start for Developers

### Installation

```bash
npm install @kisanlink/ui-commons
```

### Basic Usage

```typescript
// App.tsx
import { ThemeProvider, Button, Card, Text } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css';

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <Card variant="elevated">
        <Card.Body>
          <Text variant="heading-2">Welcome</Text>
          <Text variant="body">Get started with KisanLink UI Commons</Text>
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
}
```

### Custom Theme

```typescript
import { ThemeProvider, createTheme } from '@kisanlink/ui-commons';

const myTheme = createTheme({
  colors: {
    primary: '#8b5cf6',
    secondary: '#f59e0b',
  },
  spacing: {
    4: '14px', // Override default 16px
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

---

## Next Steps

1. **Implementation Phase**: Set up project structure, build system, CI/CD
2. **Core Components**: Implement atoms first, then molecules
3. **Theme System**: Build ThemeProvider and design tokens
4. **Testing Infrastructure**: Set up Vitest, RTL, axe-core, Chromatic
5. **Documentation**: Write Storybook stories and usage guides
6. **Pilot Migration**: Start with one consumer application
7. **Iterate**: Gather feedback, refine, expand

---

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Styling** | CSS Modules + CSS Variables | Balance of scoping, theming, performance |
| **Component Library** | Radix UI (for complex components) | Accessibility, unstyled, composable |
| **Build Tool** | Vite | Fast, modern, ESM-first |
| **Testing** | Vitest + RTL + axe-core | Vite-native, comprehensive coverage |
| **Documentation** | Storybook + TSDoc | Interactive, auto-generated, visual |
| **Versioning** | Semantic Release | Automated, conventional commits |
| **Package Structure** | Single package (for now) | Simpler, can split later if needed |
| **Scope** | Atoms + Molecules only | Organisms too application-specific |
| **TypeScript** | Strict mode enabled | Type safety, better DX |
| **Accessibility** | WCAG 2.1 AA minimum | Industry standard, legal compliance |

---

This architecture is designed for **maximum reusability**, **consistency**, and **DRY principles** while maintaining flexibility for brand customization across applications.
