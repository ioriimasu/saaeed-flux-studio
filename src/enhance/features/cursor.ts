import { configManager } from '../enhance.config';
import { addClass, createElement, isTouchDevice, lerp, removeClass } from '../utils/dom';
import { shouldReduceAnimations } from '../utils/perf';

export class MagneticCursor {
  private cursor: HTMLElement | null = null;
  private cursorInner: HTMLElement | null = null;
  private mouse = { x: 0, y: 0 };
  private cursorPos = { x: 0, y: 0 };
  private isHovering = false;
  private hoveredElement: HTMLElement | null = null;
  private animationId: number | null = null;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (isTouchDevice() || shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('cursor');
    if (!config.enabled) return;

    this.createCursor();
    this.bindEvents();
    this.animate();
  }

  private createCursor(): void {
    this.cursor = createElement('div', 'fx-cursor');
    this.cursorInner = createElement('div', 'fx-cursor-inner');
    this.cursor.appendChild(this.cursorInner);
    document.body.appendChild(this.cursor);

    if (configManager.get('cursor').hideNative) {
      document.body.style.cursor = 'none';
    }
  }

  private bindEvents(): void {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseenter', this.handleMouseEnter);
    document.addEventListener('mouseleave', this.handleMouseLeave);
    
    // Magnetic attraction to interactive elements
    document.addEventListener('mouseover', this.handleMouseOver);
    document.addEventListener('mouseout', this.handleMouseOut);
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private handleMouseEnter = (): void => {
    this.isActive = true;
    if (this.cursor) {
      addClass(this.cursor, 'fx-cursor-visible');
    }
  };

  private handleMouseLeave = (): void => {
    this.isActive = false;
    if (this.cursor) {
      removeClass(this.cursor, 'fx-cursor-visible');
    }
  };

  private handleMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.isHovering = true;
      this.hoveredElement = target;
      if (this.cursor) {
        addClass(this.cursor, 'fx-cursor-hovering');
      }
    }
  };

  private handleMouseOut = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.isHovering = false;
      this.hoveredElement = null;
      if (this.cursor) {
        removeClass(this.cursor, 'fx-cursor-hovering');
      }
    }
  };

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveSelectors = [
      'button',
      'a',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '[data-magnetic]',
      '.btn',
      '.card',
      '.tile'
    ];
    
    return interactiveSelectors.some(selector => 
      element.matches(selector) || element.closest(selector)
    );
  }

  private animate = (): void => {
    if (!this.isActive || !this.cursor) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }

    const config = configManager.get('cursor');
    const friction = config.friction;
    const intensity = config.intensity;

    // Calculate target position
    let targetX = this.mouse.x;
    let targetY = this.mouse.y;

    // Apply magnetic attraction
    if (this.isHovering && this.hoveredElement) {
      const rect = this.hoveredElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        (this.mouse.x - centerX) ** 2 + (this.mouse.y - centerY) ** 2
      );
      
      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const attraction = Math.max(0, 1 - distance / maxDistance) * intensity;
      
      targetX = lerp(this.mouse.x, centerX, attraction);
      targetY = lerp(this.mouse.y, centerY, attraction);
    }

    // Smooth cursor movement
    this.cursorPos.x = lerp(this.cursorPos.x, targetX, friction);
    this.cursorPos.y = lerp(this.cursorPos.y, targetY, friction);

    // Apply position
    this.cursor.style.transform = `translate3d(${this.cursorPos.x}px, ${this.cursorPos.y}px, 0)`;

    this.animationId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseenter', this.handleMouseEnter);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    document.removeEventListener('mouseover', this.handleMouseOver);
    document.removeEventListener('mouseout', this.handleMouseOut);

    if (this.cursor) {
      document.body.removeChild(this.cursor);
    }

    if (configManager.get('cursor').hideNative) {
      document.body.style.cursor = '';
    }
  }
}

export const mountCursor = (): (() => void) => {
  const cursor = new MagneticCursor();
  return () => cursor.destroy();
};
