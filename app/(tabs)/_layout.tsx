import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dice',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'dice.fill' : 'dice'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="number-generator"
        options={{
          title: 'Numbers',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'number.circle.fill' : 'number.circle'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="name-picker"
        options={{
          title: 'Names',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'person.2.fill' : 'person.2'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spinner"
        options={{
          title: 'Spinner',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'arrow.triangle.2.circlepath' : 'arrow.triangle.2.circlepath'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'gearshape.fill' : 'gearshape'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
