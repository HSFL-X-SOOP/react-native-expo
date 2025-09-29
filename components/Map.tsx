import { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';

interface MapWrapperProps {
  module1Visible?: boolean;
  module2Visible?: boolean;
  module3Visible?: boolean;
  temperatureVisible?: boolean;
  windDirectionVisible?: boolean;
}

export default function MapWrapper(props: MapWrapperProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<MapWrapperProps> | null>(null);

  useEffect(() => {
    async function loadMap() {
      if (Platform.OS === 'web') {
        const { default: WebMap } = await import('./Map.web');
        setMapComponent(() => WebMap);
      } else {
        const { default: NativeMap } = await import('./Map.web');
        setMapComponent(() => NativeMap);
      }
    }
    loadMap();
  }, []);

  if (!MapComponent) {
    return <Text>Loading map...</Text>;
  }

  return (
    <MapComponent
      module1Visible={props.module1Visible}
      module2Visible={props.module2Visible}
      module3Visible={props.module3Visible}
      temperatureVisible={props.temperatureVisible}
      windDirectionVisible={props.windDirectionVisible}
    />
  );
}