import { useSession } from '@/context/SessionContext';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, View as TamaguiView, XStack, YStack, Sheet } from 'tamagui';
import { ChevronDown, Map, Info, Sun, UserCircle } from '@tamagui/lucide-icons';

export function NavbarWeb() {
  const [current, setCurrent] = useState('Home');
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const handlePress = () => setExpanded(!expanded);

  //Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  //ThemeColor
  const [themeMode, setThemeMode] = useState(false);
  const switchThemeMode = () => setThemeMode(!themeMode);
  const {session} = useSession()

  return (
    <View style={{flex: 1}}>
      <XStack style={ styles.navbar }>
        <TamaguiView style={{left: 30}}>
          <Link href="/map">
            <Text fontSize="$6" fontWeight="bold" color="white">Marlin</Text>
          </Link>
        </TamaguiView>
        
        <XStack style={ styles.navs}>

            <Link href="/map">
            <Pressable style={styles.navs}>
              <Map color={'white'} size={20} />
              <Text fontSize={18} color="white">Karte</Text>
            </Pressable>
            </Link>

          <Pressable style={styles.navs} onPress={openMenu}>
            <Info color={'white'} size={20} />
            <Text fontSize={18} color="white">Über uns</Text>
            <ChevronDown color={'white'} size={20} />
          </Pressable>

          <Sheet
            modal
            open={menuOpen}
            onOpenChange={setMenuOpen}
            snapPoints={[25]}
            dismissOnSnapToBottom
          >
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame padding="$4">
              <YStack space="$4">
                <Button onPress={() => {router.push("/about"); closeMenu();}}>
                  <Text>Über uns</Text>
                </Button>
                <Button onPress={() => {router.push("/sensors"); closeMenu();}}>
                  <Text>Sensoren</Text>
                </Button>
                <Button onPress={() => {router.push("/api"); closeMenu();}}>
                  <Text>API</Text>
                </Button>
              </YStack>
            </Sheet.Frame>
          </Sheet>
        </XStack>

        <XStack gap={30} alignItems="center" style={{right: 30}}>
            <Pressable onPress={() => console.log('Pressed')}>
              <Sun color={'$orange10'} size={20} />
            </Pressable>
              {!session && (
              <XStack gap={10}>

                  <Button variant="outlined" onPress={() => console.log('Pressed')}>
                    <Link href="/login">
                      <Text>Anmelden</Text>
                    </Link>
                  </Button>

                  <Button variant="outlined" onPress={() => console.log('Pressed')}>
                    <Link href="/register">
                      <Text>Registrieren</Text>
                    </Link>
                  </Button>
              </XStack>
              )}
              {session && (
              <XStack gap={10}>
                  <Button variant="outlined" onPress={() => console.log('Pressed')}>
                    <Link href="/(profile)/profile">
                      <XStack alignItems="center" gap={10}>
                        <UserCircle size={28} />
                        <Text>Profil</Text>
                      </XStack>
                    </Link>
                  </Button>
              </XStack>
              )}
        </XStack>
      </XStack>

      
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