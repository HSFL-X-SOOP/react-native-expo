import { SensorModule } from "@/data/sensor";
import { Text } from "react-native";

type MapSensorTemperatureTextProps = {
    sensorModule: SensorModule
}

export const MapSensorTemperatureText: React.FC<MapSensorTemperatureTextProps> =({sensorModule}) => {

  return (
    <Text style={{ color: 'black', fontSize: 24, fontWeight: "700"}}>{sensorModule.latestMeasurements.find(measurement => measurement.measurementType.name === "Temperature, water" || measurement.measurementType.name === "WTemp")?.value}°C</Text>
  );
}