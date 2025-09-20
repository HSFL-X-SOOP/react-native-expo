import { TabBarNative } from '@/components/navigation/native/tabbar';
import { NavbarWeb } from '@/components/navigation/web/navbar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
export default function RootLayout() {
  const colorScheme = useColorScheme();
    const [current, setCurrent] = useState('Home');
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider>
      {Platform.OS === 'web' ? <NavbarWeb /> : <TabBarNative />}
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};