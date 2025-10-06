import {LocationWithBoxes, SensorModule} from "@/api/models/sensor";
import {SensorMarkerSvg} from "./SensorMarkerSvg";

type MapSensorTemperatureTextProps = {
    sensorModule: SensorModule
}

export const MapSensorTemperatureText: React.FC<MapSensorTemperatureTextProps> = ({sensorModule}) => {
    const tempValue = sensorModule.latestMeasurements.find(measurement => measurement.measurementType.name === "Temperature, water" || measurement.measurementType.name === "WTemp")?.value;
    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "N/A";

    return (
        <SensorMarkerSvg temperature={temperature}/>
    );
}

type MapSensorTemperatureTextNewProps = {
    locationWithBoxes: LocationWithBoxes
}

export const MapSensorTemperatureTextNew: React.FC<MapSensorTemperatureTextNewProps> = ({locationWithBoxes}) => {
    const tempValue = locationWithBoxes.boxes.find(box => box.type === "WaterBox" || box.type === "WaterTemperatureOnlyBox")?.measurementTimes.find(measurement => measurement.measurements.waterTemperature)?.measurements.waterTemperature;
    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "N/A";

    return (
        <SensorMarkerSvg temperature={temperature}/>
    );
}