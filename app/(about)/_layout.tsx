import React from 'react';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function AboutLayout() {
  return <Slot />;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2c3538ff', 
    alignItems: 'center',
    padding: 20
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