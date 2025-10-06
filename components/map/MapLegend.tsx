import { BoxType } from "@/api/models/sensor";
import { useTranslation } from "@/hooks/useTranslation";
import { View } from "react-native";
import { Text, YStack, XStack } from "tamagui";

export default function MapLegend() {
    const { t } = useTranslation();

    const legendItems = [
        { type: BoxType.WaterBox, color: '#0052ff', label: 'WaterBox' },
        { type: BoxType.WaterTemperatureOnlyBox, color: '#d900ff', label: 'Wassertemperatur' },
        { type: BoxType.AirBox, color: '#ff9a00', label: 'Wetter Station' },
    ];

    return (
        <YStack
            position="absolute"
            top={20}
            left={20}
            backgroundColor="$background"
            padding="$3"
            borderRadius="$3"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={3}
            gap="$2"
            zIndex={1000}
        >
            <Text fontSize={14} fontWeight="600" color="$color">
                Legende
            </Text>
            {legendItems.map((item) => (
                <XStack key={item.type} alignItems="center" gap="$2">
                    <View
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: item.color,
                        }}
                    />
                    <Text fontSize={12} color="$color">
                        {item.label}
                    </Text>
                </XStack>
            ))}
        </YStack>
    );
}
