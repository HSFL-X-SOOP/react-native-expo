import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function SensorsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text variant="headlineLarge" style={styles.largeHeadline}>Erklärung der Daten und Darstellungen</Text>
          <Text style={styles.textLg}>Hier findest du eine einfache Erklärung der wichtigsten Messwerte und
                          wie du sie auf unserer Webseite interpretieren kannst.</Text>
        </View>
        
        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Wassertemperatur</Text>
          <Text style={styles.textLg}>Die Wassertemperatur zeigt, wie warm oder kalt das Wasser ist.</Text>
          <Text style={styles.textLg}>0°C – Gefriert</Text>
          <Text style={styles.textLg}>8°C – Getränk direkt aus dem Kühlschrank</Text>
          <Text style={styles.textLg}>10°C – Neoprenanzug empfohlenSensoren</Text>
          <Text style={styles.textLg}>20°C – Angenehm zum Schwimmen (Badehose)</Text>
          <Text style={styles.textLg}>38°C – Heiße Dusche</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Wellenhöhe</Text>
          <Text style={styles.textLg}>Die Wellenhöhe beschreibt, wie hoch die Wasseroberfläche schwappt. Je höher die Welle, desto
                                mehr Kraft steckt dahinter.</Text>
          <Text style={styles.textLg}>A4-Blatt (kurze Seite) – Kann ein Kind umhauen</Text>
          <Text style={styles.textLg}>A4-Blatt (lange Seite) – Kann einen Erwachsenen umhauen</Text>
          <Text style={styles.textLg}>Tsunami – Würde sogar den Eiffelturm umwerfen</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Wasserstand</Text>
          <Text style={styles.textLg}>Der Wasserstand zeigt, wie hoch das Wasser im Vergleich zum Normalwert steht. Ein hoher
                                Wasserstand kann z.B. auf Hochwasser hindeuten.</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Standardabweichung</Text>
          <Text style={styles.textLg}>Die Standardabweichung gibt an, wie stark die Messwerte schwanken. Eine kleine Abweichung bedeutet, dass die Werte stabil sind. Große Abweichungen zeigen, 
            dass sich die Bedingungen schnell ändern.</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Windgeschwindigkeit</Text>
          <Text style={styles.textLg}>Die Windgeschwindigkeit zeigt, wie schnell der Wind weht. Starker Wind kann Wellen und
                                Strömungen verstärken.</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Windrichtung</Text>
          <Text style={styles.textLg}>Die Windrichtung gibt an, aus welcher Richtung der Wind kommt. Sie wird meist als Gradzahl
                                (0° = Norden, 90° = Osten, 180° = Süden, 270° = Westen) angegeben.</Text>
        </View>

        <View>
          <Text variant="headlineMedium" style={styles.mediumHeadline}>Luftdruck</Text>
          <Text style={styles.textLg}>Der Luftdruck zeigt, wie schwer die Luft auf die Erde drückt. Ein sinkender Luftdruck kann
                                auf schlechtes Wetter hindeuten, ein steigender auf besseres Wetter.</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
