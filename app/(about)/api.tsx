import { Link } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text, YStack, Card, H1, H2, XStack, View, Button } from 'tamagui';
import { Code, Database, Key, Zap } from '@tamagui/lucide-icons';

export default function APIScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} backgroundColor="$content3">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <YStack gap="$6" padding="$4" maxWidth={900} alignSelf="center" paddingTop="$4">

            <YStack gap="$3" alignItems="center" marginBottom="$4">
              <H1 fontSize={36} fontFamily="$oswald" fontWeight="bold" textAlign="center" color="$accent7">
                MARLIN API
              </H1>
              <Text fontSize={18} textAlign="center" color="$color" opacity={0.85} maxWidth={600} lineHeight={24}>
                Programmtische Zugriff auf alle Sensordaten über unsere RESTful API
              </Text>
            </YStack>

            <Card padding="$6" backgroundColor="$accent1" borderRadius="$6" borderWidth={1} borderColor="$accent6">
              <XStack alignItems="center" gap="$4">
                <View
                  width={60}
                  height={60}
                  backgroundColor="$accent7"
                  borderRadius="$10"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Key size={32} color="white" />
                </View>
                <YStack flex={1} gap="$2">
                  <Text fontSize={18} fontWeight="600" color="$accent8">
                    API-Zugang erforderlich
                  </Text>
                  <Text fontSize={15} color="$color" opacity={0.9}>
                    Die Daten werden über eine kostenpflichtige API angeboten.
                  </Text>
                  <Link href="/(other)/prices">
                    <Text color="$accent8" textDecorationLine="underline" fontWeight="600">
                      Preise und Zugänge →
                    </Text>
                  </Link>
                </YStack>
              </XStack>
            </Card>

            <YStack gap="$5">
              <H2 fontSize={28} fontFamily="$oswald" fontWeight="600" textAlign="center" color="$accent7">
                API Features
              </H2>

              <YStack gap="$4">
                <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="flex-start" gap="$4">
                    <View
                      width={56}
                      height={56}
                      backgroundColor="$accent2"
                      borderRadius="$10"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Database size={28} color="$accent7" />
                    </View>
                    <YStack flex={1} gap="$3">
                      <H2 fontSize={20} fontWeight="600" color="$accent7">Flexible Datenabfrage</H2>
                      <YStack gap="$2">
                        <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">Standort:</Text> Auswahl spezifischer Marinas</Text>
                        <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">Zeitraum:</Text> Historische und Echtzeitdaten</Text>
                        <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">Messgrößen:</Text> Temperatur, Wasserstand, Wind, etc.</Text>
                        <Text fontSize={15} color="$color">• <Text fontWeight="600" color="$accent8">Events:</Text> Filterung nach Wetterereignissen</Text>
                      </YStack>
                    </YStack>
                  </XStack>
                </Card>

                <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="flex-start" gap="$4">
                    <View
                      width={56}
                      height={56}
                      backgroundColor="$accent2"
                      borderRadius="$10"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Code size={28} color="$accent7" />
                    </View>
                    <YStack flex={1} gap="$3">
                      <H2 fontSize={20} fontWeight="600" color="$accent7">RESTful Interface</H2>
                      <Text fontSize={16} color="$color" opacity={0.9} lineHeight={22}>
                        Standard HTTP-Methoden mit JSON-Responses. Vollständige Dokumentation
                        mit Beispielen und Authentifizierung verfügbar.
                      </Text>
                    </YStack>
                  </XStack>
                </Card>

                <Card padding="$5" backgroundColor="$content1" borderRadius="$6" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="flex-start" gap="$4">
                    <View
                      width={56}
                      height={56}
                      backgroundColor="$accent2"
                      borderRadius="$10"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Zap size={28} color="$accent7" />
                    </View>
                    <YStack flex={1} gap="$3">
                      <H2 fontSize={20} fontWeight="600" color="$accent7">Echtzeitdaten</H2>
                      <Text fontSize={16} color="$color" opacity={0.9} lineHeight={22}>
                        Live-Streaming von Sensordaten mit WebSocket-Unterstützung
                        für kontinuierliche Updates.
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              </YStack>
            </YStack>

            <Card
              padding="$6"
              backgroundColor="$content1"
              borderRadius="$6"
              borderWidth={1}
              borderColor="$borderColor"
              marginTop="$4"
              alignItems="center"
            >
              <YStack gap="$4" alignItems="center">
                <H2 fontSize={24} fontWeight="600" color="$accent7" textAlign="center">
                  Bereit für den API-Zugang?
                </H2>
                <Text fontSize={16} textAlign="center" color="$color" opacity={0.9} maxWidth={500}>
                  Kontaktieren Sie uns für detaillierte API-Dokumentation und Pricing-Informationen.
                </Text>
                <Link href="/(other)/prices">
                  <Button backgroundColor="$accent7" color="white" borderRadius="$6" paddingHorizontal="$6" paddingVertical="$4" hoverStyle={{ backgroundColor: "$accent8" }}>
                    <Text color="white" fontWeight="600" fontSize={16}>Preise ansehen</Text>
                  </Button>
                </Link>
              </YStack>
            </Card>

          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}