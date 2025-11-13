import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Card } from './Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should render with text content', () => {
      render(<Card>Simple card text</Card>);
      expect(screen.getByText('Simple card text')).toBeInTheDocument();
    });

    it('should render with React node children', () => {
      render(
        <Card>
          <div data-testid="custom-content">Custom content</div>
        </Card>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should render as a div element', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('DIV');
    });
  });

  describe('Variants', () => {
    it('should apply default variant by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('variant-default');
    });

    it('should apply default variant explicitly', () => {
      const { container } = render(<Card variant="default">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('variant-default');
    });

    it('should apply elevated variant', () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('variant-elevated');
    });

    it('should apply outlined variant', () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('variant-outlined');
    });
  });

  describe('Clickable', () => {
    it('should not have clickable class by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain('clickable');
    });

    it('should apply clickable class when clickable prop is true', () => {
      const { container } = render(<Card clickable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('clickable');
    });

    it('should not apply clickable class when clickable prop is false', () => {
      const { container } = render(<Card clickable={false}>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain('clickable');
    });

    it('should handle onClick event', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick}>
          Clickable content
        </Card>
      );

      await user.click(screen.getByText('Clickable content'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle onClick event without clickable prop', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      await user.click(screen.getByText('Content'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Composition API - Card.Header', () => {
    it('should render Card.Header', () => {
      render(
        <Card>
          <Card.Header>Header content</Card.Header>
        </Card>
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('should render Card.Header with custom className', () => {
      const { container } = render(
        <Card>
          <Card.Header className="custom-header">Header</Card.Header>
        </Card>
      );
      const header = container.querySelector('.custom-header');
      expect(header).toBeInTheDocument();
    });

    it('should render Card.Header with React nodes', () => {
      render(
        <Card>
          <Card.Header>
            <h3 data-testid="header-title">Title</h3>
          </Card.Header>
        </Card>
      );
      expect(screen.getByTestId('header-title')).toBeInTheDocument();
    });

    it('should pass through native div props to Card.Header', () => {
      render(
        <Card>
          <Card.Header data-testid="custom-header" title="Header title">
            Header
          </Card.Header>
        </Card>
      );
      const header = screen.getByTestId('custom-header');
      expect(header).toHaveAttribute('title', 'Header title');
    });
  });

  describe('Composition API - Card.Body', () => {
    it('should render Card.Body', () => {
      render(
        <Card>
          <Card.Body>Body content</Card.Body>
        </Card>
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('should render Card.Body with custom className', () => {
      const { container } = render(
        <Card>
          <Card.Body className="custom-body">Body</Card.Body>
        </Card>
      );
      const body = container.querySelector('.custom-body');
      expect(body).toBeInTheDocument();
    });

    it('should render Card.Body with React nodes', () => {
      render(
        <Card>
          <Card.Body>
            <p data-testid="body-text">Body text</p>
          </Card.Body>
        </Card>
      );
      expect(screen.getByTestId('body-text')).toBeInTheDocument();
    });

    it('should pass through native div props to Card.Body', () => {
      render(
        <Card>
          <Card.Body data-testid="custom-body" title="Body title">
            Body
          </Card.Body>
        </Card>
      );
      const body = screen.getByTestId('custom-body');
      expect(body).toHaveAttribute('title', 'Body title');
    });
  });

  describe('Composition API - Card.Footer', () => {
    it('should render Card.Footer', () => {
      render(
        <Card>
          <Card.Footer>Footer content</Card.Footer>
        </Card>
      );
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('should render Card.Footer with custom className', () => {
      const { container } = render(
        <Card>
          <Card.Footer className="custom-footer">Footer</Card.Footer>
        </Card>
      );
      const footer = container.querySelector('.custom-footer');
      expect(footer).toBeInTheDocument();
    });

    it('should render Card.Footer with React nodes', () => {
      render(
        <Card>
          <Card.Footer>
            <button data-testid="footer-button">Action</button>
          </Card.Footer>
        </Card>
      );
      expect(screen.getByTestId('footer-button')).toBeInTheDocument();
    });

    it('should pass through native div props to Card.Footer', () => {
      render(
        <Card>
          <Card.Footer data-testid="custom-footer" title="Footer title">
            Footer
          </Card.Footer>
        </Card>
      );
      const footer = screen.getByTestId('custom-footer');
      expect(footer).toHaveAttribute('title', 'Footer title');
    });
  });

  describe('Complete Composition', () => {
    it('should render all three sections together', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should render Header and Body only', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('should render Body and Footer only', () => {
      render(
        <Card>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should render Body only', () => {
      render(
        <Card>
          <Card.Body>Body</Card.Body>
        </Card>
      );
      expect(screen.getByText('Body')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
    });

    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Card className="custom-class" variant="elevated">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
      expect(card.className).toContain('variant-elevated');
    });

    it('should pass through native div props', () => {
      render(
        <Card data-testid="custom-card" title="Custom title">
          Content
        </Card>
      );
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('title', 'Custom title');
    });

    it('should accept style prop', () => {
      const { container } = render(
        <Card style={{ padding: '20px' }}>Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({ padding: '20px' });
    });

    it('should accept id prop', () => {
      const { container } = render(<Card id="custom-id">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('id', 'custom-id');
    });

    it('should accept aria attributes', () => {
      const { container } = render(
        <Card aria-label="Card label" aria-describedby="description">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('aria-label', 'Card label');
      expect(card).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Card>Card content</Card>);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with default variant', async () => {
      const { container } = render(
        <Card variant="default">Content</Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with elevated variant', async () => {
      const { container } = render(
        <Card variant="elevated">Content</Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with outlined variant', async () => {
      const { container } = render(
        <Card variant="outlined">Content</Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations when clickable', async () => {
      const { container } = render(
        <Card clickable onClick={() => {}}>
          Content
        </Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with complete composition', async () => {
      const { container } = render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    it('should have no violations with nested interactive elements', async () => {
      const { container } = render(
        <Card>
          <Card.Header>
            <h2>Title</h2>
          </Card.Header>
          <Card.Body>
            <p>Content with <a href="#link">link</a></p>
          </Card.Body>
          <Card.Footer>
            <button>Action</button>
          </Card.Footer>
        </Card>
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });
  });

  describe('Combinations', () => {
    it('should handle multiple props together', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card
          variant="elevated"
          clickable
          className="custom"
          onClick={handleClick}
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('variant-elevated');
      expect(card.className).toContain('clickable');
      expect(card.className).toContain('custom');
    });

    it('should render all variants with clickable', () => {
      const variants = ['default', 'outlined', 'elevated'] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <Card variant={variant} clickable>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        expect(card.className).toContain(`variant-${variant}`);
        expect(card.className).toContain('clickable');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { container } = render(<Card>{''}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle null children gracefully', () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle undefined className', () => {
      const { container } = render(<Card className={undefined}>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card.className).not.toContain('undefined');
    });

    it('should handle multiple Card.Body elements', () => {
      render(
        <Card>
          <Card.Body>Body 1</Card.Body>
          <Card.Body>Body 2</Card.Body>
        </Card>
      );
      expect(screen.getByText('Body 1')).toBeInTheDocument();
      expect(screen.getByText('Body 2')).toBeInTheDocument();
    });

    it('should handle nested content', () => {
      render(
        <Card>
          <Card.Body>
            <div>
              <span data-testid="nested">Nested content</span>
            </div>
          </Card.Body>
        </Card>
      );
      expect(screen.getByTestId('nested')).toBeInTheDocument();
    });
  });
});
