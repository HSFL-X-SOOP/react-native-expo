import {useRef, useState, useEffect} from 'react';
import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import {useThemeContext} from '@/context/ThemeSwitch';
import {GetGeomarData, GetGeomarDataTimeRange} from '@/data/geomar-data';
import {SensorModule} from '@/data/sensor';
import {useLocalSearchParams} from 'expo-router';
import {Grid, XAxis, YAxis, AreaChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
    XStack,
    YStack,
    Card,
    H1,
    H2,
    H3,
    H4,
    Text,
    Button,
    Image,
    Stack,
    Separator,
    useMedia
} from 'tamagui';
import {
    ChevronDown,
    ChevronUp,
    Home,
    Thermometer,
    Waves,
    Battery,
    HelpCircle,
    MapPin,
    Clock,
    Activity
} from '@tamagui/lucide-icons';

export default function DashboardScreen() {
    const media = useMedia();
    const {isDark} = useThemeContext();
    const [showInfo, setShowInfo] = useState(false);
    const infoHeight = useRef(new Animated.Value(0)).current;
    let {id} = useLocalSearchParams();

    if (!id) {
        id = "4"; // Default-Wert, falls id nicht vorhanden ist
    }

    const [content, setContent] = useState<SensorModule[]>([])
    const [name, setName] = useState<string>("")
    const [, setLoading] = useState(true)
    const [dataPrecision] = useState<number>(3)
    const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await GetGeomarData()
                setContent(data.filter((sensor: SensorModule) => String(sensor.location.id) === id))
                setName(data.filter((sensor: SensorModule) => String(sensor.location.id) === id)[0]?.location.name || "")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id, timeRange])

    const isAdmin = false; //TODO: Hier prüfen ob Admin
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
            let data = await GetGeomarDataTimeRange(id, timeRange)
            const measurementDict = CreateMeasurementDictionary(data);

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
                {/* Hero Section with Image */}
                <Stack position="relative" width="100%" height={media.lg ? 350 : 250} overflow="hidden">
                    <Image
                        source={{
                            uri: "https://www.im-jaich.de/wp-content/uploads/2022/07/im-jaich-Flensburg-2019-0196-Kristina-Steiner.jpg",
                        }}
                        width="100%"
                        height="100%"
                    />

                    {/* Simple Gradient Overlay */}
                    <Stack
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        height="60%"
                        background="linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)"
                    />

                    {/* Hero Content */}
                    <Stack position="absolute" bottom="$4" left="$4" right="$4">
                        <Text color="white" fontSize="$3" opacity={0.9} marginBottom="$1">
                            Sensor Dashboard
                        </Text>
                        <H1
                            color="white"
                            fontSize={media.lg ? "$10" : "$8"}
                            fontWeight="700"
                            textShadowColor="rgba(0,0,0,0.5)"
                            textShadowOffset={{width: 0, height: 2}}
                            textShadowRadius={4}
                        >
                            {name || 'Lade Daten...'}
                        </H1>
                    </Stack>
                </Stack>

                {/* Main Content Container */}
                <YStack
                    padding="$4"
                    gap="$5"
                    maxWidth={1400}
                    width="100%"
                    alignSelf="center"
                    marginTop={-30}
                >

                    {/* Harbor Info Card - Simple Clean Design */}
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
                                        <Text color="$gray11" fontSize="$2">Hafen</Text>
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
                                                <Text fontSize="$1" color="$gray11">Adresse</Text>
                                                <Text fontSize="$3">Am Hafen 1, 24937 Flensburg</Text>
                                            </YStack>
                                        </XStack>
                                        <XStack gap="$2" alignItems="center" minWidth={200}>
                                            <Clock size={18} color="$gray10"/>
                                            <YStack>
                                                <Text fontSize="$1" color="$gray11">Öffnungszeiten</Text>
                                                <Text fontSize="$3">Täglich 06:00 - 22:00 Uhr</Text>
                                            </YStack>
                                        </XStack>
                                    </XStack>
                                </Card.Footer>
                            )}
                        </Animated.View>
                    </Card>

                    {/* Quick Stats Cards - Clean Simple Design */}
                    <YStack gap="$3">
                        <XStack alignItems="center" justifyContent="space-between">
                            <H3 fontSize="$5" fontWeight="600">Aktuelle Messwerte</H3>
                            <XStack gap="$1" alignItems="center">
                                <Stack width={6} height={6} borderRadius="$5" backgroundColor="$green9"/>
                                <Text fontSize="$2" color="$gray11">Live</Text>
                            </XStack>
                        </XStack>
                        <XStack
                            gap="$3"
                            width="100%"
                            flexWrap="nowrap"
                            justifyContent="space-between"
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
                                        flex={1}
                                        borderWidth={1}
                                        borderColor="$borderColor"
                                    >
                                        <Card.Header padded>
                                            <YStack gap="$3" alignItems="center">
                                                <Stack
                                                    width={40}
                                                    height={40}
                                                    borderRadius="$3"
                                                    backgroundColor={getIconBackground(measurement.measurementType.name)}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    {getMeasurementIcon(measurement.measurementType.name, 22)}
                                                </Stack>
                                                <YStack alignItems="center" gap="$1">
                                                    <Text
                                                        color="$gray11"
                                                        fontSize="$2"
                                                        fontWeight="500"
                                                        textAlign="center"
                                                    >
                                                        {getTextFromMeasurementType(measurement.measurementType.name)}
                                                    </Text>
                                                    <XStack alignItems="baseline" gap="$1">
                                                        <H2 fontSize="$8" fontWeight="600" color="$color">
                                                            {measurement.value}
                                                        </H2>
                                                        <Text fontSize="$4" color="$gray10">
                                                            {getMeasurementTypeSymbol(measurement.measurementType.name)}
                                                        </Text>
                                                    </XStack>
                                                </YStack>
                                            </YStack>
                                        </Card.Header>
                                    </Card>
                                ))}
                        </XStack>
                    </YStack>


                    {/* All Measurements Grid */}
                    {content[0] && content[0].latestMeasurements.filter(a => !excludedMeasurements.includes(a.measurementType.name)).length > 3 && (
                        <YStack gap="$3">
                            <H2 fontSize="$6">Weitere Messwerte</H2>
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

                    {/* Charts Section */}
                    <YStack gap="$4">
                        <XStack alignItems="center" justifyContent="space-between">
                            <YStack gap="$1">
                                <H3 fontSize="$5" fontWeight="600">Verlaufsdaten</H3>
                                <Text fontSize="$2" color="$gray11">
                                    {timeRange === 'today' ? 'Heute' : timeRange === 'week' ? 'Letzte 7 Tage' : 'Letzter Monat'}
                                </Text>
                            </YStack>
                            <XStack gap="$2" backgroundColor={isDark ? '$gray8' : '$gray2'} padding="$1"
                                    borderRadius="$3">
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'today' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'today' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('today')}
                                    borderRadius="$2"
                                >
                                    Heute
                                </Button>
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'week' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'week' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('week')}
                                    borderRadius="$2"
                                >
                                    Woche
                                </Button>
                                <Button
                                    size="$2"
                                    variant="outlined"
                                    color={timeRange === 'month' ? '$blue10' : '$gray10'}
                                    backgroundColor={timeRange === 'month' ? (isDark ? '$gray9' : '$background') : 'transparent'}
                                    onPress={() => setTimeRange('month')}
                                    borderRadius="$2"
                                >
                                    Monat
                                </Button>
                            </XStack>
                        </XStack>

                        <XStack
                            gap="$3"
                            width="100%"
                            justifyContent="space-between"
                            flexWrap="nowrap"
                        >
                            <LineChartCard
                                title="Wassertemperatur"
                                icon={<Thermometer size={20} color="#F97316"/>}
                                chartData={chartWaterTemperature}
                                dataPrecision={dataPrecision}
                                color="#F97316"
                            />
                            <LineChartCard
                                title="Tide"
                                icon={<Waves size={20} color="#3B82F6"/>}
                                chartData={chartTide}
                                dataPrecision={dataPrecision}
                                color="#3B82F6"
                            />
                            <LineChartCard
                                title="Wellenhöhe"
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

