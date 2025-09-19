import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function APIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineLarge" style={styles.largeHeadline}>API</Text>
        <Text style={styles.textLg}>Die Daten werden auch über eine kostenpflichtige API angeboten. Für Zugänge dazu siehe Preise</Text>
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Abfragemöglichkeiten</Text>
        <Text style={styles.textLg}>Location: Auswahl des Standorts</Text>
        <Text style={styles.textLg}>Zeit: Auswahl des Zeitpunkts oder Zeitraums</Text>
        <Text style={styles.textLg}>Art der Messung: Auswahl der gewünschten Messgröße (z.B. Temperatur, Wasserstand, etc.)</Text>
        <Text style={styles.textLg}>Besondere Events: Filterung nach Ereignissen wie Stürmen, Sturmfluten etc.</Text>
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Struktur</Text>
        <Text style={styles.textLg}>Hier folgt eine Beschreibung der API-Struktur und Beispielanfragen (bitte ergänzen).</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}