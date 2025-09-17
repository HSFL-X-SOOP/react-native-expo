import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function APIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text variant="headlineLarge" style={styles.largeHeadline}>API</Text>
          <Text>Die Daten werden auch über eine kostenpflichtige API angeboten. Für Zugänge dazu siehe Preise</Text>
        </View>
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Abfragemöglichkeiten</Text>
        <Text>Location: Auswahl des Standorts</Text>
        <Text>Zeit: Auswahl des Zeitpunkts oder Zeitraums</Text>
        <Text>Art der Messung: Auswahl der gewünschten Messgröße (z.B. Temperatur, Wasserstand, etc.)</Text>
        <Text>Besondere Events: Filterung nach Ereignissen wie Stürmen, Sturmfluten etc.</Text>
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Struktur</Text>
        <Text>Hier folgt eine Beschreibung der API-Struktur und Beispielanfragen (bitte ergänzen).</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}