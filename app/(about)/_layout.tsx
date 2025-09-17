import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack screenOptions={{
        headerShown: Platform.OS !== 'web', 
      }}/>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3538ff', 
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
});