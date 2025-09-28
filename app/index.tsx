import MapWrapper from '@/components/Map';
import MapFilterButton from '@/components/map/MapFilterButton';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'tamagui';

export default function HomeScreen() {
  // State für die Map Filter - genau wie im Frontend
  const [temperatureVisible, setTemperatureVisible] = useState(false);
  const [windDirectionVisible, setWindDirectionVisible] = useState(false);
  const [module1Visible, setModule1Visible] = useState(true);
  const [module2Visible, setModule2Visible] = useState(true);
  const [module3Visible, setModule3Visible] = useState(false);

  return (
    <View style={styles.container}>
      <MapWrapper
        module1Visible={module1Visible}
        module2Visible={module2Visible}
        module3Visible={module3Visible}
        temperatureVisible={temperatureVisible}
        windDirectionVisible={windDirectionVisible}
      />

      <MapFilterButton
        module1Visible={module1Visible}
        setModule1Visible={setModule1Visible}
        module2Visible={module2Visible}
        setModule2Visible={setModule2Visible}
        module3Visible={module3Visible}
        setModule3Visible={setModule3Visible}
        temperatureVisible={temperatureVisible}
        setTemperatureVisible={setTemperatureVisible}
        windDirectionVisible={windDirectionVisible}
        setWindDirectionVisible={setWindDirectionVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});