import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
export default function AboutScreen() {
  return (
    <View>
        {/* <Link href="/(about)/about">
            <Text>About</Text>
        </Link> */}
        <Link href="/(about)/api">
            <Text>API</Text>
        </Link>
        <Link href="/(about)/sensors">
            <Text>Sensors</Text>
        </Link>
    </View>
    
  );
}