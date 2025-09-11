import { configManager } from '../enhance.config';
import { createElement, shouldReduceAnimations } from '../utils/dom';

export class AuroraBackground {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private time = 0;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('aurora');
    if (!config.enabled) return;

    this.createCanvas();
    this.animate();
  }

  private createCanvas(): void {
    this.canvas = createElement('canvas', 'fx-aurora-bg');
    this.ctx = this.canvas.getContext('2d');
    
    if (!this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    
    document.body.appendChild(this.canvas);
    this.isActive = true;
  }

  private resizeCanvas = (): void => {
    if (!this.canvas || !this.ctx) return;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);
  };

  private animate = (): void => {
    if (!this.isActive || !this.ctx || !this.canvas) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }

    this.time += 0.01;
    this.drawAurora();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private drawAurora(): void {
    if (!this.ctx || !this.canvas) return;

    const config = configManager.get('aurora');
    const { width, height } = this.canvas;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Get time-based colors
    const colors = this.getTimeBasedColors();
    
    // Create gradient
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.5, colors.secondary);
    gradient.addColorStop(1, colors.tertiary);
    
    // Draw aurora waves
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    
    const waveCount = 3;
    for (let i = 0; i < waveCount; i++) {
      this.drawWave(i, waveCount);
    }
    
    this.ctx.fill();
    
    // Add subtle noise
    this.addNoise();
  }

  private drawWave(waveIndex: number, totalWaves: number): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.canvas;
    const waveHeight = height / totalWaves;
    const yOffset = waveIndex * waveHeight;
    const frequency = 0.01 + waveIndex * 0.005;
    const amplitude = 50 + waveIndex * 20;
    
    this.ctx.moveTo(0, yOffset);
    
    for (let x = 0; x < width; x += 2) {
      const y = yOffset + 
        Math.sin(x * frequency + this.time * 2) * amplitude +
        Math.sin(x * frequency * 0.5 + this.time) * amplitude * 0.5;
      
      this.ctx.lineTo(x, y);
    }
    
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(0, height);
    this.ctx.lineTo(0, yOffset);
  }

  private getTimeBasedColors(): { primary: string; secondary: string; tertiary: string } {
    const config = configManager.get('aurora');
    
    if (!config.timeReactive) {
      return {
        primary: 'rgba(0, 255, 255, 0.1)',
        secondary: 'rgba(255, 0, 255, 0.1)',
        tertiary: 'rgba(0, 255, 0, 0.1)',
      };
    }

    const hour = new Date().getHours();
    const timeOfDay = hour / 24;
    
    // Cooler colors at night, warmer during day
    const hue1 = 180 + Math.sin(timeOfDay * Math.PI * 2) * 60; // 120-240
    const hue2 = 300 + Math.sin(timeOfDay * Math.PI * 2 + Math.PI / 3) * 60; // 240-360
    const hue3 = 60 + Math.sin(timeOfDay * Math.PI * 2 + Math.PI * 2 / 3) * 60; // 0-120
    
    return {
      primary: `hsla(${hue1}, 70%, 50%, 0.08)`,
      secondary: `hsla(${hue2}, 70%, 50%, 0.08)`,
      tertiary: `hsla(${hue3}, 70%, 50%, 0.08)`,
    };
  }

  private addNoise(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.canvas;
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 10;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  public destroy(): void {
    this.isActive = false;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('resize', this.resizeCanvas);
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export const mountAurora = (): (() => void) => {
  const aurora = new AuroraBackground();
  return () => aurora.destroy();
};
