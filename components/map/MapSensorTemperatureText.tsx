import { LocationWithBoxes, SensorModule } from "@/api/models/sensor";
import { Text } from "react-native";

type MapSensorTemperatureTextProps = {
    sensorModule: SensorModule
}

export const MapSensorTemperatureText: React.FC<MapSensorTemperatureTextProps> =({sensorModule}) => {

  return (
    <Text style={{ color: 'black', fontSize: 24, fontWeight: "700"}}>{sensorModule.latestMeasurements.find(measurement => measurement.measurementType.name === "Temperature, water" || measurement.measurementType.name === "WTemp")?.value}°C</Text>
  );
}

type MapSensorTemperatureTextNewProps = {
    locationWithBoxes: LocationWithBoxes
}

export const MapSensorTemperatureTextNew: React.FC<MapSensorTemperatureTextNewProps> =({locationWithBoxes}) => {

  return (
    <Text style={{ color: 'black', fontSize: 24, fontWeight: "700"}}>{locationWithBoxes.boxes.find(box => box.type === "WaterBox" || box.type === "WaterTemperatureOnlyBox")?.measurementTimes.find(measurement => measurement.measurements.waterTemperature)?.measurements.waterTemperature}°C</Text>
  );
}