# Next Actions: Component Implementation Guide

**Purpose**: Step-by-step instructions for implementing remaining components
**Audience**: You or any developer continuing this work
**Estimated Total Time**: 50-66 hours (~7-9 working days)

---

## 🎯 Priority 1: Switch Component (Next Immediate Task)

**Estimated Time**: 3-4 hours
**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Switch/Switch.tsx`
**Status**: Ready to implement

### Step 1: Create Component Structure (30 min)

```bash
# Create directory
mkdir -p /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch

# Create files
touch /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch/Switch.tsx
touch /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch/Switch.module.css
touch /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch/Switch.test.tsx
touch /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch/Switch.stories.tsx
touch /Users/kaushik/kisanlink-ui-commons/src/atoms/Switch/index.ts
```

### Step 2: Implement Switch.tsx (45 min)

**Key Requirements**:
- Convert from CVA (class-variance-authority) to CSS Modules
- Support sizes: sm, md, lg
- Support variants: primary, secondary, success, error, warning
- Support: label, helperText, error, labelPosition (left/right), disabled
- Use role="switch"
- Forward ref to input
- Support controlled/uncontrolled modes

**Component Interface**:
```typescript
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  helperText?: string;
  error?: string;
  labelPosition?: 'left' | 'right';
  wrapperClassName?: string;
}
```

**Pattern Reference**: Follow `Checkbox.tsx` structure

### Step 3: Create Switch.module.css (30 min)

**Required Styles**:
```css
/* Base switch - unchecked state */
.switch {
  /* Base styles */
}

/* Checked state */
.switch:checked {
  /* Background color change */
}

/* Variants */
.switch--primary:checked { background: var(--color-primary-600); }
.switch--secondary:checked { background: var(--color-secondary-600); }
.switch--success:checked { background: var(--color-success-600); }
.switch--error:checked { background: var(--color-error-600); }
.switch--warning:checked { background: var(--color-warning-600); }

/* Sizes */
.switch--sm { height: 20px; width: 36px; }
.switch--md { height: 24px; width: 44px; }
.switch--lg { height: 28px; width: 56px; }

/* Thumb */
.thumb { /* Positioning and transitions */ }
.thumb--checked--sm { transform: translateX(16px); }
.thumb--checked--md { transform: translateX(20px); }
.thumb--checked--lg { transform: translateX(28px); }

/* Disabled */
.switch:disabled { opacity: 0.5; cursor: not-allowed; }

/* Error state */
.switch--error { border-color: var(--color-error-500); }

/* Focus ring */
.switch:focus { box-shadow: 0 0 0 3px ... }
```

### Step 4: Write Switch.test.tsx (90 min)

**Test Structure** (35+ tests):
```typescript
describe('Switch', () => {
  describe('Rendering', () => {
    it('should render without crashing');
    it('should render with label');
    it('should render without label');
    it('should render with helper text');
    it('should render with error message');
    it('should prioritize error over helper text');
  });

  describe('Variants', () => {
    it('should apply primary variant by default');
    it('should apply primary variant');
    it('should apply secondary variant');
    it('should apply success variant');
    it('should apply error variant');
    it('should apply warning variant');
  });

  describe('Sizes', () => {
    it('should apply medium size by default');
    it('should apply small size');
    it('should apply medium size');
    it('should apply large size');
  });

  describe('States', () => {
    it('should be unchecked by default');
    it('should be checked when checked prop is true');
    it('should be disabled when disabled prop is true');
  });

  describe('Label Position', () => {
    it('should position label on right by default');
    it('should position label on left');
  });

  describe('Interactions', () => {
    it('should call onChange when clicked');
    it('should call onChange when label is clicked');
    it('should not call onChange when disabled');
    it('should toggle checked state in uncontrolled mode');
    it('should handle keyboard interaction (Space)');
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations');
    it('should have no violations when checked');
    it('should have no violations when disabled');
    it('should have no violations with error');
    it('should have role="switch"');
    it('should have aria-invalid when error is present');
    it('should have aria-describedby pointing to error');
    it('should have aria-describedby pointing to helper text');
  });

  describe('Custom Props', () => {
    it('should accept custom className');
    it('should accept custom wrapperClassName');
    it('should forward ref to input element');
    it('should pass through native input props');
  });

  describe('Edge Cases', () => {
    it('should handle undefined id gracefully');
    it('should handle empty string label');
  });
});
```

**Pattern Reference**: Copy structure from `Checkbox.test.tsx`

### Step 5: Create Switch.stories.tsx (30 min)

**Stories to Create** (10+ stories):
- Default
- Checked
- All Variants (primary, secondary, success, error, warning)
- All Sizes (sm, md, lg)
- WithHelperText
- WithError
- Disabled
- DisabledChecked
- LabelPosition (left, right)
- Real-world example (Settings panel)
- Playground

**Pattern Reference**: Follow `Badge.stories.tsx` structure

### Step 6: Export and Test (15 min)

```bash
# Add to src/atoms/Switch/index.ts
export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

