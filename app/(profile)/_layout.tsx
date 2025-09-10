import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
export default function ProfileLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="profile_settings" options={{ title: "Profile Settings", headerShown: true }} />
    </Stack>
  );
}
