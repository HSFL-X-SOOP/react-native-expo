import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="about" options={{ title: "About", headerShown: true }} />
        <Stack.Screen name="api" options={{ title: "API", headerShown: true }} />
        <Stack.Screen name="sensors" options={{ title: "Sensors", headerShown: true }} />
    </Stack>
  );
}
