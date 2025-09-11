interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuart';
}

interface SmoothScrollAPI {
  scrollTo: (selector: string | Element, options?: SmoothScrollOptions) => void;
  init: () => void;
  destroy: () => void;
}

// Easing functions
const easingFunctions = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
};

class SmoothScrollManager {
  private isInitialized = false;
  private clickHandler: ((e: Event) => void) | null = null;
  private options: Required<SmoothScrollOptions>;

  constructor(options: SmoothScrollOptions = {}) {
    this.options = {
      offset: options.offset ?? 0,
      duration: options.duration ?? 700,
      easing: options.easing ?? 'easeOutCubic',
    };
  }

  init(): void {
    if (this.isInitialized) return;

    // Disable native smooth scrolling to avoid conflicts
    document.documentElement.style.scrollBehavior = 'auto';

    this.clickHandler = this.handleClick.bind(this);
    document.addEventListener('click', this.clickHandler, { capture: true });

    this.isInitialized = true;
  }

  destroy(): void {
    if (!this.isInitialized) return;

    if (this.clickHandler) {
      document.removeEventListener('click', this.clickHandler, { capture: true });
      this.clickHandler = null;
    }

    // Restore native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    this.isInitialized = false;
  }

  private handleClick = (event: Event): void => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href^="#"], [data-smooth]') as HTMLAnchorElement;
    
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      this.scrollToElement(targetElement);
    }
  };

  scrollTo(selector: string | Element, options: SmoothScrollOptions = {}): void {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;

    if (element) {
      this.scrollToElement(element as HTMLElement, options);
    }
  }

  private scrollToElement(element: HTMLElement, options: SmoothScrollOptions = {}): void {
    const opts = { ...this.options, ...options };
    const startY = window.scrollY;
    const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - opts.offset);
    const distance = targetY - startY;
    
    if (Math.abs(distance) < 1) return; // Already at target

    const startTime = performance.now();
    const easing = easingFunctions[opts.easing];

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / opts.duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo(0, startY + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// Create singleton instance
const smoothScrollManager = new SmoothScrollManager();

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    smoothScrollManager.init();
  });
} else {
  smoothScrollManager.init();
}

// Export API
export const smoothScrollAPI: SmoothScrollAPI = {
  scrollTo: (selector, options) => smoothScrollManager.scrollTo(selector, options),
  init: () => smoothScrollManager.init(),
  destroy: () => smoothScrollManager.destroy(),
};

// Global API for external access
(window as any).IORI_SCROLL = smoothScrollAPI;

export default smoothScrollAPI;
