import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../theme/ThemeProvider';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
  animated?: boolean;
  pressable?: boolean;
  onPress?: () => void;
}

// Simple icon component that can be extended with actual icon libraries
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
  animated = false,
  pressable = false,
  onPress,
}) => {
  const { theme } = useTheme();

  const getIconColor = (): string => {
    if (color) return color;
    return theme.colors.foreground;
  };

  const getIconStyle = (): ViewStyle => {
    return {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    };
  };

  // This is a placeholder implementation
  // In a real app, you would use react-native-vector-icons or similar
  const renderIcon = () => {
    // For now, return a simple colored square as placeholder
    // Replace this with actual icon rendering logic
    return (
      <View
        style={{
          width: size * 0.8,
          height: size * 0.8,
          backgroundColor: getIconColor(),
          borderRadius: size * 0.1,
        }}
      />
    );
  };

  const IconContent = (
    <View style={getIconStyle()}>
      {renderIcon()}
    </View>
  );

  if (animated) {
    return (
      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'timing',
          duration: theme.duration.fast,
        }}
      >
        {IconContent}
      </MotiView>
    );
  }

  return IconContent;
};

// Predefined icon names for common use cases
export const IconNames = {
  // Navigation
  home: 'home',
  user: 'user',
  work: 'work',
  mail: 'mail',
  settings: 'settings',
  
  // Actions
  plus: 'plus',
  minus: 'minus',
  close: 'close',
  check: 'check',
  arrowRight: 'arrow-right',
  arrowLeft: 'arrow-left',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  
  // Social
  github: 'github',
  linkedin: 'linkedin',
  twitter: 'twitter',
  
  // UI
  menu: 'menu',
  search: 'search',
  filter: 'filter',
  sort: 'sort',
  edit: 'edit',
  delete: 'delete',
  share: 'share',
  
  // Tech
  code: 'code',
  database: 'database',
  cloud: 'cloud',
  mobile: 'mobile',
  web: 'web',
  server: 'server',
} as const;

export type IconName = keyof typeof IconNames;
