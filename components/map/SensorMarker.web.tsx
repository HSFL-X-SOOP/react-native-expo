import { LocationWithBoxes } from "@/api/models/sensor";
import { Marker } from "@vis.gl/react-maplibre";
import { SensorMarkerContent } from "./MapSensorTemperatureText";
import { Popover, useMedia, Dialog, YStack } from "tamagui";
import { SensorPopup } from "./MapSensorMeasurements";
import { useState } from "react";

interface SensorMarkerProps {
    locationWithBoxes: LocationWithBoxes;
}

export default function SensorMarker({ locationWithBoxes }: SensorMarkerProps) {
    const [open, setOpen] = useState(false);
    const media = useMedia();

    if (!media.gtMd) {
        // Mobile Web: Always animate
        return (
            <>
                <Marker
                    key={locationWithBoxes.location.id}
                    longitude={locationWithBoxes.location.coordinates.lon}
                    latitude={locationWithBoxes.location.coordinates.lat}
                    anchor="bottom"
                >
                    <YStack
                        onPress={(e) => {
                            e.stopPropagation();
                            setOpen(true);
                        }}
                        cursor="pointer"
                    >
                        <SensorMarkerContent locationWithBoxes={locationWithBoxes} isHovered={true} />
                    </YStack>
                </Marker>

                <Dialog modal open={open} onOpenChange={setOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay
                            key="overlay"
                            animation="quick"
                            opacity={0.5}
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                        <Dialog.Content
                            bordered
                            elevate
                            key="content"
                            animateOnly={['transform', 'opacity']}
                            animation={[
                                'quick',
                                {
                                    opacity: {
                                        overshootClamping: true,
                                    },
                                },
                            ]}
                            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                            padding="$0"
                        >
                            <SensorPopup locationWithBoxes={locationWithBoxes} closeOverlay={() => setOpen(false)} />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog>
            </>
        );
    }

    // Desktop Web: Always animate
    return (
        <Marker
            key={locationWithBoxes.location.id}
            longitude={locationWithBoxes.location.coordinates.lon}
            latitude={locationWithBoxes.location.coordinates.lat}
            anchor="center"
        >
            <Popover
                size="$5"
                allowFlip
                placement="left"
                open={open}
                onOpenChange={setOpen}
            >
                <Popover.Trigger asChild>
                    <YStack
                        onPress={(e) => {
                            e.stopPropagation();
                            setOpen(true);
                        }}
                        cursor="pointer"
                    >
                        <SensorMarkerContent locationWithBoxes={locationWithBoxes} isHovered={true} />
                    </YStack>
                </Popover.Trigger>

                <Popover.Content
                    borderWidth={1}
                    padding={"$0"}
                    borderColor="$borderColor"
                    enterStyle={{ y: -10, opacity: 0 }}
                    exitStyle={{ y: -10, opacity: 0 }}
                    elevate
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                >
                    <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
                    <SensorPopup locationWithBoxes={locationWithBoxes} closeOverlay={() => setOpen(false)} />
                </Popover.Content>
            </Popover>
        </Marker>
    );
}