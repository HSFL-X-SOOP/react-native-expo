import MapWrapper from '@/components/Map';
import { StyleSheet } from 'react-native';
export default function RegisterScreen() {
  return (
    <MapWrapper />    
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