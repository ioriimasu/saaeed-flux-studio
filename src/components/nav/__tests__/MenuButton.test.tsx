import { fireEvent, render, screen } from '@testing-library/react';
import { MenuButton } from '../MenuButton';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('MenuButton', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders with correct accessibility attributes when closed', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-label', 'Open menu');
    expect(button).toHaveAttribute('aria-controls', 'iori-nav');
  });

  it('renders with correct accessibility attributes when open', () => {
    render(<MenuButton isOpen={true} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-label', 'Close menu');
  });

  it('calls onToggle when clicked', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct positioning classes', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fixed', 'top-4', 'right-4');
  });

  it('has correct size styling', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-14', 'w-14');
  });
});
