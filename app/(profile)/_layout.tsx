import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
export default function ProfileLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{
      headerShown: Platform.OS !== 'web', 
    }}/>
  );
}
