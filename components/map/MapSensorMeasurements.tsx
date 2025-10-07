import {LocationWithBoxes, BoxType} from "@/api/models/sensor";
import {useTranslation} from "@/hooks/useTranslation";
import {
    Activity,
    ArrowRight,
    Battery,
    Compass,
    Droplets,
    Gauge,
    HelpCircle,
    MapPin,
    Thermometer,
    Waves,
    Wind
} from "@tamagui/lucide-icons";
import {useRouter} from "expo-router";
import {Platform} from "react-native";
import {Button, Card, H3, H4, Separator, Text, XStack, YStack, useTheme, Select} from "tamagui";
import {useThemeContext} from "@/context/ThemeSwitch";
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";


type SensorPopupProps = {
    locationWithBoxes: LocationWithBoxes,
    closeOverlay?: () => void
}

export const SensorPopup: React.FC<SensorPopupProps> = ({
                                                            locationWithBoxes,
                                                            closeOverlay
                                                        }) => {
    const router = useRouter();
    const {t} = useTranslation();
    const {isDark} = useThemeContext();
    const theme = useTheme();

    const [selectedBoxIndex, setSelectedBoxIndex] = useState(0);
    const hasMultipleBoxes = locationWithBoxes.boxes.length > 1;
    const displayedBoxes = hasMultipleBoxes
        ? [locationWithBoxes.boxes[selectedBoxIndex]]
        : locationWithBoxes.boxes;

    const cardWidth = Platform.OS === "web" ? 300 : 290;

    const handleNavigateToDashboard = () => {
        closeOverlay?.();
        router.push(`/dashboard/${locationWithBoxes.location.id}`);
    };

    return (
        <Card
            elevate
            bordered
            width={cardWidth}
            borderRadius="$5"
            padding="$0"
            overflow="hidden"
            borderWidth={1}
            borderColor={isDark ? '#2a2a2a' : '$gray4'}
            shadowColor="$shadowColor"
            shadowRadius={12}
            shadowOffset={{width: 0, height: 4}}
        >
            {/* Header with Gradient Background */}
            <YStack>
                <LinearGradient
                    colors={isDark
                        ? [theme.accent9.val, theme.accent8.val, theme.accent7.val]
                        : [theme.accent6.val, theme.accent5.val, theme.accent4.val]
                    }
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{padding: 14}}
                >
                    <XStack alignItems="center" gap="$2.5">
                        <YStack
                            width={38}
                            height={38}
                            borderRadius="$3"
                            backgroundColor="rgba(255,255,255,0.2)"
                            alignItems="center"
                            justifyContent="center"
                            borderWidth={1}
                            borderColor="rgba(255,255,255,0.3)"
                        >
                            <MapPin size={24} color="white"/>
                        </YStack>
                        <YStack flex={1}>
                            <Text fontSize="$1" color="rgba(255,255,255,0.85)" fontWeight="500">
                                {t('sensor.location')}
                            </Text>
                            <H3 fontSize="$7" fontWeight="700" color="white" numberOfLines={1}>
                                {locationWithBoxes.location.name}
                            </H3>
                        </YStack>
                    </XStack>
                </LinearGradient>
            </YStack>

            {/* Body - Measurements */}
            <YStack padding="$3" gap="$3" backgroundColor={isDark ? '#1a1a1a' : '$background'}>
                {locationWithBoxes.boxes.map((box, index) => (
                    <BoxMeasurements key={index} box={box}/>
                ))}
            </YStack>

            {/* Footer - Dashboard Button */}
            <YStack padding="$3" paddingTop="$2.5" backgroundColor={isDark ? '#1a1a1a' : '$background'}>
                <Button
                    size="$3"
                    backgroundColor="$blue9"
                    color="white"
                    width="100%"
                    onPress={handleNavigateToDashboard}
                    iconAfter={<ArrowRight size={18}/>}
                    pressStyle={{
                        backgroundColor: '$blue10',
                        scale: 0.98
                    }}
                    hoverStyle={{
                        backgroundColor: '$blue10',
                        scale: 1.02
                    }}
                    borderRadius="$3"
                    fontWeight="600"
                    fontSize="$4"
                >
                    {t('sensor.viewDashboard')}
                </Button>
            </YStack>
        </Card>
    );
}

type BoxMeasurementsProps = {
    box: LocationWithBoxes['boxes'][0];
};

