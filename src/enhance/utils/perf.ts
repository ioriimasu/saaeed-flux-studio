export class PerfSentinel {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 60;
  private lowPowerMode = false;
  private sampleDuration = 3000; // 3 seconds
  private sampleStartTime = 0;
  private isSampling = false;
  private callbacks: Set<(fps: number, lowPower: boolean) => void> = new Set();

  constructor() {
    this.startSampling();
  }

  private startSampling(): void {
    this.sampleStartTime = performance.now();
    this.isSampling = true;
    this.frameCount = 0;
    this.lastTime = this.sampleStartTime;
    this.measureFrame();
  }

  private measureFrame = (): void => {
    if (!this.isSampling) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.sampleStartTime >= this.sampleDuration) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.sampleStartTime));
      this.lowPowerMode = this.fps < 30;
      
      this.notifyCallbacks();
      
      // Restart sampling
      this.startSampling();
    } else {
      requestAnimationFrame(this.measureFrame);
    }
  };

  private notifyCallbacks(): void {
    this.callbacks.forEach(callback => {
      try {
        callback(this.fps, this.lowPowerMode);
      } catch (error) {
        console.warn('PerfSentinel callback error:', error);
      }
    });
  }

  subscribe(callback: (fps: number, lowPower: boolean) => void): () => void {
    this.callbacks.add(callback);
    // Immediately call with current state
    callback(this.fps, this.lowPowerMode);
    
    return () => {
      this.callbacks.delete(callback);
    };
  }

  getFPS(): number {
    return this.fps;
  }

  isLowPower(): boolean {
    return this.lowPowerMode;
  }

  destroy(): void {
    this.isSampling = false;
    this.callbacks.clear();
  }
}

export const perfSentinel = new PerfSentinel();

export const isLowEndDevice = (): boolean => {
  // Check for low-end device indicators
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return true;
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    // Check for integrated graphics or mobile GPUs
    return /intel|amd|mali|adreno|powervr/i.test(renderer);
  }
  
  return false;
};

export const getDeviceMemory = (): number | null => {
  // @ts-ignore - Device Memory API is experimental
  return navigator.deviceMemory || null;
};

export const shouldReduceAnimations = (): boolean => {
  return (
    prefersReducedMotion() ||
    perfSentinel.isLowPower() ||
    isLowEndDevice() ||
    (getDeviceMemory() !== null && getDeviceMemory()! < 4)
  );
};

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const requestIdleCallback = (callback: () => void, timeout = 5000): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout });
  }
  return window.setTimeout(callback, 1);
};

export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};
