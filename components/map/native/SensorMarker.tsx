import { LocationWithBoxes } from "@/api/models/sensor";
import { PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { SensorPopup } from "../MapSensorMeasurements";
import { SensorMarkerContent } from "../MapSensorTemperatureText";
import { Sheet } from "tamagui";

interface SensorMarkerProps {
    locationWithBoxes: LocationWithBoxes;
    index?: number;
}

export default function SensorMarker({
    locationWithBoxes,
    index,
}: SensorMarkerProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <PointAnnotation
                id={`marker-${index}`}
                key={`marker-${index}`}
                coordinate={[
                    locationWithBoxes.location.coordinates.lon,
                    locationWithBoxes.location.coordinates.lat,
                ]}
                title="Sensor"
                selected={true}
                onSelected={() => setOpen(true)}
            >
                <View>
                    <SensorMarkerContent locationWithBoxes={locationWithBoxes} isHovered={false} />
                </View>
            </PointAnnotation>

            <Sheet
                modal
                open={open}
                onOpenChange={setOpen}
                snapPoints={[85]}
                dismissOnSnapToBottom
                animation="medium"
            >
                <Sheet.Overlay
                    backgroundColor="rgba(0,0,0,0.5)"
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Sheet.Frame
                    padding="$4"
                    backgroundColor={"$colorTransparent"}
                    alignItems="center"
                    justifyContent="center"
                >
                    <SensorPopup locationWithBoxes={locationWithBoxes} closeOverlay={() => setOpen(false)} />
                </Sheet.Frame>
            </Sheet>
        </>
    );
}
