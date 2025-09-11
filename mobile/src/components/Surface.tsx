import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { useTheme } from '../theme/ThemeProvider';

export interface SurfaceProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: 'glass' | 'frosted' | 'translucent' | 'solid';
  intensity?: number;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  pressable?: boolean;
  onPress?: () => void;
  hapticFeedback?: boolean;
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  variant = 'glass',
  intensity = 20,
  padding = 'md',
  style,
  pressable = false,
  onPress,
  hapticFeedback = true,
  ...props
}) => {
  const { theme, isNeon } = useTheme();

  const getSurfaceStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
    };

    // Padding styles
    const paddingStyles = {
      none: {},
      sm: {
        padding: theme.spacing[3],
      },
      md: {
        padding: theme.spacing[4],
      },
      lg: {
        padding: theme.spacing[6],
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
    };
  };

  const getBlurTint = (): 'light' | 'dark' | 'default' => {
    if (theme.mode === 'light') return 'light';
    if (theme.mode === 'neon') return 'dark';
    return 'dark';
  };

  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'glass':
        return theme.glass.background;
      case 'frosted':
        return 'rgba(255, 255, 255, 0.1)';
      case 'translucent':
        return 'rgba(0, 0, 0, 0.1)';
      case 'solid':
        return theme.colors.card;
      default:
        return theme.glass.background;
    }
  };

  const getBorderColor = (): string => {
    switch (variant) {
      case 'glass':
        return theme.glass.border;
      case 'frosted':
        return 'rgba(255, 255, 255, 0.2)';
      case 'translucent':
        return 'rgba(255, 255, 255, 0.1)';
      case 'solid':
        return theme.colors.border;
      default:
        return theme.glass.border;
    }
  };

  const SurfaceContent = (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: theme.duration.normal,
        delay: 100,
      }}
      style={[getSurfaceStyle(), style]}
    >
      {variant === 'glass' || variant === 'frosted' ? (
        <BlurView
          intensity={intensity}
          tint={getBlurTint()}
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: getBackgroundColor(),
              borderWidth: 1,
              borderColor: getBorderColor(),
            },
          ]}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: getBackgroundColor(),
              borderWidth: variant === 'solid' ? 0 : 1,
              borderColor: getBorderColor(),
            },
          ]}
        />
      )}
      <View style={{ zIndex: 1 }}>
        {children}
      </View>
    </MotiView>
  );

  if (pressable && onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          pressed && {
            transform: [{ scale: 0.98 }],
          },
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityHint="Double tap to activate"
        {...props}
      >
        {SurfaceContent}
      </Pressable>
    );
  }

  return SurfaceContent;
};
