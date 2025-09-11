import { configManager } from '../enhance.config';
import { addClass, createElement, querySelector, removeClass } from '../utils/dom';

interface SystemStatus {
  uptime: string;
  latency: number;
  cpu: number;
  memory: number;
  temperature: number;
  status: 'online' | 'warning' | 'offline';
}

export class SystemStatusCard {
  private card: HTMLElement | null = null;
  private status: SystemStatus;
  private updateInterval: NodeJS.Timeout | null = null;
  private isActive = false;

  constructor() {
    this.status = this.generateInitialStatus();
    this.init();
  }

  private init(): void {
    const config = configManager.get('status');
    if (!config.enabled) return;

    this.createCard();
    this.startUpdates();
  }

  private createCard(): void {
    this.card = createElement('div', 'fx-system-status');
    this.card.innerHTML = `
      <div class="fx-system-status-header">
        <div class="fx-system-status-title">System Status</div>
        <div class="fx-system-status-indicator fx-status-${this.status.status}"></div>
      </div>
      <div class="fx-system-status-content">
        <div class="fx-system-status-item">
          <span class="fx-system-status-label">Uptime</span>
          <span class="fx-system-status-value" data-value="uptime">${this.status.uptime}</span>
        </div>
        <div class="fx-system-status-item">
          <span class="fx-system-status-label">Latency</span>
          <span class="fx-system-status-value" data-value="latency">${this.status.latency}ms</span>
        </div>
        <div class="fx-system-status-item">
          <span class="fx-system-status-label">CPU</span>
          <span class="fx-system-status-value" data-value="cpu">${this.status.cpu}%</span>
        </div>
        <div class="fx-system-status-item">
          <span class="fx-system-status-label">Memory</span>
          <span class="fx-system-status-value" data-value="memory">${this.status.memory}%</span>
        </div>
        <div class="fx-system-status-item">
          <span class="fx-system-status-label">Temperature</span>
          <span class="fx-system-status-value" data-value="temperature">${this.status.temperature}°C</span>
        </div>
      </div>
    `;

    // Find the anchor element
    const anchor = querySelector(configManager.get('status').selector);
    if (anchor) {
      anchor.appendChild(this.card);
    } else {
      // Fallback to body
      document.body.appendChild(this.card);
    }

    this.isActive = true;
  }

  private generateInitialStatus(): SystemStatus {
    return {
      uptime: this.generateUptime(),
      latency: Math.floor(Math.random() * 50) + 10,
      cpu: Math.floor(Math.random() * 30) + 20,
      memory: Math.floor(Math.random() * 40) + 30,
      temperature: Math.floor(Math.random() * 20) + 35,
      status: 'online'
    };
  }

