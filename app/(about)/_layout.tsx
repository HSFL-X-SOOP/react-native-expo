import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{
      headerShown: Platform.OS !== 'web', 
    }}>
      <Stack.Screen name='about' options={{title: 'Über uns', headerShown: Platform.OS !== 'web' }}/>
      <Stack.Screen name='sensors' options={{title: 'Sensoren', headerShown: Platform.OS !== 'web'}}/>
      <Stack.Screen name='api' options={{title: 'API', headerShown: Platform.OS !== 'web'}}/>
    </Stack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2c3538ff', 
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  largeHeadline: {
    fontWeight: 'bold', 
    marginTop: 30
  },
  mediumHeadline: {
    fontWeight: 'bold', 
    marginBottom: 8,
    marginTop: 20
  },
  textLg: {
    fontSize: 17,
    marginBottom: 16
  },
  scrollView: {
    maxWidth: 768
  },
  link: {
    color: 'green',
    fontStyle: 'italic'
  }
});