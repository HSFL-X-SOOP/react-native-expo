import { Link } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text, YStack } from 'tamagui';
import { styles } from './_layout';

export default function APIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <YStack space="$4" padding="$4" maxWidth={800} alignSelf="center">

          <Text fontSize="$9" fontWeight="bold" textAlign="center">API</Text>

          <YStack space="$4">
            <Text fontSize="$5" lineHeight="$1">
              Die Daten werden auch über eine kostenpflichtige API angeboten. Für Zugänge dazu siehe{' '}
              <Link href="/(other)/prices"><Text color="$blue10" textDecorationLine="underline">Preise</Text></Link>.
            </Text>

            <YStack space="$3">
              <Text fontSize="$7" fontWeight="600">Abfragemöglichkeiten</Text>

              <YStack space="$2" paddingLeft="$4">
                <Text fontSize="$4">
                  • <Text fontWeight="600">Location:</Text> Auswahl des Standorts
                </Text>
                <Text fontSize="$4">
                  • <Text fontWeight="600">Zeit:</Text> Auswahl des Zeitpunkts oder Zeitraums
                </Text>
                <Text fontSize="$4">
                  • <Text fontWeight="600">Art der Messung:</Text> Auswahl der gewünschten Messgröße (z.B. Temperatur, Wasserstand, etc.)
                </Text>
                <Text fontSize="$4">
                  • <Text fontWeight="600">Besondere Events:</Text> Filterung nach Ereignissen wie Stürmen, Sturmfluten etc.
                </Text>
              </YStack>
            </YStack>

            <YStack space="$3" marginTop="$4">
              <Text fontSize="$7" fontWeight="600">Struktur</Text>
              <Text fontSize="$4" lineHeight="$1">
                Hier folgt eine Beschreibung der API-Struktur und Beispielanfragen (bitte ergänzen).
              </Text>
            </YStack>
          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}