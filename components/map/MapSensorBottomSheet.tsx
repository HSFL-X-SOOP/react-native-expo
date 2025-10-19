import {Sheet, Text, YStack, ScrollView} from 'tamagui';
import {ReactNode, useState, useImperativeHandle, forwardRef} from 'react';
import {LocationWithBoxes} from '@/api/models/sensor';

interface MapSensorBottomSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    sensors?: LocationWithBoxes[];
    onSensorSelect?: (sensor: LocationWithBoxes) => void;
}

export interface MapSensorBottomSheetRef {
    snapToPeek: () => void;
}

const MapSensorBottomSheet = forwardRef<MapSensorBottomSheetRef, MapSensorBottomSheetProps>(({
    isOpen,
    onOpenChange,
    children,
    sensors = [],
    onSensorSelect
}, ref) => {
    const [position, setPosition] = useState(2);

    useImperativeHandle(ref, () => ({
        snapToPeek: () => {
            setPosition(2);
        }
    }));
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
            position={position}
            onPositionChange={setPosition}
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
                backgroundColor="$colorTransparent"
                pointerEvents="none"
                style={{ pointerEvents: 'none' }}
            />

            <Sheet.Handle
                backgroundColor="$borderColor"
                pointerEvents="auto"
            />

            <Sheet.Frame
                padding="$0"
                backgroundColor="$background"
                borderTopLeftRadius="$6"
                borderTopRightRadius="$6"
            >
                <ScrollView>
                    <YStack padding="$4" gap="$3">
                        {children}
                    </YStack>
                </ScrollView>
            </Sheet.Frame>
        </Sheet>
    );
});

MapSensorBottomSheet.displayName = 'MapSensorBottomSheet';

export default MapSensorBottomSheet;
