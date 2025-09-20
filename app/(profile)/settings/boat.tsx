import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Text } from 'react-native-paper';
import { styles } from '../_layout';
export default function ProfileSettingsBoatScreen() {
  return (

    <ThemedView style={styles.container}>
      <Link href="/(profile)/profile"><Text>Profile Settings Boat</Text></Link>
    </ThemedView>
    
  );
}