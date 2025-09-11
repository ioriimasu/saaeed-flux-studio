// Design tokens derived from the ioriimasu website
// Based on Tailwind config and CSS variables

export const tokens = {
  // Colors - HSL values matching the website
  colors: {
    // Primary neon purple
    primary: {
      50: 'hsl(261, 100%, 95%)',
      100: 'hsl(261, 100%, 90%)',
      200: 'hsl(261, 100%, 85%)',
      300: 'hsl(261, 100%, 80%)',
      400: 'hsl(261, 100%, 75%)',
      500: 'hsl(261, 100%, 70%)', // Main primary
      600: 'hsl(261, 100%, 65%)',
      700: 'hsl(261, 100%, 60%)',
      800: 'hsl(261, 100%, 55%)',
      900: 'hsl(261, 100%, 50%)',
      glow: 'hsl(261, 100%, 85%)',
    },
    
    // Cyan accent
    accent: {
      50: 'hsl(180, 100%, 95%)',
      100: 'hsl(180, 100%, 90%)',
      200: 'hsl(180, 100%, 85%)',
      300: 'hsl(180, 100%, 80%)',
      400: 'hsl(180, 100%, 75%)',
      500: 'hsl(180, 100%, 60%)', // Main accent
      600: 'hsl(180, 100%, 55%)',
      700: 'hsl(180, 100%, 50%)',
      800: 'hsl(180, 100%, 45%)',
      900: 'hsl(180, 100%, 40%)',
      glow: 'hsl(180, 100%, 75%)',
    },
    
    // Secondary neon pink
    secondary: {
      50: 'hsl(300, 100%, 95%)',
      100: 'hsl(300, 100%, 90%)',
      200: 'hsl(300, 100%, 85%)',
      300: 'hsl(300, 100%, 80%)',
      400: 'hsl(300, 100%, 75%)',
      500: 'hsl(300, 100%, 70%)', // Main secondary
      600: 'hsl(300, 100%, 65%)',
      700: 'hsl(300, 100%, 60%)',
      800: 'hsl(300, 100%, 55%)',
      900: 'hsl(300, 100%, 50%)',
      glow: 'hsl(300, 100%, 85%)',
    },
    
    // Neutral grays
    neutral: {
      50: 'hsl(210, 40%, 98%)',
      100: 'hsl(220, 15%, 90%)',
      200: 'hsl(220, 15%, 80%)',
      300: 'hsl(220, 15%, 70%)',
      400: 'hsl(220, 15%, 60%)',
      500: 'hsl(220, 15%, 50%)',
      600: 'hsl(220, 15%, 40%)',
      700: 'hsl(220, 15%, 30%)',
      800: 'hsl(220, 15%, 20%)',
      900: 'hsl(220, 15%, 10%)',
    },
    
    // Background colors
    background: {
      primary: 'hsl(224, 20%, 8%)', // Dark space background
      secondary: 'hsl(224, 25%, 12%)', // Card background
      tertiary: 'hsl(230, 25%, 15%)', // Glass background
    },
    
    // Surface colors
    surface: {
      card: 'hsl(224, 25%, 12%)',
      glass: 'hsl(230, 25%, 15%)',
      popover: 'hsl(224, 25%, 12%)',
      modal: 'hsl(224, 25%, 12%)',
    },
    
    // Text colors
    text: {
      primary: 'hsl(210, 40%, 98%)',
      secondary: 'hsl(220, 15%, 65%)',
      muted: 'hsl(220, 15%, 65%)',
      inverse: 'hsl(224, 20%, 8%)',
    },
    
    // Border colors
    border: {
      primary: 'hsl(220, 30%, 25%)',
      secondary: 'hsl(220, 30%, 25%)',
      glass: 'hsl(220, 30%, 25%)',
      input: 'hsl(220, 25%, 18%)',
    },
    
    // Status colors
    success: 'hsl(120, 60%, 50%)',
    warning: 'hsl(45, 90%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(200, 90%, 50%)',
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: 'Inter',
      mono: 'JetBrains Mono',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.025,
      normal: 0,
      wide: 0.025,
      wider: 0.05,
      widest: 0.1,
    },
  },
  
  // Spacing (4-based scale)
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
    72: 288,
    80: 320,
    88: 352, // Custom from website
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 16,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.4,
      shadowRadius: 32,
      elevation: 32,
    },
    // Neon shadows
    neon: {
      primary: {
        shadowColor: 'hsl(261, 100%, 70%)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 0,
      },
      accent: {
        shadowColor: 'hsl(180, 100%, 60%)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 0,
      },
      secondary: {
        shadowColor: 'hsl(300, 100%, 70%)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 0,
      },
    },
  },
  
  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Animation durations
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom easing from website
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Breakpoints (for responsive design)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Glass effect properties
  glass: {
    background: 'hsla(230, 25%, 15%, 0.1)',
    border: 'hsla(220, 30%, 25%, 0.3)',
    backdropFilter: 'blur(16px)',
  },
  
  // Gradients
  gradients: {
    primary: ['hsl(261, 100%, 70%)', 'hsl(300, 100%, 70%)'],
    accent: ['hsl(180, 100%, 60%)', 'hsl(261, 100%, 70%)'],
    glow: ['hsla(261, 100%, 85%, 0.3)', 'hsla(180, 100%, 75%, 0.3)'],
  },
} as const;

export type Tokens = typeof tokens;