  private generateUptime(): string {
    const days = Math.floor(Math.random() * 30) + 1;
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${days}d ${hours}h ${minutes}m`;
  }

  private startUpdates(): void {
    const config = configManager.get('status');
    const [minInterval, maxInterval] = config.intervalMs;
    
    const update = () => {
      this.updateStatus();
      const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
      this.updateInterval = setTimeout(update, nextInterval);
    };

    this.updateInterval = setTimeout(update, 1000);
  }

  private updateStatus(): void {
    if (!this.isActive || !this.card) return;

    // Generate new status
    const newStatus = this.generateNewStatus();
    
    // Update values with animation
    this.updateValue('uptime', newStatus.uptime);
    this.updateValue('latency', `${newStatus.latency}ms`);
    this.updateValue('cpu', `${newStatus.cpu}%`);
    this.updateValue('memory', `${newStatus.memory}%`);
    this.updateValue('temperature', `${newStatus.temperature}°C`);

    // Update status indicator
    const indicator = this.card.querySelector('.fx-system-status-indicator');
    if (indicator) {
      removeClass(indicator as HTMLElement, `fx-status-${this.status.status}`);
      addClass(indicator as HTMLElement, `fx-status-${newStatus.status}`);
    }

    this.status = newStatus;
  }

  private generateNewStatus(): SystemStatus {
    const current = this.status;
    
    return {
      uptime: this.generateUptime(),
      latency: Math.max(5, current.latency + (Math.random() - 0.5) * 20),
      cpu: Math.max(0, Math.min(100, current.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.max(0, Math.min(100, current.memory + (Math.random() - 0.5) * 5)),
      temperature: Math.max(30, Math.min(80, current.temperature + (Math.random() - 0.5) * 2)),
      status: this.determineStatus()
    };
  }

  private determineStatus(): 'online' | 'warning' | 'offline' {
    const { latency, cpu, memory, temperature } = this.status;
    
    if (latency > 200 || cpu > 90 || memory > 95 || temperature > 75) {
      return 'warning';
    }
    
    if (latency > 500 || cpu > 99 || memory > 99 || temperature > 85) {
      return 'offline';
    }
    
    return 'online';
  }

  private updateValue(key: string, value: string): void {
    const element = this.card?.querySelector(`[data-value="${key}"]`);
    if (element) {
      // Add rolling animation
      addClass(element as HTMLElement, 'fx-rolling-update');
      
      setTimeout(() => {
        element.textContent = value;
        removeClass(element as HTMLElement, 'fx-rolling-update');
      }, 150);
    }
  }

  public destroy(): void {
    this.isActive = false;
    
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
    }
    
    if (this.card && this.card.parentNode) {
      this.card.parentNode.removeChild(this.card);
    }
  }
}

export class DataTicker {
  private ticker: HTMLElement | null = null;
  private messages: string[] = [];
  private currentIndex = 0;
  private updateInterval: NodeJS.Timeout | null = null;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    const config = configManager.get('status');
    if (!config.enabled) return;

    this.setupMessages();
    this.createTicker();
    this.startTicker();
  }

  private setupMessages(): void {
    this.messages = [
      'System initialized successfully',
      'All services operational',
      'Network latency: 12ms',
      'Memory usage: 67%',
      'CPU temperature: 42°C',
      'Database connection stable',
      'Cache performance optimal',
      'Security protocols active',
      'Backup completed successfully',
      'Monitoring systems online',
      'Load balancer functioning',
      'SSL certificates valid',
      'API response time: 45ms',
      'User sessions: 1,247 active',
      'Data transfer rate: 2.3 Gbps',
      'System health: 98.7%',
      'Firewall status: Protected',
      'CDN performance: Excellent',
      'Error rate: 0.02%',
      'Uptime: 99.9%'
    ];
  }

  private createTicker(): void {
    this.ticker = createElement('div', 'fx-data-ticker');
    this.ticker.innerHTML = `
      <div class="fx-data-ticker-content">
        <div class="fx-data-ticker-message">${this.messages[0]}</div>
      </div>
    `;
    
    document.body.appendChild(this.ticker);
    this.isActive = true;
  }

  private startTicker(): void {
    const update = () => {
      this.updateMessage();
      this.updateInterval = setTimeout(update, Math.random() * 3000 + 2000); // 2-5 seconds
    };

    this.updateInterval = setTimeout(update, 1000);
  }

  private updateMessage(): void {
    if (!this.isActive || !this.ticker) return;

    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    const message = this.messages[this.currentIndex];
    
    const messageElement = this.ticker.querySelector('.fx-data-ticker-message');
    if (messageElement) {
      // Add transition effect
      addClass(messageElement as HTMLElement, 'fx-ticker-transition');
      
      setTimeout(() => {
        messageElement.textContent = message;
        removeClass(messageElement as HTMLElement, 'fx-ticker-transition');
      }, 300);
    }
  }

  public destroy(): void {
    this.isActive = false;
    
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
    }
    
    if (this.ticker && this.ticker.parentNode) {
      this.ticker.parentNode.removeChild(this.ticker);
    }
  }
}

export const mountStatus = (): (() => void) => {
  const systemStatus = new SystemStatusCard();
  const dataTicker = new DataTicker();
  
  return () => {
    systemStatus.destroy();
    dataTicker.destroy();
  };
};
