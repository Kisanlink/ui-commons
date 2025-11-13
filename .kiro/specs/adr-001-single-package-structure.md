# ADR-001: Single Package Structure over Monorepo

**Status**: Accepted
**Date**: 2025-11-13
**Deciders**: Backend Architecture Team
**Consulted**: Frontend Team, DevOps Team

## Context

We need to decide on the package structure for KisanLink UI Commons component library. The library will contain atoms, molecules, and organisms that will be consumed by admin-panel, ecommerce-frontend, and erp-frontend.

Two main approaches were considered:
1. **Single Package Approach**: One npm package `@kisanlink/ui-commons` containing all components
2. **Monorepo Approach**: Multiple packages (`@kisanlink/ui-core`, `@kisanlink/ui-forms`, `@kisanlink/ui-data`, etc.)

## Decision

We will use a **single package approach** with internal modular structure.

## Rationale

### Advantages of Single Package

1. **Simplified Versioning**
   - Single version number across all components
   - No dependency resolution conflicts between sub-packages
   - Clear versioning for consumers (e.g., all components at v1.2.0)
   - Eliminates "version hell" from interdependent packages

2. **Easier Cross-Component Refactoring**
   - Changes affecting multiple components don't require coordinated releases
   - Internal APIs can be refactored freely
   - No breaking changes between internal components

3. **Consumer Simplicity**
   - Single dependency in package.json
   - One import path: `@kisanlink/ui-commons`
   - No confusion about which package contains which component
   - Single documentation site, single changelog

4. **Lower Maintenance Overhead**
   - Single CI/CD pipeline
   - One build configuration
   - One changelog to maintain
   - Fewer repositories to manage

5. **Tree-Shaking Effectiveness**
   - Modern bundlers (Vite, Webpack 5, Rollup) eliminate unused code
   - ESM with proper exports allows fine-grained tree-shaking
   - Consumers only bundle imported components
   - Example: Importing only Button → ~2-5KB gzipped

6. **Development Experience**
   - Single `npm install` for all components
   - Faster local development (no workspace linking)
   - Simpler Storybook configuration
   - Unified testing suite

### Disadvantages Considered

1. **Potential Bundle Size Growth**
   - Mitigation: Proper tree-shaking, ESM exports, size-limit CI checks
   - Current expectation: <50KB gzipped for full library
   - Trigger for split: >200KB or distinct team ownership

2. **All-or-Nothing Updates**
   - Mitigation: Semantic versioning, backward compatibility
   - Consumers can pin versions if needed
   - Codemods provided for major version migrations

3. **Potential for Circular Dependencies**
   - Mitigation: Clear component hierarchy (atoms → molecules → organisms)
   - ESLint plugin to detect circular imports
   - Architectural guidelines enforce unidirectional dependencies

### Monorepo Disadvantages

1. **Complexity**
   - Requires tooling (Lerna, Turborepo, Nx, or pnpm workspaces)
   - Multiple package.json files to maintain
   - Complex publishing workflows
   - Dependency graph management overhead

2. **Versioning Challenges**
   - Independent versioning creates dependency matrix
   - Coordinated releases require careful orchestration
   - Consumer confusion: "Which version of ui-core works with ui-forms?"

3. **Build Time**
   - Multiple build pipelines
   - Topological sorting for interdependent packages
   - Slower CI/CD (unless heavy caching)

4. **Consumer Complexity**
   - Multiple imports: `import { Button } from '@kisanlink/ui-core'` + `import { FormField } from '@kisanlink/ui-forms'`
   - Risk of version mismatches between packages
   - More dependencies in package.json

## Implementation

### Package Structure
```
@kisanlink/ui-commons/
├── src/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── index.ts (barrel export)
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── index.ts
│   ├── organisms/
│   │   ├── Modal/
│   │   └── index.ts
│   ├── theme/
│   ├── utils/
│   └── index.ts (main barrel export)
├── package.json (single package)
└── vite.config.ts (single build)
```

### Tree-Shaking Configuration
```json
// package.json
{
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### Consumer Usage
```typescript
// Only Button is bundled
import { Button } from '@kisanlink/ui-commons';

// Multiple components, all tree-shaken
import { Button, Input, Card } from '@kisanlink/ui-commons';
```

### ESLint Circular Dependency Detection
```javascript
// .eslintrc.js
module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-cycle': ['error', { maxDepth: Infinity }],
  },
};
```

## Migration Path

If the package grows beyond 200KB or distinct teams emerge with different release cadences:

### Phase 1: Preparation
1. Ensure all components are properly modular
2. Document component dependencies
3. Create automated migration tools

### Phase 2: Split Strategy
```
@kisanlink/ui-core      (atoms, molecules, theme)
@kisanlink/ui-forms     (form-specific components)
@kisanlink/ui-data      (tables, grids, virtualization)
@kisanlink/ui-theme     (theme system, tokens)
```

### Phase 3: Consumer Migration
1. Provide codemod: `npx @kisanlink/ui-commons-migrate single-to-multi`
2. Support both patterns during transition (1 major version)
3. Deprecate single package after migration period

### Example Codemod
```javascript
// Before
import { Button, Table } from '@kisanlink/ui-commons';

// After
import { Button } from '@kisanlink/ui-core';
import { Table } from '@kisanlink/ui-data';
```

## Consequences

### Positive
- Faster time to market (simpler setup)
- Lower cognitive load for developers
- Easier to start, harder to scale (acceptable trade-off)
- Clear single source of truth
- Simplified documentation

### Negative
- Potential for larger bundle if tree-shaking fails (mitigated by testing)
- Whole library versioned together (mitigated by semver)
- More careful architectural discipline required (enforced by linting)

### Neutral
- Future split possible if needed (low probability)
- Requires monitoring bundle size growth

## Compliance

### Security
- ✅ Fewer packages = smaller attack surface
- ✅ Single dependency audit
- ✅ Simpler supply chain verification

### Performance
- ✅ Tree-shaking ensures minimal bundle impact
- ✅ ESM exports enable optimal bundling
- ⚠️ Requires consumer bundler to support ESM (industry standard)

### Maintainability
- ✅ Single codebase to maintain
- ✅ Unified testing and CI/CD
- ✅ Easier onboarding for contributors

## References

- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Tree-Shaking Best Practices](https://webpack.js.org/guides/tree-shaking/)
- [Radix UI Architecture](https://www.radix-ui.com/docs/primitives/overview/introduction) (single package approach)
- [Chakra UI v3 Migration](https://chakra-ui.com/blog/00-roadmap-for-v3) (monorepo to reduce package count)

## Decision Outcome

**Accepted** - Single package structure for initial release (v1.x).

**Review Trigger**: Bundle size exceeds 200KB or 3+ distinct teams maintaining separate component groups.

**Next Steps**: See ADR-002 for build system selection.
