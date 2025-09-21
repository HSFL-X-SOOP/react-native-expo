import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
export default function ProfileSettingsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{
      headerShown: false, 
    }}>
      <Stack.Screen name='profile' options={{title: 'Profil', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='general' options={{title: 'Allgemeine Daten', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='boat' options={{title: 'Boot', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='profile_settings' options={{title: 'Profileinstellungen', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='filter' options={{title: 'Filtereinstellungen', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='notifications' options={{title: 'Alarme & Benachrichtigung', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='devices-and-sensors' options={{title: 'Geräte & Sensoren', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='api' options={{title: 'API-Zugang', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='feedback-and-support' options={{title: 'Feedback & Support', headerShown: Platform.OS !== 'web'}}/>
    </Stack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3538ff',
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
});