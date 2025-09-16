import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
export default function LoginScreen() {
  return (
        <View style={styles.container}>
          <Text>Login</Text>
          <Link href="/(auth)/register"><Text>Register</Text></Link>
        </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the view expand to fill the parent
    justifyContent: 'center', // Optional: center content vertically
    alignItems: 'center',     // Optional: center content horizontally
    backgroundColor: '#242020ff',
  },
});