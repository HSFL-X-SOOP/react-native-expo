import { ExternalPathString, Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, MD3Colors, Portal, Surface, Text } from "react-native-paper";
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

  const menuItems = [
    {title: "Profil", icon: "information-outline", color: "black", route: "/(profile)/profile"},
    {title: "Allgemeine Daten", icon: "information-outline", color: "black", route: "/(profile)/settings/general"},
    {title: "Boot", icon: "information-outline", color: "black", route: "/(profile)/settings/boat"},
    {title: "Einstellungen", icon: "information-outline", color: "black", route: "/(profile)/profile_settings"},
    {title: "Filtereinstellungen", icon: "information-outline", color: "black", route: "/(profile)/settings/filter"},
    {title: "Alarme & Benachrichtigungen", icon: "information-outline", color: "black", route: "/(profile)/settings/notifications"},
    {title: "Geräte & Sensoren", icon: "information-outline", color: "black", route: "/(profile)/settings/devices-and-sensors"},
    {title: "API-Zugang", icon: "information-outline", color: "black", route: "/(profile)/settings/api"},
    {title: "Feedback & Support", icon: "information-outline", color: "black", route: "/(profile)/profile"},
    {title: "Kalender", icon: "information-outline", color: "black", route: "/(profile)/profile"},
  ]

  return (
    <View style={LayoutStyle.container}>
      <TouchableOpacity style={styles.button} onPress={openDrawer}>
        <Icon source='filter' color={MD3Colors.error50} size={28} />
      </TouchableOpacity>

      <Portal>
        {drawerVisible && (
          <>
            <Pressable style={styles.backdrop} onPress={closeDrawer} />

            <Surface style={styles.drawer}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Button onPress={closeDrawer}>
                  <Icon source='chevron-double-right' color={MD3Colors.error50} size={28} />
                </Button>
                <Text style={styles.drawerTitle}>Profil</Text>
              </View>
              <View>
                {menuItems.map(menuItem => (
                  <View style={styles.checkboxAndText}>
                    <Button>
                      <Link href={menuItem.route as ExternalPathString} onPress={closeDrawer}>
                        <Icon source={menuItem.icon} color={menuItem.color} size={20} />
                        <Text>{menuItem.title}</Text>
                      </Link>
                    </Button>
                  </View>
                ))}
              </View>
              
            </Surface>
          </>
        )}
      </Portal>
      <Link href="/(profile)/profile_settings"><Text>Profile Settings</Text></Link>
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
    <View style={styles.checkboxAndText}>
      <Link href={route as ExternalPathString}>
        <Icon source={icon} color={color} size={20} />
        <Text>{title}</Text>
      </Link>
    </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkboxAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});