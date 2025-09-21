import { SensorModule } from "@/data/sensor";
import { Text, View } from "react-native";

type MapSensorMeasurementsProps = {
    sensorModule: SensorModule
}

export const MapSensorMeasurements: React.FC<MapSensorMeasurementsProps> =({sensorModule}) => {

  return (
    sensorModule.latestMeasurements.map((a, index) => (
        <View key={index} style={{flexDirection: "row", width: 200, height: 20, justifyContent: "space-between"}}>
            <Text> {a.measurementType.name}</Text>
            <Text>{a.value} {a.measurementType.unitSymbol} </Text>
        </View>
    ))
  );
}