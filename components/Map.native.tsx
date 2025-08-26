import { GetGeomarData } from "@/data/geomar-data";
import { SensorModule } from "@/data/sensor";
import { Camera, MapView } from "@maplibre/maplibre-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AndroidMarker from "./map/MapSensorMarker.native";
import { ThemedText } from "./ThemedText";
export default function AndroidMap() {
    const [content, setContent] = useState<SensorModule[]>([])
    useEffect(() => {
      const fetchData = async () => {
        let data = await GetGeomarData()
        setContent(data)
    }
    fetchData()
  }, [])

  const pins =
  content.map((sensorModule:SensorModule, index) => (
    AndroidMarker(sensorModule, index)
  ))


  return (
    <View style={styles.titleContainer}>
      <MapView style={{ flex: 1, height: 800}} 
      // mapStyle="https://tiles.openfreemap.org/styles/positron"
      mapStyle={require('../assets/images/style.json')}
      >
      <Camera zoomLevel={7} centerCoordinate={[9.26, 54.47926]}/>
      {pins}
      </MapView>
      <ThemedText type="title"></ThemedText>
    </View>
  )
    
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    height: 100,
    width: 100,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});