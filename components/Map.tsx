import { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';

export default function MapWrapper() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

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
            <MapComponent />
  );
}