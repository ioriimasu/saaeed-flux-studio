import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '@/components/Contact';

// Mock GSAP
vi.mock('gsap', () => ({
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
  })),
  registerPlugin: vi.fn(),
}));

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn((name) => ({ name, onChange: vi.fn(), onBlur: vi.fn() })),
    handleSubmit: vi.fn((fn) => (e) => {
      e.preventDefault();
      fn({ name: 'Test', email: 'test@example.com', message: 'Test message' });
    }),
    reset: vi.fn(),
    formState: { errors: {} },
  }),
}));

describe('Contact', () => {
  it('renders contact section', () => {
    render(<Contact />);
    
    expect(screen.getByRole('region', { name: 'Contact section' })).toBeInTheDocument();
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<Contact />);
    
    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />);
    
    const submitButton = screen.getByLabelText('Send message');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Send Message');
  });

  it('renders social links', () => {
    render(<Contact />);
    
    expect(screen.getByRole('list', { name: 'Social media links' })).toBeInTheDocument();
    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Email profile')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('📧 saaed@example.com')).toBeInTheDocument();
    expect(screen.getByText('📱 +1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('📍 San Francisco, CA')).toBeInTheDocument();
  });

  it('submits form when submit button is clicked', async () => {
    render(<Contact />);
    
    const submitButton = screen.getByLabelText('Send message');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully! I\'ll get back to you soon.')).toBeInTheDocument();
    });
  });
});
