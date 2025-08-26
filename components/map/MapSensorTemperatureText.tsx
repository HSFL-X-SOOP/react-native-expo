import { SensorModule } from "@/data/sensor";
import { Text } from "react-native";

type MapSensorTemperatureTextProps = {
    sensorModule: SensorModule
}

export const MapSensorTemperatureText: React.FC<MapSensorTemperatureTextProps> =({sensorModule}) => {

  return (
    <Text style={{ color: 'red', fontWeight: "800"}}>{sensorModule.latestMeasurements.find(measurement => measurement.measurementType.name === "Temperature, water" || measurement.measurementType.name === "WTemp")?.value}°C</Text>
  );
}