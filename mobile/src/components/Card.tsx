import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableProps,
} from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../theme/ThemeProvider';

export interface CardProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  pressable?: boolean;
  onPress?: () => void;
  hapticFeedback?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
  pressable = false,
  onPress,
  hapticFeedback = true,
  ...props
}) => {
  const { theme, isNeon } = useTheme();

  const getCardStyle = (): ViewStyle => {
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

    // Variant styles
    const variantStyles = {
      default: {
        backgroundColor: theme.colors.card,
        ...theme.shadows.sm,
      },
      glass: {
        backgroundColor: theme.glass.background,
        borderWidth: 1,
        borderColor: theme.glass.border,
        // Note: backdrop-filter is not supported in React Native
        // This would need to be handled with a custom implementation
      },
      elevated: {
        backgroundColor: theme.colors.card,
        ...theme.shadows.lg,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...variantStyles[variant],
    };
  };

  const CardContent = (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: theme.duration.normal,
        delay: 100,
      }}
      style={[getCardStyle(), style]}
    >
      {children}
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
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};
