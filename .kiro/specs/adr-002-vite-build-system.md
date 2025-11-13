# ADR-002: Vite + SWC Build System

**Status**: Accepted
**Date**: 2025-11-13
**Deciders**: Backend Architecture Team
**Consulted**: Frontend Team, DevOps Team

## Context

We need to select a build system for the KisanLink UI Commons component library. The build system must:
- Compile TypeScript to JavaScript
- Bundle for distribution (ESM, CJS)
- Generate TypeScript declarations
- Support tree-shaking
- Provide fast development server with HMR
- Integrate with Storybook

Options considered:
1. **Vite** (with SWC or esbuild)
2. **Rollup** (with Babel or SWC)
3. **Webpack** (with Babel or SWC)
4. **tsup** (esbuild-based)
5. **Parcel**

## Decision

We will use **Vite 5.x** in library mode with **SWC** (Speedy Web Compiler) for transpilation.

## Rationale

### Vite Advantages

1. **Development Performance**
   - Native ESM dev server: instant cold start (<500ms)
   - HMR updates in <100ms
   - No bundling during development (on-demand compilation)
   - 10-100x faster than Webpack for large codebases

2. **Production Build Quality**
   - Uses Rollup under the hood (battle-tested)
   - Automatic code-splitting
   - Excellent tree-shaking (based on Rollup)
   - CSS code-splitting and optimization

3. **Library Mode**
   - First-class support for library builds
   - Automatic externalization of dependencies
   - Multiple output formats (ESM, CJS, UMD)
   - Proper `package.json` exports generation

4. **Modern Defaults**
   - TypeScript support out of the box
   - CSS Modules support built-in
   - PostCSS integration
   - Source map generation

5. **Storybook Integration**
   - Official Storybook Vite builder
   - Shared configuration between library and Storybook
   - Fast Storybook development experience

6. **Ecosystem Momentum**
   - Rapidly growing adoption (Vue, React, Svelte)
   - Active maintenance and community
   - Future-proof technology stack

### SWC Advantages

1. **Compilation Speed**
   - Written in Rust: 20x faster than Babel
   - Parallel compilation support
   - Minimal build times even for large codebases

2. **React Support**
   - Native JSX transformation
   - React Fast Refresh support
   - Automatic `react/jsx-runtime` optimization

3. **TypeScript Support**
   - Direct TypeScript compilation (no tsc needed for JS output)
   - Type stripping only (type checking done separately)
   - Faster than esbuild for complex TypeScript

4. **Configuration Simplicity**
   - Minimal configuration required
   - Sensible defaults for React libraries

### Comparison with Alternatives

#### Rollup (Standalone)
- ❌ No development server (requires separate setup)
- ❌ Slower development iteration
- ✅ Excellent tree-shaking (Vite uses Rollup internally)
- ✅ Library bundling expertise
- **Verdict**: Vite provides Rollup benefits + dev server

#### Webpack
- ❌ Slow development server (requires bundling)
- ❌ Complex configuration
- ❌ Large configuration surface area
- ✅ Mature ecosystem
- ✅ Extensive plugin ecosystem
- **Verdict**: Overkill for component library, slow DX

#### tsup (esbuild)
- ✅ Zero-config experience
- ✅ Very fast builds
- ❌ Limited CSS handling (no CSS Modules type generation)
- ❌ No development server
- ❌ Less flexible than Vite for complex scenarios
- **Verdict**: Great for simple libraries, insufficient for our needs

#### Parcel
- ✅ Zero-config experience
- ❌ Library mode support less mature
- ❌ Smaller ecosystem compared to Vite
- ❌ Less predictable output
- **Verdict**: Better for applications than libraries

