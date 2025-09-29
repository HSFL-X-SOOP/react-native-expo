import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <View style={styles.container} backgroundColor="$background">
      <Text fontSize="$8" fontWeight="bold">This screen does not exist.</Text>
      <Link href="/" style={styles.link}>
        <Text fontSize="$4" color="$blue10">Go to home screen!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
