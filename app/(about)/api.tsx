import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
export default function APIScreen() {
  return (
    <View style={styles.container}>
      <Text>API</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the view expand to fill the parent
    alignItems: 'center',     // Optional: center content horizontally
    backgroundColor: '#242020ff'
  },
});