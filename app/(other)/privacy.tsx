
import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'tamagui';
import { styles } from './_layout';

export default function PrivacyScreen() {


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text fontSize="$8" fontWeight="bold" style={styles.largeHeadline}>Datenschutz</Text>
        <Text fontSize="$5" style={styles.textLg}>...</Text>
        </ScrollView>
    </SafeAreaView>
  );
}