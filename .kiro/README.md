# KisanLink UI Commons: Design System Documentation

## Overview

This directory contains the complete design system specification for **KisanLink UI Commons**, a maximally reusable UI component library serving admin-panel, ecommerce-frontend, and erp-frontend applications.

---

## Document Structure

### `/steering/` - Strategic Direction

#### [`product.md`](./steering/product.md)
- Product vision and goals
- Target applications and use cases
- Success metrics
- User personas
- Component hierarchy overview (Atoms, Molecules)

#### [`tech.md`](./steering/tech.md)
- Technology stack decisions
- Architecture principles
- Build and distribution strategy
- Package structure
- Export strategy
- Breaking change policy

---

### `/specs/` - Detailed Specifications

#### [`component-hierarchy.md`](./specs/component-hierarchy.md)
**35 Components Defined: 20 Atoms + 15 Molecules**

**What's Inside:**
- Complete catalog of all components with API specifications
- TypeScript interface definitions for each component
- Composition patterns (compound components, polymorphic, controlled/uncontrolled)
- Usage examples for every component
- Bundle size strategy and tree-shaking
- Testing requirements per component
- Documentation requirements
- Versioning and deprecation processes

**Key Components:**
- **Atoms**: Button, Input, Text, Icon, Badge, Avatar, Checkbox, Radio, Switch, Spinner, Skeleton, Image, Link, Divider, Label, ProgressBar, Code, Portal, FocusTrap, VisuallyHidden
- **Molecules**: FormField, Card, Alert, Tooltip, Popover, Dropdown Menu, Tabs, RadioGroup, ButtonGroup, SearchBar, Modal, Breadcrumb, Pagination, Toast, Accordion

**Why These Components:**
- Chosen for maximum reusability across all three applications
- Organisms (data tables, navigation, complex forms) intentionally excluded as too application-specific
- Integration guides provided for building complex patterns

---

#### [`theming-system.md`](./specs/theming-system.md)
**Complete Theme Architecture**

**What's Inside:**
- Three-layer design token system:
  - **Layer 1**: Primitive tokens (raw values)
  - **Layer 2**: Semantic tokens (meaning-based)
  - **Layer 3**: Component tokens (scoped)
- ThemeProvider implementation with React Context
- CSS Variables-based runtime theming
- Light/dark mode switching
- Brand customization API (`createTheme()`)
- SSR considerations (preventing FOUC)
- Complete token reference (colors, spacing, typography, shadows, motion)
- Performance optimization strategies

**Key Features:**
- Runtime theme switching without rebuild
- LocalStorage persistence
- System preference detection (`prefers-color-scheme`)
- Per-application brand customization
- Zero JavaScript overhead for styling

---

#### [`accessibility-responsive.md`](./specs/accessibility-responsive.md)
**WCAG 2.1 AA Compliance**

**What's Inside:**
- Color contrast requirements and validation
- Keyboard navigation standards per component
- ARIA patterns and attributes
- Screen reader support guidelines
- Touch target size requirements (44x44px minimum)
- Mobile-first responsive design strategy
- Breakpoint system (640px, 768px, 1024px, 1280px, 1536px)
- Fluid typography with `clamp()`
- Reduced motion support (`prefers-reduced-motion`)
- Internationalization (RTL support, language-specific typography)
- Automated accessibility testing with axe-core

**Accessibility Testing Layers:**
1. Automated: axe-core, React Testing Library
2. Manual: Keyboard, screen readers (NVDA, JAWS, VoiceOver)
3. User testing: Real users with disabilities

---

#### [`documentation-migration.md`](./specs/documentation-migration.md)
**Documentation Standards & Migration Strategy**

**What's Inside:**

**Documentation:**
- TSDoc comment standards with examples
- Storybook story structure (10 story types per component)
- Component usage guide template
- Do's and don'ts guidelines
- API reference auto-generation

**Migration Strategy:**
- **Phase 1**: Audit existing components (Week 1-2)
- **Phase 2**: Create migration plan (Week 3)
- **Phase 3**: Develop codemods with jscodeshift (Week 4)
- **Phase 4**: Pilot migration on one app (Week 5-6)
- **Phase 5**: Gradual rollout (Week 7-12)
- **Phase 6**: Post-migration cleanup

**Migration Tools:**
- Automated codemods for Material-UI, Ant Design, custom components
- Prop mapping tables
- Breaking change management process
- Visual regression testing with Chromatic

---

### `/design/` - Visual Specifications

#### [`visual-system.md`](./design/visual-system.md)
**Complete Design Token Specification**

**What's Inside:**
- **Color System**:
  - Agricultural green (primary), harvest orange/amber (secondary)
  - Semantic colors (success, warning, error, info)
  - WCAG AA compliant contrast ratios
  - Dark mode color adjustments

- **Typography Scale**:
  - Modular scale (1.250 - Major Third)
  - Font families: Inter (sans), JetBrains Mono (mono)
  - 8 sizes from xs (0.64rem) to 3xl (3.052rem)
  - Line heights, weights, letter spacing

