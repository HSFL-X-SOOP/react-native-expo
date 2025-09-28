import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View } from 'tamagui';

export default function MapLayout() {
  return (
    <View style={styles.container} backgroundColor="$background">
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