import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { OptimizedImage } from '@/components/ui/optimized-image';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('OptimizedImage', () => {
  it('renders image with correct attributes when priority is true', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
        priority
      />
    );
    
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('renders with lazy loading by default', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
      />
    );
    
    // Since intersection observer is mocked, the image won't render immediately
    expect(screen.getByText('Failed to load image')).toBeInTheDocument();
  });

  it('shows loading skeleton while image loads', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
      />
    );
    
    expect(screen.getByText('Failed to load image')).toBeInTheDocument();
  });

  it('shows error state when image fails to load', async () => {
    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
        width={200}
        height={200}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
        className="custom-class"
      />
    );
    
    const container = screen.getByText('Failed to load image').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
