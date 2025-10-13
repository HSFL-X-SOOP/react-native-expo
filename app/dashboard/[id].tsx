import {LocationWithBoxes} from '@/api/models/sensor';
import {LineChartCard} from '@/components/dashboard/chart/LineChartCard';
import {ChartTimeRange, TimeRangeButton} from '@/components/dashboard/chart/TimeRangeButton';
import {MeasurementCard} from '@/components/dashboard/MeasurementCard';
import {NavigateDashboardDropdownMenu} from '@/components/dashboard/NavigateDropdownMenu';
import {useThemeContext} from '@/context/ThemeSwitch';
import {useSensorDataNew, useSensorDataTimeRange} from '@/hooks/useSensors';
import {useTranslation} from '@/hooks/useTranslation';
import {ChartDataPoint} from '@/types/chart';
import {MarinaNameWithId} from '@/types/marina';
import {
    CreateMeasurementDictionary,
    GetLatestMeasurements,
    formatMeasurementValue,
    getIconBackground,
    getMeasurementColor,
    getMeasurementIcon,
    getMeasurementTypeSymbol,
    getTextFromMeasurementType
} from '@/utils/measurements';
import {formatTimeToLocal} from '@/utils/time';
import {
    Activity,
    ChevronDown,
    ChevronUp,
    Clock,
    Home,
    MapPin,
    Thermometer,
    Waves
} from '@tamagui/lucide-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import {
    Button,
    Card,
    H1,
    H2,
    H3,
    Image,
    Separator,
    Stack,
    Text,
    XStack,
    YStack,
    useMedia
} from 'tamagui';

