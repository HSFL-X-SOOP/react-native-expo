import { useThemeContext } from '@/context/ThemeSwitch';
import { GetGeomarData, GetGeomarDataTimeRange } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import { useTranslation } from '@/hooks/useTranslation';
import {
    Activity,
    Battery,
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    HelpCircle,
    Home,
    MapPin,
    Thermometer,
    Waves
} from '@tamagui/lucide-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Router, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient as LinearG } from 'react-native-svg';
//import { LinearGradient } from 'react-native-svg';
import {
    Adapt,
    Button,
    Card,
    FontSizeTokens,
    H1,
    H2,
    H3,
    H4,
    Image,
    Select,
    SelectProps,
    Separator,
    Sheet,
    Stack,
    Text,
    XStack,
    YStack,
    getFontSize,
    useMedia
} from 'tamagui';


export default function DashboardScreen() {
    const media = useMedia();
    const router = useRouter();
    const { t, changeLanguage } = useTranslation();
    const {isDark} = useThemeContext();
    const [showInfo, setShowInfo] = useState(false);
    const infoHeight = useRef(new Animated.Value(0)).current;
    let {id} = useLocalSearchParams();

    if (!id) {
        id = "4";
    }

    const [content, setContent] = useState<SensorModule[]>([])
    const [sensorLocations, setSensorLocations] = useState<MarinaNameWithId[]>([])
    const [name, setName] = useState<string>("")
    const [, setLoading] = useState(true)
    const [timeRange, setTimeRange] = useState<'today' | 'yesterday' | 'last7days' | 'last30days'>('today')

    // Adjust data precision based on time range
    const dataPrecision = timeRange === 'last30days' ? 6 :
        timeRange === 'last7days' ? 3 :
            timeRange === 'yesterday' ? 3 :
                3; // today

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await GetGeomarData()
                setSensorLocations(GetAllAvailableSensorLocations(data));
                setContent(data.filter((sensor: SensorModule) => String(sensor.location.id) === id))
                setName(data.filter((sensor: SensorModule) => String(sensor.location.id) === id)[0]?.location.name || "")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id, timeRange])

    const isAdmin = false;
    const excludedMeasurements: string[] = [];

    if (!isAdmin) {
        excludedMeasurements.push("Battery, voltage");
    }
    excludedMeasurements.push("Standard deviation");


    const [chartWaterTemperature, setChartWaterTemperature] = useState<any>([])
    const [chartTide, setChartTide] = useState<any>([])
    const [chartWaveHeight, setChartWaveHeight] = useState<any>([])

    useEffect(() => {
        const fetchData = async () => {
            const apiTimeRange = timeRange === 'last7days' ? 'week' :
                timeRange === 'last30days' ? 'month' :
                    timeRange;

            let data = await GetGeomarDataTimeRange(id, apiTimeRange)
            const measurementDict = CreateMeasurementDictionary(data, timeRange);

            const tideData = measurementDict["tide"]?.reverse() || [];
            const waveData = measurementDict["waveHeight"]?.reverse() || [];
            const tempData = measurementDict["waterTemperature"]?.reverse() || [];
            setChartTide(tideData);
            setChartWaveHeight(waveData);
            setChartWaterTemperature(tempData);
        }
        fetchData()
    }, [id, timeRange])

    const toggleInfo = () => {
        setShowInfo((prev) => !prev);
        Animated.timing(infoHeight, {
            toValue: showInfo ? 0 : 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff'}}>
                <Stack position="relative" width="100%" height={media.lg ? 350 : 250} overflow="hidden">
                    <Image
                        source={{
                            uri: "https://www.im-jaich.de/wp-content/uploads/2022/07/im-jaich-Flensburg-2019-0196-Kristina-Steiner.jpg",
                        }}
                        width="100%"
                        height="100%"
                    />

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60%',
                        }}
                    />

                    <Stack position="absolute" bottom="$4" left="$4" right="$4">
                        <Text color="white" fontSize="$3" opacity={0.9} marginBottom="$1">
                            {t('dashboard.title')}
                        </Text>
                        <H1
                            color="white"
                            fontSize={media.lg ? "$10" : "$8"}
                            fontWeight="700"
                            textShadowColor="rgba(0,0,0,0.5)"
                            textShadowOffset={{width: 0, height: 2}}
                            textShadowRadius={4}
                        >
                            {name || t('dashboard.loading')}
                        </H1>
                        <View style={{width: 300}}>
                            <SelectDemoContents isDark={isDark} router={router} sensorLocations={sensorLocations} selectedMarinaId={Number(id)} id="select-demo-2" native />
                        </View>
                    </Stack>
                </Stack>

                <YStack
                    padding={media.md ? "$3" : "$4"}
                    gap={media.md ? "$4" : "$5"}
                    maxWidth={1400}
                    width="100%"
                    alignSelf="center"
                    marginTop={media.md ? -20 : -30}
                >

                    <Card
                        elevate
                        bordered
                        animation="quick"
                        backgroundColor={isDark ? '$gray1' : '$background'}
                        borderWidth={1}
                        borderColor="$borderColor"
                    >
                        <Card.Header padded>
                            <XStack justifyContent="space-between" alignItems="center">
                                <XStack gap="$3" alignItems="center" flex={1}>
                                    <Stack
                                        width={44}
                                        height={44}
                                        borderRadius="$3"
                                        backgroundColor={isDark ? '$gray8' : '$gray3'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Home size={24} color="$gray10"/>
                                    </Stack>
                                    <YStack flex={1}>
                                        <Text color="$gray11" fontSize="$2">{t('dashboard.harbor')}</Text>
                                        <H3 fontSize="$6" fontWeight="600">{name}</H3>
                                    </YStack>
                                </XStack>
                                <Button
                                    size="$3"
                                    variant="outlined"
                                    icon={showInfo ? ChevronUp : ChevronDown}
                                    onPress={toggleInfo}
                                    circular
                                />
                            </XStack>
                        </Card.Header>

                        <Animated.View
                            style={{
                                overflow: "hidden",
                                height: infoHeight,
                            }}
                        >
                            {showInfo && (
                                <Card.Footer padded backgroundColor="$gray1" borderTopWidth={1}
                                             borderTopColor="$borderColor">
                                    <XStack flexWrap="wrap" gap="$4">
                                        <XStack gap="$2" alignItems="center" minWidth={200}>
                                            <MapPin size={18} color="$gray10"/>
                                            <YStack>
                                                <Text fontSize="$1" color="$gray11">{t('dashboard.address')}</Text>
                                                <Text fontSize="$3">{t('dashboard.addressValue')}</Text>
                                            </YStack>
                                        </XStack>
                                        <XStack gap="$2" alignItems="center" minWidth={200}>
                                            <Clock size={18} color="$gray10"/>
                                            <YStack>
                                                <Text fontSize="$1" color="$gray11">{t('dashboard.openingHours')}</Text>
                                                <Text fontSize="$3">{t('dashboard.openingHoursValue')}</Text>
                                            </YStack>
                                        </XStack>
                                    </XStack>
                                </Card.Footer>
                            )}
                        </Animated.View>
                    </Card>

                    <YStack gap="$3">
                        <XStack alignItems="center" justifyContent="space-between">
                            <H3 fontSize="$5" fontWeight="600">{t('dashboard.currentMeasurements')}</H3>
                            <XStack gap="$1" alignItems="center">
                                <Stack width={6} height={6} borderRadius="$5" backgroundColor="$green9"/>
                                <Text fontSize="$2" color="$gray11">{t('dashboard.live')}</Text>
                            </XStack>
                        </XStack>
                        <XStack
                            gap="$3"
                            width="100%"
                            flexWrap={media.md ? "wrap" : "nowrap"}
                            justifyContent={media.md ? "center" : "space-between"}
                        >
                            {content[0] && content[0].latestMeasurements
                                .filter(a => !excludedMeasurements.includes(a.measurementType.name))
                                .slice(0, 3)
                                .map((measurement, index) => (
                                    <Card
                                        key={index}
                                        elevate
                                        bordered
                                        backgroundColor={isDark ? '$gray1' : '$background'}
                                        flex={media.md ? undefined : 1}
                                        width={media.md ? "100%" : undefined}
                                        minWidth={250}
                                        borderWidth={1}
                                        borderColor="$borderColor"
                                    >
                                        <Card.Header padded>
                                            <YStack gap="$3" alignItems="center">
                                                <Stack
                                                    width={56}
                                                    height={56}
                                                    borderRadius="$4"
                                                    backgroundColor={getIconBackground(measurement.measurementType.name)}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    {getMeasurementIcon(measurement.measurementType.name, 32)}
                                                </Stack>
                                                <YStack alignItems="center" gap="$2">
                                                    <Text
                                                        color="$gray11"
                                                        fontSize="$4"
                                                        fontWeight="600"
                                                        textAlign="center"
                                                    >
                                                        {getTextFromMeasurementType(measurement.measurementType.name, t)}
                                                    </Text>
                                                    <XStack alignItems="baseline" gap="$2">
                                                        <H2 fontSize="$10" fontWeight="700"
                                                            color={getMeasurementColor(measurement.measurementType.name)}>
                                                            {measurement.value}
                                                        </H2>
                                                        <Text fontSize="$6"
                                                              color={getMeasurementColor(measurement.measurementType.name)}
                                                              fontWeight="600">
                                                            {getMeasurementTypeSymbol(measurement.measurementType.name, t)}
                                                        </Text>
                                                    </XStack>
                                                </YStack>
                                            </YStack>
                                        </Card.Header>
                                    </Card>
                                ))}
                        </XStack>
                    </YStack>


                    {content[0] && content[0].latestMeasurements.filter(a => !excludedMeasurements.includes(a.measurementType.name)).length > 3 && (
                        <YStack gap="$3">
                            <H2 fontSize="$6">{t('dashboard.furtherMeasurements')}</H2>
                            <XStack
                                flexWrap="wrap"
                                gap="$3"
                                justifyContent={media.lg ? 'flex-start' : 'center'}
                            >
                                {content[0].latestMeasurements
                                    .filter(a => !excludedMeasurements.includes(a.measurementType.name))
                                    .slice(3)
                                    .map((a, index) => (
                                        <MeasurementCard
                                            key={index}
                                            measurementType={a.measurementType.name}
                                            value={String(a.value)}
                                        />
                                    ))}
                            </XStack>
                        </YStack>
                    )}

                    <Separator marginVertical="$2"/>

                    <YStack gap="$4">
                        <XStack alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="$2">
                            <YStack gap="$1">
                                <H3 fontSize="$5" fontWeight="600">{t('dashboard.historicalData')}</H3>
                                <Text fontSize="$2" color="$gray11">
                                    {timeRange === 'today' ? t('dashboard.timeRange.today') :
                                        timeRange === 'yesterday' ? t('dashboard.timeRange.yesterday') :
                                            timeRange === 'last7days' ? t('dashboard.timeRange.last7days') :
                                                t('dashboard.timeRange.last30days')}
                                </Text>
                            </YStack>
                            <XStack gap="$2" backgroundColor={isDark ? '$gray8' : '$gray2'} padding="$1"
                                    borderRadius="$3" flexWrap="wrap">
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'today' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'today' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('today')}
                                    borderRadius="$2"
                                >
                                    {t('dashboard.timeRange.todayButton')}
                                </Button>
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'yesterday' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'yesterday' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('yesterday')}
                                    borderRadius="$2"
                                >
                                    {t('dashboard.timeRange.yesterdayButton')}
                                </Button>
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'last7days' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'last7days' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('last7days')}
                                    borderRadius="$2"
                                >
                                    {t('dashboard.timeRange.last7daysButton')}
                                </Button>
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'last30days' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'last30days' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('last30days')}
                                    borderRadius="$2"
                                >
                                    {t('dashboard.timeRange.last30daysButton')}
                                </Button>
                            </XStack>
                        </XStack>

                        <XStack
                            gap="$3"
                            width="100%"
                            justifyContent={media.md ? "center" : "space-between"}
                            flexWrap={media.md ? "wrap" : "nowrap"}
                        >
                            <LineChartCard
                                title={t('dashboard.charts.waterTemperature')}
                                icon={<Thermometer size={20} color="#F97316"/>}
                                chartData={chartWaterTemperature}
                                dataPrecision={dataPrecision}
                                color="#F97316"
                            />
                            <LineChartCard
                                title={t('dashboard.charts.waterLevel')}
                                icon={<Waves size={20} color="#3B82F6"/>}
                                chartData={chartTide}
                                dataPrecision={dataPrecision}
                                color="#3B82F6"
                            />
                            <LineChartCard
                                title={t('dashboard.charts.waveHeight')}
                                icon={<Activity size={20} color="#10B981"/>}
                                chartData={chartWaveHeight}
                                dataPrecision={dataPrecision}
                                color="#10B981"
                            />
                        </XStack>
                    </YStack>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}