function BoxMeasurements({box}: BoxMeasurementsProps) {
    const {t} = useTranslation();
    const {isDark} = useThemeContext();

    if (!box.measurementTimes[0]) return null;

    const latestTime = box.measurementTimes[0].time;

    return (
        <YStack gap="$2.5">
            {/* Box Type Header */}
            <XStack
                alignItems="center"
                gap="$2"
                padding="$2"
                backgroundColor={isDark ? '#262626' : '$gray2'}
            >
                <YStack
                    width={26}
                    height={26}
                    borderRadius="$2"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={isDark ? '#333333' : 'white'}
                >
                    {getBoxTypeIcon(box.type)}
                </YStack>
                <H4 fontSize="$3" fontWeight="600" color={isDark ? '#e5e5e5' : '$gray12'}>
                    {getBoxTypeName(box.type, t)}
                </H4>
            </XStack>

            {/* Measurements Grid */}
            <XStack flexWrap="wrap" gap="$2.5" justifyContent="space-between">
                {box.type === BoxType.WaterBox && (
                    <>
                        <MeasurementCard
                            measurementType="waterTemperature"
                            value={box.measurementTimes[0].measurements.waterTemperature}
                        />
                        <MeasurementCard
                            measurementType="waveHeight"
                            value={box.measurementTimes[0].measurements.waveHeight}
                        />
                        <MeasurementCard
                            measurementType="tide"
                            value={box.measurementTimes[0].measurements.tide}
                        />
                    </>
                )}

                {box.type === BoxType.WaterTemperatureOnlyBox && (
                    <MeasurementCard
                        measurementType="waterTemperature"
                        value={box.measurementTimes[0].measurements.waterTemperature}
                    />
                )}

                {box.type === BoxType.AirBox && (
                    <>
                        <MeasurementCard
                            measurementType="airTemperature"
                            value={box.measurementTimes[0].measurements.airTemperature}
                        />
                        <MeasurementCard
                            measurementType="windSpeed"
                            value={box.measurementTimes[0].measurements.windSpeed}
                        />
                        <MeasurementCard
                            measurementType="humidity"
                            value={box.measurementTimes[0].measurements.humidity}
                        />
                        <MeasurementCard
                            measurementType="airPressure"
                            value={box.measurementTimes[0].measurements.airPressure}
                        />
                    </>
                )}
            </XStack>

            {/* Last Measurement Time */}
            <XStack
                alignItems="center"
                gap="$1.5"
                padding="$2"
                backgroundColor={isDark ? '$gray4' : '$gray2'}
                borderRadius="$2"
            >
                <YStack
                    width={20}
                    height={20}
                    borderRadius="$2"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="$green4"
                >
                    <Activity size={11} color="$green10"/>
                </YStack>
                <Text fontSize="$1" color="$gray11" fontWeight="500">
                    {t('sensor.lastMeasurement')}: <Text fontWeight="600"
                                                         color={isDark ? '$gray12' : '$gray12'}>
                    {formatDateTime(latestTime)}
                </Text>
                </Text>
            </XStack>
            <Separator/>
        </YStack>
    );
}

type MeasurementCardProps = {
    measurementType: string;
    value: number;
};

function MeasurementCard({measurementType, value}: MeasurementCardProps) {
    const {t} = useTranslation();
    const {isDark} = useThemeContext();

    const {icon, color, bgColor} = getMeasurementIcon(measurementType);

    return (
        <Card
            width="100%"
            backgroundColor={isDark ? '#262626' : 'white'}
            padding="$2.5"
            borderRadius="$3"
            borderWidth={isDark ? 1 : 0}
            borderColor={isDark ? '#333333' : 'transparent'}
            pressStyle={{scale: 0.97, opacity: 0.9}}
            hoverStyle={{scale: 1.02, borderColor: color}}
            animation={[
                'quick',
                {
                    scale: {
                        overshootClamping: true,
                    },
                },
            ]}
            elevate
            shadowColor={color}
            shadowRadius={6}
            shadowOpacity={0.08}
        >
            <XStack gap={"$2"} justifyContent={"space-between"} alignItems={"center"}>
                <YStack
                    width={36}
                    height={36}
                    borderRadius="$2"
                    backgroundColor={isDark ? `${bgColor}80` : bgColor}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    borderColor={isDark ? '#404040' : `${color}3`}
                >
                    {icon}
                </YStack>
                {/* Label */}
                <Text fontSize="$2" color={isDark ? '#a3a3a3' : '$gray11'} fontWeight="500" numberOfLines={2}
                      lineHeight="$1">
                    {getMeasurementLabel(measurementType, t)}
                </Text>

                {/* Value and Unit */}
                <XStack alignItems="baseline" gap="$1">
                    <Text fontSize="$7" fontWeight="800" color={color} letterSpacing={-0.5}>
                        {Math.round(value * 10) / 10}
                    </Text>
                    <Text fontSize="$3" color={isDark ? '#737373' : '$gray10'} fontWeight="700">
                        {getMeasurementUnit(measurementType, t)}
                    </Text>
                </XStack>
            </XStack>
        </Card>
    );
}

