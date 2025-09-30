import { GetGeomarData, GetGeomarDataNew } from "@/data/geomar-data";
import { LocationWithBoxes, SensorModule } from "@/data/sensor";
import { Camera, MapView } from "@maplibre/maplibre-react-native";
import { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import AndroidMarker from "./map/MapSensorMarker.native";
import MapZoomControl from "./map/MapZoomControl";

export default function AndroidMap() {
    const [content, setContent] = useState<SensorModule[]>([])
    const [content2, setContent2] = useState<LocationWithBoxes[]>([])
    useEffect(() => {
      const fetchData = async () => {
        let data = await GetGeomarData()
        setContent(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
    let data = await GetGeomarDataNew()
    setContent2(data)
    }
    fetchData()
  }, [])

  const [selectedLocation, setSelectedLocation] = useState<LocationWithBoxes | null>(null);
  const pins =
  content2.map((locationWithBoxes: LocationWithBoxes, index) =>
    <View key={index}>
      <AndroidMarker locationWithBoxes={locationWithBoxes} index={index} />
    </View>
  )

  const [zoomLevel, setZoomLevel] = useState(7);
  const homeCoordinate: [number, number] = [9.26, 54.46];
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
      centerCoordinate={homeCoordinate}
      maxZoomLevel={18}
      minZoomLevel={3}
      />
      {pins}
      </MapView>
      {/* <MapFilterButton /> */}
      <MapZoomControl zoomLevel={zoomLevel} minMaxZoomLevel={minMaxZoomLevel} setZoomLevel={setZoomLevel} setCurrentCoordinate={setCurrentCoordinate} homeCoordinate={homeCoordinate} />
                {/* Popup */}
            <Modal
                visible={!!selectedLocation}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedLocation(null)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.3)"
                }}>
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 20,
                        minWidth: 250,
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            {selectedLocation?.location.name}
                        </Text>
                        {/* Weitere Infos */}
                        <Text>
                            {selectedLocation?.boxes[0]?.description}
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => setSelectedLocation(null)}
                        >
                            <Text style={{ color: "blue" }}>Schließen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </View>
  )
    
}