{/* <H1
    color="white"
    // fontSize={media.lg ? "$10" : "$8"}
    fontWeight="700"
    textShadowColor="rgba(0,0,0,0.5)"
    textShadowOffset={{width: 0, height: 2}}
    textShadowRadius={4}
>
    {item || 'Lade Daten...'}
</H1> */}


export function SelectDemoContents(props: {router: Router} & { sensorLocations: MarinaNameWithId[]} & { isDark: boolean } & {selectedMarinaId: number} & SelectProps & { trigger?: React.ReactNode }) {
  const [val, setVal] = useState('')
  const { router, isDark, sensorLocations, selectedMarinaId, ...restProps } = props;
  const selectedMarina = sensorLocations.filter(item => item.id === selectedMarinaId)[0] || {id: 0, name: "Unknown"}
  const marinasWithIds: MarinaNameWithId[] = [{id: selectedMarina.id, name: selectedMarina.name}, ...sensorLocations]
  
  return (
    <Select value={""} onValueChange={(e) => {router.push(`/dashboard/${e}`);}} disablePreventBodyScroll {...restProps}>
      {props?.trigger || (
        <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
          <Select.Value placeholder="Something" />
        </Select.Trigger>
      )}

      <Adapt platform="touch">
        <Sheet native={!!props.native} modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor={isDark ? '$gray8' : '$gray2'}
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearG
            x1={0}
            y1={0}
            x2={0}
            y2={1}
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Sensors</Select.Label>
            {useMemo(
              () =>
                marinasWithIds.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.id}
                      //value={item.toLowerCase()}
                      value={item.id.toString()}
                    >
                      <Select.ItemText>
                        {item.name}
                        </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                                            
                  )
                }),
              [sensorLocations]
            )}
          </Select.Group>
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearG
            x1={0}
            y1={0}
            x2={0}
            y2={1}
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

