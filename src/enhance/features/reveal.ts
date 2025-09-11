import { configManager } from '../enhance.config';
import { addClass, hasClass, querySelectorAll, removeClass, shouldReduceAnimations } from '../utils/dom';

export class RevealAnimations {
  private observer: IntersectionObserver | null = null;
  private textElements: HTMLElement[] = [];
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('reveal');
    if (!config.enabled) return;

    this.setupIntersectionObserver();
    this.setupTextElements();
    this.observeElements();
  }

  private setupIntersectionObserver(): void {
    const config = configManager.get('reveal');
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
          }
        });
      },
      {
        threshold: config.threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  }

  private setupTextElements(): void {
    const config = configManager.get('reveal');
    
    if (config.textScan) {
      // Find all headings and important text
      const textSelectors = ['h1', 'h2', 'h3', '.hero-title', '.section-title', '[data-reveal-text]'];
      this.textElements = textSelectors.flatMap(selector => 
        Array.from(querySelectorAll(selector))
      );
      
      this.textElements.forEach(element => {
        this.prepareTextForScan(element);
      });
    }
  }

  private prepareTextForScan(element: HTMLElement): void {
    const text = element.textContent || '';
    if (!text.trim()) return;

    // Wrap each character in a span
    const wrappedText = text
      .split('')
      .map(char => `<span class="fx-text-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    element.innerHTML = wrappedText;
    addClass(element, 'fx-text-scan');
  }

  private observeElements(): void {
    if (!this.observer) return;

    // Observe all elements that should animate on scroll
    const revealSelectors = [
      '.card',
      '.section',
      '.feature',
      '.project',
      '[data-reveal]',
      '.hero-content',
      '.about-content',
      '.contact-form'
    ];

    revealSelectors.forEach(selector => {
      const elements = querySelectorAll(selector);
      elements.forEach(element => {
        addClass(element, 'fx-reveal-element');
        this.observer!.observe(element);
      });
    });

    // Observe text elements
    this.textElements.forEach(element => {
      this.observer!.observe(element);
    });
  }

  private animateElement(element: HTMLElement): void {
    if (hasClass(element, 'fx-revealed')) return;

    addClass(element, 'fx-revealed');

    // Special handling for text scan elements
    if (hasClass(element, 'fx-text-scan')) {
      this.animateTextScan(element);
    } else {
      // Standard reveal animation
      this.animateStandardReveal(element);
    }
  }

  private animateTextScan(element: HTMLElement): void {
    const chars = element.querySelectorAll('.fx-text-char');
    const config = configManager.get('reveal');
    
    chars.forEach((char, index) => {
      const charElement = char as HTMLElement;
      
      // Stagger the animation
      setTimeout(() => {
        addClass(charElement, 'fx-text-char-visible');
      }, index * 50);
    });

    // Add hover pause effect
    element.addEventListener('mouseenter', () => {
      addClass(element, 'fx-text-scan-paused');
    });

    element.addEventListener('mouseleave', () => {
      removeClass(element, 'fx-text-scan-paused');
    });
  }

  private animateStandardReveal(element: HTMLElement): void {
    // Add reveal animation class
    addClass(element, 'fx-reveal-animate');
    
    // Remove the class after animation completes
    setTimeout(() => {
      removeClass(element, 'fx-reveal-animate');
    }, 1000);
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    // Clean up text elements
    this.textElements.forEach(element => {
      if (hasClass(element, 'fx-text-scan')) {
        // Restore original text
        const text = element.textContent || '';
        element.innerHTML = text;
        removeClass(element, 'fx-text-scan');
      }
      removeClass(element, 'fx-revealed');
    });

    // Clean up all reveal elements
    const revealElements = querySelectorAll('.fx-reveal-element');
    revealElements.forEach(element => {
      removeClass(element, 'fx-reveal-element');
      removeClass(element, 'fx-revealed');
      removeClass(element, 'fx-reveal-animate');
    });
  }
}

export const mountReveal = (): (() => void) => {
  const reveal = new RevealAnimations();
  return () => reveal.destroy();
};
