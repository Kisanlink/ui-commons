import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/test-utils';

import { Input } from './Input';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('applies correct size class', () => {
    render(<Input size="lg" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('size-lg');
  });

  it('shows error state when error prop is true', () => {
    render(<Input error data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.className).toContain('error');
  });

  it('displays error message', () => {
    render(<Input errorMessage="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('displays helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not show helper text when error message is present', () => {
    render(<Input helperText="Helper text" errorMessage="Error message" />);
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">R</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies icon padding classes', () => {
    const { rerender } = render(<Input leftIcon={<span>L</span>} data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input.className).toContain('withLeftIcon');

    rerender(<Input rightIcon={<span>R</span>} data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input.className).toContain('withRightIcon');
  });

  it('disables input when disabled prop is true', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('handles onChange event', async () => {
    const handleChange = vi.fn();
    const { user } = render(<Input onChange={handleChange} data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('custom-class');
  });

  it('applies custom wrapper className', () => {
    const { container } = render(<Input wrapperClassName="custom-wrapper" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  it('has correct aria attributes', () => {
    render(<Input errorMessage="Error" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('supports different input types', () => {
    render(<Input type="email" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');
  });
});