- **Spacing Scale**:
  - 4px base unit
  - 16 spacing values (0 to 32 / 0 to 128px)
  - Usage guidelines per context

- **Border Radius**:
  - 7 values from none to full (pill shape)
  - Application rules per component type

- **Elevation System**:
  - 7 shadow levels (xs to 2xl)
  - Focus shadows
  - Dark mode adjustments

- **Motion & Animation**:
  - 5 duration values (instant to slower)
  - 5 easing functions (linear to elastic)
  - Animation guidelines per interaction type
  - Reduced motion support

- **Responsive Breakpoints**:
  - 5 breakpoints (sm: 640px to 2xl: 1536px)
  - Mobile-first media query examples

- **Z-Index Scale**:
  - 9 levels from base (0) to toast (1700)

- **Visual Hierarchy Principles**:
  - Contrast through scale, color, spacing, weight

- **Accessibility Standards**:
  - Focus states, keyboard navigation, screen reader support
  - Color contrast requirements, touch target sizes

- **Icon System**:
  - Lucide React icon library
  - 6 icon sizes (12px to 40px)

- **Brand Expression Guidelines**:
  - Where to be conservative vs. add personality
  - Rule-breaking guidelines (when and how)

---

#### [`architecture-overview.md`](./design/architecture-overview.md)
**System Architecture & Visual Diagrams**

**What's Inside:**
- **System Architecture Diagram**: Complete visual of library structure
- **Data Flow Diagram**: How theming system works from initialization to runtime
- **Component Composition Example**: Visual breakdown of a login form
- **Bundle Size Breakdown**: Expected sizes per layer
- **Development Workflow**: Step-by-step from development to release
- **Accessibility Testing Flow**: Three layers of testing
- **Version Release Timeline**: Example progression from v1.0 to v2.0
- **Success Metrics Dashboard**: Goals and measurement strategies
- **Directory Structure**: Complete file organization
- **Quick Start Guide**: Installation and basic usage
- **Key Decisions Summary**: All major architectural choices with rationale

---

## Quick Reference

### Component Count
- **Total**: 35 components
- **Atoms**: 20 primitive components
- **Molecules**: 15 composed components
- **Organisms**: 0 (intentionally - too application-specific)

### Design Tokens
- **Colors**: 3 palettes (primary, secondary, neutral) + 4 semantic
- **Spacing**: 16 values (0 to 128px)
- **Typography**: 8 font sizes, 3 weights, 3 line heights
- **Shadows**: 7 elevation levels
- **Motion**: 5 durations, 5 easing functions
- **Breakpoints**: 5 responsive breakpoints

### Key Technologies
- **Framework**: React 18+, TypeScript 5+
- **Styling**: CSS Modules + CSS Variables
- **Composition**: Radix UI Primitives
- **Build**: Vite 5+, tsup
- **Testing**: Vitest, React Testing Library, axe-core, Chromatic
- **Docs**: Storybook 8+, TSDoc
- **CI/CD**: GitHub Actions, semantic-release

### Accessibility
- **Target**: WCAG 2.1 Level AA (minimum)
- **Contrast**: 4.5:1 for normal text, 3:1 for large text and UI
- **Touch**: 44x44px minimum target size
- **Keyboard**: Full keyboard navigation support
- **Screen Reader**: All components announce correctly

### Bundle Size
- **Target**: <50KB gzipped (full library)
- **Core Atoms**: ~20KB
- **Molecules**: ~15KB
- **Theme System**: ~5KB
- **Tree-shakeable**: Import only what you need

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up repository structure
- [ ] Configure build system (Vite, TypeScript, PostCSS)
- [ ] Set up testing infrastructure (Vitest, RTL)
- [ ] Configure Storybook
- [ ] Set up CI/CD pipeline
- [ ] Implement design token CSS

### Phase 2: Core Atoms (Weeks 3-6)
- [ ] Implement 20 atomic components
- [ ] Write unit tests for each
- [ ] Write accessibility tests for each
- [ ] Create Storybook stories for each
- [ ] Write TSDoc documentation

### Phase 3: Theme System (Weeks 7-8)
- [ ] Implement ThemeProvider
- [ ] Create theme utilities (createTheme, useTheme)
- [ ] Test light/dark mode switching
- [ ] Test SSR compatibility
- [ ] Document theme customization

### Phase 4: Molecules (Weeks 9-12)
- [ ] Implement 15 molecule components
- [ ] Full testing suite for each
- [ ] Storybook stories with composition examples
- [ ] Integration with Radix UI primitives

### Phase 5: Documentation (Weeks 13-14)
- [ ] Complete usage guides for all components
- [ ] Write migration guides
- [ ] Create example applications
- [ ] Deploy documentation site

### Phase 6: Pilot Migration (Weeks 15-18)
- [ ] Audit admin-panel components
- [ ] Develop codemods
- [ ] Migrate admin-panel to use library
- [ ] QA and fix issues
- [ ] Deploy to production

### Phase 7: Full Rollout (Weeks 19-24)
- [ ] Migrate ecommerce-frontend
- [ ] Migrate erp-frontend
- [ ] Remove old component libraries
- [ ] Establish governance processes

