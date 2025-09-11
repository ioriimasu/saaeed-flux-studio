export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }
  
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

export const isKeyboardUser = (): boolean => {
  return document.body.classList.contains('keyboard-user');
};

export const detectKeyboardUser = (): void => {
  let hadKeyboardEvent = true;
  
  const keyboardThrottleTimeout = 100;
  let keyboardThrottleTimeoutId: NodeJS.Timeout;
  
  const triggerKeyboardEvent = (): void => {
    hadKeyboardEvent = true;
    document.body.classList.add('keyboard-user');
    
    clearTimeout(keyboardThrottleTimeoutId);
    keyboardThrottleTimeoutId = setTimeout(() => {
      document.body.classList.remove('keyboard-user');
    }, keyboardThrottleTimeout);
  };
  
  const triggerMouseEvent = (): void => {
    hadKeyboardEvent = false;
    document.body.classList.remove('keyboard-user');
  };
  
  // Listen for keyboard events
  document.addEventListener('keydown', triggerKeyboardEvent, true);
  document.addEventListener('keyup', triggerKeyboardEvent, true);
  
  // Listen for mouse events
  document.addEventListener('mousedown', triggerMouseEvent, true);
  document.addEventListener('mousemove', triggerMouseEvent, true);
  document.addEventListener('mouseup', triggerMouseEvent, true);
  document.addEventListener('click', triggerMouseEvent, true);
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(c => {
      const val = parseInt(c) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const isHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

export const isForcedColors = (): boolean => {
  return window.matchMedia('(forced-colors: active)').matches;
};

export const getSystemTheme = (): 'light' | 'dark' | 'auto' => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'auto';
};

export const createAccessibleButton = (
  text: string,
  onClick: () => void,
  options: {
    className?: string;
    ariaLabel?: string;
    disabled?: boolean;
  } = {}
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = options.className || '';
  button.setAttribute('aria-label', options.ariaLabel || text);
  button.disabled = options.disabled || false;
  button.addEventListener('click', onClick);
  
  return button;
};

export const createAccessibleDiv = (
  role: string,
  options: {
    className?: string;
    ariaLabel?: string;
    tabIndex?: number;
  } = {}
): HTMLDivElement => {
  const div = document.createElement('div');
  div.setAttribute('role', role);
  div.className = options.className || '';
  if (options.ariaLabel) {
    div.setAttribute('aria-label', options.ariaLabel);
  }
  if (options.tabIndex !== undefined) {
    div.setAttribute('tabindex', options.tabIndex.toString());
  }
  
  return div;
};
