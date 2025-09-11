import { configManager } from '../enhance.config';
import { addClass, createElement, removeClass } from '../utils/dom';

export class KonamiCode {
  private sequence: string[] = [];
  private konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    const config = configManager.get('easter');
    if (!config.konami) return;

    this.bindEvents();
    this.isActive = true;
  }

  private bindEvents(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.isActive) return;

    this.sequence.push(e.code);
    
    // Keep only the last 10 keys
    if (this.sequence.length > this.konamiCode.length) {
      this.sequence.shift();
    }

    // Check if sequence matches
    if (this.sequence.length === this.konamiCode.length) {
      const matches = this.sequence.every((key, index) => key === this.konamiCode[index]);
      if (matches) {
        this.triggerEffect();
        this.sequence = []; // Reset sequence
      }
    }
  };

  private triggerEffect(): void {
    this.createConfetti();
    this.showMessage();
  }

  private createConfetti(): void {
    const confetti = createElement('div', 'fx-konami-confetti');
    confetti.innerHTML = Array.from({ length: 50 }, (_, i) => 
      `<div class="fx-confetti-piece" style="--delay: ${i * 0.1}s"></div>`
    ).join('');
    
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 3000);
  }

  private showMessage(): void {
    const message = createElement('div', 'fx-konami-message');
    message.textContent = '🎉 Konami Code Activated! 🎉';
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
      addClass(message, 'fx-konami-message-visible');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      removeClass(message, 'fx-konami-message-visible');
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 500);
    }, 3000);
  }

  public destroy(): void {
    this.isActive = false;
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

export class DevToolsBanner {
  private isActive = false;
  private bannerShown = false;

  constructor() {
    this.init();
  }

  private init(): void {
    const config = configManager.get('easter');
    if (!config.devtoolsBanner) return;

    this.bindEvents();
    this.isActive = true;
  }

  private bindEvents(): void {
    // Listen for DevTools open/close
    let devtools = false;
    const threshold = 160;
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          this.showBanner();
        }
      } else {
        if (devtools) {
          devtools = false;
          this.hideBanner();
        }
      }
    }, 500);
  }

  private showBanner(): void {
    if (this.bannerShown) return;

    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║  🚀 IORIIMASU ENHANCEMENT PACK - DEVELOPER MODE 🚀          ║
    ║                                                              ║
    ║  Welcome to the futuristic enhancement system!              ║
    ║                                                              ║
    ║  Available commands:                                         ║
    ║  • window.IORIIMASU_ENHANCE.enableAll()                     ║
    ║  • window.IORIIMASU_ENHANCE.disableAll()                    ║
    ║  • window.IORIIMASU_ENHANCE.set('cursor', {enabled: false}) ║
    ║  • window.IORIIMASU_ENHANCE.profile()                       ║
    ║                                                              ║
    ║  Try the Konami code: ↑↑↓↓←→←→BA                            ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    `);

    this.bannerShown = true;
  }

  private hideBanner(): void {
    this.bannerShown = false;
  }

  public destroy(): void {
    this.isActive = false;
  }
}

export class SecretAnimations {
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    this.bindEvents();
    this.isActive = true;
  }

  private bindEvents(): void {
    // Secret key combinations
    document.addEventListener('keydown', this.handleSecretKeys);
    
    // Secret click patterns
    document.addEventListener('click', this.handleSecretClicks);
  }

  private handleSecretKeys = (e: KeyboardEvent): void => {
    // Ctrl + Shift + E for special effect
    if (e.ctrlKey && e.shiftKey && e.key === 'KeyE') {
      this.triggerGlowEffect();
    }
    
    // Ctrl + Shift + P for particle burst
    if (e.ctrlKey && e.shiftKey && e.key === 'KeyP') {
      this.triggerParticleBurst();
    }
  };

  private handleSecretClicks = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    
    // Triple click on logo for special effect
    if (target.closest('.logo, .brand, [data-logo]')) {
      this.handleTripleClick(target);
    }
  };

  private handleTripleClick(element: HTMLElement): void {
    const now = Date.now();
    const lastClick = parseInt(element.dataset.lastClick || '0');
    
    if (now - lastClick < 500) {
      const clickCount = parseInt(element.dataset.clickCount || '0') + 1;
      element.dataset.clickCount = clickCount.toString();
      
      if (clickCount >= 3) {
        this.triggerLogoEffect(element);
        element.dataset.clickCount = '0';
      }
    } else {
      element.dataset.clickCount = '1';
    }
    
    element.dataset.lastClick = now.toString();
  }

  private triggerGlowEffect(): void {
    const glow = createElement('div', 'fx-secret-glow');
    document.body.appendChild(glow);
    
    setTimeout(() => {
      if (glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
    }, 2000);
  }

  private triggerParticleBurst(): void {
    const burst = createElement('div', 'fx-particle-burst');
    burst.innerHTML = Array.from({ length: 100 }, (_, i) => 
      `<div class="fx-burst-particle" style="--delay: ${i * 0.01}s"></div>`
    ).join('');
    
    document.body.appendChild(burst);
    
    setTimeout(() => {
      if (burst.parentNode) {
        burst.parentNode.removeChild(burst);
      }
    }, 3000);
  }

  private triggerLogoEffect(element: HTMLElement): void {
    addClass(element, 'fx-logo-effect');
    
    setTimeout(() => {
      removeClass(element, 'fx-logo-effect');
    }, 1000);
  }

  public destroy(): void {
    this.isActive = false;
    document.removeEventListener('keydown', this.handleSecretKeys);
    document.removeEventListener('click', this.handleSecretClicks);
  }
}

export const mountEasterEggs = (): (() => void) => {
  const konamiCode = new KonamiCode();
  const devToolsBanner = new DevToolsBanner();
  const secretAnimations = new SecretAnimations();
  
  return () => {
    konamiCode.destroy();
    devToolsBanner.destroy();
    secretAnimations.destroy();
  };
};
