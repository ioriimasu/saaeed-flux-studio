import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../theme/ThemeProvider';

export interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glass' | 'elevated';
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  animated?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  padding = 'md',
  margin = 'none',
  variant = 'default',
  style,
  titleStyle,
  subtitleStyle,
  animated = true,
}) => {
  const { theme, isNeon } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {};

    // Padding styles
    const paddingStyles = {
      none: {},
      sm: {
        padding: theme.spacing[4],
      },
      md: {
        padding: theme.spacing[6],
      },
      lg: {
        padding: theme.spacing[8],
      },
      xl: {
        padding: theme.spacing[12],
      },
    };

    // Margin styles
    const marginStyles = {
      none: {},
      sm: {
        marginVertical: theme.spacing[4],
      },
      md: {
        marginVertical: theme.spacing[6],
      },
      lg: {
        marginVertical: theme.spacing[8],
      },
      xl: {
        marginVertical: theme.spacing[12],
      },
    };

    // Variant styles
    const variantStyles = {
      default: {},
      glass: {
        backgroundColor: theme.glass.background,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.glass.border,
        ...theme.shadows.sm,
      },
      elevated: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.lg,
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...marginStyles[margin],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTitleStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.foreground,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    };

    return {
      ...baseStyle,
      ...titleStyle,
    };
  };

  const getSubtitleStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.normal,
      color: theme.colors.mutedForeground,
      marginBottom: theme.spacing[6],
      textAlign: 'center',
      lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
    };

    return {
      ...baseStyle,
      ...subtitleStyle,
    };
  };

  const SectionContent = (
    <View style={getContainerStyle()}>
      {title && (
        <Text style={getTitleStyle()}>
          {title}
        </Text>
      )}
      
      {subtitle && (
        <Text style={getSubtitleStyle()}>
          {subtitle}
        </Text>
      )}
      
      {children}
    </View>
  );

  if (animated) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: theme.duration.normal,
          delay: 100,
        }}
      >
        {SectionContent}
      </MotiView>
    );
  }

  return SectionContent;
};
