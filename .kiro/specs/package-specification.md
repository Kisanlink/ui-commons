# Package Specification: @kisanlink/ui-commons

**Version**: 1.0.0
**Last Updated**: 2025-11-13

## Package Metadata

### package.json

```json
{
  "name": "@kisanlink/ui-commons",
  "version": "1.0.0",
  "description": "Production-grade React component library for KisanLink ecosystem",
  "keywords": [
    "react",
    "components",
    "ui",
    "design-system",
    "kisanlink",
    "typescript"
  ],
  "author": "KisanLink Engineering Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/kisanlink/ui-commons.git"
  },
  "bugs": {
    "url": "https://github.com/kisanlink/ui-commons/issues"
  },
  "homepage": "https://ui-commons.kisanlink.com",
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
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "sideEffects": false,
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  },
  "dependencies": {
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@chromatic-com/storybook": "^1.9.0",
    "@storybook/addon-a11y": "^8.3.0",
    "@storybook/addon-essentials": "^8.3.0",
    "@storybook/addon-interactions": "^8.3.0",
    "@storybook/addon-links": "^8.3.0",
    "@storybook/blocks": "^8.3.0",
    "@storybook/react": "^8.3.0",
    "@storybook/react-vite": "^8.3.0",
    "@storybook/test": "^8.3.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.7.4",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.8.0",
    "@typescript-eslint/parser": "^8.8.0",
    "@vitejs/plugin-react-swc": "^3.7.1",
    "@vitest/coverage-v8": "^2.1.2",
    "@vitest/ui": "^2.1.2",
    "autoprefixer": "^10.4.20",
    "chromatic": "^11.11.0",
    "cssnano": "^7.0.6",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.30.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "eslint-plugin-react": "^7.37.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-storybook": "^0.9.0",
    "husky": "^9.1.6",
    "jest-axe": "^9.0.0",
    "jsdom": "^25.0.1",
    "lint-staged": "^15.2.10",
    "postcss": "^8.4.47",
    "postcss-nesting": "^13.0.0",
    "prettier": "^3.3.3",
    "storybook": "^8.3.5",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vite-plugin-dts": "^4.2.3",
    "vite-plugin-lib-inject-css": "^2.1.1",
    "vitest": "^2.1.2",
    "vitest-axe": "^1.0.0"
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "npm run clean && npm run type-check && vite build",
    "build:watch": "vite build --watch",
    "build-storybook": "storybook build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:changed": "vitest related --run",
    "chromatic": "chromatic --exit-zero-on-changes",
    "prepare": "husky install",
    "prepublishOnly": "npm run build && npm test",
    "release": "semantic-release"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md}": [
      "prettier --write"
    ]
  },
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
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

---

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",

    /* Modules */
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,

    /* Emit */
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "emitDeclarationOnly": false,
    "noEmit": false,

    /* Interop Constraints */
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,

    /* Type Checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,

    /* Completeness */
    "skipLibCheck": true,

    /* Path Mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.tsx",
    "**/*.stories.tsx",
    "**/__tests__",
    "src/test"
  ]
}
```

### tsconfig.node.json (for build scripts)

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

---

## Vite Configuration

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.tsx', '**/*.stories.tsx', 'src/**/__tests__'],
      rollupTypes: true,
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
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: false,
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name || 'asset';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:8]'
          : '[name]__[local]__[hash:base64:5]',
    },
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

---

## Vitest Configuration

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/__tests__/**',
        'src/**/types.ts',
        'src/test/**',
        'dist/**',
      ],
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
    },
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

---

## PostCSS Configuration

### postcss.config.js

```javascript
export default {
  plugins: {
    'postcss-nesting': {},
    autoprefixer: {},
    cssnano:
      process.env.NODE_ENV === 'production'
        ? {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }
        : false,
  },
};
```

---

## ESLint Configuration

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:storybook/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', '@typescript-eslint', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/prop-types': 'off',
    'jsx-a11y/no-autofocus': 'off',
  },
};
```

---

## Prettier Configuration

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### .prettierignore

```
dist
node_modules
coverage
.storybook/storybook-static
*.md
package-lock.json
pnpm-lock.yaml
```

---

## Husky & Lint-Staged

### .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### lint-staged configuration (in package.json)

Already included in package.json above.

---

## Storybook Configuration

### .storybook/main.ts

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

### .storybook/preview.ts

```typescript
import type { Preview } from '@storybook/react';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    chromatic: {
      delay: 300,
      pauseAnimationAtEnd: true,
    },
  },
};

export default preview;
```

---

## Git Configuration

### .gitignore

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.vitest/

# Production
dist/
build/

# Misc
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# Storybook
storybook-static/

# TypeScript
*.tsbuildinfo

# Temporary
*.tmp
.cache/
```

### .npmignore

```
# Source files
src/
.storybook/

# Config files
.eslintrc.cjs
.prettierrc
.prettierignore
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
postcss.config.js

# CI/CD
.github/
.husky/

# Docs
docs/
.kiro/

# Testing
coverage/
*.test.ts
*.test.tsx
*.stories.ts
*.stories.tsx
__tests__/

# Misc
.DS_Store
*.log
.env*
```

---

## GitHub Actions

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests

      - name: Build
        run: npm run build

      - name: Check bundle size
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
          exitZeroOnChanges: true

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm audit --audit-level=moderate
```

### .github/workflows/release.yml

```yaml
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
        with:
          node-version: '20'
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci

      - run: npm test

      - run: npm run build

      - name: Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

---

## Semantic Release Configuration

### .releaserc.json

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

---

## Documentation Files

### README.md

```markdown
# @kisanlink/ui-commons

Production-grade React component library for the KisanLink ecosystem.

## Installation

```bash
npm install @kisanlink/ui-commons
```

## Usage

```tsx
import { Button, Card } from '@kisanlink/ui-commons';
import '@kisanlink/ui-commons/styles.css';

function App() {
  return (
    <Card>
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}
```

## Documentation

Visit [https://ui-commons.kisanlink.com](https://ui-commons.kisanlink.com) for full documentation.

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

## License

MIT
```

### LICENSE

```
MIT License

Copyright (c) 2025 KisanLink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Summary

This specification provides all the necessary configuration files and metadata for the @kisanlink/ui-commons package. Key highlights:

1. **Package.json**: Complete with all dependencies, scripts, and publishing configuration
2. **TypeScript**: Strict mode enabled for maximum type safety
3. **Build System**: Vite configured for library mode with proper exports
4. **Testing**: Vitest with comprehensive coverage requirements
5. **Quality**: ESLint, Prettier, Husky for code quality enforcement
6. **CI/CD**: GitHub Actions for automated testing and releases
7. **Documentation**: Storybook, README, LICENSE ready to go

All configurations are production-ready and follow industry best practices.
