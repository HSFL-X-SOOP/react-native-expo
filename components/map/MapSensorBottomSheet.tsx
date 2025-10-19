import {Sheet, Text, YStack, ScrollView} from 'tamagui';
import {ReactNode} from 'react';
import {LocationWithBoxes} from '@/api/models/sensor';

interface MapSensorBottomSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    sensors?: LocationWithBoxes[];
    onSensorSelect?: (sensor: LocationWithBoxes) => void;
}

export default function MapSensorBottomSheet({
    isOpen,
    onOpenChange,
    children,
    sensors = [],
    onSensorSelect
}: MapSensorBottomSheetProps) {
    return (
        <Sheet
            modal={false}
            open={isOpen}
            onOpenChange={onOpenChange}
            snapPoints={[85, 50, 25]}
            snapPointsMode="percent"
            dismissOnSnapToBottom
            dismissOnOverlayPress={false}
            animation="medium"
            zIndex={100000}
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
                backgroundColor="$colorTransparent"
                pointerEvents="none"
            />
            {/* Keep handle outside of Frame so Frame can be pointer-events:none */}
            <Sheet.Handle
                backgroundColor="$borderColor"
                pointerEvents="auto"
            />

            <Sheet.Frame
                padding="$0"
                backgroundColor="$background"
                borderTopLeftRadius="$6"
                borderTopRightRadius="$6"
                pointerEvents="none"
            >
                <ScrollView pointerEvents="none">
                    <YStack padding="$4" gap="$3">
                        {children}
                    </YStack>
                </ScrollView>
            </Sheet.Frame>
        </Sheet>
    );
}
