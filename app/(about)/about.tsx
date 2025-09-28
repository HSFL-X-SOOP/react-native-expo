import { Link } from 'expo-router';
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, XStack, YStack, View } from 'tamagui';
import { styles } from './_layout';

export default function AboutScreen() {
  const mapPath = '/map';
  const dashboardPath = '/dashboard';
  const historicalDataPath = '/vergangene-daten';
  const simpleExplanationPath = '/daten-erklaerung';
  const apiPath = '/api';
  const websitePath = 'https://marlin-live.com/';

  const studentCards = [
      { id: '1', letter: 'D', title: 'Daniel', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '2', letter: 'F', title: 'Fatih', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '3', letter: 'J', title: 'Julian', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '4', letter: 'K', title: 'Krister', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '5', letter: 'T', title: 'Tarek', body: "(Aufgaben, Vorerfahrung, etc.)" },
  ]

  const isWeb = Platform.OS === 'web';
  const numColumns = isWeb ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <YStack space="$4" padding="$4" maxWidth={800} alignSelf="center">

          <Text fontSize="$9" fontWeight="bold" textAlign="center">Über uns</Text>

          <YStack space="$4">
            <Text fontSize="$7" fontWeight="600">Was bietet diese Webseite?</Text>

            <Text fontSize="$4" lineHeight="$1">
              Auf dieser Webseite können aktuelle, lokale Daten zu Wetter und Meeresbedingungen abgerufen werden.
              Die Daten werden von Sensorkits in verschiedenen Marinas erhoben.
            </Text>

            <Text fontSize="$4" lineHeight="$1">
              Auf der <Link href={mapPath}><Text color="$blue10" textDecorationLine="underline">Karte</Text></Link> werden
              alle Sensoren angezeigt, sowie eine Approximation der Werte an den Zwischenstellen ohne eigenen Sensor.
            </Text>

            <Text fontSize="$4" lineHeight="$1">
              Im <Link href={dashboardPath}><Text color="$blue10" textDecorationLine="underline">Dashboard</Text></Link> werden
              die Daten eines Sensors dargestellt und unter{' '}
              <Link href={historicalDataPath}><Text color="$blue10" textDecorationLine="underline">Vergangene Daten</Text></Link>{' '}
              wird die Historie einzelner Werte dargestellt.
            </Text>

            <Text fontSize="$4" lineHeight="$1">
              Zum besseren Verständnis für Laien stellen wir eine{' '}
              <Link href={simpleExplanationPath}><Text color="$blue10" textDecorationLine="underline">einfache Erklärung der Daten</Text></Link>{' '}
              bereit.
            </Text>

            <Text fontSize="$4" lineHeight="$1">
              Außerdem stellen wir eine kostenpflichtige{' '}
              <Link href={apiPath}><Text color="$blue10" textDecorationLine="underline">API</Text></Link>{' '}
              bereit, über die die Daten zur Verfügung gestellt werden.
            </Text>
          </YStack>

          <YStack space="$4" marginTop="$6">
            <Text fontSize="$7" fontWeight="600">Projekt MARLIN</Text>

            <Text fontSize="$4" lineHeight="$1">
              Diese Webseite ist im Rahmen des Masterprojekts{' '}
              <Text fontWeight="bold">MARLIN</Text>{' '}
              (<Link href={websitePath}><Text color="$blue10" textDecorationLine="underline">Projektwebseite</Text></Link>){' '}
              von Studierenden im Master Angewandte Informatik erstellt worden.
            </Text>

            <YStack space="$3" marginTop="$4">
              {studentCards.map(student => (
                <StudentCard
                  key={student.id}
                  letter={student.letter}
                  title={student.title}
                  body={student.body}
                />
              ))}
            </YStack>
          </YStack>

          <YStack space="$4" marginTop="$6">
            <Text fontSize="$7" fontWeight="600">SOOP</Text>
            <Text fontSize="$4" lineHeight="$1">
              Beschreibung von SOOP (hier bitte noch ergänzen, was SOOP ist und warum es für das Projekt relevant ist).
            </Text>
          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

type StudentCardProps = {
    letter: string,
    title: string,
    body: string
}

export const StudentCard: React.FC<StudentCardProps> = ({letter, title, body}) => {
  return(
    <Card padding="$4" backgroundColor="$background025" borderWidth={1} borderColor="$borderColor">
      <XStack alignItems="center" gap="$4">
        <View
          width={64}
          height={64}
          backgroundColor="$blue4"
          borderRadius="$12"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$8" fontWeight="bold" color="$blue11">{letter}</Text>
        </View>
        <YStack flex={1}>
          <Text fontSize="$6" fontWeight="600">{title}</Text>
          <Text fontSize="$3" color="$gray11">{body}</Text>
        </YStack>
      </XStack>
    </Card>
  )
}

const style = StyleSheet.create({
  list: {
    padding: 20,
  },
  row: {
    gap: 20,
    marginBottom: 16,
  }
});