# Add to src/atoms/index.ts
export * from './Switch';

# Run tests
npm test

# Run Storybook
npm run dev

# Build
npm run build
```

---

## 🎯 Priority 2: Spinner Component

**Estimated Time**: 2-3 hours
**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Spinner/`

### Implementation Checklist

- [ ] Create component structure (10 min)
- [ ] Implement Spinner.tsx with sizes (sm, md, lg) and variants (30 min)
- [ ] Create Spinner.module.css with rotation animation (30 min)
- [ ] Write 25+ tests (60 min)
- [ ] Create 8+ Storybook stories (20 min)
- [ ] Export and verify (10 min)

**Key Features**:
- Sizes: sm, md, lg
- Color variants: primary, secondary, success, error, warning
- aria-busy="true"
- role="status"
- aria-label="Loading"

---

## 🎯 Priority 3: Skeleton Component

**Estimated Time**: 3-4 hours
**Source**: `/Users/kaushik/admin-panel/src/components/ui/atoms/Skeleton/`

### Implementation Checklist

- [ ] Create component structure (10 min)
- [ ] Implement Skeleton.tsx with variants (45 min)
- [ ] Create Skeleton.module.css with shimmer animation (45 min)
- [ ] Write 30+ tests (75 min)
- [ ] Create 10+ Storybook stories (30 min)
- [ ] Export and verify (15 min)

**Key Features**:
- Variants: text, circular, rectangular
- Shimmer animation
- Width and height props
- aria-busy="true"
- aria-label="Loading content"
- Reduced motion support (@media (prefers-reduced-motion: reduce))

---

## 🎯 Priority 4: Label Component

**Estimated Time**: 2-3 hours
**Source**: Create from scratch or extract from ERP

### Implementation Checklist

- [ ] Create component structure (10 min)
- [ ] Implement Label.tsx (30 min)
- [ ] Create Label.module.css (20 min)
- [ ] Write 20+ tests (50 min)
- [ ] Create 8+ Storybook stories (20 min)
- [ ] Export and verify (10 min)

**Key Features**:
- Required indicator (optional red asterisk)
- Info tooltip integration (optional)
- htmlFor attribute for input association
- Variants: default, error
- Sizes: sm, md, lg

---

## 🎯 Critical Molecule: FormField

**Estimated Time**: 4 hours
**Source**: `/Users/kaushik/admin-panel/src/components/ui/molecules/FormField`
**Priority**: CRITICAL - Required for form examples

### Why Critical

FormField is the composition that brings together Label + Input/Select/Textarea + Error + Helper text. Without it, forms are tedious to build. This is the most impactful molecule.

### Implementation Checklist

- [ ] Create molecule structure (10 min)
- [ ] Implement FormField.tsx with composition (60 min)
- [ ] Create FormField.module.css (30 min)
- [ ] Write 40+ tests (90 min)
- [ ] Create 12+ Storybook stories with form examples (45 min)
- [ ] Export and verify (15 min)

**Key Features**:
- Compose: Label + (Input | Select | Textarea) + Error + Helper
- Required indicator
- Error state propagation
- Helper text
- Full keyboard navigation
- ARIA associations

**Example Usage**:
```tsx
<FormField
  label="Email"
  required
  error={errors.email}
  helperText="We'll never share your email"
>
  <Input type="email" {...register('email')} />
</FormField>
```

---

## 🎯 CI/CD Pipeline Setup

**Estimated Time**: 4 hours
**Priority**: High - Enables automated releases

### Step 1: Create .github/workflows/ci.yml (60 min)

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - run: npm run build

      # Bundle size check
      - name: Check bundle size
        run: |
          size=$(gzip -c dist/index.js | wc -c)
          echo "Bundle size: $size bytes"
          if [ $size -gt 51200 ]; then
            echo "::error::Bundle size exceeds 50KB!"
            exit 1
          fi

      # Upload coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
