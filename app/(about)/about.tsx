import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './_layout';
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
            <Text>Sensoren</Text>
        </Link>
    </SafeAreaView>
    
  );
}
