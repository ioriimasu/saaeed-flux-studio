import { configManager } from '../enhance.config';
import { isTouchDevice, shouldReduceAnimations } from '../utils/dom';

export class SoundEffects {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isInitialized = false;
  private isActive = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    if (isTouchDevice() || shouldReduceAnimations()) {
      return;
    }

    const config = configManager.get('sfx');
    if (!config.enabled) return;

    await this.initializeAudio();
    this.bindEvents();
  }

  private async initializeAudio(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Load sound effects
      await this.loadSounds();
      
      this.isInitialized = true;
      this.isActive = true;
    } catch (error) {
      console.warn('Failed to initialize audio context:', error);
    }
  }

  private async loadSounds(): Promise<void> {
    if (!this.audioContext) return;

    const soundFiles = [
      { name: 'click', url: '/enhance/sfx/click.mp3' },
      { name: 'hover', url: '/enhance/sfx/hover.mp3' },
      { name: 'success', url: '/enhance/sfx/success.mp3' },
    ];

    for (const sound of soundFiles) {
      try {
        const response = await fetch(sound.url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.sounds.set(sound.name, audioBuffer);
      } catch (error) {
        console.warn(`Failed to load sound ${sound.name}:`, error);
      }
    }
  }

  private bindEvents(): void {
    // Click sounds
    document.addEventListener('click', this.handleClick);
    
    // Hover sounds
    document.addEventListener('mouseover', this.handleHover);
    
    // Form submission sounds
    document.addEventListener('submit', this.handleSubmit);
  }

  private handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.playSound('click');
    }
  };

  private handleHover = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.playSound('hover', 0.3);
    }
  };

  private handleSubmit = (e: Event): void => {
    this.playSound('success');
  };

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveSelectors = [
      'button',
      'a',
      'input[type="submit"]',
      'input[type="button"]',
      '[role="button"]',
      '.btn',
      '.card',
      '.tile'
    ];
    
    return interactiveSelectors.some(selector => 
      element.matches(selector) || element.closest(selector)
    );
  }

  private playSound(soundName: string, volume = 1): void {
    if (!this.isActive || !this.audioContext || !this.isInitialized) return;

    const audioBuffer = this.sounds.get(soundName);
    if (!audioBuffer) return;

    const config = configManager.get('sfx');
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = audioBuffer;
    gainNode.gain.value = volume * config.volume;
    
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start(0);
  }

  public playCustomSound(soundName: string, volume = 1): void {
    this.playSound(soundName, volume);
  }

  public setVolume(volume: number): void {
    const config = configManager.get('sfx');
    configManager.set('sfx', { ...config, volume });
  }

  public destroy(): void {
    this.isActive = false;
    
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('mouseover', this.handleHover);
    document.removeEventListener('submit', this.handleSubmit);
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export class HapticFeedback {
  private isSupported = false;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (!isTouchDevice()) return;

    const config = configManager.get('sfx');
    if (!config.enabled) return;

    // Check for vibration API support
    this.isSupported = 'vibrate' in navigator;
    this.isActive = this.isSupported;
    
    if (this.isActive) {
      this.bindEvents();
    }
  }

  private bindEvents(): void {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('touchstart', this.handleTouch);
  }

  private handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.vibrate([50]);
    }
  };

  private handleTouch = (e: TouchEvent): void => {
    const target = e.target as HTMLElement;
    if (this.isInteractiveElement(target)) {
      this.vibrate([30]);
    }
  };

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveSelectors = [
      'button',
      'a',
      'input[type="submit"]',
      'input[type="button"]',
      '[role="button"]',
      '.btn',
      '.card',
      '.tile'
    ];
    
    return interactiveSelectors.some(selector => 
      element.matches(selector) || element.closest(selector)
    );
  }

  private vibrate(pattern: number | number[]): void {
    if (!this.isActive || !this.isSupported) return;
    
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }

  public destroy(): void {
    this.isActive = false;
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('touchstart', this.handleTouch);
  }
}

export const mountSfx = (): (() => void) => {
  const soundEffects = new SoundEffects();
  const hapticFeedback = new HapticFeedback();
  
  return () => {
    soundEffects.destroy();
    hapticFeedback.destroy();
  };
};
