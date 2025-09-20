import { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function PricesScreen() {
  const [current, setCurrent] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text variant="headlineLarge" style={styles.largeHeadline}>Preise</Text>
        <Text style={styles.textLg}>...</Text>
        </ScrollView>
    </SafeAreaView>
  );
}