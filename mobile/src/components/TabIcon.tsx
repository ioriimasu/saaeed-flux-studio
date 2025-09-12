import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
  focused?: boolean;
}

const iconMap: { [key: string]: string } = {
  home: '🏠',
  user: '👤',
  briefcase: '💼',
  envelope: '✉️',
  gear: '⚙️',
};

export const TabIcon: React.FC<TabIconProps> = ({ name, color, size, focused = false }) => {
  const { theme } = useTheme();
  const icon = iconMap[name] || '?';

  return (
    <View style={[
      styles.container,
      {
        width: size,
        height: size,
        backgroundColor: focused ? color + '20' : 'transparent',
        borderRadius: size / 2,
      }
    ]}>
      <Text style={[
        styles.icon,
        {
          fontSize: size * 0.6,
          color: focused ? color : theme.colors.mutedForeground,
        }
      ]}>
        {icon}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});

