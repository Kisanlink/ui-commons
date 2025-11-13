# Phase 1: Atoms Implementation

**Status**: In Progress
**Start Date**: 2025-11-13
**Target Completion**: Week 3-4

## Objective
Extract and implement all remaining atomic components from the source projects (admin-panel, ecommerce-frontend, erp-frontend) to complete the fundamental building blocks of the UI Commons library.

## Source Analysis

### Admin Panel Atoms (/Users/kaushik/admin-panel/src/components/ui/atoms/)
- Avatar
- Checkbox ⭐ HIGH PRIORITY
- Icon
- Radio ⭐ HIGH PRIORITY
- Select (should be molecule)
- Skeleton ⭐ HIGH PRIORITY
- Spinner ⭐ HIGH PRIORITY
- Switch ⭐ HIGH PRIORITY

### ERP Frontend Atoms (/Users/kaushik/erp-frontend/src/components/atoms/)
- Badge (already implemented)
- Button (already implemented)
- Divider
- Icon
- Input (already implemented)
- Label
- Spinner
- Text

### To Create/Extract

#### Priority 1 - Form Controls (Critical for all projects)
1. **Checkbox** - From admin-panel
   - Form element essential for selections
   - Needs indeterminate state support
   - Accessibility: keyboard navigation, ARIA

2. **Radio** - From admin-panel
   - Exclusive selection control
   - Group management
   - Accessibility: arrow key navigation

3. **Switch** - From admin-panel
   - Toggle control for boolean settings
   - Different from checkbox semantically
   - Accessibility: role="switch"

#### Priority 2 - Feedback/Loading (High usage)
4. **Spinner** - From admin-panel or ERP (compare both)
   - Loading indicator
   - Multiple sizes
   - Accessibility: aria-busy, role="status"

5. **Skeleton** - From admin-panel
   - Content placeholder for loading states
   - Multiple variants (text, circular, rectangular)
   - Shimmer animation

#### Priority 3 - Visual Elements
6. **Avatar** - From admin-panel
   - User profile images
   - Fallback initials
   - Multiple sizes
   - Image loading states

7. **Icon** - From admin-panel or ERP
   - Wrapper for icon library (lucide-react?)
   - Consistent sizing
   - Accessibility: aria-label, decorative vs semantic

8. **Divider** - From ERP
   - Horizontal and vertical separators
   - With optional text label
   - Different orientations

#### Priority 4 - Typography
9. **Label** - From ERP
   - Form labels with required indicator
   - Info tooltip integration
   - For attribute binding

10. **Text** - From ERP
    - Typography component with variants
    - Semantic HTML (p, span, strong, etc.)
    - Truncation support

## Implementation Checklist per Component

For each component, ensure:

### 1. Component Implementation
- [ ] Extract source component from original project
- [ ] Remove project-specific dependencies (Redux, Apollo, etc.)
- [ ] Convert to controlled component pattern
- [ ] Add proper TypeScript types
- [ ] Implement all variants/states
- [ ] Add forwarded refs where appropriate

### 2. Styling
- [ ] Convert to CSS Modules
- [ ] Use design tokens from src/styles/tokens/
- [ ] Support dark mode via CSS variables
- [ ] Responsive design considerations

### 3. Testing (85%+ coverage target)
- [ ] Unit tests with React Testing Library
- [ ] Test all variants and states
- [ ] Test keyboard navigation
- [ ] Test event handlers
- [ ] Accessibility tests with vitest-axe
- [ ] Edge cases (null, undefined, empty)
- [ ] Error states

### 4. Documentation
- [ ] Storybook stories for all variants
- [ ] Interactive controls in Storybook
- [ ] Usage examples
- [ ] Accessibility notes
- [ ] TSDoc comments on props

### 5. Integration
- [ ] Export from src/atoms/index.ts
- [ ] Export from src/index.ts
- [ ] Add to component hierarchy docs
- [ ] Update CHANGELOG.md

## Estimated Effort

| Component | Complexity | Est. Time | Priority |
|-----------|-----------|-----------|----------|
| Checkbox  | Medium    | 4 hours   | P1       |
| Radio     | Medium    | 4 hours   | P1       |
| Switch    | Medium    | 3 hours   | P1       |
| Spinner   | Low       | 2 hours   | P2       |
| Skeleton  | Medium    | 3 hours   | P2       |
| Avatar    | Medium    | 3 hours   | P3       |
| Icon      | Low       | 2 hours   | P3       |
| Divider   | Low       | 2 hours   | P3       |
| Label     | Low       | 2 hours   | P4       |
| Text      | Low       | 2 hours   | P4       |

**Total**: ~27 hours (~3-4 working days)

## Dependencies

### New Dependencies Needed
None required - all can be built with existing stack

### Optional Dependencies to Consider
- lucide-react: Icon library (if admin-panel uses it)
- If they use different icon libraries, create abstraction

## Success Criteria

✅ All 10 atoms implemented with full TypeScript support
✅ 85%+ test coverage maintained
✅ All components have Storybook stories
✅ WCAG 2.1 AA compliant
✅ Zero accessibility violations in vitest-axe
✅ Build succeeds with no TypeScript errors
✅ Bundle size remains < 50KB gzipped
✅ All components documented with examples

## Testing Strategy

### Unit Tests
- Render without errors
- Props application
- Event handlers
- State management
- Variants/sizes

### Accessibility Tests
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Color contrast

### Integration Tests
- Component composition
- Form integration
- Theme integration

## Accessibility Requirements

### Checkbox
- aria-checked
- aria-invalid for errors
- aria-describedby for help text
- Keyboard: Space to toggle

### Radio
- role="radio"
- aria-checked
- Keyboard: Arrow keys for group navigation
- Only one tabbable in group

### Switch
- role="switch"
- aria-checked
- Visual distinction from checkbox
- Keyboard: Space to toggle

### Spinner
- role="status"
- aria-busy="true"
- aria-live="polite" for screen readers
- aria-label describing loading state

### Skeleton
- aria-busy="true"
- aria-label="Loading content"
- Reduced motion support

### Avatar
- alt text for images
- aria-label for initials
- img role or presentation

### Icon
- aria-label for semantic icons
- aria-hidden="true" for decorative
- Focusable: false

### Divider
- role="separator"
- aria-orientation
- Decorative elements

### Label
- for attribute or wrapping
- aria-required indicator
- Clear association with input

### Text
- Semantic HTML elements
- Proper heading hierarchy if applicable
- Contrast ratios

## Risk Mitigation

### Risk: Different implementations in source projects
**Mitigation**:
- Compare implementations
- Choose most feature-complete
- Merge best patterns from both
- Document decision in component file

### Risk: Material-UI dependencies in admin-panel
**Mitigation**:
- Extract only the needed patterns
- Rebuild with native React
- No MUI dependency in commons

### Risk: Project-specific business logic
**Mitigation**:
- Identify and remove business logic
- Make components fully controlled
- Accept all state via props

### Risk: Missing accessibility features
**Mitigation**:
- Add comprehensive vitest-axe tests first
- Fix violations before completion
- Manual testing with screen reader

## Phase Completion Criteria

- [ ] All 10 atoms implemented
- [ ] All atoms have 85%+ test coverage
- [ ] All atoms have Storybook stories
- [ ] Zero TypeScript errors
- [ ] Zero accessibility violations
- [ ] Build succeeds
- [ ] Bundle size < 50KB
- [ ] Documentation updated
- [ ] Ready for Phase 2 (molecules)
