import { SensorModule } from "@/data/sensor";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

type MapSensorMarkerWrapperProps = {
    sensorModule: SensorModule,
    index: number,
    setPopupInfo: (sensorModule: SensorModule) => void
}

export const MapSensorMarkerWrapper: React.FC<MapSensorMarkerWrapperProps> =({sensorModule, index, setPopupInfo}) => {
  const [MarkerComponent, setMarkerComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    async function loadMarker() {
      if (Platform.OS === 'web') {
        const { default: WebMarker } = await import('./MapSensorMarker.web');
        setMarkerComponent(() => WebMarker(sensorModule, setPopupInfo));
      } else {
        const { default: NativeMarker } = await import('./MapSensorMarker.native');
        setMarkerComponent(() => NativeMarker(sensorModule, index));
      }
    }

    loadMarker();
  }, []);

  if (!MarkerComponent) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <MarkerComponent />
  );
}