```

### Step 2: Create .github/workflows/release.yml (30 min)

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Step 3: Install semantic-release (30 min)

```bash
npm install -D semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/npm
```

Create `.releaserc.json`:
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

### Step 4: Configure Chromatic (60 min)

```bash
npm install -D chromatic
```

Add to package.json:
```json
{
  "scripts": {
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}
```

Create `.github/workflows/chromatic.yml`:
```yaml
name: Chromatic

on: push

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Step 5: Verify Pipeline (60 min)

- [ ] Push to GitHub
- [ ] Verify CI workflow runs
- [ ] Create test PR to verify PR checks
- [ ] Merge to main to verify release workflow
- [ ] Check NPM registry for published package
- [ ] Verify Chromatic visual regression

---

## 📝 Migration Guides

**Estimated Time**: 6 hours (2 hours per project)

### Template Structure

Each migration guide should include:

1. **Overview** (15 min)
   - Why migrate
   - What changes
   - Timeline

2. **Component Mapping** (45 min)
   - Old component → New component table
   - Import path changes
   - Props changes
   - Breaking changes

3. **Step-by-Step Migration** (45 min)
   - Install ui-commons
   - Replace imports
   - Update component usage
   - Update tests
   - Verify build

4. **Examples** (15 min)
   - Before/After code snippets
   - Form examples
   - Common patterns

### Create These Files

1. **docs/migration/admin-panel-migration.md**
   - Material-UI Button → Button
   - Material-UI TextField → Input
   - Material-UI Checkbox → Checkbox
   - etc.

2. **docs/migration/ecommerce-migration.md**
   - Inline Button → Button
   - Inline Card → Card
   - etc.

3. **docs/migration/erp-migration.md**
   - Local Button → Button
   - Local Modal → Modal
   - Keep high test standards
   - etc.

---

## 📊 Progress Tracking

### Quick Status Check Commands

```bash
# Count components
find src/atoms -type d -depth 1 | wc -l
find src/molecules -type d -depth 1 | wc -l

# Count tests
npm test -- --run | grep "Tests:"

# Check bundle size
npm run build && gzip -c dist/index.js | wc -c

# Check coverage
npm run test:coverage

# Check types
npm run type-check

# Check lint
npm run lint
```

### Milestones

- [ ] **Milestone 1**: 10 production-ready components (Current: 6/10)
- [ ] **Milestone 2**: All Priority 1 atoms complete
- [ ] **Milestone 3**: FormField molecule complete
- [ ] **Milestone 4**: CI/CD pipeline live
- [ ] **Milestone 5**: 20 production-ready components
- [ ] **Milestone 6**: All critical molecules complete
- [ ] **Milestone 7**: Migration guides complete
- [ ] **Milestone 8**: 30 production-ready components
- [ ] **Milestone 9**: All documentation complete
- [ ] **Milestone 10**: First consuming project migrated

---

## 🎯 Daily Goals Suggestion

### Day 1 (8 hours)
- Morning: Switch component (4 hours)
- Afternoon: Spinner component (2 hours) + Skeleton start (2 hours)

### Day 2 (8 hours)
- Morning: Skeleton component finish (2 hours) + Label (2 hours)
- Afternoon: Avatar (2 hours) + Icon (2 hours)

### Day 3 (8 hours)
- Morning: FormField molecule (4 hours)
- Afternoon: Alert molecule (3 hours) + Divider (1 hour)

### Day 4 (8 hours)
- Morning: Select component (4 hours)
- Afternoon: Modal component (4 hours)

### Day 5 (8 hours)
- Morning: Tabs (3 hours) + Text (2 hours)
- Afternoon: Breadcrumb (2 hours) + Pagination start (1 hour)

### Day 6 (8 hours)
- Morning: Pagination finish (2 hours) + SearchBar (2 hours)
- Afternoon: EmptyState (2 hours) + Toast (2 hours)

### Day 7 (8 hours)
- Morning: CI/CD setup (4 hours)
- Afternoon: semantic-release (2 hours) + Chromatic (2 hours)

### Days 8-9 (16 hours)
- Migration guides (6 hours)
- Documentation updates (4 hours)
- Final testing (3 hours)
- Polish and fixes (3 hours)

---

## 🆘 Getting Help

### If You Get Stuck

1. **Component Pattern**: Reference Checkbox.tsx for atoms, Card.tsx for molecules
2. **Test Pattern**: Reference Checkbox.test.tsx (most complete)
3. **Story Pattern**: Reference Badge.stories.tsx (most complete)
4. **CSS Pattern**: Reference Checkbox.module.css

### Key Files to Reference

- `/Users/kaushik/kisanlink-ui-commons/src/atoms/Checkbox/` - Complete atom example
- `/Users/kaushik/kisanlink-ui-commons/src/molecules/Card/` - Complete molecule example
- `/Users/kaushik/kisanlink-ui-commons/.kiro/steering/testing.md` - Testing standards
- `/Users/kaushik/kisanlink-ui-commons/.kiro/steering/tech.md` - Technical standards

### Commands Reference

```bash
# Development
npm run dev              # Start Storybook
npm test                 # Run tests in watch mode
npm run test:ui          # Visual test UI

# Quality Checks
npm run lint             # Lint code
npm run type-check       # TypeScript check
npm run test:coverage    # Coverage report
npm run format           # Format code

# Build
npm run build            # Build library
npm run build:watch      # Watch mode build
```

---

## 🎉 Completion Checklist

### For Each Component

- [ ] Component TypeScript file created
- [ ] CSS Module file created
- [ ] 30+ tests written and passing
- [ ] 10+ Storybook stories created
- [ ] Exported from atoms/molecules index.ts
- [ ] Exported from main index.ts
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] No accessibility violations
- [ ] Build succeeds
- [ ] Storybook renders correctly

### For Project Completion

- [ ] 30+ components implemented
- [ ] 500+ tests passing
- [ ] >85% test coverage
- [ ] <50KB gzipped bundle
- [ ] CI/CD pipeline live
- [ ] semantic-release configured
- [ ] Migration guides complete
- [ ] README.md updated
- [ ] All documentation complete
- [ ] At least one consuming project migrated

---

**Start with Switch component next. Good luck! 🚀**
