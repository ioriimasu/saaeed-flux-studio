interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuart';
}

const easingFunctions = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
};

let isInitialized = false;
let currentAnimation: number | null = null;

export function initSmoothScroll(options: SmoothScrollOptions = {}) {
  if (isInitialized) return;
  
  const { offset = 0, duration = 700, easing = 'easeOutCubic' } = options;
  
  // Disable native smooth scrolling to avoid conflicts
  document.documentElement.style.scrollBehavior = 'auto';
  
  const ease = easingFunctions[easing];
  
  function scrollToElement(element: Element) {
    // Cancel any ongoing animation
    if (currentAnimation) {
      cancelAnimationFrame(currentAnimation);
    }
    
    const start = window.scrollY;
    const targetRect = element.getBoundingClientRect();
    const end = Math.max(0, targetRect.top + window.scrollY - offset);
    const distance = end - start;
    
    // If distance is very small, just scroll immediately
    if (Math.abs(distance) < 5) {
      window.scrollTo(0, end);
      return;
    }
    
    const startTime = performance.now();
    
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);
      
      window.scrollTo(0, start + distance * easedProgress);
      
      if (progress < 1) {
        currentAnimation = requestAnimationFrame(animate);
      } else {
        currentAnimation = null;
      }
    }
    
    currentAnimation = requestAnimationFrame(animate);
  }
  
  function handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href^="#"], [data-smooth]') as HTMLAnchorElement;
    
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const id = href.slice(1);
    if (!id) return;
    
    const targetElement = document.getElementById(id);
    if (!targetElement) return;
    
    event.preventDefault();
    scrollToElement(targetElement);
  }
  
  // Add click listener
  document.addEventListener('click', handleClick, { capture: true });
  
  // Expose API globally
  (window as any).IORI_SCROLL = {
    scrollTo: (selector: string) => {
      const element = document.querySelector(selector);
      if (element) scrollToElement(element);
    },
    scrollToElement,
  };
  
  isInitialized = true;
}

export function destroySmoothScroll() {
  if (!isInitialized) return;
  
  // Cancel any ongoing animation
  if (currentAnimation) {
    cancelAnimationFrame(currentAnimation);
    currentAnimation = null;
  }
  
  // Re-enable native smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Remove global API
  delete (window as any).IORI_SCROLL;
  
  isInitialized = false;
}