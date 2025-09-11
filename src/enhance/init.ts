import { configManager } from './enhance.config';
import { detectKeyboardUser } from './utils/a11y';
import { perfSentinel } from './utils/perf';

// Import all feature modules
import { mountAurora } from './features/aurora';
import { mountCursor } from './features/cursor';
import { mountEasterEggs } from './features/easter-eggs';
import { mountPalette } from './features/palette';
import { mountParticles } from './features/particles';
import { mountReveal } from './features/reveal';
import { mountSfx } from './features/sfx';
import { mountStatus } from './features/status';
import { mountTilt } from './features/tilt';
import { mountTransitions } from './features/transitions';

export class EnhancementManager {
  private features: Map<string, () => void> = new Map();
  private isMounted = false;
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize accessibility features
    detectKeyboardUser();

    // Setup performance monitoring
    perfSentinel.subscribe((fps, lowPower) => {
      if (lowPower) {
        this.disableHeavyFeatures();
      }
    });

    // Create global API
    this.createGlobalAPI();

    this.isInitialized = true;
  }

  private createGlobalAPI(): void {
    (window as any).IORIIMASU_ENHANCE = {
      enableAll: () => this.enableAll(),
      disableAll: () => this.disableAll(),
      set: (key: string, value: any) => this.setFeature(key, value),
      get: (key: string) => this.getFeature(key),
      profile: () => this.getProfile(),
      mount: () => this.mount(),
      unmount: () => this.unmount(),
    };
  }

  public async mount(): Promise<void> {
    if (this.isMounted) return;

    await this.init();

    const config = configManager.getAll();

    // Mount features based on config
    if (config.cursor.enabled) {
      this.features.set('cursor', mountCursor());
    }

    if (config.tilt.enabled) {
      this.features.set('tilt', mountTilt());
    }

    if (config.aurora.enabled) {
      this.features.set('aurora', mountAurora());
    }

    if (config.particles.enabled) {
      this.features.set('particles', mountParticles());
    }

    if (config.reveal.enabled) {
      this.features.set('reveal', mountReveal());
    }

    if (config.sfx.enabled) {
      this.features.set('sfx', mountSfx());
    }

    if (config.palette.enabled) {
      this.features.set('palette', mountPalette());
    }

    if (config.transitions.enabled) {
      this.features.set('transitions', mountTransitions());
    }

    if (config.status.enabled) {
      this.features.set('status', mountStatus());
    }

    if (config.easter.konami || config.easter.devtoolsBanner) {
      this.features.set('easter', mountEasterEggs());
    }

    this.isMounted = true;
  }

  public unmount(): void {
    if (!this.isMounted) return;

    // Unmount all features
    this.features.forEach((unmount) => {
      try {
        unmount();
      } catch (error) {
        console.warn('Error unmounting feature:', error);
      }
    });

    this.features.clear();
    this.isMounted = false;
  }

  public enableAll(): void {
    const config = configManager.getAll();
    const allEnabled = Object.keys(config).reduce((acc, key) => {
      if (typeof config[key as keyof typeof config] === 'object') {
        acc[key] = { ...config[key as keyof typeof config], enabled: true };
      } else {
        acc[key] = config[key as keyof typeof config];
      }
      return acc;
    }, {} as any);

    configManager.setAll(allEnabled);
    this.remount();
  }

  public disableAll(): void {
    const config = configManager.getAll();
    const allDisabled = Object.keys(config).reduce((acc, key) => {
      if (typeof config[key as keyof typeof config] === 'object') {
        acc[key] = { ...config[key as keyof typeof config], enabled: false };
      } else {
        acc[key] = config[key as keyof typeof config];
      }
      return acc;
    }, {} as any);

    configManager.setAll(allDisabled);
    this.remount();
  }

  public setFeature(key: string, value: any): void {
    configManager.set(key as any, value);
    this.remount();
  }

  public getFeature(key: string): any {
    return configManager.get(key as any);
  }

  public getProfile(): any {
    return {
      isMounted: this.isMounted,
      features: Array.from(this.features.keys()),
      config: configManager.getAll(),
      performance: {
        fps: perfSentinel.getFPS(),
        lowPower: perfSentinel.isLowPower(),
      },
    };
  }

  private remount(): void {
    this.unmount();
    this.mount();
  }

  private disableHeavyFeatures(): void {
    // Disable heavy features when performance is low
    const heavyFeatures = ['particles', 'aurora'];
    
    heavyFeatures.forEach(feature => {
      if (this.features.has(feature)) {
        this.features.get(feature)?.();
        this.features.delete(feature);
      }
    });
  }
}

// Create singleton instance
export const enhancementManager = new EnhancementManager();

// Auto-mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    enhancementManager.mount();
  });
} else {
  enhancementManager.mount();
}

// Export convenience functions
export const mountEnhancements = () => enhancementManager.mount();
export const unmountEnhancements = () => enhancementManager.unmount();
export const enableAllEnhancements = () => enhancementManager.enableAll();
export const disableAllEnhancements = () => enhancementManager.disableAll();
