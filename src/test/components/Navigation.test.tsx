import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '@/components/Navigation';

// Mock GSAP
vi.mock('gsap', () => ({
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
  })),
}));

describe('Navigation', () => {
  it('renders navigation with logo', () => {
    render(<Navigation />);
    
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('AAED')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders desktop navigation items', () => {
    render(<Navigation />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText('Open navigation menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when button is clicked', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);
    
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByLabelText('Close navigation menu');
    fireEvent.click(closeButton);
    
    expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