function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, "0");
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const dd = pad(date.getDate());
    const MM = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return `${hh}:${mm} Uhr · ${dd}.${MM}.${yyyy}`;
}

// Helper Functions

function getBoxTypeIcon(boxType: BoxType) {
    const size = 14;
    switch (boxType) {
        case BoxType.WaterBox:
            return <Waves size={size} color="$blue10"/>;
        case BoxType.WaterTemperatureOnlyBox:
            return <Thermometer size={size} color="$orange10"/>;
        case BoxType.AirBox:
            return <Wind size={size} color="$green10"/>;
        default:
            return <HelpCircle size={size} color="$gray10"/>;
    }
}

function getBoxTypeName(boxType: BoxType, t: any): string {
    switch (boxType) {
        case BoxType.WaterBox:
            return t('sensor.waterBox');
        case BoxType.WaterTemperatureOnlyBox:
            return t('sensor.waterTemperatureBox');
        case BoxType.AirBox:
            return t('sensor.airBox');
        default:
            return boxType;
    }
}

function getMeasurementIcon(measurementType: string): { icon: React.ReactNode; color: string; bgColor: string } {
    const size = 18;

    switch (measurementType) {
        case "waterTemperature":
            return {
                icon: <Thermometer size={size} color="$orange10"/>,
                color: "$orange10",
                bgColor: "$orange4"
            };
        case "waveHeight":
            return {
                icon: <Waves size={size} color="$blue10"/>,
                color: "$blue10",
                bgColor: "$blue4"
            };
        case "tide":
            return {
                icon: <Activity size={size} color="$cyan10"/>,
                color: "$cyan10",
                bgColor: "$cyan4"
            };
        case "airTemperature":
            return {
                icon: <Thermometer size={size} color="$red10"/>,
                color: "$red10",
                bgColor: "$red4"
            };
        case "windSpeed":
            return {
                icon: <Wind size={size} color="$green10"/>,
                color: "$green10",
                bgColor: "$green4"
            };
        case "windDirection":
            return {
                icon: <Compass size={size} color="$purple10"/>,
                color: "$purple10",
                bgColor: "$purple4"
            };
        case "humidity":
            return {
                icon: <Droplets size={size} color="$blue10"/>,
                color: "$blue10",
                bgColor: "$blue4"
            };
        case "airPressure":
            return {
                icon: <Gauge size={size} color="$gray10"/>,
                color: "$gray10",
                bgColor: "$gray4"
            };
        case "batteryVoltage":
            return {
                icon: <Battery size={size} color="$yellow10"/>,
                color: "$yellow10",
                bgColor: "$yellow4"
            };
        default:
            return {
                icon: <HelpCircle size={size} color="$gray10"/>,
                color: "$gray10",
                bgColor: "$gray4"
            };
    }
}

function getMeasurementLabel(measurementType: string, t: any): string {
    switch (measurementType) {
        case "waterTemperature":
            return t('sensor.waterTemperature');
        case "waveHeight":
            return t('sensor.waveHeight');
        case "tide":
            return t('sensor.tide');
        case "airTemperature":
            return t('sensor.airTemperature');
        case "windSpeed":
            return t('sensor.windSpeed');
        case "windDirection":
            return t('sensor.windDirection');
        case "humidity":
            return t('sensor.humidity');
        case "airPressure":
            return t('sensor.airPressure');
        case "batteryVoltage":
            return t('sensor.batteryVoltage');
        default:
            return measurementType;
    }
}

function getMeasurementUnit(measurementType: string, t: any): string {
    switch (measurementType) {
        case "waterTemperature":
        case "airTemperature":
            return t('dashboard.units.celsius');
        case "waveHeight":
        case "tide":
            return t('dashboard.units.centimeters');
        case "windSpeed":
            return "m/s";
        case "windDirection":
            return "°";
        case "humidity":
            return "%";
        case "airPressure":
            return "hPa";
        case "batteryVoltage":
            return "V";
        default:
            return "";
    }
}
