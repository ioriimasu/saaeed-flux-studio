import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../theme/ThemeProvider';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'glass' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  ...props
}) => {
  const { theme, isNeon } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: theme.spacing[2],
    };

    return {
      ...baseStyle,
      ...containerStyle,
    };
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      ...theme.shadows.sm,
    };

    // Size styles
    const sizeStyles = {
      sm: {
        paddingHorizontal: theme.spacing[3],
        paddingVertical: theme.spacing[2],
        minHeight: 36,
      },
      md: {
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[3],
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: theme.spacing[5],
        paddingVertical: theme.spacing[4],
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles = {
      default: {
        backgroundColor: theme.colors.input,
        borderColor: error ? theme.colors.error : theme.colors.border,
      },
      glass: {
        backgroundColor: theme.glass.background,
        borderColor: error ? theme.colors.error : theme.glass.border,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: error ? theme.colors.error : theme.colors.border,
      },
    };

    // Focus styles
    const focusStyles = isFocused ? {
      borderColor: theme.colors.primary,
      ...(isNeon ? theme.shadows.neon.primary : {}),
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...focusStyles,
    };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      color: theme.colors.foreground,
      fontSize: theme.typography.fontSize[size],
      fontFamily: theme.typography.fontFamily.primary,
    };

    return {
      ...baseStyle,
      ...inputStyle,
    };
  };

  const getLabelStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.foreground,
      marginBottom: theme.spacing[1],
    };

    return {
      ...baseStyle,
      ...labelStyle,
    };
  };

  const getErrorStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.error,
      marginTop: theme.spacing[1],
    };

    return {
      ...baseStyle,
      ...errorStyle,
    };
  };

  const getHelperStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.mutedForeground,
      marginTop: theme.spacing[1],
    };

    return {
      ...baseStyle,
      ...helperStyle,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}
      
      <MotiView
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          type: 'timing',
          duration: theme.duration.fast,
        }}
        style={getInputContainerStyle()}
      >
        {leftIcon && (
          <View style={{ marginRight: theme.spacing[2] }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={getInputStyle()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.mutedForeground}
          {...props}
        />
        
        {rightIcon && (
          <View style={{ marginLeft: theme.spacing[2] }}>
            {rightIcon}
          </View>
        )}
      </MotiView>
      
      {error && (
        <Text style={getErrorStyle()}>
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text style={getHelperStyle()}>
          {helperText}
        </Text>
      )}
    </View>
  );
};
