import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from '@/App';

// Mock all the components
vi.mock('@/components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>,
}));

vi.mock('@/components/About', () => ({
  default: () => <div data-testid="about">About</div>,
}));

vi.mock('@/components/Projects', () => ({
  default: () => <div data-testid="projects">Projects</div>,
}));

vi.mock('@/components/Contact', () => ({
  default: () => <div data-testid="contact">Contact</div>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('@/components/Preloader', () => ({
  default: () => <div data-testid="preloader">Preloader</div>,
}));

// Mock GSAP
vi.mock('gsap', () => ({
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
  })),
}));

describe('App', () => {
  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders preloader initially', () => {
    render(<App />);
    
    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });
});