interface MarinaNameWithId {
    name: string;
    id: number;
}

const GetAllAvailableSensorLocations = (data: any) => {
    const locations: MarinaNameWithId[] = [];
    console.log(data)

    data.forEach((element: any) => {
        locations.push({
            id: element.location.id,
            name: element.location.name
        });
    });

    return locations


}

const CreateMeasurementDictionary = (data: any, timeRange: string) => {
    if (!data?.boxes?.[0]?.measurementTimes) return {};

    const measurementTimes = data.boxes[0].measurementTimes;
    const measurementDict: Record<string, { label: string, value: number }[]> = {};

    measurementTimes.forEach((entry: any) => {
        if (!entry.time) return;
        
        


        let label: string;
        if (timeRange === 'last7days' || timeRange === 'last30days') {
            const date = new Date(entry.time);
            label = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else {

            label = entry.time.slice(11, 16);
        }

        Object.entries(entry.measurements || {}).forEach(([key, value]) => {
            if (!measurementDict[key]) {
                measurementDict[key] = [];
            }
            measurementDict[key].push({
                label: label,
                value: Math.ceil(Number(value))
            });
        });
    });

    return measurementDict;
}

type MeasurementCardProps = {
    measurementType: string,
    value: string,
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({measurementType, value}) => {
    const media = useMedia();
    const {t} = useTranslation();

    return (
        <Card
            elevate
            bordered
            animation="quick"
            scale={0.99}
            hoverStyle={{scale: 1}}
            pressStyle={{scale: 0.98}}
            backgroundColor="$background"
            width={media.lg ? 180 : media.md ? 160 : 140}
            height={100}
        >
            <Card.Header padded>
                <XStack gap="$2" alignItems="center" justifyContent="center">
                    {getMeasurementIcon(measurementType, 24)}
                    <YStack alignItems="center">
                        <Text fontSize="$1" color="$gray11" textAlign="center">
                            {getTextFromMeasurementType(measurementType, t)}
                        </Text>
                        <XStack alignItems="baseline" gap="$1">
                            <H4 fontSize="$6" color="$blue10">
                                {value}
                            </H4>
                            <Text fontSize="$3" color="$gray10">
                                {getMeasurementTypeSymbol(measurementType, t)}
                            </Text>
                        </XStack>
                    </YStack>
                </XStack>
            </Card.Header>
        </Card>
    );
}

type LineChartCardProps = {
    title: string,
    icon?: React.ReactNode,
    chartData: { label: string, value: number }[],
    dataPrecision: number,
    color?: string,
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
                                                                title,
                                                                icon,
                                                                chartData,
                                                                dataPrecision,
                                                                color = "#4dabf7"
                                                            }) => {
    const {isDark} = useThemeContext();
    const {t} = useTranslation();
    const media = useMedia();
    const data = chartData.length > 0
        ? chartData.filter((_, idx) => idx % dataPrecision === 0).map(item => item.value)
        : [];

    const labels = chartData.length > 0
        ? chartData.filter((_, idx) => idx % dataPrecision === 0).map(item => item.label)
        : [];

    const showEvery = Math.ceil(labels.length / 6);
    const displayLabels = labels.filter((_, index) => index % showEvery === 0);

    const chartWidth = media.md ? 320 : 400;
    const chartHeight = media.md ? 180 : 220;


    const chartConfig = {
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        backgroundGradientFrom: isDark ? '#1a1a1a' : '#ffffff',
        backgroundGradientTo: isDark ? '#1a1a1a' : '#ffffff',
        decimalPlaces: 1,
        color: (opacity = 1) => color + Math.round(opacity * 255).toString(16).padStart(2, '0'),
        labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: color
        },
        propsForBackgroundLines: {
            strokeDasharray: "5,5",
            stroke: isDark ? '#333' : '#e5e5e5',
            strokeWidth: 1
        }
    };

    return (
        <Card
            elevate
            bordered
            backgroundColor={isDark ? '$gray1' : '$background'}
            flex={media.md ? undefined : 1}
            width={media.md ? "100%" : undefined}
            minWidth={280}
            marginBottom={media.md ? "$3" : 0}
        >
            <Card.Header padded>
                <XStack gap="$2" alignItems="center" justifyContent="space-between">
                    <XStack gap="$2" alignItems="center">
                        {icon}
                        <YStack>
                            <H3 fontSize="$5">{title}</H3>
                            <Text fontSize="$1" color="$gray11">
                                {data.length} {t('dashboard.charts.dataPoints')}
                            </Text>
                        </YStack>
                    </XStack>
                    {data.length > 0 && (
                        <YStack alignItems="flex-end">
                            <Text fontSize="$1" color="$gray11">{t('dashboard.charts.current')}</Text>
                            <XStack alignItems="baseline" gap="$1">
                                <Text fontSize="$6" fontWeight="600" color={color}>
                                    {data[data.length - 1]?.toFixed(1)}
                                </Text>
                                <Text fontSize="$3" color="$gray10">
                                    {title === t('dashboard.charts.waterTemperature') ? t('dashboard.units.celsius') :
                                        title === t('dashboard.charts.waveHeight') ? t('dashboard.units.centimeters') : t('dashboard.units.centimeters')}
                                </Text>
                            </XStack>
                        </YStack>
                    )}
                </XStack>
            </Card.Header>
            <Card.Footer padded paddingTop="$0">
                {data.length > 0 ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <LineChart
                            data={{
                                labels: displayLabels,
                                datasets: [{
                                    data: data.length > 0 ? data : [0],
                                    color: () => color,
                                    strokeWidth: 2.5
                                }]
                            }}
                            width={chartWidth}
                            height={chartHeight}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            withInnerLines={true}
                            withOuterLines={false}
                            withVerticalLines={true}
                            withHorizontalLines={true}
                            withVerticalLabels={true}
                            withHorizontalLabels={true}
                            withDots={data.length < 20}
                            transparent={true}
                        />
                    </View>
                ) : (
                    <YStack height={chartHeight} alignItems="center" justifyContent="center">
                        <Activity size={32} color="$gray8"/>
                        <Text color="$gray10" marginTop="$2">{t('dashboard.charts.noData')}</Text>
                    </YStack>
                )}
            </Card.Footer>
        </Card>
    );
}

