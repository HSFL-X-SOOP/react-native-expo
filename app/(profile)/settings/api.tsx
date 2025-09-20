import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Text } from 'react-native-paper';
import { styles } from '../_layout';
export default function ProfileSettingsApiScreen() {
  return (

    <ThemedView style={styles.container}>
      <Link href="/(profile)/profile"><Text>Profile Settings Api</Text></Link>
    </ThemedView>
    
  );
}