import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function RegisterScreen() {
  return (
        <ThemedView style={styles.titleContainer}>
          <Link href="/(auth)/login"><Text>Login</Text></Link>
        </ThemedView>
    
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 100
  },
});