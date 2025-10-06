import { LocationWithBoxes } from "@/api/models/sensor";
import { Marker } from "@vis.gl/react-maplibre";
import { SensorMarkerContent } from "./MapSensorTemperatureText";

interface SensorMarkerProps {
    locationWithBoxes: LocationWithBoxes;
    setPopupInfo: (location: LocationWithBoxes) => void;
}

export default function SensorMarker({ locationWithBoxes, setPopupInfo }: SensorMarkerProps) {
    return (
        <Marker
            key={locationWithBoxes.location.id}
            longitude={locationWithBoxes.location.coordinates.lon}
            latitude={locationWithBoxes.location.coordinates.lat}
            anchor="bottom"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(locationWithBoxes);
            }}
        >
            <SensorMarkerContent locationWithBoxes={locationWithBoxes} />
        </Marker>
    );
}