import { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
// Add the correct import for LineChart below. Adjust the path if you use a different chart library.
import { GetGeomarData, GetGeomarDataTimeRange } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Platform, ScrollView, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { XStack, YStack } from 'tamagui';

const widthDivider = Platform.OS === "web" ? 2 : 1.5;

export default function DashboardScreen() {
  const [showInfo, setShowInfo] = useState(false);
  const infoHeight = useRef(new Animated.Value(0)).current;
  const cardGap = Platform.OS === "web" ? 20 : 10;
  let { id } = useLocalSearchParams();

  if (!id) {
    id = "4"; // Default-Wert, falls id nicht vorhanden ist
  }
  const [content, setContent] = useState<SensorModule[]>([])
  const [name, setName] = useState<string>("")
  const [content1, setContent1] = useState<SensorModule[]>([])
  const [dataPrecision, setDataPrecision] = useState<number>(3)
  const { screenWidth } = useWindowDimensions();
  const cardChartWidth = Platform.OS === "web" ? screenWidth / 2 - 40 : screenWidth - 40; // 40 für Padding

  useEffect(() => {
    const fetchData = async () => {
    let data = await GetGeomarData()
    setContent(data.filter((sensor: SensorModule) => String(sensor.location.id) === id))
    setName(data.filter((sensor: SensorModule) => String(sensor.location.id) === id)[0].location.name)
    }
    fetchData()
  }, [])

  const isAdmin = false; //TODO: Hier prüfen ob Admin
  const excludedMeasurements: string[] = [];

  if (!isAdmin) {
    excludedMeasurements.push("Battery, voltage");
  }
  excludedMeasurements.push("Standard deviation");

  
  const [chartWaterTemperature, setChartWaterTemperature] = useState<any>([])
  const [chartTide, setChartTide] = useState<any>([])
  const [chartWaveHeight, setChartWaveHeight] = useState<any>([])
  const [chartBatteryVoltage, setChartBatteryVoltage] = useState<any>([])
  const [minValueWaterTemperature, setMinValueWaterTemperature] = useState<number>(0)
  const [maxValueWaterTemperature, setMaxValueWaterTemperature] = useState<number>(0)  
  const [minValueWaveHeight, setMinValueWaveHeight] = useState<number>(0)
  const [maxValueWaveHeight, setMaxValueWaveHeight] = useState<number>(0)
  const [minValueBatteryVoltage, setMinValueBatteryVoltage] = useState<number>(0)
  const [maxValueBatteryVoltage, setMaxValueBatteryVoltage] = useState<number>(0)
  const [minValueTide, setMinValueTide] = useState<number>(0)
  const [maxValueTide, setMaxValueTide] = useState<number>(0)

  let chartStyle = {width: 800, padding: 20, backgroundColor: 'white', borderRadius: 10, marginVertical: 10 };

  useEffect(() => {
    const fetchData = async () => {
    let data = await GetGeomarDataTimeRange(id, "today")
    const measurementDict = CreateMeasurementDictionary(data);

    setChartTide(measurementDict["tide"].reverse());
    setChartWaveHeight(measurementDict["waveHeight"].reverse());
    setChartWaterTemperature(measurementDict["waterTemperature"].reverse());
    setChartBatteryVoltage(measurementDict["batteryVoltage"].reverse());

    setMinValueWaterTemperature(chartWaterTemperature.length > 0 ? Math.min(...chartWaterTemperature.map((e: { value: number }) => e.value)) : 0);
    setMaxValueWaterTemperature(chartWaterTemperature.length > 0 ? Math.max(...chartWaterTemperature.map((e: { value: number }) => e.value)) : 0);

    setMinValueTide(chartTide.length > 0 ? Math.min(...chartTide.map((e: { value: number }) => e.value)) : 0);
    setMaxValueTide(chartTide.length > 0 ? Math.max(...chartTide.map((e: { value: number }) => e.value)) : 0);

    setMinValueWaveHeight(chartWaveHeight.length > 0 ? Math.min(...chartWaveHeight.map((e: { value: number }) => e.value)) : 0);
    setMaxValueWaveHeight(chartWaveHeight.length > 0 ? Math.max(...chartWaveHeight.map((e: { value: number }) => e.value)) : 0);

    setMinValueBatteryVoltage(chartBatteryVoltage.length > 0 ? Math.min(...chartBatteryVoltage.map((e: { value: number }) => e.value)) : 0);
    setMaxValueBatteryVoltage(chartBatteryVoltage.length > 0 ? Math.max(...chartBatteryVoltage.map((e: { value: number }) => e.value)) : 0);
  }
  fetchData()
}, [])

console.log(minValueWaterTemperature, maxValueWaterTemperature)
  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
    Animated.timing(infoHeight, {
      toValue: showInfo ? 0 : 120,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };



  return (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{ flex: 1 }}>
      {/* <View style={{ width: "100%" }}> */}
        <Image
          style={{ width: 1920, height: 300, objectFit: 'contain', alignSelf: "center" }}
          source={{
            uri: "https://www.im-jaich.de/wp-content/uploads/2022/07/im-jaich-Flensburg-2019-0196-Kristina-Steiner.jpg",
          }}
        />
      {/* </View> */}


      {/* <View
        style={{
          marginTop: -80, // Karten ins Bild schieben
          flexDirection: "row",
          gap: cardGap,
          justifyContent: "space-between",
          paddingHorizontal: 80,
          flexWrap: "wrap",
        }}
      > */}
      <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' alignItems='center' paddingHorizontal={20} marginTop={-60}>

        {/* Hafen-Card mit Button */}
        <Card style={{ backgroundColor: "#e3f2fd", width: Platform.OS === "web" ? 475 : 375, minWidth: 300, height: "auto", padding: 10 }}>
          <Card.Content>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Icon source={"home"} color={"black"} size={50} />
              <View style={{ flexDirection: "column", gap: 10 }}>
                <Text style={{ fontSize: 16, color: "#504f4fff" }}>{"Hafen"}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 24, color: "black" }}>{name}</Text>
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

        <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' paddingHorizontal={20}>

        {/* <View style={{flexDirection: "row", gap: 10, justifyContent: "center", paddingHorizontal: 20, flexWrap: "wrap", marginTop: 20 }}> */}
          {content[0] &&( content[0].latestMeasurements.map((a, index) => (
            !excludedMeasurements.includes(a.measurementType.name) && (
              <MeasurementCard key={index} measurementType={a.measurementType.name} value={String(a.value)} />)
            )))}
        {/* </View> */}
            </XStack>
      </XStack>
      {/* </View> */}

      <Animated.View
        style={{
          width: "100%",
          alignSelf: "center",
          padding: 0,
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
      <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' paddingHorizontal={20} marginTop={20}>
      {/* <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 30}}> */}
        <LineChartCard title="Wassertemperatur" chartData={chartWaterTemperature} minValue={10} maxValue={20} dataPrecision={dataPrecision} width={cardChartWidth} />
        <LineChartCard title="Tide" chartData={chartTide} minValue={minValueTide} maxValue={50} dataPrecision={dataPrecision} width={cardChartWidth} />
        <LineChartCard title="Wellenhöhe" chartData={chartWaveHeight} minValue={minValueWaveHeight} maxValue={10} dataPrecision={dataPrecision} width={cardChartWidth} />
        {/* <LineChartCard title="Batteriestatus" chartData={chartBatteryVoltage} minValue={minValueBatteryVoltage} maxValue={5} dataPrecision={dataPrecision} /> */}
      {/* </View> */}
      </XStack>
    </ScrollView>
  </SafeAreaView>
  );
}



type MeasurementCardProps = {
    measurementType: string,
    value: string,
}

const CreateMeasurementDictionary = (data: any) => {
    const measurementTimes = data.boxes[0].measurementTimes;

    const measurementDict: Record<string, { label: string, value: number }[]> = {};

    measurementTimes.forEach((entry: any) => {
      Object.entries(entry.measurements).forEach(([key, value]) => {
        if (!measurementDict[key]) {
          measurementDict[key] = [];
        }
        measurementDict[key].push({
          label: entry.time.slice(11, 16), 
          value: Math.ceil(Number(value))
        });
      });
    });

    return measurementDict;
}

export const MeasurementCard: React.FC<MeasurementCardProps> =({measurementType, value}) =>  {

  return(
    <Card style={{ backgroundColor: "#e3f2fd", height: "auto"}}>
        <Card.Content>
            <XStack
              gap={10}
              alignItems="center"
              justifyContent="center" // horizontal zentrieren
              width="100%"
              height={80} // feste Höhe für vertikale Zentrierung
            >
              <Icon source={getMeasurementTypeIcon(measurementType)} color={"black"} size={30}/>
              <YStack
                alignItems="center" // horizontal zentrieren im Stack
                justifyContent="center" // vertikal zentrieren im Stack
              >
                <Text style={{fontSize: 16, color: "#504f4fff", textAlign: "center"}}>{getTextFromMeasurementType(measurementType)}</Text>
                <Text style={{fontSize: 24, color: "black", textAlign: "center"}}>{value}{getMeasurementTypeSymbol(measurementType)} </Text>
              </YStack>
            </XStack>
        </Card.Content>
    </Card>
  )
}

type LineChartCardProps = {
    title: string,
    chartData: { label: string, value: number }[],
    minValue: number,
    maxValue: number,
    dataPrecision: number,
    width: number,
}

export const LineChartCard: React.FC<LineChartCardProps> =({title, chartData, minValue, maxValue, dataPrecision, width}) =>  {

  return(
    <Card style={{ width: width  / widthDivider, padding: 10, backgroundColor: 'white', borderRadius: 10, marginVertical: 10 }}>
      <Card.Content>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>{title}</Text>
        <LineChart
          data={chartData.filter((_: { label: string; value: number }, idx: number) => idx % dataPrecision === 0)}
          // lineGradient={true}
          // lineGradientStartColor='#ff0000ff'
          // lineGradientEndColor='#08e025ff'
          thickness={3}
          mostNegativeValue={minValue}
          maxValue={maxValue}
          noOfSections={10}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          yAxisTextStyle={{ color: 'black', fontWeight: '600' }}
          xAxisLabelTextStyle={{ color: 'black', fontWeight: '600' }}
          rulesColor="gray"
          rulesType="solid"
          curved={true}
          width={width / widthDivider} // Subtracting padding
        />
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