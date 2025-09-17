import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function ProfileScreen() {
  const [current, setCurrent] = useState('Home');

  return (
    <View style={styles.container}>

      <Link href="/(profile)/profile_settings"><Text>Profile Settings</Text></Link>
    </View>
  );
}