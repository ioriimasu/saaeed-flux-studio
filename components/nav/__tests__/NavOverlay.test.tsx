import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NavOverlay } from '../NavOverlay';

describe('NavOverlay', () => {
  const mockOnClose = vi.fn();
  const mockOnLinkClick = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnLinkClick.mockClear();
  });

  it('renders when open', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('AAED')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<NavOverlay isOpen={false} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  it('calls onLinkClick when a link is clicked', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    expect(mockOnLinkClick).toHaveBeenCalledWith('#home');
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<NavOverlay isOpen={true} onClose={mockOnClose} onLinkClick={mockOnLinkClick} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'nav-title');
  });
});