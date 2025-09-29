import React from 'react';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProfileLayout() {
  return <Slot />;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3538ff',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
});