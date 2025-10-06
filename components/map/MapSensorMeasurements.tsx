import {LocationWithBoxes, BoxType} from "@/api/models/sensor";
import {useTranslation} from "@/hooks/useTranslation";
import {ArrowLeft, Battery, HelpCircle, Thermometer, Waves} from "@tamagui/lucide-icons";
import {useRouter} from "expo-router";
import {Platform, TouchableOpacity} from "react-native";
import {Text, XStack, YStack} from "tamagui";


type SensorPopupProps = {
    locationWithBoxes: LocationWithBoxes,
    closeOverlay?: () => void
}

export const SensorPopup: React.FC<SensorPopupProps> = ({
                                                            locationWithBoxes,
                                                            closeOverlay
                                                        }) => {
    const router = useRouter();

    const cardWidth = Platform.OS === "web" ? 300 : 320;
    const cardMinHeight = 200;

    const handleClose = () => {
        closeOverlay?.();
        router.push(`/dashboard/${locationWithBoxes.location.id}`);
    };

    return (
        <YStack
            backgroundColor="$background"
            padding="$3"
            borderRadius="$4"
            width={cardWidth}
            minHeight={cardMinHeight}
            shadowColor="$shadowColor"
            shadowOffset={{width: 0, height: 2}}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={3}
        >
            <Text fontSize={16} color="$gray10">Name</Text>

            <TouchableOpacity onPress={handleClose}>
                <Text fontSize={24} color="$color" fontWeight="600">
                    {locationWithBoxes.location.name}
                </Text>
            </TouchableOpacity>

            {locationWithBoxes.boxes.map((box, index) => (
                <BoxMeasurements key={index} box={box}/>
            ))}
        </YStack>
    );
}

type BoxMeasurementsProps = {
    box: LocationWithBoxes['boxes'][0];
};

function BoxMeasurements({box}: BoxMeasurementsProps) {
    const {t} = useTranslation();

    if (!box.measurementTimes[0]) return null;

    const latestTime = box.measurementTimes[0].time;

    return (
        <XStack flexWrap="wrap" width="100%" justifyContent="space-between" marginTop="$3">
            {box.type === BoxType.WaterBox && (
                <>
                    <MeasurementCard
                        measurementType="Temperature, water"
                        value={box.measurementTimes[0].measurements.waterTemperature}
                    />
                    <MeasurementCard
                        measurementType="Wave Height"
                        value={box.measurementTimes[0].measurements.waveHeight}
                    />
                    <MeasurementCard
                        measurementType="Tide"
                        value={box.measurementTimes[0].measurements.tide}
                    />
                </>
            )}

            {box.type === BoxType.WaterTemperatureOnlyBox && (
                <MeasurementCard
                    measurementType="Temperature, water"
                    value={box.measurementTimes[0].measurements.waterTemperature}
                />
            )}

            <XStack width="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize={14}>
                    {t('last.measurement')}: {formatDateTime(latestTime)}
                </Text>
            </XStack>
        </XStack>
    );
}

type MeasurementCardProps = {
    measurementType: string;
    value: number;
};

function MeasurementCard({measurementType, value}: MeasurementCardProps) {
    return (
        <YStack width="48%" marginBottom="$2">
            <Text fontSize={16} color="$gray10">
                {getTextFromMeasurementType(measurementType)}
            </Text>
            <XStack alignItems="center">
                <Text fontSize={24} color="$color">
                    {value}{getMeasurementTypeSymbol(measurementType)}{" "}
                </Text>
                {getMeasurementTypeIcon(measurementType, "$color")}
            </XStack>
        </YStack>
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

const getMeasurementTypeIcon = (measurementType: string, color?: string) => {
    const iconColor = color || "#000000";
    const size = 24;

    switch (measurementType) {
        case "Wave Height":
            return <Waves color={iconColor} size={size}/>;
        case "Temperature, water":
            return <Thermometer color={iconColor} size={size}/>;
        case "WTemp":
            return <Thermometer color={iconColor} size={size}/>;
        case "Tide":
            //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
            return <ArrowLeft color={iconColor} size={size}/>;
        case "Battery, voltage":
            return <Battery color={iconColor} size={size}/>;
        default:
            return <HelpCircle color={iconColor} size={size}/>;
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
