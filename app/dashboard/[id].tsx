import { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetGeomarData, GetGeomarDataTimeRange } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Platform, ScrollView, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { XStack, YStack, useMedia, Card } from 'tamagui';
import { Home, Waves, Thermometer, WavesLadder, Battery, HelpCircle, ChevronUp, ChevronDown } from '@tamagui/lucide-icons';

export default function DashboardScreen() {
  const [showInfo, setShowInfo] = useState(false);
  const infoHeight = useRef(new Animated.Value(0)).current;
  const media = useMedia();
  const cardGap = media.md ? 20 : 10;
  let { id } = useLocalSearchParams();

  if (!id) {
    id = "4";
  }
  const [content, setContent] = useState<SensorModule[]>([])
  const [name, setName] = useState<string>("")
  const [content1, setContent1] = useState<SensorModule[]>([])
  const [dataPrecision, setDataPrecision] = useState<number>(3)
  const { width: screenWidth } = useWindowDimensions();

  const getCardChartWidth = () => {
    if (media.xl) return screenWidth / 2 - 60;
    if (media.md) return screenWidth / 2 - 40;
    return screenWidth - 40;
  };
  const cardChartWidth = getCardChartWidth();

  useEffect(() => {
    const fetchData = async () => {
    let data = await GetGeomarData()
    setContent(data.filter((sensor: SensorModule) => String(sensor.location.id) === id))
    setName(data.filter((sensor: SensorModule) => String(sensor.location.id) === id)[0].location.name)
    }
    fetchData()
  }, [])

  const isAdmin = false;
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
        <Image
          style={{ width: '100%', height: media.md ? 300 : 200, objectFit: 'cover', alignSelf: "center" }}
          source={{
            uri: "https://www.im-jaich.de/wp-content/uploads/2022/07/im-jaich-Flensburg-2019-0196-Kristina-Steiner.jpg",
          }}
        />

      <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' alignItems='center' paddingHorizontal={media.md ? 20 : 10} marginTop={media.md ? -60 : -40}>

        {/* Hafen-Card mit Button */}
        <Card backgroundColor="#e3f2fd" width={media.md ? 475 : '100%'} maxWidth={475} minWidth={media.md ? 300 : 'auto'} height="auto" padding="$4">
            <XStack gap="$3" alignItems="center">
              <Home color="black" size={media.md ? 50 : 40} />
              <YStack gap="$2" flex={1}>
                <Text style={{ fontSize: media.md ? 16 : 14, color: "#504f4fff" }}>{"Hafen"}</Text>
                <Text style={{ fontSize: media.md ? 24 : 20, color: "black" }}>{name}</Text>
                <TouchableOpacity onPress={toggleInfo}>
                  <XStack gap="$2" alignItems="center" marginTop="$2">
                    <Text style={{ fontSize: media.md ? 14 : 12 }}>Weitere Informationen</Text>
                    {showInfo ? (
                      <ChevronUp color="#333" size={24} />
                    ) : (
                      <ChevronDown color="#333" size={24} />
                    )}
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </XStack>
        </Card>

        <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' paddingHorizontal={media.md ? 20 : 5}>
          {content[0] &&( content[0].latestMeasurements.map((a, index) => (
            !excludedMeasurements.includes(a.measurementType.name) && (
              <MeasurementCard key={index} measurementType={a.measurementType.name} value={String(a.value)} />)
            )))}
            </XStack>
      </XStack>

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
      <XStack flexWrap='wrap' gap={cardGap} justifyContent='center' paddingHorizontal={media.md ? 20 : 10} marginTop={20}>
        <LineChartCard title="Wassertemperatur" chartData={chartWaterTemperature} minValue={10} maxValue={20} dataPrecision={dataPrecision} width={cardChartWidth} />
        <LineChartCard title="Tide" chartData={chartTide} minValue={minValueTide} maxValue={50} dataPrecision={dataPrecision} width={cardChartWidth} />
        <LineChartCard title="Wellenhöhe" chartData={chartWaveHeight} minValue={minValueWaveHeight} maxValue={10} dataPrecision={dataPrecision} width={cardChartWidth} />
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
  const IconComponent = getMeasurementTypeIconComponent(measurementType);

  return(
    <Card backgroundColor="#e3f2fd" height="auto" padding="$3">
            <XStack
              gap="$3"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={80}
            >
              <IconComponent color="black" size={30}/>
              <YStack
                alignItems="center"
                justifyContent="center"
              >
                <Text style={{fontSize: 16, color: "#504f4fff", textAlign: "center"}}>{getTextFromMeasurementType(measurementType)}</Text>
                <Text style={{fontSize: 24, color: "black", textAlign: "center"}}>{value}{getMeasurementTypeSymbol(measurementType)} </Text>
              </YStack>
            </XStack>
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
  const media = useMedia();
  const chartWidth = Math.max(width - 60, 250);

  return(
    <Card width={width} maxWidth="100%" padding={media.md ? "$3" : "$2"} backgroundColor="white" borderRadius="$4" marginVertical="$3">
        <Text style={{ fontSize: media.md ? 24 : 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>{title}</Text>
        <LineChart
          data={chartData.filter((_: { label: string; value: number }, idx: number) => idx % dataPrecision === 0)}
          thickness={media.md ? 3 : 2}
          mostNegativeValue={minValue}
          maxValue={maxValue}
          noOfSections={10}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          yAxisTextStyle={{ color: 'black', fontWeight: '600', fontSize: media.md ? 12 : 10 }}
          xAxisLabelTextStyle={{ color: 'black', fontWeight: '600', fontSize: media.md ? 12 : 10 }}
          rulesColor="gray"
          rulesType="solid"
          curved={true}
          width={chartWidth}
        />
      </Card>
  )
}

const getMeasurementTypeIconComponent = (measurementType: string) => {
  switch (measurementType) {
    case "Wave Height":
      return Waves;
    case "Temperature, water":
      return Thermometer;
    case "WTemp":
      return Thermometer;
    case "Tide":
      return WavesLadder;
    case "Battery, voltage":
      return Battery;
    default:
      return HelpCircle;
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