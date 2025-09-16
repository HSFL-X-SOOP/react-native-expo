import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Button, Icon, List, MD3Colors, Text } from 'react-native-paper';
export function NavbarWeb() {
  const [current, setCurrent] = useState('Home');
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={ styles.navbar }>
        <View>
          <Link href="/map">
        <Text>Marlin</Text>
          </Link>
        </View>
        
        <View style={ styles.navs}>

            <Link href="/map">
            <Pressable style={styles.navs}>
              <Icon source='map' color={MD3Colors.error50} size={20} />
              <Text style={{ fontSize: 18 }}>Karte</Text>
            </Pressable>
            </Link>

          <List.Section title="">
            <List.Accordion 
              title="About"
              expanded={expanded}
              onPress={handlePress}>
              <List.Item title="Über uns" onPress={ () => {router.push("/about"); handlePress();}} left={props => <List.Icon {...props} icon="info" />}/>
              <List.Item title="Sensoren" onPress={ () => {router.push("/sensors"); handlePress();}} left={props => <List.Icon {...props} icon="info" />}/>
              <List.Item title="API" onPress={ () => {router.push("/api"); handlePress();}} left={props => <List.Icon {...props} icon="cloud" />}/>
            </List.Accordion>
          </List.Section>
        </View>

        <View>
            <Button mode='outlined' onPress={() => console.log('Pressed')}>
              <Link href="/login">
              <Text>Anmelden</Text>
              </Link>
            </Button>
        </View>
      </Appbar.Header>

      
    <Stack screenOptions={{
      headerShown: Platform.OS !== 'web', 
    }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});