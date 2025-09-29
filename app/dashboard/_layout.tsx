import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{
        headerShown: Platform.OS !== 'web', 
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the whole screen
    backgroundColor: '#2c3538ff', // Light blue background
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
});