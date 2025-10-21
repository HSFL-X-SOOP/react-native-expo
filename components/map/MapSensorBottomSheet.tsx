import {Sheet, YStack} from 'tamagui';
import {useSheet} from '@tamagui/sheet';
import {
    ReactNode,
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
    useRef,
    useCallback
} from 'react';

interface MapSensorBottomSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export interface MapSensorBottomSheetRef {
    snapToPeek: () => void;
}

interface SheetImperativeBridgeProps {
    setLocalPosition: (updater: number | ((prev: number) => number)) => void;
    register: (handle: MapSensorBottomSheetRef | null) => void;
}

const SheetImperativeBridge = ({setLocalPosition, register}: SheetImperativeBridgeProps) => {
    const sheet = useSheet();

    const snapToPeek = useCallback(() => {
        setLocalPosition(prev => (prev === 1 ? prev : 1));

        sheet?.setPositionImmediate?.(1);
        sheet?.setPosition?.(1);
    }, [setLocalPosition, sheet]);

    useEffect(() => {
        const handle: MapSensorBottomSheetRef = {
            snapToPeek
        };

        register(handle);
        return () => register(null);
    }, [register, snapToPeek]);

    return null;
};

const MapSensorBottomSheet = forwardRef<MapSensorBottomSheetRef, MapSensorBottomSheetProps>(({
                                                                                                 isOpen,
                                                                                                 onOpenChange,
                                                                                                 children
                                                                                             }, ref) => {
    const [position, setPosition] = useState(1);
    const imperativeHandleRef = useRef<MapSensorBottomSheetRef | null>(null);

    const registerImperativeHandle = useCallback((handle: MapSensorBottomSheetRef | null) => {
        imperativeHandleRef.current = handle;
    }, []);

    const runSnapToPeek = useCallback(() => {
        imperativeHandleRef.current?.snapToPeek();
    }, []);

    useImperativeHandle(ref, () => ({
        snapToPeek: runSnapToPeek
    }), [runSnapToPeek]);

    useEffect(() => {
        if (isOpen) {
            runSnapToPeek();
        }
    }, [isOpen, runSnapToPeek]);

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
            defaultPosition={1}
            onPositionChange={setPosition}
            forceRemoveScrollEnabled={false}
        >
            <SheetImperativeBridge
                setLocalPosition={setPosition}
                register={registerImperativeHandle}
            />
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
