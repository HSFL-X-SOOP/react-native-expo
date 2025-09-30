import { GetGeomarData } from "@/data/geomar-data";
import { SensorModule } from "@/data/sensor";
import { Camera, MapView } from "@maplibre/maplibre-react-native";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import AndroidMarker from "./map/MapSensorMarker.native";
import MapZoomControl from "./map/MapZoomControl";

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

  const [zoomLevel, setZoomLevel] = useState(7);
  const homeCoordinate: [number, number] = [9.26, 54.47926];
  const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);
  const mapBoundariesLongLat = {
    ne: [49.869301, 71.185001],
    sw: [-31.266001, 27.560001]
  }
  const minMaxZoomLevel = { min: 3, max: 16 };

  const mapRef = useRef<any>(null);

  return (
    <View style={{flex: 1}}>
      <MapView style={{ flex: 1}} 
      // mapStyle="https://tiles.openfreemap.org/styles/positron"
      mapStyle={require('../assets/images/style.json')}
      compassEnabled={true}
      zoomEnabled={true}
      onRegionDidChange={(region: any) => {
        setCurrentCoordinate(region.centerCoordinate);
      }}

      >
      <Camera
      zoomLevel={zoomLevel}
      centerCoordinate={currentCoordinate}
      maxZoomLevel={18}
      minZoomLevel={3}
      />
      {pins}
      </MapView>
      {/* <MapFilterButton /> */}
      <MapZoomControl zoomLevel={zoomLevel} minMaxZoomLevel={minMaxZoomLevel} setZoomLevel={setZoomLevel} setCurrentCoordinate={setCurrentCoordinate} homeCoordinate={homeCoordinate} />
    </View>
  )
    
}
