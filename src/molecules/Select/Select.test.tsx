import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Select, type SelectOption } from './Select';

const mockOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4', disabled: true },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Choose an option" />);
      expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Choose an option');
    });

    it('renders with default placeholder', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Select an option');
    });

    it('renders with selected value', () => {
      render(<Select options={mockOptions} value="2" />);
      expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Option 2');
    });

    it('renders with multiple selected values', () => {
      render(<Select options={mockOptions} value={['1', '2']} multiple />);
      expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Option 1, Option 2');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Select options={mockOptions} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      const { container } = render(<Select options={mockOptions} size="sm" />);
      expect(container.querySelector('.size-sm')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.querySelector('.size-md')).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Select options={mockOptions} size="lg" />);
      expect(container.querySelector('.size-lg')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders error state', () => {
      const { container } = render(<Select options={mockOptions} error />);
      expect(container.querySelector('.error')).toBeInTheDocument();
    });

    it('does not open dropdown when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} disabled />);

      await user.click(screen.getByRole('button'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown Interaction', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('displays all options when opened', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveTextContent('Option 1');
      expect(options[3]).toHaveTextContent('Option 4');
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} />
          <button>Outside</button>
        </div>
      );

      await user.click(screen.getByRole('button', { name: /select/i }));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Outside' }));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown on Tab key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Tab}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Single Selection', () => {
    it('selects an option on click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('does not select disabled options', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 4' }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Selection', () => {
    it('allows multiple selections', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(
        <Select options={mockOptions} multiple value={[]} onChange={handleChange} />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(handleChange).toHaveBeenLastCalledWith(['1']);

      // Rerender with updated value
      rerender(
        <Select options={mockOptions} multiple value={['1']} onChange={handleChange} />
      );

      await user.click(screen.getByRole('option', { name: 'Option 2' }));
      expect(handleChange).toHaveBeenLastCalledWith(['1', '2']);
    });

    it('deselects options on second click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Select options={mockOptions} multiple value={['1', '2']} onChange={handleChange} />
      );

      const trigger = container.querySelector('[aria-haspopup="listbox"]');
      if (trigger) {
        await user.click(trigger);

        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        await user.click(screen.getByRole('option', { name: /Option 1/ }));
        expect(handleChange).toHaveBeenCalledWith(['2']);
      }
    });

    it('keeps dropdown open after selection', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} multiple />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows checkboxes for multiple select', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} multiple />);

      await user.click(screen.getByRole('button'));

      const firstOption = screen.getByRole('option', { name: 'Option 1' });
      expect(firstOption.querySelector('[class*="checkbox"]')).toBeInTheDocument();
    });

    it('displays clear button when values are selected', () => {
      const { container } = render(
        <Select options={mockOptions} multiple value={['1', '2']} />
      );
      const clearButton = container.querySelector('[aria-label="Clear selection"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('clears all selections when clear button is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Select options={mockOptions} multiple value={['1', '2']} onChange={handleChange} />
      );

      const clearButton = container.querySelector('[aria-label="Clear selection"]');
      if (clearButton) {
        await user.click(clearButton);
        expect(handleChange).toHaveBeenCalledWith([]);
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown on Enter key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown on Space key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard(' ');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('navigates options with ArrowDown', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      // First option should be highlighted by default
      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 1');

      await user.keyboard('{ArrowDown}');
      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 2');

      await user.keyboard('{ArrowDown}');
      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 3');
    });

    it('navigates options with ArrowUp', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 3');

      await user.keyboard('{ArrowUp}');
      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 2');
    });

    it('selects highlighted option on Enter', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('skips disabled options in keyboard navigation', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Should stay on Option 3 as Option 4 is disabled
      expect(container.querySelector('.highlighted')).toHaveTextContent('Option 3');
    });

    it('opens dropdown with ArrowDown when closed', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Searchable', () => {
    it('renders search input when searchable', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} searchable />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('filters options based on search term', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} searchable />);

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, '2');

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Option 2');
    });

    it('shows "No options found" when search has no results', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} searchable />);

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, 'xyz');

      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('clears search when dropdown closes', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} searchable />);

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, 'test');
      await user.keyboard('{Escape}');

      await user.click(screen.getByRole('button'));
      expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
    });

    it('focuses search input when dropdown opens', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} searchable />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toHaveFocus();
      });
    });
  });

  describe('Form Integration', () => {
    it('includes hidden input with name', () => {
      const { container } = render(
        <Select options={mockOptions} name="test-select" value="2" />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('name', 'test-select');
      expect(hiddenInput).toHaveValue('2');
    });

    it('includes hidden input with multiple values', () => {
      const { container } = render(
        <Select options={mockOptions} name="test-select" value={['1', '2']} multiple />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveValue('1,2');
    });

    it('includes required attribute', () => {
      const { container } = render(
        <Select options={mockOptions} name="test-select" required />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('required');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes on trigger', () => {
      render(<Select options={mockOptions} aria-label="Select option" />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-label', 'Select option');
    });

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('has proper ARIA attributes on listbox', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} multiple />);

      await user.click(screen.getByRole('button'));

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('has proper ARIA attributes on options', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} value="2" />);

      await user.click(screen.getByRole('button'));

      const selectedOption = screen.getByRole('option', { name: 'Option 2' });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');

      const disabledOption = screen.getByRole('option', { name: 'Option 4' });
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <Select options={mockOptions} aria-label="Test select" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when open', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select options={mockOptions} aria-label="Test select" />
      );

      await user.click(screen.getByRole('button'));

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<Select options={[]} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles no selected value', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('button')).toHaveTextContent('Select an option');
    });

    it('handles invalid selected value', () => {
      render(<Select options={mockOptions} value="999" />);
      expect(screen.getByRole('button')).toHaveTextContent('Select an option');
    });

    it('does not crash with undefined onChange', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      // Should not crash
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
