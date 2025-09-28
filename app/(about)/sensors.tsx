import { SafeAreaView, ScrollView } from 'react-native';
import { Text, YStack } from 'tamagui';
import { styles } from './_layout';

export default function SensorsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <YStack space="$4" padding="$4" maxWidth={800} alignSelf="center">

          <Text fontSize="$9" fontWeight="bold" textAlign="center">Erklärung der Daten und Darstellungen</Text>

          <Text fontSize="$5" lineHeight="$1" textAlign="center" color="$gray11">
            Hier findest du eine einfache Erklärung der wichtigsten Messwerte und
            wie du sie auf unserer Webseite interpretieren kannst.
          </Text>

          <YStack space="$6" marginTop="$4">

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Wassertemperatur</Text>
              <Text fontSize="$4" lineHeight="$1">
                Die Wassertemperatur zeigt, wie warm oder kalt das Wasser ist.
              </Text>
              <YStack space="$1" paddingLeft="$4">
                <Text fontSize="$4">• <Text fontWeight="600">0°C</Text> – Gefriert</Text>
                <Text fontSize="$4">• <Text fontWeight="600">8°C</Text> – Getränk direkt aus dem Kühlschrank</Text>
                <Text fontSize="$4">• <Text fontWeight="600">10°C</Text> – Neoprenanzug empfohlen</Text>
                <Text fontSize="$4">• <Text fontWeight="600">20°C</Text> – Angenehm zum Schwimmen (Badehose)</Text>
                <Text fontSize="$4">• <Text fontWeight="600">38°C</Text> – Heiße Dusche</Text>
              </YStack>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Wellenhöhe</Text>
              <Text fontSize="$4" lineHeight="$1">
                Die Wellenhöhe beschreibt, wie hoch die Wasseroberfläche schwappt. Je höher die Welle, desto
                mehr Kraft steckt dahinter.
              </Text>
              <YStack space="$1" paddingLeft="$4">
                <Text fontSize="$4">• <Text fontWeight="600">A4-Blatt (kurze Seite)</Text> – Kann ein Kind umhauen</Text>
                <Text fontSize="$4">• <Text fontWeight="600">A4-Blatt (lange Seite)</Text> – Kann einen Erwachsenen umhauen</Text>
                <Text fontSize="$4">• <Text fontWeight="600">Tsunami</Text> – Würde sogar den Eiffelturm umwerfen</Text>
              </YStack>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Wasserstand</Text>
              <Text fontSize="$4" lineHeight="$1">
                Der Wasserstand zeigt, wie hoch das Wasser im Vergleich zum Normalwert steht. Ein hoher
                Wasserstand kann z.B. auf Hochwasser hindeuten.
              </Text>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Standardabweichung</Text>
              <Text fontSize="$4" lineHeight="$1">
                Die Standardabweichung gibt an, wie stark die Messwerte schwanken. Eine kleine Abweichung
                bedeutet, dass die Werte stabil sind. Große Abweichungen zeigen, dass sich die Bedingungen
                schnell ändern.
              </Text>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Windgeschwindigkeit</Text>
              <Text fontSize="$4" lineHeight="$1">
                Die Windgeschwindigkeit zeigt, wie schnell der Wind weht. Starker Wind kann Wellen und
                Strömungen verstärken.
              </Text>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Windrichtung</Text>
              <Text fontSize="$4" lineHeight="$1">
                Die Windrichtung gibt an, aus welcher Richtung der Wind kommt. Sie wird meist als Gradzahl
                (0° = Norden, 90° = Osten, 180° = Süden, 270° = Westen) angegeben.
              </Text>
            </YStack>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Luftdruck</Text>
              <Text fontSize="$4" lineHeight="$1">
                Der Luftdruck zeigt, wie schwer die Luft auf die Erde drückt. Ein sinkender Luftdruck kann
                auf schlechtes Wetter hindeuten, ein steigender auf besseres Wetter.
              </Text>
            </YStack>

          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}