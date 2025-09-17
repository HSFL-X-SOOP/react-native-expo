import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function ProfileSettingsScreen() {
  return (

    <ThemedView style={styles.container}>
      <Link href="/(profile)/profile"><Text>Profile</Text></Link>
    </ThemedView>
    
  );
}
