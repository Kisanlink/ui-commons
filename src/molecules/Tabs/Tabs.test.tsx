import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Tabs } from './Tabs';

expect.extend(toHaveNoViolations);

describe('Tabs', () => {
  const renderBasicTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
        <Tabs.Content value="tab3">Content 3</Tabs.Content>
      </Tabs>
    );
  };

  describe('Rendering', () => {
    it('should render tabs list', () => {
      renderBasicTabs();

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should render all tab triggers', () => {
      renderBasicTabs();

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('should render active tab content', () => {
      renderBasicTabs();

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('should render with icon', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" icon={<span data-testid="icon">★</span>}>
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Tab Selection', () => {
    it('should select default tab', () => {
      renderBasicTabs({ defaultValue: 'tab2' });

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should change tab on click', async () => {
      const user = userEvent.setup();
      renderBasicTabs();

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should call onValueChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(onValueChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const { rerender } = render(
        <Tabs value="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(onValueChange).toHaveBeenCalledWith('tab2');

      // Value doesn't change until parent updates it
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      // Parent updates value
      rerender(
        <Tabs value="tab2" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should work in uncontrolled mode', async () => {
      const user = userEvent.setup();
      renderBasicTabs();

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should use defaultValue in uncontrolled mode', () => {
      renderBasicTabs({ defaultValue: 'tab3' });

      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation - Horizontal', () => {
    it('should navigate to next tab with ArrowRight', () => {
      renderBasicTabs({ orientation: 'horizontal' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      expect(tab2).toHaveFocus();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should navigate to previous tab with ArrowLeft', () => {
      renderBasicTabs({ orientation: 'horizontal' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab2.focus();
      fireEvent.keyDown(tab2, { key: 'ArrowLeft' });

      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap from last to first tab with ArrowRight', () => {
      renderBasicTabs({ orientation: 'horizontal' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'ArrowRight' });

      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap from first to last tab with ArrowLeft', () => {
      renderBasicTabs({ orientation: 'horizontal' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowLeft' });

      expect(tab3).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation - Vertical', () => {
    it('should navigate to next tab with ArrowDown', () => {
      renderBasicTabs({ orientation: 'vertical' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowDown' });

      expect(tab2).toHaveFocus();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should navigate to previous tab with ArrowUp', () => {
      renderBasicTabs({ orientation: 'vertical' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab2.focus();
      fireEvent.keyDown(tab2, { key: 'ArrowUp' });

      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap from last to first tab with ArrowDown', () => {
      renderBasicTabs({ orientation: 'vertical' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'ArrowDown' });

      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap from first to last tab with ArrowUp', () => {
      renderBasicTabs({ orientation: 'vertical' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowUp' });

      expect(tab3).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation - Home/End', () => {
    it('should navigate to first tab with Home', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'Home' });

      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should navigate to last tab with End', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'End' });

      expect(tab3).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Disabled Tabs', () => {
    it('should render disabled tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeDisabled();
    });

    it('should not select disabled tab on click', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should skip disabled tabs in keyboard navigation', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
          <Tabs.Content value="tab3">Content 3</Tabs.Content>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      expect(tab3).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render underline variant', () => {
      renderBasicTabs({ variant: 'underline' });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should render pills variant', () => {
      renderBasicTabs({ variant: 'pills' });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should render solid variant', () => {
      renderBasicTabs({ variant: 'solid' });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });
  });

  describe('Orientation', () => {
    it('should render horizontal orientation', () => {
      renderBasicTabs({ orientation: 'horizontal' });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should render vertical orientation', () => {
      renderBasicTabs({ orientation: 'vertical' });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="tablist" on list', () => {
      renderBasicTabs();

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('should have role="tab" on triggers', () => {
      renderBasicTabs();

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('should have role="tabpanel" on content', () => {
      renderBasicTabs();

      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should have aria-selected on active tab', () => {
      renderBasicTabs();

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
    });

    it('should have aria-controls linking tab to panel', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-controls', 'tabpanel-tab1');
    });

    it('should have correct tabindex', () => {
      renderBasicTabs();

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabindex', '0');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabindex', '-1');
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Custom Classnames', () => {
    it('should apply custom className to Tabs', () => {
      const { container } = render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>
      );

      expect(container.querySelector('.custom-tabs')).toBeInTheDocument();
    });

    it('should apply custom className to TabsList', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List className="custom-list">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('custom-list');
    });

    it('should apply custom className to TabsTrigger', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" className="custom-trigger">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveClass('custom-trigger');
    });

    it('should apply custom className to TabsContent', () => {
      const { container } = render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="custom-content">Content 1</Tabs.Content>
        </Tabs>
      );

      expect(container.querySelector('.custom-content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderBasicTabs();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with vertical orientation', async () => {
      const { container } = renderBasicTabs({ orientation: 'vertical' });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with disabled tab', async () => {
      const { container } = render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
