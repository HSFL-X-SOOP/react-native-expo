import { Link } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'tamagui';
import { styles } from './_layout';
export default function APIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text fontSize="$8" fontWeight="bold" style={styles.largeHeadline}>API</Text>
        <Text fontSize="$5" style={styles.textLg}>Die Daten werden auch über eine kostenpflichtige API angeboten. Für Zugänge dazu siehe <Link href="/(other)/prices"><Text style={styles.link}>Preise</Text></Link>.</Text>
        <Text fontSize="$6" fontWeight="bold" style={styles.mediumHeadline}>Abfragemöglichkeiten</Text>
        <Text fontSize="$5" style={styles.textLg}>Location: Auswahl des Standorts</Text>
        <Text fontSize="$5" style={styles.textLg}>Zeit: Auswahl des Zeitpunkts oder Zeitraums</Text>
        <Text fontSize="$5" style={styles.textLg}>Art der Messung: Auswahl der gewünschten Messgröße (z.B. Temperatur, Wasserstand, etc.)</Text>
        <Text fontSize="$5" style={styles.textLg}>Besondere Events: Filterung nach Ereignissen wie Stürmen, Sturmfluten etc.</Text>
        <Text fontSize="$6" fontWeight="bold" style={styles.mediumHeadline}>Struktur</Text>
        <Text fontSize="$5" style={styles.textLg}>Hier folgt eine Beschreibung der API-Struktur und Beispielanfragen (bitte ergänzen).</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}