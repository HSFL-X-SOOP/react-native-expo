import { useSession } from '@/context/SessionContext';
import '@/i18n/i18n';
import i18n from '@/i18n/i18n';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Button, Icon, MD3Colors, Menu, Text } from 'react-native-paper';
export function NavbarWeb() {
  //Internationalization
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const [current, setCurrent] = useState('Home');
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const handlePress = () => setExpanded(!expanded);

  //Menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //LanguageMenu
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const openLanguageMenu = () => setLanguageMenuVisible(true);
  const closeLanguageMenu = () => setLanguageMenuVisible(false);

  //ThemeColor
  const [themeMode, setThemeMode] = useState(false);
  const switchThemeMode = () => setThemeMode(!themeMode);
  const {session} = useSession()

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={ styles.navbar }>
        <View style={{left: 30}}>
          <Link href="/map">
            <Text>Marlin</Text>
          </Link>
        </View>
        
        <View style={ styles.navs}>

            <Link href="/map">
            <Pressable style={styles.navs}>
              <Icon source='map-outline' color={'white'} size={20} />
              <Text style={{ fontSize: 18 }}>{t('__section')}</Text>
            </Pressable>
            </Link>

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
            <Pressable style={styles.navs} onPress={openMenu}>
              <Icon source='information-outline' color={'white'} size={20} />
              <Text style={{ fontSize: 18 }}>Über uns</Text>
              <Icon source='chevron-down' color={'white'} size={20} />
            </Pressable>
            }
          >
            <Menu.Item title="Über uns" onPress={ () => {router.push("/about"); closeMenu();}} />
            <Menu.Item title="Sensoren" onPress={ () => {router.push("/sensors"); closeMenu();}}/>
            <Menu.Item title="API" onPress={ () => {router.push("/api"); closeMenu();}} />
          </Menu>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center', right: 30}}>
            <Pressable onPress={() => console.log('Pressed')}>
              <Icon source='white-balance-sunny' color={MD3Colors.error50} size={20} />
            </Pressable>
            <Menu
              visible={languageMenuVisible}
              onDismiss={closeLanguageMenu}
              anchor={
              <Pressable style={styles.navs} onPress={openLanguageMenu}>
                <Text style={{ fontSize: 18 }}>{currentLanguage === 'de' ? 'DE' : 'EN'}</Text>
                <Icon source='chevron-down' color={'white'} size={20} />
              </Pressable>
              }
            >
              <Menu.Item title="DE" onPress={ () => {i18n.changeLanguage('de'); closeLanguageMenu();}}/>
              <Menu.Item title="EN" onPress={ () => {i18n.changeLanguage('en'); closeLanguageMenu();}}/>
          </Menu>
              {!session && (
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>

                  <Button mode='outlined' onPress={() => console.log('Pressed')}>
                    <Link href="/login">
                      <Text>Anmelden</Text>
                    </Link>
                  </Button>

                  <Button mode='outlined' onPress={() => console.log('Pressed')}>
                    <Link href="/register">
                      <Text>Registrieren</Text>
                    </Link>
                  </Button>
              </View>
              )}
              {session && (
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                  <Button mode='outlined' onPress={() => console.log('Pressed')}>
                    <Link href="/(profile)/profile" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                      <Icon source="account-circle" size={28}></Icon>
                      <Text>Profil</Text>
                    </Link>
                  </Button>
              </View>
              )}

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
    justifyContent: 'space-between',
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