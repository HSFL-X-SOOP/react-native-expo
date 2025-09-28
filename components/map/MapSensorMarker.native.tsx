import { SensorModule } from "@/data/sensor";
import { Callout, PointAnnotation } from "@maplibre/maplibre-react-native";
import { View } from "react-native";
import { MapSensorMeasurements } from "./MapSensorMeasurements";
import { MapSensorTemperatureText } from "./MapSensorTemperatureText";
export default function AndroidMarker(sensorModule: SensorModule, index: number, onClose?: () => void) {
    return (
        <PointAnnotation
        id={`marker-${index}`}
        key={`marker-${index}`}
        coordinate={[ sensorModule.location.coordinates.lon, sensorModule.location.coordinates.lat]}
        title="Marker Title"
        selected={true}
        onSelected={() => console.log('Marker selected')}
        >
            <View>
                <MapSensorTemperatureText sensorModule={sensorModule} />
            </View>

            <Callout style={{ backgroundColor: "transparent",
                    borderWidth: 0,
                    shadowColor: "black",
                    width: 300,
                    height: "auto",
                    padding: 0 }}>
                    <MapSensorMeasurements sensorModule={sensorModule} />
            </Callout>
        </PointAnnotation>
    );
}