---

## Decision Log

### Key Architectural Decisions

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|------------------------|-----------|
| **Styling Strategy** | CSS Modules + CSS Variables | Tailwind, styled-components, Emotion | Balance of scoping, runtime theming, bundle size, SSR |
| **Component Primitives** | Radix UI | Headless UI, React ARIA, Custom | Best accessibility, unstyled, composable |
| **Build Tool** | Vite | Webpack, Rollup, esbuild | Fast, modern, great DX, library mode |
| **Testing** | Vitest + RTL | Jest, Testing Library only | Vite-native, fast, compatible |
| **Documentation** | Storybook 8 | Docusaurus, custom | Interactive, visual, widely adopted |
| **Package Scope** | Single package | Monorepo (multiple packages) | Simpler versioning, can split later |
| **Component Scope** | Atoms + Molecules | Include Organisms | Organisms too application-specific |
| **TypeScript** | Strict mode | Standard mode | Maximum type safety, better DX |
| **Accessibility** | WCAG 2.1 AA | WCAG 2.0 A, or 2.1 AAA | Industry standard, legal requirement |
| **Versioning** | Semantic Release | Manual versioning | Automated, consistent, conventional commits |

---

## Success Criteria

### Adoption Metrics
- [ ] 80%+ of UI components across apps from @kisanlink/ui-commons
- [ ] 3+ consumer applications actively using library
- [ ] Weekly NPM downloads growing 20% MoM

### Quality Metrics
- [ ] 85%+ test coverage
- [ ] 0 automated accessibility violations
- [ ] <50KB gzipped total bundle
- [ ] LCP <2.5s for pages using components

### Developer Experience
- [ ] 4.5/5+ developer satisfaction rating
- [ ] 100% of components documented
- [ ] 40% reduction in feature implementation time

### Maintenance
- [ ] <2 breaking changes per quarter (after v1.0)
- [ ] <24 hour response to critical vulnerabilities
- [ ] <3 day average PR merge time

---

## Related Resources

### External Documentation
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Tools
- [Contrast Checker (WCAG)](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Bundlephobia](https://bundlephobia.com/)
- [Chromatic](https://www.chromatic.com/)

---

## Contributing

### For Component Developers
1. Read component hierarchy specification
2. Follow TypeScript/TSDoc conventions
3. Write comprehensive tests (unit + accessibility)
4. Create Storybook stories for all variants
5. Ensure WCAG 2.1 AA compliance

### For Consumers
1. Check if component exists before building custom
2. Propose new components via RFC process
3. Report bugs with reproduction steps
4. Suggest improvements via GitHub issues

### For Maintainers
1. Review PRs for design system consistency
2. Ensure no accessibility regressions
3. Monitor bundle size impact
4. Approve/reject visual changes in Chromatic
5. Manage releases via semantic-release

---

## Contact & Support

- **Documentation**: https://ui.kisanlink.com (to be created)
- **GitHub Repository**: https://github.com/kisanlink/ui-commons (to be created)
- **NPM Package**: @kisanlink/ui-commons (to be published)
- **Slack Channel**: #ui-commons-support
- **Email**: ui-commons@kisanlink.com

---

## Version History

- **v0.1.0** (Draft): Initial design system specification complete
- **v1.0.0** (Planned): First stable release with all 35 components
- **v1.x.x** (Future): Minor enhancements and new components
- **v2.0.0** (Future): Major architectural improvements

---

**Last Updated**: 2025-11-13

**Status**: Architecture Complete ✓ | Ready for Implementation

**Next Step**: Review [INDEX.md](./INDEX.md) for quick navigation and begin Phase 0 (Foundation setup)

---

## New: Complete Architecture Documentation

We've created comprehensive architecture documentation for KisanLink UI Commons. Start here:

**👉 [INDEX.md](./INDEX.md)** - Complete navigation guide to all documentation

### Key New Documents:
- **[Executive Summary](./docs/executive-summary.md)** - High-level overview, ROI, timeline
- **[Architecture Document](./docs/architecture.md)** - Complete technical architecture (10,000+ words)
- **[Implementation Roadmap](./docs/implementation-roadmap.md)** - Detailed 6-month plan to v1.0
- **[Risk Assessment](./docs/risk-assessment.md)** - 13 risks identified with mitigation strategies
- **[4 ADRs](./specs/)** - Architecture Decision Records for key choices
- **[Package Specification](./specs/package-specification.md)** - All configurations (package.json, tsconfig, vite, etc.)
- **[Directory Structure](./specs/directory-structure.md)** - Complete file/folder organization

### Architecture Highlights:
- ✅ Single package structure with tree-shaking
- ✅ Vite + SWC build system (10-100x faster than Webpack)
- ✅ CSS Modules + CSS Variables (zero runtime overhead)
- ✅ Vitest + Chromatic testing stack
- ✅ <50KB gzipped bundle target
- ✅ WCAG 2.1 AA compliant
- ✅ 30-40 components by v1.0
- ✅ 6-month timeline to production release
