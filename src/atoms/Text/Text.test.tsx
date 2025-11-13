import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Text } from './Text';

describe('Text', () => {
  describe('Rendering', () => {
    it('renders text content', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as paragraph by default', () => {
      const { container } = render(<Text>Content</Text>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders h1 variant', () => {
      const { container } = render(<Text variant="h1">Heading 1</Text>);
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h1')).toHaveClass('text--h1');
    });

    it('renders h2 variant', () => {
      const { container } = render(<Text variant="h2">Heading 2</Text>);
      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('h2')).toHaveClass('text--h2');
    });

    it('renders h3 variant', () => {
      const { container } = render(<Text variant="h3">Heading 3</Text>);
      expect(container.querySelector('h3')).toBeInTheDocument();
    });

    it('renders h4 variant', () => {
      const { container } = render(<Text variant="h4">Heading 4</Text>);
      expect(container.querySelector('h4')).toBeInTheDocument();
    });

    it('renders h5 variant', () => {
      const { container } = render(<Text variant="h5">Heading 5</Text>);
      expect(container.querySelector('h5')).toBeInTheDocument();
    });

    it('renders h6 variant', () => {
      const { container } = render(<Text variant="h6">Heading 6</Text>);
      expect(container.querySelector('h6')).toBeInTheDocument();
    });

    it('renders body1 variant (default)', () => {
      const { container } = render(<Text variant="body1">Body text</Text>);
      expect(container.querySelector('p')).toHaveClass('text--body1');
    });

    it('renders body2 variant', () => {
      const { container } = render(<Text variant="body2">Small body</Text>);
      expect(container.querySelector('p')).toHaveClass('text--body2');
    });

    it('renders caption variant', () => {
      const { container } = render(<Text variant="caption">Caption</Text>);
      expect(container.querySelector('span')).toHaveClass('text--caption');
    });

    it('renders label variant', () => {
      const { container } = render(<Text variant="label">Label</Text>);
      expect(container.querySelector('label')).toHaveClass('text--label');
    });

    it('renders overline variant', () => {
      const { container } = render(<Text variant="overline">Overline</Text>);
      expect(container.querySelector('span')).toHaveClass('text--overline');
    });
  });

  describe('Colors', () => {
    it('renders primary color (default)', () => {
      const { container } = render(<Text>Text</Text>);
      expect(container.firstChild).toHaveClass('text--primary');
    });

    it('renders secondary color', () => {
      const { container } = render(<Text color="secondary">Text</Text>);
      expect(container.firstChild).toHaveClass('text--secondary');
    });

    it('renders success color', () => {
      const { container } = render(<Text color="success">Text</Text>);
      expect(container.firstChild).toHaveClass('text--success');
    });

    it('renders error color', () => {
      const { container } = render(<Text color="error">Text</Text>);
      expect(container.firstChild).toHaveClass('text--error');
    });

    it('renders warning color', () => {
      const { container } = render(<Text color="warning">Text</Text>);
      expect(container.firstChild).toHaveClass('text--warning');
    });

    it('renders info color', () => {
      const { container } = render(<Text color="info">Text</Text>);
      expect(container.firstChild).toHaveClass('text--info');
    });

    it('renders inherit color', () => {
      const { container } = render(<Text color="inherit">Text</Text>);
      expect(container.firstChild).toHaveClass('text--inherit');
    });
  });

  describe('Alignment', () => {
    it('renders left aligned text', () => {
      const { container } = render(<Text align="left">Text</Text>);
      expect(container.firstChild).toHaveClass('text--align-left');
    });

    it('renders center aligned text', () => {
      const { container } = render(<Text align="center">Text</Text>);
      expect(container.firstChild).toHaveClass('text--align-center');
    });

    it('renders right aligned text', () => {
      const { container } = render(<Text align="right">Text</Text>);
      expect(container.firstChild).toHaveClass('text--align-right');
    });

    it('renders justified text', () => {
      const { container } = render(<Text align="justify">Text</Text>);
      expect(container.firstChild).toHaveClass('text--align-justify');
    });
  });

  describe('Weight', () => {
    it('renders normal weight', () => {
      const { container } = render(<Text weight="normal">Text</Text>);
      expect(container.firstChild).toHaveClass('text--weight-normal');
    });

    it('renders medium weight', () => {
      const { container } = render(<Text weight="medium">Text</Text>);
      expect(container.firstChild).toHaveClass('text--weight-medium');
    });

    it('renders semibold weight', () => {
      const { container } = render(<Text weight="semibold">Text</Text>);
      expect(container.firstChild).toHaveClass('text--weight-semibold');
    });

    it('renders bold weight', () => {
      const { container } = render(<Text weight="bold">Text</Text>);
      expect(container.firstChild).toHaveClass('text--weight-bold');
    });
  });

  describe('Text Modifiers', () => {
    it('renders text with noWrap', () => {
      const { container } = render(<Text noWrap>Long text</Text>);
      expect(container.firstChild).toHaveClass('text--no-wrap');
    });

    it('renders text with ellipsis', () => {
      const { container } = render(<Text ellipsis>Long text</Text>);
      expect(container.firstChild).toHaveClass('text--ellipsis');
    });

    it('renders text with both noWrap and ellipsis', () => {
      const { container } = render(<Text noWrap ellipsis>Long text</Text>);
      expect(container.firstChild).toHaveClass('text--no-wrap');
      expect(container.firstChild).toHaveClass('text--ellipsis');
    });
  });

  describe('Polymorphic "as" Prop', () => {
    it('renders as custom element', () => {
      const { container } = render(<Text as="span">Span text</Text>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('renders h1 variant as div', () => {
      const { container } = render(
        <Text variant="h1" as="div">
          Div with h1 style
        </Text>
      );
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('div')).toHaveClass('text--h1');
    });

    it('renders body variant as section', () => {
      const { container } = render(
        <Text variant="body1" as="section">
          Section
        </Text>
      );
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(<Text className="custom-text">Text</Text>);
      expect(container.firstChild).toHaveClass('custom-text');
      expect(container.firstChild).toHaveClass('text');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes', () => {
      const { container } = render(
        <Text id="custom-id" data-testid="custom-test">
          Text
        </Text>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('id', 'custom-id');
      expect(element).toHaveAttribute('data-testid', 'custom-test');
    });

    it('forwards onClick handler', () => {
      const onClick = vi.fn();
      render(<Text onClick={onClick}>Clickable</Text>);
      const text = screen.getByText('Clickable');
      text.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Content', () => {
    it('renders children with nested elements', () => {
      render(
        <Text>
          Hello <strong>bold</strong> and <em>italic</em>
        </Text>
      );
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
    });

    it('renders children with components', () => {
      render(
        <Text>
          Text with <span style={{ color: 'red' }}>colored span</span>
        </Text>
      );
      expect(screen.getByText('colored span')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Text>Accessible text</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with label variant', async () => {
      const { container } = render(
        <Text variant="label" as="label" htmlFor="input">
          Label text
        </Text>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with headings', async () => {
      const { container } = render(
        <div>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="body1">Body text</Text>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
