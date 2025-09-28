import { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
// Add the correct import for LineChart below. Adjust the path if you use a different chart library.
import { LineChart } from 'react-native-gifted-charts';

export default function DashboardScreen() {
  const [showInfo, setShowInfo] = useState(false);
  const infoHeight = useRef(new Animated.Value(0)).current;

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
    Animated.timing(infoHeight, {
      toValue: showInfo ? 0 : 120, // Höhe der ausgerollten View
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Bild */}
      <View style={{ width: "100%" }}>
        <Image
          style={{ width: 1920, height: 300, objectFit: 'contain', alignSelf: "center" }}
          source={{
            uri: "https://www.im-jaich.de/wp-content/uploads/2022/07/im-jaich-Flensburg-2019-0196-Kristina-Steiner.jpg",
          }}
        />
      </View>

      {/* Karten halb über das Bild */}
      <View
        style={{
          marginTop: -80, // Karten ins Bild schieben
          flexDirection: "row",
          gap: 50,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        {/* Hafen-Card mit Button */}
        <Card style={{ backgroundColor: "#e3f2fd" }}>
          <Card.Content>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Icon source={"home"} color={"black"} size={75} />
              <View style={{ flexDirection: "column", width: "48%", gap: 10 }}>
                <Text style={{ fontSize: 16, color: "#504f4fff" }}>{"Hafen"}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 24, color: "black" }}>{"Im Jaich, Flensburg"}</Text>
                </View>
                {/* Button */}
                <View>
                  <TouchableOpacity onPress={toggleInfo} style={{ marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Text>Weitere Informationen</Text>
                    <Icon
                      source={showInfo ? "chevron-up" : "chevron-down"}
                      color={"#333"}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <MeasurementCard measurementType="Temperature, water" value={"12"} />
        <MeasurementCard measurementType="Tide" value={"12"} />
        <MeasurementCard measurementType="Wave Height" value={"12"} />
        <MeasurementCard measurementType="Battery, voltage" value={"12"} />
      </View>

      {/* Animierte Info-View direkt unter den Karten */}
      <Animated.View
        style={{
          width: "100%",
          alignSelf: "center",
          padding: 0,
          backgroundColor: "#42474bff",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          overflow: "hidden",
          height: infoHeight,
        }}
      >
        {showInfo && (
          <View style={{ padding: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Hafen-Info</Text>
            <Text>Hier stehen weitere Informationen zum Hafen, z.B. Adresse, Öffnungszeiten, Besonderheiten usw.</Text>
          </View>
        )}
      </Animated.View>

      {/* Der restliche Content wird jetzt nach unten geschoben */}
      <View style={{ marginTop: 40 }}>
        <Text>Standort</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Beschreibung</Text>
      </View>

      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Charts</Text>
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, marginVertical: 10 }}>
          <LineChart
            data={[
              { value: 15, label: '01.08' },
              { value: 21, label: '02.08' },
              { value: 19, label: '03.08' },
              { value: 19, label: '04.08' },
              { value: 20, label: '05.08' },
              { value: 22, label: '06.08' },
              { value: 24, label: '07.08' },
              { value: 26, label: '08.08' },
            ]}
            lineGradient={true}
            lineGradientStartColor='#ff0000ff'
            lineGradientEndColor='#08e025ff'
            thickness={3}
            mostNegativeValue={0}
            maxValue={30}
            noOfSections={10}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            yAxisTextStyle={{ color: 'black', fontWeight: '600' }}
            xAxisLabelTextStyle={{ color: 'black', fontWeight: '600' }}
            rulesColor="gray"
            rulesType="solid"
            curved={true}
          />
        </View>
      </View>
    </View>
  );
}



type MeasurementCardProps = {
    measurementType: string,
    value: string,
}

export const MeasurementCard: React.FC<MeasurementCardProps> =({measurementType, value}) =>  {

  return(
    <Card style={{ backgroundColor: "#e3f2fd" }}>
        <Card.Content>
            <View style={{display: 'flex', flexDirection: 'row',  alignItems: 'center', gap: 10}}>
            <Icon source={getMeasurementTypeIcon(measurementType)} color={"black"} size={75}/>
                <View style={{flexDirection: "column", width: "100%", gap: 10}}>
                    <Text style={{fontSize: 16, color: "#504f4fff"}}>{getTextFromMeasurementType(measurementType)}</Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontSize: 24, color: "black"}}>{value}{getMeasurementTypeSymbol(measurementType)} </Text>
                        </View>
                    </View>
            </View>
        </Card.Content>
    </Card>
  )
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


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 100
  },
});