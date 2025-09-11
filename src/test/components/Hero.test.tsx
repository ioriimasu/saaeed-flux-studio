import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Hero from '@/components/Hero';

// Mock GSAP
vi.mock('gsap', () => ({
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
  })),
}));

describe('Hero', () => {
  it('renders hero section with main heading', () => {
    render(<Hero />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument();
    expect(screen.getByText('Saaed Imam')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    render(<Hero />);
    
    expect(screen.getByText("I craft futuristic web experiences")).toBeInTheDocument();
  });

  it('renders hire me button', () => {
    render(<Hero />);
    
    const hireButton = screen.getByLabelText('Navigate to contact section to hire me');
    expect(hireButton).toBeInTheDocument();
    expect(hireButton).toHaveTextContent('Hire Me');
  });

  it('renders scroll indicator', () => {
    render(<Hero />);
    
    const scrollIndicator = screen.getByLabelText('Scroll down to see more content');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('renders 3D background iframe', () => {
    render(<Hero />);
    
    const iframe = screen.getByTitle('Interactive 3D background animation');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('aria-hidden', 'true');
  });
});
