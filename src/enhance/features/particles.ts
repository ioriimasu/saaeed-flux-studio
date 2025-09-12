import { configManager } from '../enhance.config';
import { createElement, isTouchDevice, shouldReduceAnimations } from '../utils/dom';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  connections: Set<number>;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private animationId: number | null = null;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (isTouchDevice() || shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('particles');
    if (!config.enabled) return;

    this.createCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private createCanvas(): void {
    this.canvas = createElement('canvas', 'fx-particles');
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

  private createParticles(): void {
    const config = configManager.get('particles');
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000 * config.density);
    
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        connections: new Set(),
      });
    }
  }

  private bindEvents(): void {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private handleMouseLeave = (): void => {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  };

  private animate = (): void => {
    if (!this.isActive || !this.ctx || !this.canvas) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }

    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private updateParticles(): void {
    const config = configManager.get('particles');
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      }
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundary check
      if (particle.x < 0 || particle.x > window.innerWidth) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
      }
      if (particle.y < 0 || particle.y > window.innerHeight) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
      }
      
      // Update connections
      particle.connections.clear();
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index === otherIndex) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.linkDistance) {
          particle.connections.add(otherIndex);
        }
      });
    });
  }

  private drawParticles(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    this.particles.forEach((particle, index) => {
      particle.connections.forEach(otherIndex => {
        const otherParticle = this.particles[otherIndex];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const opacity = Math.max(0, 1 - distance / configManager.get('particles').linkDistance);
        
        this.ctx.globalAlpha = opacity * 0.3;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.stroke();
      });
    });
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = '#00ffff';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    this.ctx.globalAlpha = 1;
  }

  public destroy(): void {
    this.isActive = false;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('resize', this.resizeCanvas);
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export const mountParticles = (): (() => void) => {
  const particles = new ParticleSystem();
  return () => particles.destroy();
};
