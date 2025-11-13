/**
 * Testing utilities for consumers of @kisanlink/ui-commons
 * Re-exports @testing-library/react with custom render function
 */
export { renderWithProviders as render } from '../test/test-utils';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
