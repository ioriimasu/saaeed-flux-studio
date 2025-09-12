import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      delay: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    registerPlugin: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
  },
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    delay: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  })),
  registerPlugin: vi.fn(),
  to: vi.fn(),
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: () => ({
    getPropertyValue: () => '',
  }),
});
