# Testing Strategy: KisanLink UI Commons

## Testing Philosophy

### Principles
1. **Test User Behavior, Not Implementation**: Focus on what users experience
2. **Comprehensive Coverage**: Unit, integration, visual, and accessibility testing
3. **Fast Feedback**: Tests run in <2 minutes for rapid iteration
4. **Confidence Over Coverage**: 85%+ coverage with meaningful tests
5. **Prevent Regressions**: Visual and snapshot testing for UI stability

## Testing Pyramid

```
        /\
       /E2E\          (Consumer-level, sparse)
      /------\
     /Visual \        (Component visual states)
    /----------\
   /Integration\      (Component interactions)
  /--------------\
 /  Unit Tests   \    (Business logic, utilities)
/------------------\
```

## Test Types & Tools

### 1. Unit Tests (Vitest)
**Purpose**: Test isolated component logic and utilities

**Coverage Target**: >90% for utilities, >80% for components

**Tooling**:
- **Vitest**: Fast, Vite-native test runner
- **@testing-library/react**: User-centric testing utilities
- **@testing-library/user-event**: Realistic user interactions
- **@testing-library/jest-dom**: Custom matchers

**Example Structure**:
```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant classes', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('button--primary');
  });
});
```

**What to Test**:
- Component renders without crashing
- Props are applied correctly
- Event handlers are called
- Conditional rendering works
- Edge cases (null, undefined, empty strings)
- Error states and boundaries

**What NOT to Test**:
- Implementation details (state variables, internal functions)
- Third-party library internals
- CSS specifics (use visual regression instead)

### 2. Integration Tests
**Purpose**: Test component combinations and interactions

**Coverage Target**: >70% for complex workflows

**Example**:
```typescript
// FormField.integration.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from './FormField';

describe('FormField Integration', () => {
  it('displays validation error on blur', async () => {
    const mockValidate = (value: string) =>
      value.length < 3 ? 'Minimum 3 characters' : undefined;

    render(
      <FormField
        label="Username"
        name="username"
        validate={mockValidate}
      />
    );

    const input = screen.getByLabelText(/username/i);
    await userEvent.type(input, 'ab');
    await userEvent.tab(); // Blur

    expect(screen.getByText(/minimum 3 characters/i)).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
```

### 3. Visual Regression Tests (Chromatic)
**Purpose**: Catch unintended UI changes

**Tooling**:
- **Chromatic**: Cloud-based visual testing
- **Storybook Stories**: Serve as test cases
- **Alternate**: Percy, Playwright screenshots

**Configuration**:
```javascript
// .storybook/main.js
export default {
  features: {
    buildStoriesJson: true,
  },
};
```

**Process**:
1. Every Storybook story is a visual test case
2. Chromatic captures screenshots on every commit
3. Diffs are reviewed in PR
4. Approved changes become new baseline

**Story Coverage**:
- All component states (default, hover, active, disabled)
- All variants (primary, secondary, danger, etc.)
- Responsive breakpoints (mobile, tablet, desktop)
- Dark mode (if applicable)
- Error states

### 4. Accessibility Tests
**Purpose**: Ensure WCAG 2.1 AA compliance

**Tooling**:
- **jest-axe** / **vitest-axe**: Automated a11y testing
- **@storybook/addon-a11y**: Storybook accessibility addon
- **Manual Testing**: Screen reader verification

**Example**:
```typescript
// Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct ARIA attributes when loading', async () => {
    const { container } = render(<Button loading>Loading</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

**Checklist**:
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Screen reader announcements (ARIA labels, live regions)
- Color contrast ratios (4.5:1 for normal text, 3:1 for large)
- Focus indicators visible
- No keyboard traps

### 5. Performance Tests
**Purpose**: Ensure runtime performance standards

**Tooling**:
- **React DevTools Profiler**: Render performance
- **Bundlephobia**: Bundle size tracking
- **Lighthouse CI**: Performance metrics

**Metrics**:
- **Render Time**: <16ms for 60fps
- **Re-render Count**: Minimize unnecessary renders
- **Memory Leaks**: No increasing memory in repeated operations

**Example**:
```typescript
// Button.perf.test.tsx
import { render } from '@testing-library/react';
import { Profiler } from 'react';
import { Button } from './Button';

describe('Button Performance', () => {
  it('renders within acceptable time', () => {
    let renderTime = 0;

    const onRender = (id, phase, actualDuration) => {
      renderTime = actualDuration;
    };

    render(
      <Profiler id="button" onRender={onRender}>
        <Button>Test</Button>
      </Profiler>
    );

    expect(renderTime).toBeLessThan(5); // 5ms threshold
  });
});
```

### 6. Type Tests
**Purpose**: Validate TypeScript types and generics

**Tooling**:
- **tsd**: Type definition testing
- **TypeScript Compiler**: Strict mode validation

**Example**:
```typescript
// Button.types.test.tsx
import { expectType, expectError } from 'tsd';
import { Button, ButtonProps } from './Button';

// Valid props
expectType<ButtonProps>({
  variant: 'primary',
  size: 'medium',
  onClick: () => {},
});

