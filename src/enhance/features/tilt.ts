import { configManager } from '../enhance.config';
import { addClass, querySelectorAll, removeClass, shouldReduceAnimations } from '../utils/dom';

export class TiltEffect {
  private elements: HTMLElement[] = [];
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('tilt');
    if (!config.enabled) return;

    this.elements = Array.from(querySelectorAll(config.selector));
    this.bindEvents();
  }

  private bindEvents(): void {
    this.elements.forEach(element => {
      element.addEventListener('mouseenter', this.handleMouseEnter);
      element.addEventListener('mousemove', this.handleMouseMove);
      element.addEventListener('mouseleave', this.handleMouseLeave);
    });
  }

  private handleMouseEnter = (e: MouseEvent): void => {
    const element = e.currentTarget as HTMLElement;
    addClass(element, 'fx-tilt-active');
    this.isActive = true;
  };

  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isActive) return;

    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxTilt = configManager.get('tilt').maxTiltDeg;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = (mouseX / rect.width) * maxTilt;
    
    const rotateX = Math.max(-maxTilt, Math.min(maxTilt, tiltX));
    const rotateY = Math.max(-maxTilt, Math.min(maxTilt, tiltY));
    
    element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Add glare effect if enabled
    if (configManager.get('tilt').glare) {
      this.updateGlare(element, mouseX, mouseY, rect);
    }
  };

  private handleMouseLeave = (e: MouseEvent): void => {
    const element = e.currentTarget as HTMLElement;
    removeClass(element, 'fx-tilt-active');
    element.style.transform = '';
    element.style.filter = '';
    this.isActive = false;
  };

  private updateGlare(element: HTMLElement, mouseX: number, mouseY: number, rect: DOMRect): void {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);
    const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
    const intensity = Math.min(distance / maxDistance, 1);
    
    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    
    element.style.filter = `
      drop-shadow(0 0 20px rgba(0, 255, 255, ${intensity * 0.3}))
      drop-shadow(0 0 40px rgba(0, 255, 255, ${intensity * 0.1}))
    `;
  }

  public destroy(): void {
    this.elements.forEach(element => {
      element.removeEventListener('mouseenter', this.handleMouseEnter);
      element.removeEventListener('mousemove', this.handleMouseMove);
      element.removeEventListener('mouseleave', this.handleMouseLeave);
      element.style.transform = '';
      element.style.filter = '';
      removeClass(element, 'fx-tilt-active');
    });
    
    this.elements = [];
  }
}

export const mountTilt = (): (() => void) => {
  const tilt = new TiltEffect();
  return () => tilt.destroy();
};
