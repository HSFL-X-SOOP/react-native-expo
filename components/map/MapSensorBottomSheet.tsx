import {Sheet, YStack} from 'tamagui';
import {ReactNode, useState, useImperativeHandle, forwardRef, useEffect} from 'react';

interface MapSensorBottomSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export interface MapSensorBottomSheetRef {
    snapToPeek: () => void;
}

const MapSensorBottomSheet = forwardRef<MapSensorBottomSheetRef, MapSensorBottomSheetProps>(({
                                                                                                 isOpen,
                                                                                                 onOpenChange,
                                                                                                 children
                                                                                             }, ref) => {
    const [position, setPosition] = useState(1);

    useImperativeHandle(ref, () => ({
        snapToPeek: () => {
            setPosition(1);
        }
    }));

    // Ensure position resets to peek when sheet is opened
    useEffect(() => {
        if (isOpen) {
            setPosition(1);
        }
    }, [isOpen]);

    return (
        <Sheet
            modal={false}
            open={isOpen}
            onOpenChange={onOpenChange}
            snapPoints={[52.5, 17.5]}
            snapPointsMode="percent"
            dismissOnSnapToBottom
            dismissOnOverlayPress={false}
            animation="medium"
            zIndex={100000}
            position={position}
            onPositionChange={setPosition}
            forceRemoveScrollEnabled={false}
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
                backgroundColor="$colorTransparent"
                pointerEvents="none"
                style={{pointerEvents: 'none'}}
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
                <YStack flex={1}>
                    {children}
                </YStack>
            </Sheet.Frame>
        </Sheet>
    );
});

MapSensorBottomSheet.displayName = 'MapSensorBottomSheet';

export default MapSensorBottomSheet;
