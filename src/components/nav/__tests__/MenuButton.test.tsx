import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MenuButton } from '../MenuButton';

describe('MenuButton', () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders with correct accessibility attributes', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'iori-nav');
    expect(button).toHaveAttribute('aria-label', 'Open menu');
  });

  it('updates accessibility attributes when open', () => {
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

  it('applies custom size', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} size={64} />);
    
    const button = screen.getByRole('button');
    expect(button.style.minWidth).toBe('64px');
    expect(button.style.minHeight).toBe('64px');
  });

  it('applies correct position classes', () => {
    render(<MenuButton isOpen={false} onToggle={mockOnToggle} position="top-left" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('top-4', 'left-4');
  });
});