export default function DashboardScreen() {
    const media = useMedia();
    const router = useRouter();
    const {t} = useTranslation();
    const {isDark} = useThemeContext();
    const [showInfo, setShowInfo] = useState(false);
    const infoHeight = useRef(new Animated.Value(0)).current;
    let {id} = useLocalSearchParams();

    if (!id) {
        id = "4";
    }

    const [timeRange, setTimeRange] = useState<ChartTimeRange>('today');

    const {data: allSensorData} = useSensorDataNew();

    const content = useMemo(
        () => allSensorData.filter((location: LocationWithBoxes) => String(location.location.id) === id),
        [allSensorData, id]
    );

    const name = useMemo(() => content[0]?.location.name || "", [content]);

    const GetAllAvailableSensorLocations = (data: LocationWithBoxes[]): MarinaNameWithId[] => {
        const locationMap = new Map<number, MarinaNameWithId>();

        data.forEach((element) => {
            if (element.location?.id && element.location?.name) {
                locationMap.set(element.location.id, {
                    id: element.location.id,
                    name: element.location.name
                });
            }
        });

        return Array.from(locationMap.values());
    }

    const sensorLocations = useMemo(
        () => GetAllAvailableSensorLocations(allSensorData),
        [allSensorData]
    );

    const dataPrecision = useMemo(() => {
        switch (timeRange) {
            case 'last30days':
                return 6;
            case 'last7days':
                return 3;
            case 'yesterday':
                return 3;
            default:
                return 3;
        }
    }, [timeRange]);

    const isAdmin = false;

    const excludedMeasurements = useMemo(() => {
        const excluded = ["Standard deviation"];
        if (!isAdmin) {
            excluded.push("Battery, voltage");
        }
        return excluded;
    }, [isAdmin]);


    const [chartWaterTemperature, setChartWaterTemperature] = useState<ChartDataPoint[]>([])
    const [chartTide, setChartTide] = useState<ChartDataPoint[]>([])
    const [chartWaveHeight, setChartWaveHeight] = useState<ChartDataPoint[]>([])

    const apiTimeRange = useMemo(() => {
        switch (timeRange) {
            case 'yesterday':
                return '48h';
            case 'last7days':
                return '7d';
            case 'last30days':
                return '30d';
            default:
                return '24h';
        }
    }, [timeRange]);

    const {data: timeRangeData} = useSensorDataTimeRange(Number(id), apiTimeRange);

    useEffect(() => {
        if (timeRangeData) {
            const measurementDict = CreateMeasurementDictionary(timeRangeData, timeRange);

            const tideData = measurementDict["tide"]?.reverse() || [];
            const waveData = measurementDict["waveHeight"]?.reverse() || [];
            const tempData = measurementDict["waterTemperature"]?.reverse() || [];
            setChartTide(tideData);
            setChartWaveHeight(waveData);
            setChartWaterTemperature(tempData);
        }
    }, [timeRangeData, timeRange])

    const filteredMeasurements = useMemo(() => {
        if (!content[0]?.boxes) return [];
        const latestMeasurements = GetLatestMeasurements(content[0].boxes);
        return latestMeasurements.filter(
            m => !excludedMeasurements.includes(m.measurementType)
        );
    }, [content, excludedMeasurements]);

    const currentWaterTemp = useMemo(() => {
        const measurement = filteredMeasurements.find(m =>
            m.measurementType === "Temperature, water" ||
            m.measurementType === "WTemp"
        );
        return measurement?.value;
    }, [filteredMeasurements]);

    const currentWaveHeight = useMemo(() => {
        const measurement = filteredMeasurements.find(m =>
            m.measurementType === "Wave Height"
        );
        return measurement?.value;
    }, [filteredMeasurements]);

    const currentWaterLevel = useMemo(() => {
        const measurement = filteredMeasurements.find(m =>
            m.measurementType === "Tide"
        );
        return measurement?.value;
    }, [filteredMeasurements]);

    const toggleInfo = () => {
        setShowInfo((prev) => !prev);
        Animated.timing(infoHeight, {
            toValue: showInfo ? 0 : 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const latestTime = content[0]?.boxes[0].measurementTimes[0].time ? content[0].boxes[0].measurementTimes[0].time : new Date().toISOString();

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
                            <NavigateDashboardDropdownMenu isDark={isDark} router={router}
                                                           sensorLocations={sensorLocations}
                                                           selectedMarinaId={Number(id)} id="select-demo-2" native/>
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
                                <Text fontSize="$2"
                                      color="$gray11">{t('dashboard.live')} {formatTimeToLocal(latestTime)}</Text>
                            </XStack>
                        </XStack>
                        <XStack
                            gap="$3"
                            width="100%"
                            flexWrap={media.md ? "wrap" : "nowrap"}
                            justifyContent={media.md ? "center" : "space-between"}
                        >
                            {filteredMeasurements
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
                                                    backgroundColor={getIconBackground(measurement.measurementType)}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    {getMeasurementIcon(measurement.measurementType, 32)}
                                                </Stack>
                                                <YStack alignItems="center" gap="$2">
                                                    <Text
                                                        color="$gray11"
                                                        fontSize="$4"
                                                        fontWeight="600"
                                                        textAlign="center"
                                                    >
                                                        {getTextFromMeasurementType(measurement.measurementType, t)}
                                                    </Text>
                                                    <XStack alignItems="baseline" gap="$2">
                                                        <H2 fontSize="$10" fontWeight="700"
                                                            color={getMeasurementColor(measurement.measurementType)}>
                                                            {formatMeasurementValue(measurement.value)}
                                                        </H2>
                                                        <Text fontSize="$6"
                                                              color={getMeasurementColor(measurement.measurementType)}
                                                              fontWeight="600">
                                                            {getMeasurementTypeSymbol(measurement.measurementType, t)}
                                                        </Text>
                                                    </XStack>
                                                </YStack>
                                            </YStack>
                                        </Card.Header>
                                    </Card>
                                ))}
                        </XStack>
                    </YStack>


                    {filteredMeasurements.length > 3 && (
                        <YStack gap="$3">
                            <H2 fontSize="$6">{t('dashboard.furtherMeasurements')}</H2>
                            <XStack
                                flexWrap="wrap"
                                gap="$3"
                                justifyContent={media.lg ? 'flex-start' : 'center'}
                            >
                                {filteredMeasurements
                                    .slice(3)
                                    .map((a, index) => (
                                        <MeasurementCard
                                            key={index}
                                            measurementType={a.measurementType}
                                            value={formatMeasurementValue(a.value)}
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
                                <TimeRangeButton
                                    timeRange="today"
                                    selectedTimeRange={timeRange}
                                    buttonText={t('dashboard.timeRange.todayButton')}
                                    setTimeRange={setTimeRange}
                                    isDark={isDark}
                                />

                                <TimeRangeButton
                                    timeRange="yesterday"
                                    selectedTimeRange={timeRange}
                                    buttonText={t('dashboard.timeRange.yesterdayButton')}
                                    setTimeRange={setTimeRange}
                                    isDark={isDark}
                                />

                                <TimeRangeButton
                                    timeRange='last7days'
                                    selectedTimeRange={timeRange}
                                    buttonText={t('dashboard.timeRange.last7daysButton')}
                                    setTimeRange={setTimeRange}
                                    isDark={isDark}
                                />

                                <TimeRangeButton
                                    timeRange="last30days"
                                    selectedTimeRange={timeRange}
                                    buttonText={t('dashboard.timeRange.last30daysButton')}
                                    setTimeRange={setTimeRange}
                                    isDark={isDark}
                                />
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
                                currentValue={currentWaterTemp}
                            />
                            <LineChartCard
                                title={t('dashboard.charts.waveHeight')}
                                icon={<Activity size={20} color="#10B981"/>}
                                chartData={chartWaveHeight}
                                dataPrecision={dataPrecision}
                                color="#10B981"
                                currentValue={currentWaveHeight}
                            />
                            <LineChartCard
                                title={t('dashboard.charts.waterLevel')}
                                icon={<Waves size={20} color="#3B82F6"/>}
                                chartData={chartTide}
                                dataPrecision={dataPrecision}
                                color="#3B82F6"
                                currentValue={currentWaterLevel}
                            />
                        </XStack>
                    </YStack>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}





