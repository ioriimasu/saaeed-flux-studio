import { fireEvent, render, screen } from '@testing-library/react';
import { NavOverlay } from '../NavOverlay';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: any) => (
      <div onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock smooth scroll API
jest.mock('@/lib/scroll/smooth', () => ({
  __esModule: true,
  default: {
    scrollTo: jest.fn(),
  },
}));

// Mock FocusTrap
jest.mock('../FocusTrap', () => ({
  FocusTrap: ({ children }: any) => <div data-testid="focus-trap">{children}</div>,
}));

describe('NavOverlay', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders when open', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<NavOverlay isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} />);
    
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders focus trap', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('focus-trap')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Navigation menu');
  });
});
