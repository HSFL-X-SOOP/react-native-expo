import { ExternalPathString, Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input, Text, View, YStack, Sheet, XStack } from "tamagui";
import { styles as LayoutStyle } from './_layout';

export default function ProfileScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const [module1Checked, setModule1Checked] = useState(true);
  const [module2Checked, setModule2Checked] = useState(false);
  const [module3Checked, setModule3Checked] = useState(false);
  const [temperatureOverlaychecked, setTemperatureOverlayChecked] = useState(false);
  const [windDirectionchecked, setWindDirectionChecked] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const [value, setValue] = useState('');

  const list = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
  ];

  const menuItems = [
    {id: "menu-item-profile", title: "Profil", icon: "account-circle", color: "black", route: "/(profile)/profile"},
    {id: "menu-item-general", title: "Allgemeine Daten", icon: "information-outline", color: "black", route: "/(profile)/settings/general"},
    {id: "menu-item-boat", title: "Boot", icon: "sail-boat", color: "black", route: "/(profile)/settings/boat"},
    {id: "menu-item-settings", title: "Einstellungen", icon: "account-cog", color: "black", route: "/(profile)/profile_settings"},
    {id: "menu-item-filter-settings", title: "Filtereinstellungen", icon: "filter", color: "black", route: "/(profile)/settings/filter"},
    {id: "menu-item-notification-settings", title: "Alarme & Benachrichtigungen", icon: "bell", color: "black", route: "/(profile)/settings/notifications"},
    {id: "menu-item-devices-and-sensors", title: "Geräte & Sensoren", icon: "cellphone-link", color: "black", route: "/(profile)/settings/devices-and-sensors"},
    {id: "menu-item-profile-api", title: "API-Zugang", icon: "access-point", color: "black", route: "/(profile)/settings/api"},
    {id: "menu-item-profile-support", title: "Feedback & Support", icon: "face-agent", color: "black", route: "/(profile)/profile"},
    {id: "menu-item-profile-kalender", title: "Kalender", icon: "calendar-month", color: "black", route: "/(profile)/profile"},
  ]

  return (
    <View style={LayoutStyle.container}>
      <TouchableOpacity style={styles.button} onPress={openDrawer}>
      </TouchableOpacity>

      <Sheet modal open={drawerVisible} onOpenChange={setDrawerVisible} snapPointsMode="fit">
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" gap="$4">
          <XStack alignItems="center" gap="$2">
            <Pressable onPress={closeDrawer}>
            </Pressable>
            <Text fontSize="$6" fontWeight="bold">Profil</Text>
          </XStack>

          <YStack gap="$3">
            {menuItems.map(menuItem => (
              <Pressable key={menuItem.id} onPress={closeDrawer}>
                <Link href={menuItem.route as ExternalPathString}>
                  <XStack alignItems="center" gap="$3" padding="$2">
                    <Text fontSize="$4">{menuItem.title}</Text>
                  </XStack>
                </Link>
              </Pressable>
            ))}
          </YStack>
        </Sheet.Frame>
      </Sheet>

      <YStack space="$4" padding="$4">
        <Text fontSize="$6" fontWeight="bold">Profile</Text>

        <Input
          placeholder="Dein Name"
          value={name}
          onChangeText={text => setName(text)}
          size="$4"
        />

        <Input
          placeholder="beispiel@domain.de"
          value={email}
          onChangeText={text => setEmail(text)}
          size="$4"
        />

        <Button variant="outlined" size="$4" onPress={() => console.log("")}>
          Speichern
        </Button>
      </YStack>
    </View>
  );
}

type ProfileMenuItemProps = {
    title: string,
    icon: string,
    color: string,
    route: string
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> =({title, icon, color, route}) =>  {
  return(
    <XStack alignItems="center" gap="$2" style={styles.checkboxAndText}>
      <Link href={route as ExternalPathString}>
        <Text>{title}</Text>
      </Link>
    </XStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2c3538ff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    zIndex: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white',
    elevation: 4,
    padding: 16,
    zIndex: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  checkboxAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});