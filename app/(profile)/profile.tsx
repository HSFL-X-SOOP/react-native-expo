import { ExternalPathString, Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors, Portal, Surface, Text } from "react-native-paper";
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
        <Icon source='cog' color={MD3Colors.error50} size={28} />
      </TouchableOpacity>

      <Portal>
        {drawerVisible && (
          <>
            <Pressable style={styles.backdrop} onPress={closeDrawer} />

            <Surface style={styles.drawer}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable onPress={closeDrawer}>
                  <Icon source='chevron-double-right' color={'black'} size={28} />
                </Pressable>
                <Text style={styles.drawerTitle}>Profil</Text>
              </View>
              <View>
                {menuItems.map(menuItem => (
                    <Pressable style={{marginBottom: 10}} key={menuItem.id}>
                      <Link href={menuItem.route as ExternalPathString} onPress={closeDrawer}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                          <Icon source={menuItem.icon} color={menuItem.color} size={28} />
                          <Text style={{fontSize: 18, color: 'black'}}>{menuItem.title}</Text>
                        </View>
                      </Link>
                    </Pressable>
                ))}
              </View>
              
            </Surface>
          </>
        )}
      </Portal>
      <Text>Profile Settings</Text>
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