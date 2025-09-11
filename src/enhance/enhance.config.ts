export interface EnhanceConfig {
  cursor: {
    enabled: boolean;
    magnetic: boolean;
    intensity: number;
    friction: number;
    size: number;
    hideNative: boolean;
  };
  tilt: {
    enabled: boolean;
    selector: string;
    maxTiltDeg: number;
    glare: boolean;
  };
  aurora: {
    enabled: boolean;
    timeReactive: boolean;
    lowPowerStatic: boolean;
  };
  particles: {
    enabled: boolean;
    density: number;
    linkDistance: number;
    mobileDisabled: boolean;
  };
  reveal: {
    enabled: boolean;
    textScan: boolean;
    threshold: number;
  };
  sfx: {
    enabled: boolean;
    volume: number;
    stereo: boolean;
  };
  palette: {
    enabled: boolean;
  };
  transitions: {
    enabled: boolean;
    mode: 'minimal' | 'heavy';
  };
  focus: {
    enabled: boolean;
    neonColor: string;
  };
  status: {
    enabled: boolean;
    selector: string;
    intervalMs: [number, number];
  };
  easter: {
    konami: boolean;
    devtoolsBanner: boolean;
  };
}

export const defaultConfig: EnhanceConfig = {
  cursor: {
    enabled: true,
    magnetic: true,
    intensity: 0.25,
    friction: 0.12,
    size: 28,
    hideNative: true,
  },
  tilt: {
    enabled: true,
    selector: '.card, .tile, .btn, [data-tilt]',
    maxTiltDeg: 6,
    glare: false,
  },
  aurora: {
    enabled: true,
    timeReactive: true,
    lowPowerStatic: true,
  },
  particles: {
    enabled: false,
    density: 0.25,
    linkDistance: 120,
    mobileDisabled: true,
  },
  reveal: {
    enabled: true,
    textScan: true,
    threshold: 0.15,
  },
  sfx: {
    enabled: false,
    volume: 0.28,
    stereo: true,
  },
  palette: {
    enabled: true,
  },
  transitions: {
    enabled: true,
    mode: 'minimal',
  },
  focus: {
    enabled: true,
    neonColor: 'var(--fx-neon, #00ffff)',
  },
  status: {
    enabled: true,
    selector: '[data-status-anchor]',
    intervalMs: [4000, 8000],
  },
  easter: {
    konami: true,
    devtoolsBanner: true,
  },
};

export class ConfigManager {
  private config: EnhanceConfig;
  private storageKey = 'ioriimasu-enhance-config';

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnhanceConfig {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultConfig, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load enhancement config:', error);
    }
    return { ...defaultConfig };
  }

  get<K extends keyof EnhanceConfig>(key: K): EnhanceConfig[K] {
    return this.config[key];
  }

  set<K extends keyof EnhanceConfig>(key: K, value: EnhanceConfig[K]): void {
    this.config[key] = value;
    this.saveConfig();
  }

  setAll(config: Partial<EnhanceConfig>): void {
    this.config = { ...this.config, ...config };
    this.saveConfig();
  }

  private saveConfig(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save enhancement config:', error);
    }
  }

  reset(): void {
    this.config = { ...defaultConfig };
    this.saveConfig();
  }

  getAll(): EnhanceConfig {
    return { ...this.config };
  }
}

export const configManager = new ConfigManager();