## Implementation

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(), // SWC-based React plugin
    libInjectCss(), // Inject CSS imports
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.tsx', '**/*.stories.tsx', 'src/**/__tests__'],
      rollupTypes: true, // Bundle .d.ts files
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        theme: resolve(__dirname, 'src/theme/index.ts'),
        testing: resolve(__dirname, 'src/testing/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        preserveModules: false, // Bundle into single files
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name || 'asset';
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild', // Fast minification
    target: 'es2020', // Modern browsers
    cssCodeSplit: false, // Single CSS file
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('postcss-nesting'),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

### SWC Configuration

```json
// .swcrc
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": false,
        "refresh": false
      }
    },
    "target": "es2020",
    "loose": false,
    "externalHelpers": false,
    "keepClassNames": true
  },
  "module": {
    "type": "es6"
  },
  "sourceMaps": true,
  "minify": false
}
```

### Build Scripts

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "build:watch": "vite build --watch",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### TypeScript Configuration

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
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "emitDeclarationOnly": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

### Output Structure

```
dist/
├── index.js              # ESM bundle
├── index.cjs             # CommonJS bundle
├── index.d.ts            # TypeScript declarations (bundled)
├── theme.js
├── theme.cjs
├── theme.d.ts
├── testing.js
├── testing.cjs
├── testing.d.ts
└── styles.css            # Bundled styles
```

### Package.json Exports

```json
{
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
      },
      "require": {
        "types": "./dist/theme.d.ts",
        "default": "./dist/theme.cjs"
      }
    },
    "./testing": {
      "import": {
        "types": "./dist/testing.d.ts",
        "default": "./dist/testing.js"
      }
    }
  },
  "files": ["dist"],
  "sideEffects": false
}
```

## Performance Benchmarks

### Development Server
- **Cold Start**: <500ms (vs Webpack: 5-10s)
- **HMR Update**: <100ms (vs Webpack: 1-2s)
- **Rebuild on Change**: Instant (vs Webpack: 1-3s)

### Production Build
- **Full Build**: ~5-10s (vs Webpack: 30-60s)
- **TypeScript Check**: ~3-5s (separate tsc run)
- **Total CI Build Time**: <15s

### Bundle Size
- **ESM Output**: ~30-40KB (uncompressed, without tree-shaking)
- **Gzipped**: ~10-15KB
- **Single Component (Button)**: ~2KB gzipped after tree-shaking

## Consequences

### Positive
- ✅ Extremely fast development iteration
- ✅ Modern tooling with excellent DX
- ✅ Optimal production bundles
- ✅ Strong TypeScript support
- ✅ Future-proof technology stack
- ✅ Excellent tree-shaking out of the box

### Negative
- ⚠️ Relatively newer than Webpack (less battle-tested in library mode)
- ⚠️ SWC has fewer plugins than Babel (acceptable for our needs)
- ⚠️ Vite ecosystem still maturing (but rapidly growing)

### Neutral
- Build configuration specific to Vite (not portable to other bundlers)
- Requires Node.js 18+ (acceptable modern requirement)

## Compliance

### Security
- ✅ SWC maintained by Vercel (high-quality security practices)
- ✅ Vite maintained by Evan You and Vue core team
- ✅ Fewer dependencies than Webpack + Babel stack
- ✅ Regular security updates

### Performance
- ✅ Fastest development experience
- ✅ Optimal production bundles
- ✅ Excellent tree-shaking results
- ✅ Modern output targets (no legacy browser bloat)

### Maintainability
- ✅ Simpler configuration than Webpack
- ✅ Less boilerplate than Rollup alone
- ✅ Strong community support
- ✅ Excellent documentation

## Alternatives Considered

### If Requirements Change

**Scenario: Need extreme build speed optimization**
- **Alternative**: tsup (esbuild)
- **When**: If build time becomes bottleneck in CI

**Scenario: Need extensive Babel plugins**
- **Alternative**: Rollup + Babel
- **When**: If custom transformations required (unlikely)

**Scenario: Need maximum browser compatibility**
- **Alternative**: Webpack + Babel with extensive polyfills
- **When**: If IE11 support mandated (currently out of scope)

## Migration Path

If switching away from Vite becomes necessary:

### Rollup Migration
1. Vite uses Rollup internally, so `rollupOptions` are portable
2. Extract Rollup config from `vite.config.ts`
3. Add separate dev server (e.g., `serve` package)

### Webpack Migration
1. Translate `build.lib` config to Webpack library mode
2. Add Webpack dev server configuration
3. More complex, but feasible

## References

- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [SWC Documentation](https://swc.rs/docs/configuration/compilation)
- [Vite Performance Benchmarks](https://vitejs.dev/guide/why.html#the-problems)
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)

## Decision Outcome

**Accepted** - Vite 5.x + SWC for build system.

**Review Trigger**:
- Build time exceeds 30 seconds in CI
- Need for Babel-specific plugins arises
- TypeScript compilation issues with SWC

**Next Steps**: See ADR-003 for styling strategy.