const getMeasurementColor = (measurementType: string): string => {
    switch (measurementType) {
        case "Wave Height":
            return "#10B981";
        case "Temperature, water":
        case "WTemp":
            return "#F97316";
        case "Tide":
            return "#3B82F6";
        case "Battery, voltage":
            return "#EAB308";
        default:
            return "#6B7280";
    }
};

const getMeasurementIcon = (measurementType: string, size: number = 24) => {
    const color = getMeasurementColor(measurementType);
    const props = {size, color};
    switch (measurementType) {
        case "Wave Height":
            return <Waves {...props}/>;
        case "Temperature, water":
        case "WTemp":
            return <Thermometer {...props}/>;
        case "Tide":
            return <Activity {...props}/>;
        case "Battery, voltage":
            return <Battery {...props}/>;
        default:
            return <HelpCircle {...props}/>;
    }
};

const getIconBackground = (measurementType: string): string => {
    switch (measurementType) {
        case "Wave Height":
            return "$green5";
        case "Temperature, water":
        case "WTemp":
            return "$orange5";
        case "Tide":
            return "$blue5";
        case "Battery, voltage":
            return "$yellow5";
        default:
            return "$gray5";
    }
};


const getTextFromMeasurementType = (measurementType: string, t: any): string => {
    switch (measurementType) {
        case "Wave Height":
            return t('dashboard.measurements.waveHeight');
        case "Temperature, water":
        case "WTemp":
            return t('dashboard.measurements.waterTemperature');
        case "Tide":
            return t('dashboard.measurements.waterLevel');
        case "Battery, voltage":
            return t('dashboard.measurements.batteryVoltage');
        default:
            return measurementType;
    }
};

const getMeasurementTypeSymbol = (measurementType: string, t: any): string => {
    switch (measurementType) {
        case "Wave Height":
            return t('dashboard.units.centimeters');
        case "Temperature, water":
        case "WTemp":
            return t('dashboard.units.celsius');
        case "Tide":
            return t('dashboard.units.centimeters');
        case "Battery, voltage":
            return t('dashboard.units.volts');
        default:
            return "";
    }
};