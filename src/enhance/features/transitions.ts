import { configManager } from '../enhance.config';
import { addClass, createElement, removeClass, shouldReduceAnimations } from '../utils/dom';

export class ScrollProgress {
  private progressBar: HTMLElement | null = null;
  private radialProgress: HTMLElement | null = null;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('transitions');
    if (!config.enabled) return;

    this.createProgressIndicators();
    this.bindEvents();
  }

  private createProgressIndicators(): void {
    // Linear progress bar
    this.progressBar = createElement('div', 'fx-scroll-progress');
    document.body.appendChild(this.progressBar);

    // Radial progress indicator
    this.radialProgress = createElement('div', 'fx-radial-progress');
    this.radialProgress.innerHTML = `
      <svg class="fx-radial-progress-svg" viewBox="0 0 100 100">
        <circle class="fx-radial-progress-bg" cx="50" cy="50" r="45" />
        <circle class="fx-radial-progress-fill" cx="50" cy="50" r="45" />
      </svg>
    `;
    document.body.appendChild(this.radialProgress);

    this.isActive = true;
  }

  private bindEvents(): void {
    window.addEventListener('scroll', this.updateProgress);
    window.addEventListener('resize', this.updateProgress);
  }

  private updateProgress = (): void => {
    if (!this.isActive) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);

    // Update linear progress
    if (this.progressBar) {
      this.progressBar.style.transform = `scaleX(${progress})`;
    }

    // Update radial progress
    if (this.radialProgress) {
      const circle = this.radialProgress.querySelector('.fx-radial-progress-fill') as SVGCircleElement;
      if (circle) {
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (progress * circumference);
        circle.style.strokeDashoffset = offset.toString();
      }
    }
  };

  public destroy(): void {
    this.isActive = false;
    
    window.removeEventListener('scroll', this.updateProgress);
    window.removeEventListener('resize', this.updateProgress);
    
    if (this.progressBar && this.progressBar.parentNode) {
      this.progressBar.parentNode.removeChild(this.progressBar);
    }
    
    if (this.radialProgress && this.radialProgress.parentNode) {
      this.radialProgress.parentNode.removeChild(this.radialProgress);
    }
  }
}

export class PageTransitions {
  private overlay: HTMLElement | null = null;
  private isTransitioning = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('transitions');
    if (!config.enabled) return;

    this.createOverlay();
    this.bindEvents();
  }

  private createOverlay(): void {
    this.overlay = createElement('div', 'fx-page-transition');
    this.overlay.innerHTML = `
      <div class="fx-page-transition-content">
        <div class="fx-page-transition-scanline"></div>
        <div class="fx-page-transition-text">Loading...</div>
      </div>
    `;
    document.body.appendChild(this.overlay);
  }

  private bindEvents(): void {
    // Listen for route changes (this would integrate with your router)
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    
    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', this.handlePopState);
  }

  private handleBeforeUnload = (): void => {
    this.startTransition();
  };

  private handlePopState = (): void => {
    this.startTransition();
  };

  private startTransition(): void {
    if (this.isTransitioning || !this.overlay) return;

    this.isTransitioning = true;
    addClass(this.overlay, 'fx-page-transition-active');
    
    // Hide overlay after animation
    setTimeout(() => {
      if (this.overlay) {
        removeClass(this.overlay, 'fx-page-transition-active');
      }
      this.isTransitioning = false;
    }, 1000);
  }

  public destroy(): void {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('popstate', this.handlePopState);
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}

export class BreadcrumbTrail {
  private trail: HTMLElement | null = null;
  private breadcrumbs: string[] = [];
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('transitions');
    if (!config.enabled) return;

    this.createTrail();
    this.bindEvents();
  }

  private createTrail(): void {
    this.trail = createElement('div', 'fx-breadcrumb-trail');
    document.body.appendChild(this.trail);
    this.isActive = true;
  }

  private bindEvents(): void {
    // Listen for navigation events
    window.addEventListener('popstate', this.handleNavigation);
    
    // Listen for link clicks
    document.addEventListener('click', this.handleLinkClick);
  }

  private handleNavigation = (): void => {
    this.addBreadcrumb(window.location.pathname);
  };

  private handleLinkClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        this.addBreadcrumb(url.pathname);
      }
    }
  };

  private addBreadcrumb(path: string): void {
    if (!this.isActive || !this.trail) return;

    this.breadcrumbs.push(path);
    
    // Limit breadcrumb history
    if (this.breadcrumbs.length > 10) {
      this.breadcrumbs.shift();
    }

    this.updateTrail();
  }

  private updateTrail(): void {
    if (!this.trail) return;

    this.trail.innerHTML = this.breadcrumbs
      .map((crumb, index) => {
        const spark = createElement('div', 'fx-breadcrumb-spark');
        spark.style.animationDelay = `${index * 0.1}s`;
        return spark.outerHTML;
      })
      .join('');

    // Add sparks animation
    addClass(this.trail, 'fx-breadcrumb-trail-active');
    
    setTimeout(() => {
      if (this.trail) {
        removeClass(this.trail, 'fx-breadcrumb-trail-active');
      }
    }, 1000);
  }

  public destroy(): void {
    this.isActive = false;
    
    window.removeEventListener('popstate', this.handleNavigation);
    document.removeEventListener('click', this.handleLinkClick);
    
    if (this.trail && this.trail.parentNode) {
      this.trail.parentNode.removeChild(this.trail);
    }
  }
}

export const mountTransitions = (): (() => void) => {
  const scrollProgress = new ScrollProgress();
  const pageTransitions = new PageTransitions();
  const breadcrumbTrail = new BreadcrumbTrail();
  
  return () => {
    scrollProgress.destroy();
    pageTransitions.destroy();
    breadcrumbTrail.destroy();
  };
};
