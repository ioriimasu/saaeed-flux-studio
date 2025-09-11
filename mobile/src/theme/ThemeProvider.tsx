import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, themes } from './index';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isNeon: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@ioriimasu_theme_mode';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  const theme = themes[themeMode];
  const isDark = themeMode === 'dark' || themeMode === 'neon';
  const isNeon = themeMode === 'neon';

  // Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'neon')) {
          setThemeModeState(savedTheme);
        } else {
          // Use system preference as default
          const systemTheme = Appearance.getColorScheme();
          setThemeModeState(systemTheme === 'light' ? 'light' : 'dark');
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        // Fallback to system preference
        const systemTheme = Appearance.getColorScheme();
        setThemeModeState(systemTheme === 'light' ? 'light' : 'dark');
      } finally {
        setIsInitialized(true);
      }
    };

    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only auto-switch if user hasn't manually set a preference
      AsyncStorage.getItem(THEME_STORAGE_KEY).then((savedTheme) => {
        if (!savedTheme) {
          setThemeModeState(colorScheme === 'light' ? 'light' : 'dark');
        }
      });
    });

    return () => subscription?.remove();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
      setThemeModeState(mode);
    }
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'neon' : 'light';
    setThemeMode(nextTheme);
  };

  // Don't render until theme is initialized
  if (!isInitialized) {
    return null;
  }

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
    isDark,
    isNeon,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
