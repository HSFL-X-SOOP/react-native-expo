import { LocationWithBoxes } from "@/data/sensor";
import { Callout, PointAnnotation } from "@maplibre/maplibre-react-native";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { MapSensorMeasurementsNew } from "./MapSensorMeasurements";
import { MapSensorTemperatureTextNew } from "./MapSensorTemperatureText";
export default function AndroidMarker(locationWithBoxes: LocationWithBoxes, index: number, onClose?: () => void) {
    const router = useRouter();
    return (
        <PointAnnotation
        id={`marker-${index}`}
        key={`marker-${index}`}
        coordinate={[ locationWithBoxes.location.coordinates.lon, locationWithBoxes.location.coordinates.lat]}
        title="Marker Title"
        selected={true}
        >
            <View>
                <MapSensorTemperatureTextNew locationWithBoxes={locationWithBoxes} />
            </View>


            <Callout style={{ backgroundColor: "transparent",
                    borderWidth: 0,
                    shadowColor: "black",
                    width: 350,
                    height: "auto",
                    padding: 0 ,
                    zIndex: -1
                }}  >
                    <MapSensorMeasurementsNew locationWithBoxes={locationWithBoxes} />
            </Callout>
        </PointAnnotation>
    );
}