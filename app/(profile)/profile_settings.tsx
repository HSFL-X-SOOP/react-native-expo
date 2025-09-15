import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function ProfileSettingsScreen() {
  return (

    <ThemedView style={styles.titleContainer}>
      <Link href="/(profile)/profile"><Text>Profile</Text></Link>
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
    flexDirection: 'row',
    gap: 8,
    marginTop: 100
  },
});