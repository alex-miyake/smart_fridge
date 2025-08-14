/**
 * @file Loads custom font and creates themes to wrap the app navigation. 
 */

import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

// 
export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  // load custom font
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  if (!loaded) return null;

  // builds 2 themes, using the colours defined in Colors.ts
  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.light.background,
      surface: Colors.light.surface,
      card: Colors.light.card,
      text: Colors.light.text,
      muted: Colors.light.muted,    
      border: Colors.light.border,
      primary: Colors.light.tint, // active colour  
      info: Colors.light.info,
      accent: Colors.light.accent,
      ripple: Colors.light.ripple,
      shadow: Colors.light.shadow,
      tint: Colors.light.tint,
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
      card: Colors.dark.card,
      text: Colors.dark.text,
      muted: Colors.dark.muted,
      border: Colors.dark.border,
      primary: Colors.dark.tint,
      info: Colors.dark.info,
      accent: Colors.dark.accent,
      ripple: Colors.dark.ripple,
      shadow: Colors.dark.shadow,
      tint: Colors.dark.tint,
    },
  };

  return (
    // wraps everything in theme
    <ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/addItem"
          options={{ presentation: 'modal', title: 'Add item' }}
        />
      </Stack>

      {/* StatusBar uses the opposite style name you pass: 'dark' => dark text/icons (for light background) */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}