const CreateMeasurementDictionary = (data: any) => {
    if (!data?.boxes?.[0]?.measurementTimes) return {};

    const measurementTimes = data.boxes[0].measurementTimes;
    const measurementDict: Record<string, { label: string, value: number }[]> = {};

    measurementTimes.forEach((entry: any) => {
        if (!entry.time) return; // Skip if no time available

        Object.entries(entry.measurements || {}).forEach(([key, value]) => {
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

type MeasurementCardProps = {
    measurementType: string,
    value: string,
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({measurementType, value}) => {
    const media = useMedia();

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
                            {getTextFromMeasurementType(measurementType)}
                        </Text>
                        <XStack alignItems="baseline" gap="$1">
                            <H4 fontSize="$6" color="$blue10">
                                {value}
                            </H4>
                            <Text fontSize="$3" color="$gray10">
                                {getMeasurementTypeSymbol(measurementType)}
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

    // Prepare data for svg-charts (needs array of numbers)
    const data = chartData.length > 0
        ? chartData.filter((_, idx) => idx % dataPrecision === 0).map(item => item.value)
        : [];

    const labels = chartData.length > 0
        ? chartData.filter((_, idx) => idx % dataPrecision === 0).map(item => item.label)
        : [];

    const contentInset = {top: 20, bottom: 20};
    const chartHeight = 200;

    return (
        <Card
            elevate
            bordered
            backgroundColor="$background"
            flex={1}
            minWidth={280}
        >
            <Card.Header padded>
                <XStack gap="$2" alignItems="center" justifyContent="space-between">
                    <XStack gap="$2" alignItems="center">
                        {icon}
                        <YStack>
                            <H3 fontSize="$5">{title}</H3>
                            <Text fontSize="$1" color="$gray11">
                                {data.length} Datenpunkte
                            </Text>
                        </YStack>
                    </XStack>
                    {data.length > 0 && (
                        <YStack alignItems="flex-end">
                            <Text fontSize="$1" color="$gray11">Aktuell</Text>
                            <XStack alignItems="baseline" gap="$1">
                                <Text fontSize="$6" fontWeight="600" color={color}>
                                    {data[data.length - 1]?.toFixed(1)}
                                </Text>
                                <Text fontSize="$3" color="$gray10">
                                    {title === "Wassertemperatur" ? "°C" :
                                        title === "Wellenhöhe" ? "cm" : "cm"}
                                </Text>
                            </XStack>
                        </YStack>
                    )}
                </XStack>
            </Card.Header>
            <Card.Footer padded paddingTop="$0" width="100%">
                {data.length > 0 ? (
                    <View style={{height: chartHeight + 30, flexDirection: 'row', width: '100%'}}>
                        <YAxis
                            data={data}
                            contentInset={contentInset}
                            svg={{
                                fill: isDark ? '#999' : '#666',
                                fontSize: 10,
                            }}
                            numberOfTicks={5}
                            formatLabel={(value: number) => `${value.toFixed(0)}`}
                            style={{marginRight: 10, width: 35}}
                        />
                        <View style={{flex: 1, width: '100%'}}>
                            <AreaChart
                                style={{height: chartHeight, width: '100%'}}
                                data={data}
                                contentInset={contentInset}
                                curve={shape.curveNatural}
                                svg={{
                                    fill: color + '30',
                                    stroke: color,
                                    strokeWidth: 2.5
                                }}
                                numberOfTicks={5}
                            >
                                <Grid
                                    svg={{
                                        stroke: isDark ? '#333' : '#e5e5e5',
                                        strokeDasharray: [5, 5]
                                    }}
                                />
                            </AreaChart>
                            <XAxis
                                style={{marginTop: 10, height: 20}}
                                data={data}
                                formatLabel={(_value: number, index: number) => {
                                    // Show every nth label to avoid crowding
                                    const showEvery = Math.ceil(labels.length / 6);
                                    return index % showEvery === 0 ? labels[index] : '';
                                }}
                                contentInset={{left: 20, right: 20}}
                                svg={{
                                    fontSize: 10,
                                    fill: isDark ? '#999' : '#666',
                                    rotation: -45,
                                    originY: 15,
                                    y: 5
                                }}
                            />
                        </View>
                    </View>
                ) : (
                    <YStack height={chartHeight} alignItems="center" justifyContent="center">
                        <Activity size={32} color="$gray8"/>
                        <Text color="$gray10" marginTop="$2">Keine Daten verfügbar</Text>
                    </YStack>
                )}
            </Card.Footer>
        </Card>
    );
}

const getMeasurementIcon = (measurementType: string, size: number = 24) => {
    const color = getValueColor(measurementType);
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

const getValueColor = (measurementType: string): string => {
    switch (measurementType) {
        case "Wave Height":
            return "$green10";
        case "Temperature, water":
        case "WTemp":
            return "$orange10";
        case "Tide":
            return "$blue10";
        case "Battery, voltage":
            return "$yellow10";
        default:
            return "$gray10";
    }
};

const getTextFromMeasurementType = (measurementType: string): string => {
    switch (measurementType) {
        case "Wave Height":
            return "Wellenhöhe";
        case "Temperature, water":
        case "WTemp":
            return "Wassertemperatur";
        case "Tide":
            return "Tide";
        case "Battery, voltage":
            return "Batteriespannung";
        default:
            return measurementType;
    }
};

const getMeasurementTypeSymbol = (measurementType: string): string => {
    switch (measurementType) {
        case "Wave Height":
            return "cm";
        case "Temperature, water":
        case "WTemp":
            return "°C";
        case "Tide":
            return "cm";
        case "Battery, voltage":
            return "V";
        default:
            return "";
    }
};