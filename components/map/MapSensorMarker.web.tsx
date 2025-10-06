import { LocationWithBoxes, SensorModule } from "@/api/models/sensor";
import { Marker } from "@vis.gl/react-maplibre";
import { MapSensorTemperatureText, MapSensorTemperatureNew } from "./MapSensorTemperatureText";

export function WebMarker(sensorModule: SensorModule, setPopupInfo: (sensor: SensorModule) => void) {
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

export default function WebMarkerNew(locationWithBoxes: LocationWithBoxes, setPopupInfo: (location: LocationWithBoxes) => void) {
    return (
        <Marker key={locationWithBoxes.location.id}
        longitude={locationWithBoxes.location.coordinates.lon}
        latitude={locationWithBoxes.location.coordinates.lat}
        anchor="bottom"
        onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(locationWithBoxes);
        }}
        >
            <MapSensorTemperatureNew locationWithBoxes={locationWithBoxes} />
        </Marker>
    );
}