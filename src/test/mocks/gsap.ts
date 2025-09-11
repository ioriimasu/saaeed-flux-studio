export const gsap = {
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    delay: vi.fn().mockReturnThis(),
  })),
  registerPlugin: vi.fn(),
};

export const ScrollTrigger = {
  create: vi.fn(),
  refresh: vi.fn(),
  update: vi.fn(),
};

export default gsap;
