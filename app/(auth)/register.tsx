import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function RegisterScreen() {
  return (
      <ThemedView style={styles.container}>
        <Link href="/(auth)/login"><Text>Login</Text></Link>
      </ThemedView>
  );
}