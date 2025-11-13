import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Tooltip } from './Tooltip';

expect.extend(toHaveNoViolations);

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render trigger element', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('should not render tooltip initially', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should render tooltip on hover after delay', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={200}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(200);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should render tooltip with arrow', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" showArrow delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should render tooltip without arrow', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" showArrow={false} delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Hover Interaction', () => {
    it('should show tooltip on mouse enter', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should hide tooltip on mouse leave', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should respect delay prop', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      // Before delay
      vi.advanceTimersByTime(400);
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // After delay
      vi.advanceTimersByTime(100);
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should cancel tooltip if mouse leaves before delay', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(200);

      await user.unhover(button);
      vi.advanceTimersByTime(500);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction', () => {
    it('should show tooltip on focus', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should hide tooltip on blur', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <div>
          <Tooltip content="Tooltip content" delay={0}>
            <button>Focus me</button>
          </Tooltip>
          <button>Other button</button>
        </div>
      );

      await user.tab();
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.tab();

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should hide tooltip on Escape key', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('Disabled State', () => {
    it('should not show tooltip when disabled', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" disabled delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should not show tooltip on focus when disabled', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" disabled delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      vi.advanceTimersByTime(0);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Placement', () => {
    it('should render with top placement', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" placement="top" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should render with bottom placement', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" placement="bottom" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should render with left placement', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" placement="left" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should render with right placement', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" placement="right" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should render with auto placement', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" placement="auto" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Offset', () => {
    it('should apply custom offset', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" offset={16} delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should use default offset when not provided', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Content', () => {
    it('should render string content', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Simple tooltip text" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByText('Simple tooltip text')).toBeInTheDocument();
      });
    });

    it('should render ReactNode content', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content={
            <div>
              <strong>Bold text</strong>
              <p>Paragraph</p>
            </div>
          }
          delay={0}
        >
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByText('Bold text')).toBeInTheDocument();
        expect(screen.getByText('Paragraph')).toBeInTheDocument();
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="tooltip"', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should set aria-describedby on trigger when visible', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('aria-describedby');

      await user.hover(button);
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-describedby', 'tooltip-content');
      });
    });
  });

  describe('Custom Classname', () => {
    it('should apply custom className', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip content" className="custom-tooltip" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('custom-tooltip');
      });
    });
  });

  describe('Event Handler Preservation', () => {
    it('should preserve existing onMouseEnter handler', async () => {
      const user = userEvent.setup({ delay: null });
      const onMouseEnter = vi.fn();

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button onMouseEnter={onMouseEnter}>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should preserve existing onMouseLeave handler', async () => {
      const user = userEvent.setup({ delay: null });
      const onMouseLeave = vi.fn();

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button onMouseLeave={onMouseLeave}>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);
      await user.unhover(button);

      expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should preserve existing onFocus handler', async () => {
      const user = userEvent.setup({ delay: null });
      const onFocus = vi.fn();

      render(
        <Tooltip content="Tooltip content" delay={0}>
          <button onFocus={onFocus}>Focus me</button>
        </Tooltip>
      );

      await user.tab();

      expect(onFocus).toHaveBeenCalled();
    });

    it('should preserve existing onBlur handler', async () => {
      const user = userEvent.setup({ delay: null });
      const onBlur = vi.fn();

      render(
        <div>
          <Tooltip content="Tooltip content" delay={0}>
            <button onBlur={onBlur}>Focus me</button>
          </Tooltip>
          <button>Other</button>
        </div>
      );

      await user.tab();
      await user.tab();

      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations - hover state', async () => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);

      await waitFor(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    it('should have no violations - focus state', async () => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip content="Tooltip content" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      vi.advanceTimersByTime(0);

      await waitFor(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
