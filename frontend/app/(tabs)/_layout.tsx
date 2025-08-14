/**
 * @file Defines bottom tab navigator and tabs/screens inside it. configures tab bar appearance. 
 */

import { Tabs } from 'expo-router';
import React from 'react';
//import { Platform } from 'react-native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
//import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
//import TabBarBackground from '@/components/ui/TabBarBackground';
//import { Colors } from '@/constants/Colors';
//import { StatusBar } from 'expo-status-bar';

// call the colour schemes I defined separately
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const activeTint = useThemeColor({}, 'tint');       // alias to primary in Colors
  const inactiveTint = useThemeColor({}, 'muted');    // muted text color
  const tabBackground = useThemeColor({}, 'background');
  const tabBorder = useThemeColor({}, 'border');


  // define route and tab icons 
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: activeTint,
          tabBarInactiveTintColor: inactiveTint,
          tabBarStyle: {
            backgroundColor: tabBackground,
            borderTopColor: tabBorder,
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        {/* Recipes Tab */}
        <Tabs.Screen
          name="recipes"
          options={{
            title: 'Recipes',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="book.fill" color={color} />
            ),
          }}
        />

        {/* Camera Tab */}
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="camera.fill" color={color} />
            ),
          }}
        />

        {/* Meal Post Tab */}
        <Tabs.Screen
          name="meals"
          options={{
            title: 'Meals',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="fork.knife.circle.fill" color={color} />
            ),
          }}
        />

        {/* Fridge Tab */}
        <Tabs.Screen
          name="fridge"
          options={{
            title: 'Fridge',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="cube.fill" color={color} />
            ),
          }}
        />        
      </Tabs>
    </>
  );
}
