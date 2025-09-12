import { MotiView } from 'moti';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

export const SettingsScreen = () => {
  const { theme, themeMode, setThemeMode, isReducedMotion } = useTheme();

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          title: 'Theme Mode',
          description: 'Choose your preferred theme',
          type: 'theme',
          value: themeMode,
        },
        {
          title: 'Reduced Motion',
          description: 'Minimize animations and transitions',
          type: 'switch',
          value: isReducedMotion,
          onToggle: () => {
            // In a real app, you'd implement this
            Alert.alert('Info', 'Reduced motion setting would be implemented here');
          },
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          description: 'Receive updates about new projects',
          type: 'switch',
          value: true,
          onToggle: () => {
            Alert.alert('Info', 'Push notifications setting would be implemented here');
          },
        },
        {
          title: 'Email Updates',
          description: 'Get notified about new blog posts',
          type: 'switch',
          value: false,
          onToggle: () => {
            Alert.alert('Info', 'Email updates setting would be implemented here');
          },
        },
      ],
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          title: 'Analytics',
          description: 'Help improve the app with usage data',
          type: 'switch',
          value: true,
          onToggle: () => {
            Alert.alert('Info', 'Analytics setting would be implemented here');
          },
        },
        {
          title: 'Crash Reports',
          description: 'Send crash reports to help fix issues',
          type: 'switch',
          value: true,
          onToggle: () => {
            Alert.alert('Info', 'Crash reports setting would be implemented here');
          },
        },
      ],
    },
  ];

  const handleThemeChange = (mode: 'light' | 'dark' | 'neon' | 'system') => {
    setThemeMode(mode);
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to their default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setThemeMode('system');
            Alert.alert('Success', 'Settings have been reset to defaults');
          }
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully');
          }
        },
      ]
    );
  };

  const renderSettingItem = (item: any, index: number) => {
    return (
      <MotiView
        key={index}
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 300, delay: index * 100 }}
      >
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.foreground }]}>
              {item.title}
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.mutedForeground }]}>
              {item.description}
            </Text>
          </View>
          
          {item.type === 'switch' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ 
                false: theme.colors.muted, 
                true: theme.colors.primary 
              }}
              thumbColor={item.value ? theme.colors.primaryForeground : theme.colors.mutedForeground}
            />
          )}
          
          {item.type === 'theme' && (
            <View style={styles.themeSelector}>
              {(['light', 'dark', 'neon', 'system'] as const).map((mode) => (
                <Button
                  key={mode}
                  title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                  variant={themeMode === mode ? 'primary' : 'outline'}
                  size="sm"
                  onPress={() => handleThemeChange(mode)}
                  style={styles.themeButton}
                />
              ))}
            </View>
          )}
        </View>
      </MotiView>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Section style={styles.headerSection}>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
        >
          <Text style={[styles.headerTitle, { color: theme.colors.foreground }]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.mutedForeground }]}>
            Customize your experience
          </Text>
        </MotiView>
      </Section>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <Section key={section.title} style={styles.settingsSection}>
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 200 + sectionIndex * 200 }}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {section.title}
            </Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 400 + sectionIndex * 200 }}
          >
            <Card variant="glass" style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item, itemIndex)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                  )}
                </View>
              ))}
            </Card>
          </MotiView>
        </Section>
      ))}

      {/* Actions Section */}
      <Section style={styles.actionsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Actions
          </Text>
        </MotiView>

        <View style={styles.actionsGrid}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 1000 }}
          >
            <Button
              title="Clear Cache"
              variant="outline"
              size="lg"
              onPress={handleClearCache}
              style={styles.actionButton}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 1200 }}
          >
            <Button
              title="Reset Settings"
              variant="destructive"
              size="lg"
              onPress={handleResetSettings}
              style={styles.actionButton}
            />
          </MotiView>
        </View>
      </Section>

      {/* App Info */}
      <Section style={styles.infoSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1400 }}
        >
          <Card variant="glass" style={styles.infoCard}>
            <Text style={[styles.infoTitle, { color: theme.colors.foreground }]}>
              App Information
            </Text>
            <View style={styles.infoItems}>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>
                  Version
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>
                  1.0.0
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>
                  Build
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>
                  2024.01.15
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>
                  Platform
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>
                  React Native
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  settingsSection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    marginLeft: 20,
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    minWidth: 60,
  },
  actionsSection: {
    paddingVertical: 20,
  },
  actionsGrid: {
    gap: 16,
  },
  actionButton: {
    marginBottom: 8,
  },
  infoSection: {
    paddingVertical: 20,
  },
  infoCard: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItems: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});
