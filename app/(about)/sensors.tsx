import { SafeAreaView, ScrollView } from 'react-native';
import { Text, YStack, Card, H1, H2 } from 'tamagui';

export default function SensorsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} backgroundColor="$content3">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <YStack gap="$6" padding="$4" maxWidth={800} alignSelf="center" paddingTop="$4">

            <YStack gap="$3" alignItems="center" marginBottom="$4">
              <H1 fontSize={36} fontFamily="$oswald" fontWeight="bold" textAlign="center" color="$accent7">
                Sensordaten Erklärung
              </H1>
              <Text fontSize={18} textAlign="center" color="$color" opacity={0.85} maxWidth={600} lineHeight={24}>
                Hier findest du eine einfache Erklärung der wichtigsten Messwerte und
                wie du sie auf unserer Webseite interpretieren kannst.
              </Text>
            </YStack>

            <YStack gap="$5">

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Wassertemperatur</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Die Wassertemperatur zeigt, wie warm oder kalt das Wasser ist.
                  </Text>
                  <YStack gap="$2" paddingLeft="$4" marginTop="$2">
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">0°C</Text> – Gefriert</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">8°C</Text> – Getränk direkt aus dem Kühlschrank</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">10°C</Text> – Neoprenanzug empfohlen</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">20°C</Text> – Angenehm zum Schwimmen (Badehose)</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">38°C</Text> – Heiße Dusche</Text>
                  </YStack>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Wellenhöhe</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Die Wellenhöhe beschreibt, wie hoch die Wasseroberfläche schwappt. Je höher die Welle, desto
                    mehr Kraft steckt dahinter.
                  </Text>
                  <YStack gap="$2" paddingLeft="$4" marginTop="$2">
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">A4-Blatt (kurze Seite)</Text> – Kann ein Kind umhauen</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">A4-Blatt (lange Seite)</Text> – Kann einen Erwachsenen umhauen</Text>
                    <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">Tsunami</Text> – Würde sogar den Eiffelturm umwerfen</Text>
                  </YStack>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Wasserstand</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Der Wasserstand zeigt, wie hoch das Wasser im Vergleich zum Normalwert steht. Ein hoher
                    Wasserstand kann z.B. auf Hochwasser hindeuten.
                  </Text>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Standardabweichung</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Die Standardabweichung gibt an, wie stark die Messwerte schwanken. Eine kleine Abweichung
                    bedeutet, dass die Werte stabil sind. Große Abweichungen zeigen, dass sich die Bedingungen
                    schnell ändern.
                  </Text>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Windgeschwindigkeit</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Die Windgeschwindigkeit zeigt, wie schnell der Wind weht. Starker Wind kann Wellen und
                    Strömungen verstärken.
                  </Text>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Windrichtung</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Die Windrichtung gibt an, aus welcher Richtung der Wind kommt. Sie wird meist als Gradzahl
                    (0° = Norden, 90° = Osten, 180° = Süden, 270° = Westen) angegeben.
                  </Text>
                </YStack>
              </Card>

              <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                <YStack gap="$3">
                  <H2 fontSize={24} fontWeight="600" color="$accent7">Luftdruck</H2>
                  <Text fontSize={16} lineHeight={22} color="$color" opacity={0.9}>
                    Der Luftdruck zeigt, wie schwer die Luft auf die Erde drückt. Ein sinkender Luftdruck kann
                    auf schlechtes Wetter hindeuten, ein steigender auf besseres Wetter.
                  </Text>
                </YStack>
              </Card>

            </YStack>

          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}