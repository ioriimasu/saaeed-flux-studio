import { tokens } from './tokens';

export type ThemeMode = 'light' | 'dark' | 'neon';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: typeof tokens.spacing;
  typography: typeof tokens.typography;
  borderRadius: typeof tokens.borderRadius;
  shadows: typeof tokens.shadows;
  zIndex: typeof tokens.zIndex;
  duration: typeof tokens.duration;
  easing: typeof tokens.easing;
  glass: typeof tokens.glass;
  gradients: typeof tokens.gradients;
}

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: tokens.colors.primary[500],
    primaryForeground: tokens.colors.text.inverse,
    secondary: tokens.colors.secondary[500],
    secondaryForeground: tokens.colors.text.inverse,
    accent: tokens.colors.accent[500],
    accentForeground: tokens.colors.text.inverse,
    background: tokens.colors.neutral[50],
    foreground: tokens.colors.neutral[900],
    card: tokens.colors.neutral[100],
    cardForeground: tokens.colors.neutral[900],
    popover: tokens.colors.neutral[100],
    popoverForeground: tokens.colors.neutral[900],
    muted: tokens.colors.neutral[200],
    mutedForeground: tokens.colors.neutral[600],
    border: tokens.colors.neutral[300],
    input: tokens.colors.neutral[200],
    ring: tokens.colors.primary[500],
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
  },
  spacing: tokens.spacing,
  typography: tokens.typography,
  borderRadius: tokens.borderRadius,
  shadows: tokens.shadows,
  zIndex: tokens.zIndex,
  duration: tokens.duration,
  easing: tokens.easing,
  glass: {
    background: 'hsla(230, 25%, 15%, 0.05)',
    border: 'hsla(220, 30%, 25%, 0.1)',
    backdropFilter: 'blur(8px)',
  },
  gradients: tokens.gradients,
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: tokens.colors.primary[500],
    primaryForeground: tokens.colors.text.inverse,
    secondary: tokens.colors.secondary[500],
    secondaryForeground: tokens.colors.text.inverse,
    accent: tokens.colors.accent[500],
    accentForeground: tokens.colors.text.inverse,
    background: tokens.colors.background.primary,
    foreground: tokens.colors.text.primary,
    card: tokens.colors.surface.card,
    cardForeground: tokens.colors.text.primary,
    popover: tokens.colors.surface.popover,
    popoverForeground: tokens.colors.text.primary,
    muted: tokens.colors.neutral[700],
    mutedForeground: tokens.colors.text.secondary,
    border: tokens.colors.border.primary,
    input: tokens.colors.border.input,
    ring: tokens.colors.primary[500],
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
  },
  spacing: tokens.spacing,
  typography: tokens.typography,
  borderRadius: tokens.borderRadius,
  shadows: tokens.shadows,
  zIndex: tokens.zIndex,
  duration: tokens.duration,
  easing: tokens.easing,
  glass: tokens.glass,
  gradients: tokens.gradients,
};

const neonTheme: Theme = {
  mode: 'neon',
  colors: {
    primary: tokens.colors.primary[500],
    primaryForeground: tokens.colors.text.inverse,
    secondary: tokens.colors.secondary[500],
    secondaryForeground: tokens.colors.text.inverse,
    accent: tokens.colors.accent[500],
    accentForeground: tokens.colors.text.inverse,
    background: tokens.colors.background.primary,
    foreground: tokens.colors.text.primary,
    card: tokens.colors.surface.glass,
    cardForeground: tokens.colors.text.primary,
    popover: tokens.colors.surface.glass,
    popoverForeground: tokens.colors.text.primary,
    muted: tokens.colors.neutral[700],
    mutedForeground: tokens.colors.text.secondary,
    border: tokens.colors.border.glass,
    input: tokens.colors.border.input,
    ring: tokens.colors.primary[500],
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
  },
  spacing: tokens.spacing,
  typography: tokens.typography,
  borderRadius: tokens.borderRadius,
  shadows: {
    ...tokens.shadows,
    // Enhanced neon shadows for neon theme
    neon: {
      primary: {
        shadowColor: tokens.colors.primary.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 0,
      },
      accent: {
        shadowColor: tokens.colors.accent.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 0,
      },
      secondary: {
        shadowColor: tokens.colors.secondary.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 0,
      },
    },
  },
  zIndex: tokens.zIndex,
  duration: tokens.duration,
  easing: tokens.easing,
  glass: {
    background: 'hsla(230, 25%, 15%, 0.2)',
    border: 'hsla(220, 30%, 25%, 0.5)',
    backdropFilter: 'blur(20px)',
  },
  gradients: tokens.gradients,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  neon: neonTheme,
} as const;

export { tokens };
