import { SensorModule } from "@/data/sensor";
import { Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { Card, Icon } from "react-native-paper";
type MapSensorMeasurementsProps = {
    sensorModule: SensorModule
}

export const MapSensorMeasurements: React.FC<MapSensorMeasurementsProps> =({sensorModule}) => {
  
  const isAdmin = true; //TODO: Hier prüfen ob Admin
  const excludedMeasurements: string[] = [];

  if (!isAdmin) {
    excludedMeasurements.push("Battery, voltage");
  }
  excludedMeasurements.push("Standard deviation");

  // Wenn die Width/minWidth geändert wird, dann muss das in der global.css bei '.maplibregl-popup-content' auch angepasst werden, damit das Schließen-Kreuz richtig positioniert ist.
  const cardStyle = Platform.OS === "web"
  ? { backgroundColor: 'white', padding: 12, borderRadius: 8, minWidth: 300, minHeight: 200 }
  : { backgroundColor: 'white', padding: 12, borderRadius: 8, width: 300, minHeight: 200 };

  return (
    <Card style={cardStyle}>
      <Text style={{fontSize: 16, color: "#504f4fff"}}>Name</Text>
      <Link href="/map"><Text style={{fontSize: 24}}>{sensorModule.location.name}</Text></Link>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "space-between", marginTop: 10 }}>
        {sensorModule.latestMeasurements.map((a, index) => (
          !excludedMeasurements.includes(a.measurementType.name) && (
            <View key={index} style={{flexDirection: "column", width: "48%", marginBottom: 10}}>
                  <Text style={{fontSize: 16, color: "#504f4fff"}}>{getTextFromMeasurementType(a.measurementType.name)}</Text>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontSize: 24}}>{a.value}{getMeasurementTypeSymbol(a.measurementType.name)} </Text>
                    <Icon source={getMeasurementTypeIcon(a.measurementType.name)} color="black" size={24} />
                  </View>
                </View>
            )
          ))}
          </View>
    </Card>
  );
}

const getMeasurementTypeIcon = (measurementType: string): string => {
  switch (measurementType) {
    case "Wave Height":
      return "waves";
    case "Temperature, water":
      return "thermometer";
    case "WTemp":
      return "thermometer";
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return "waves-arrow-left";
    case "Battery, voltage":
      return "battery-80";
    default:
      return "help-circle";
  }
};

const getTextFromMeasurementType = (measurementType: string): string => {
  switch (measurementType) {
    case "Wave Height":
      return "Wellenhöhe";
    case "Temperature, water":
      return "Wassertemperatur";
    case "WTemp":
      return "Wassertemperatur";
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return "Tide";
    case "Battery, voltage":
      return "Batteriespannung";
    default:
      return "help-circle";
  }
};

const getMeasurementTypeSymbol = (measurementType: string): string => {
  switch (measurementType) {
    case "Wave Height":
      return "cm";
    case "Temperature, water":
      return "°C";
    case "WTemp":
      return "°C";
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return "cm";
    case "Battery, voltage":
      return "V";
    default:
      return "help-circle";
  }
};
