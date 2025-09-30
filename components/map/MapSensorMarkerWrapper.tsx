import { LocationWithBoxes } from "@/data/sensor";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
type MapSensorMarkerWrapperProps = {
    locationWithBoxes: LocationWithBoxes,
    index: number,
    setPopupInfo: (locationWithBoxes: LocationWithBoxes) => void
}

export const MapSensorMarkerWrapper: React.FC<MapSensorMarkerWrapperProps> =({locationWithBoxes, index, setPopupInfo}) => {
  const [MarkerComponent, setMarkerComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    async function loadMarker() {
      if (Platform.OS === 'web') {
        const { default: WebMarker } = await import('./MapSensorMarker.web');
        setMarkerComponent(() => WebMarker(locationWithBoxes, setPopupInfo));
      } else {
        const { default: NativeMarker } = await import('./MapSensorMarker.native');
        setMarkerComponent(() => NativeMarker(locationWithBoxes, index));
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