// Invalid props should error
expectError(<Button variant="invalid" />);
expectError(<Button size="huge" />);

// Polymorphic component
expectType<React.ElementType>(<Button as="a" href="/link" />);
```

## Test Organization

### Directory Structure
```
src/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx           # Unit tests
│   │   ├── Button.a11y.test.tsx      # A11y tests
│   │   ├── Button.stories.tsx        # Storybook (visual tests)
│   │   └── index.ts
│   └── Input/
│       └── ...
├── molecules/
│   └── FormField/
│       ├── FormField.tsx
│       ├── FormField.test.tsx
│       ├── FormField.integration.test.tsx
│       └── FormField.stories.tsx
└── utils/
    ├── formatters.ts
    └── formatters.test.ts
```

### Test Naming Convention
- **Unit**: `ComponentName.test.tsx`
- **Integration**: `ComponentName.integration.test.tsx`
- **Accessibility**: `ComponentName.a11y.test.tsx`
- **Performance**: `ComponentName.perf.test.tsx`
- **Types**: `ComponentName.types.test.tsx`

## Test Coverage Requirements

### Coverage Thresholds
```javascript
// vitest.config.ts
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/types.ts',
        'dist/**',
      ],
    },
  },
};
```

### Component Coverage Checklist
- [ ] Renders without errors
- [ ] All props work correctly
- [ ] All variants/states render
- [ ] Event handlers called
- [ ] Accessibility requirements met
- [ ] Keyboard navigation works
- [ ] Error states handled
- [ ] Edge cases covered
- [ ] Visual regression baseline created

## CI/CD Testing Pipeline

### Pre-commit Hooks (Husky)
```bash
# .husky/pre-commit
npm run lint          # ESLint check
npm run type-check    # TypeScript check
npm run test:changed  # Test changed files
```

### Pull Request Pipeline
```yaml
# .github/workflows/pr.yml
name: Pull Request
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - run: npm run build

      # Upload coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      # Visual regression
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_TOKEN }}

      # Bundle size check
      - uses: andresz1/size-limit-action@v1
```

## Testing Best Practices

### 1. Arrange-Act-Assert Pattern
```typescript
it('increments counter on button click', async () => {
  // Arrange
  render(<Counter initialCount={0} />);

  // Act
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));

  // Assert
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

### 2. Query Priority (Testing Library)
1. `getByRole` (preferred)
2. `getByLabelText` (forms)
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

### 3. Async Testing
```typescript
// Wait for async operations
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});

// Wait for element to disappear
await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
```

### 4. Mocking External Dependencies
```typescript
// Mock API calls
vi.mock('../api/fetchData', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
}));

// Mock ResizeObserver (not available in jsdom)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

### 5. Test Data Factories
```typescript
// testUtils/factories.ts
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});
```

## Consumer Testing Guidance

### For Consumer Projects
Provide testing utilities package:

```typescript
// @kisanlink/ui-commons/testing
export { render, screen, waitFor } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
export { ThemeProvider } from '../theme';

// Custom render with providers
export const renderWithTheme = (ui, options) => {
  return render(
    <ThemeProvider theme={testTheme}>
      {ui}
    </ThemeProvider>,
    options
  );
};
```

**Consumer Usage**:
```typescript
import { renderWithTheme } from '@kisanlink/ui-commons/testing';

test('renders app with theme', () => {
  renderWithTheme(<App />);
});
```

## Regression Prevention

### Snapshot Testing (Limited Use)
```typescript
// Only for stable, non-visual output
it('matches error message snapshot', () => {
  const error = formatError('Network Error');
  expect(error).toMatchInlineSnapshot(`"Error: Network Error"`);
});
```

**Avoid**:
- Large component snapshots (brittle)
- Visual snapshots (use Chromatic instead)

### Breaking Change Detection
```typescript
// types/index.test-d.ts
import { expectType } from 'tsd';
import { Button } from '../src';

// Ensure API stability
expectType<(props: ButtonProps) => JSX.Element>(Button);
```

## Documentation Requirements

### Component Test Documentation
Each component should document:
- Key user interactions tested
- Accessibility compliance verification
- Edge cases covered
- Known limitations

### Example:
```typescript
/**
 * @component Button
 * @tested
 * - Click interactions with mouse and keyboard
 * - Disabled state prevents interactions
 * - Loading state shows spinner and disables
 * - All variants render correctly
 * - WCAG 2.1 AA compliant (focus, contrast, ARIA)
 *
 * @limitations
 * - Does not test server-side rendering
 * - Animation testing limited to presence check
 */
```

## Metrics & Reporting

### Test Metrics to Track
- **Coverage**: Lines, branches, functions
- **Test Count**: Total tests, pass/fail ratio
- **Test Duration**: Average, slowest tests
- **Visual Diffs**: Pending reviews, auto-approved
- **Accessibility Violations**: Count per component

### Dashboards
- **Codecov**: Coverage trends over time
- **Chromatic**: Visual change history
- **Bundle Size**: Size trends per release

### Reporting
- **PR Comments**: Coverage diff, bundle size impact
- **Slack Notifications**: Failed builds, security issues
- **Monthly Review**: Test health metrics, flaky tests
