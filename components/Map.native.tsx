import {GetGeomarData} from "@/data/geomar-data";
import {SensorModule} from "@/data/sensor";
import {Camera, MapView} from "@maplibre/maplibre-react-native";
import {useEffect, useState} from "react";
import {View} from "react-native";
import MapFilterButton from "./map/MapFilterButton";
import AndroidMarker from "./map/MapSensorMarker.native";

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
        content.map((sensorModule: SensorModule, index) => (
            AndroidMarker(sensorModule, index)
        ))


    return (
        <View style={{flex: 1}}>
            <MapView style={{flex: 1}}
                // mapStyle="https://tiles.openfreemap.org/styles/positron"
                     mapStyle={require('../assets/images/style.json')}
            >
                <Camera zoomLevel={7} centerCoordinate={[9.26, 54.47926]}/>
                {pins}
            </MapView>
            <MapFilterButton/>
        </View>
    )

}
