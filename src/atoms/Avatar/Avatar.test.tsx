import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import React from 'react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders correctly', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with image', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('shows initials when no image provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates correct initials from name', () => {
    render(<Avatar name="Jane Smith" />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('uses custom initials when provided', () => {
    render(<Avatar name="John Doe" initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar src="invalid-url.jpg" name="John Doe" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback content', () => {
    render(<Avatar fallback={<span>Fallback</span>} />);
    expect(screen.getByText('Fallback')).toBeInTheDocument();
  });

  it('shows status indicator when showStatus is true', () => {
    const { container } = render(
      <Avatar name="John" status="online" showStatus />
    );
    const status = container.querySelector('[aria-label="Status: online"]');
    expect(status).toBeInTheDocument();
  });

  it('does not show status when showStatus is false', () => {
    const { container } = render(
      <Avatar name="John" status="online" showStatus={false} />
    );
    const status = container.querySelector('[aria-label*="Status"]');
    expect(status).not.toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Avatar name="JD" size="sm" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    rerender(<Avatar name="JD" size="lg" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders different shapes', () => {
    const { container, rerender } = render(<Avatar name="JD" shape="circle" />);
    expect(container.firstChild).toBeInTheDocument();
    rerender(<Avatar name="JD" shape="square" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="custom-avatar" />);
    expect(container.firstChild).toHaveClass('custom-avatar');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Avatar name="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('AvatarGroup', () => {
  it('renders multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByText('BJ')).toBeInTheDocument();
  });

  it('shows overflow count when exceeding max', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
      </AvatarGroup>
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('respects max prop', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
        <Avatar name="User 5" />
      </AvatarGroup>
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AvatarGroup className="custom-group">
        <Avatar name="User" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveClass('custom-group');
  });
});
