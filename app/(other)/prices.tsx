
import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'tamagui';
import { styles } from './_layout';

export default function PricesScreen() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text fontSize="$8" fontWeight="bold" style={styles.largeHeadline}>Preise</Text>
        <Text fontSize="$5" style={styles.textLg}>...</Text>
        </ScrollView>
    </SafeAreaView>
  );
}