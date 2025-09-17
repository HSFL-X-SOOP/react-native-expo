import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={style.container}>

      <Text style={{fontSize: 28}}>Login</Text>
      <Link href="/(auth)/register"><Text>Register</Text></Link>
      </View>
    </View>
    
  );
}

export const style = StyleSheet.create({
  container: {
    height: 800,
    width: 600,
    backgroundColor: '#2c3538ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20
  },
});