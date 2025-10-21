import {ChevronDown, ChevronUp} from '@tamagui/lucide-icons';
import {Button, ScrollView, Sheet, View, XStack, YStack, Image, Text} from 'tamagui';
import {ReactNode} from 'react';
import {LocationWithBoxes} from '@/api/models/sensor';

interface MapSensorDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
    sensors?: LocationWithBoxes[];
    onSensorSelect?: (sensor: LocationWithBoxes) => void;
}

export default function MapSensorDrawer({isOpen, onToggle, children, sensors = [], onSensorSelect}: MapSensorDrawerProps) {
    return (
        <Sheet
            forceRemoveScrollEnabled={isOpen}
            modal={false}
            open={isOpen}
            onOpenChange={onToggle}
            snapPoints={[20, 60, 90]}
            dismissOnSnapToBottom
            position={0}
            zIndex={100_000}
            animation="quick"
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
            />

            <Sheet.Handle backgroundColor="$borderColor"/>

            {/* Compact horizontal sensor list in the peeking part */}
            <View position="absolute" top={16} left={0} right={0} zIndex={1} height={80}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <XStack gap="$2" paddingHorizontal="$3">
                        {sensors.slice(0, 10).map((sensor) => (
                            <Button
                                key={sensor.location.id}
                                size="$2"
                                chromeless
                                padding="$2"
                                onPress={() => onSensorSelect?.(sensor)}
                                backgroundColor="$content2"
                                borderRadius="$2"
                                pressStyle={{
                                    backgroundColor: "$accent5",
                                    scale: 0.95
                                }}
                                animation="quick"
                                width={60}
                                height={70}
                            >
                                <YStack gap="$1" alignItems="center" width="100%">
                                    <Image
                                        source={require('@/assets/markers/Single.svg')}
                                        width={16}
                                        height={30}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        fontSize={8}
                                        color="$color"
                                        textAlign="center"
                                        numberOfLines={2}
                                        width="100%"
                                        lineHeight={9}
                                    >
                                        {sensor.location.name}
                                    </Text>
                                </YStack>
                            </Button>
                        ))}
                    </XStack>
                </ScrollView>
            </View>

            <Sheet.Frame
                padding="$0"
                backgroundColor="$background"
                borderTopLeftRadius="$4"
                borderTopRightRadius="$4"
            >
                {/* Header */}
                <XStack
                    paddingVertical="$3"
                    paddingHorizontal="$4"
                    borderBottomWidth={1}
                    borderColor="$borderColor"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Button
                        size="$3"
                        chromeless
                        icon={isOpen ? ChevronDown : ChevronUp}
                        onPress={onToggle}
                        circular
                        aria-label={isOpen ? "Close drawer" : "Open drawer"}
                    />
                </XStack>

                {/* Content */}
                <ScrollView flex={1} contentContainerStyle={{padding: 0}}>
                    <YStack padding="$0">
                        {children}
                    </YStack>
                </ScrollView>
            </Sheet.Frame>
        </Sheet>
    );
}
