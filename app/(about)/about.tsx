import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
        {/* <Link href="/(about)/about">
            <Text>About</Text>
        </Link> */}
        <Link href="/(about)/api">
            <Text>API</Text>
        </Link>
        <Link href="/(about)/sensors">
            <Text>Sensors</Text>
        </Link>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the view expand to fill the parent
    alignItems: 'center',     // Optional: center content horizontally
    backgroundColor: '#242020ff'
  },
});