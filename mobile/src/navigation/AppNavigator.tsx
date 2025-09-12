import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeProvider';
import { TabIcon } from '../components/TabIcon';
import { HomeScreen } from '../screens/HomeScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ProjectDetail: { projectId: string };
};

export type MainTabParamList = {
  Home: undefined;
  About: undefined;
  Projects: undefined;
  Contact: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="home" color={color} size={size} focused={focused} />
        ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="user" color={color} size={size} focused={focused} />
        ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Projects',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="briefcase" color={color} size={size} focused={focused} />
        ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="envelope" color={color} size={size} focused={focused} />
        ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="gear" color={color} size={size} focused={focused} />
        ),
        }}
      />
    </Tab.Navigator>
  );
};


export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: theme.themeMode === 'dark',
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.foreground,
          border: theme.colors.border,
          notification: theme.colors.accent,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetailScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.colors.card,
              borderBottomColor: theme.colors.border,
            },
            headerTintColor: theme.colors.foreground,
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
