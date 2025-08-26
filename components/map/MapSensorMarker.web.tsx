import { SensorModule } from "@/data/sensor";
import { Marker } from "@vis.gl/react-maplibre";
import { MapSensorTemperatureText } from "./MapSensorTemperatureText";

export default function WebMarker(sensorModule: SensorModule, setPopupInfo: (sensor: SensorModule) => void) {
    return (
        <Marker key={sensorModule.location.id}
        longitude={sensorModule.location.coordinates.lon}
        latitude={sensorModule.location.coordinates.lat}
        anchor="bottom"
        onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(sensorModule);
        }}
        >
            <MapSensorTemperatureText sensorModule={sensorModule} />
        </Marker>
    );
}