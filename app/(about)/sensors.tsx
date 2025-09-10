import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function SensorsScreen() {
  return (
    <Text>Sensors</Text>
    
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
  },
});