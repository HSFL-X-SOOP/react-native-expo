import { Link } from 'expo-router';
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Icon, MD3Colors, Text } from 'react-native-paper';
import { styles } from './_layout';

export default function AboutScreen() {
  const mapPath = '/';
  const dashboardPath = '/';
  const historicalDataPath = '/';
  const simpleExplanationPath = '/';
  const apiPath = '/';
  const websitePath = 'https://marlin-live.com/';

  const studentCards = [
      { id: '1', icon: "alpha-d-circle", title: 'Daniel', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '2', icon: "alpha-f-circle", title: 'Fatih', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '3', icon: "alpha-j-circle", title: 'Julian', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '4', icon: "alpha-k-circle", title: 'Krister', body: "(Aufgaben, Vorerfahrung, etc.)" },
      { id: '5', icon: "alpha-t-circle", title: 'Tarek', body: "(Aufgaben, Vorerfahrung, etc.)" },
  ]

  const isWeb = Platform.OS === 'web';
  const numColumns = isWeb ? 2 : 1;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineLarge" style={styles.largeHeadline}>Über uns</Text>
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Was bietet diese Webseite?</Text>
        <Text style={styles.textLg}>Auf dieser Webseite können aktuelle, lokale Daten zu Wetter und Meeresbedingungen abgerufen werden. Die Daten werden von Sensorkits in verschiedenen Marinas erhoben.</Text>
        <Text style={styles.textLg}>Auf der <Link href={mapPath}><Text style={style.link}>Karte</Text></Link> werden alle Sensoren angezeigt, sowie eine Approximation der Werte an den Zwischenstellen ohne eigenen Sensor.</Text>
        <Text style={styles.textLg}>Im <Link href={dashboardPath}><Text>Dashboard</Text></Link> werden die Daten eines Sensors dargestellt und unter <Link href={historicalDataPath}><Text>Vergangene Daten</Text></Link> wird die Historie einzelner Werte dargestellt.</Text>
        <Text style={styles.textLg}>Zum besseren Verständnis für Laien stellen wir eine <Link href={simpleExplanationPath}><Text>einfache Erklärung der Daten</Text></Link> bereit.</Text>
        <Text style={styles.textLg}>Außerdem stellen wir eine kostenpflichtige <Link href={apiPath}><Text>API</Text></Link> bereit, über die die Daten zur Verfügung gestellt werden.</Text>
        
        <Text variant="headlineMedium" style={styles.mediumHeadline}>Projekt MARLIN</Text>
        <Text style={styles.textLg}>Diese Webseite ist im Rahmen des Masterprojekts <Link href={websitePath}><Text>MARLIN</Text></Link> von Studierenden im Master Angewandte Informatik erstellt worden.</Text>

        <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
          <FlatList
            data={studentCards}
            numColumns={numColumns}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StudentCard icon={item.icon} title={item.title} body={item.body}/>}
            columnWrapperStyle={isWeb ? style.row : null}
            contentContainerStyle={style.list}
            />
        </View>


        <Text variant="headlineMedium" style={styles.mediumHeadline}>SOOP</Text>
        <Text style={styles.textLg}>Beschreibung von SOOP (hier bitte noch ergänzen, was SOOP ist und warum es für das Projekt relevant ist).</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const style = StyleSheet.create({
  list: {
    padding: 20,
  },
  row: {
    gap: 20,
    marginBottom: 8 * 2,
  },
  link: {
    color: 'green'
  },
});

type StudentCardProps = {
    icon: string,
    title: string,
    body: string
}

export const StudentCard: React.FC<StudentCardProps> =({icon, title, body}) =>  {

  return(
    <Card>
      <Card.Content>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Icon source={icon} color={MD3Colors.error50} size={75}/>
          <View>
            <Text variant="titleLarge">{title}</Text>
            <Text variant="bodyMedium">{body}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}
