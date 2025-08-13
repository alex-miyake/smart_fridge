/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    background: '#FFFFFF',        // main background (white)
    surface: '#FAFBFC',           // cards / surfaces (slightly off-white)
    card: '#FFFFFF',              // card background
    text: '#0B1726',              // primary text 
    muted: '#6B7280',             // secondary text / meta
    border: '#E6E9EE',            // subtle borders
    primary: '#2DBE6B',           // green (health) - used for success / highlights
    info: '#2F80ED',              // blue (fridge vibe) - info / links / icons
    accent: '#FF8C42',            // orange - food accent?
    ripple: 'rgba(45,190,107,0.08)', // subtle green tint for pill backgrounds
    shadow: 'rgba(16,24,40,0.06)',
    tint: '#2DBE6B',      // alias for active tab highlight
  },
  dark: {
    background: '#0B1220',        // dark background
    surface: '#0F1724',           // surfaces
    card: '#0B1724',
    text: '#E6EEF6',
    muted: '#9AA4B2',
    border: '#132033',
    primary: '#31C77A',           // slightly brighter green in dark
    info: '#4DA3FF',              // brighter blue in dark
    accent: '#FFB07A',            // softened orange
    ripple: 'rgba(49,199,122,0.08)',
    shadow: 'rgba(0,0,0,0.6)',
    tint: '#31C77A',
  },
} as const;

export type ThemeName = keyof typeof Colors;
export default Colors;