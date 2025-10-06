import { LocationWithBoxes } from "@/api/models/sensor";
import { PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MapSensorMeasurementsNew } from "./MapSensorMeasurements";
import { MapSensorTemperatureTextNew } from "./MapSensorTemperatureText";

export default function AndroidMarker({
    locationWithBoxes,
    index,
    onClose,
}: {
    locationWithBoxes: LocationWithBoxes;
    index?: number;
    onClose?: () => void;
}) {
    const [overlayVisible, setOverlayVisible] = useState(false);

    return (
        <>
            <PointAnnotation
                id={`marker-${index}`}
                key={`marker-${index}`}
                coordinate={[
                    locationWithBoxes.location.coordinates.lon,
                    locationWithBoxes.location.coordinates.lat,
                ]}
                title="Marker Title"
                selected={true}
                onSelected={() => setOverlayVisible(true)}
            >
                <View>
                    <MapSensorTemperatureTextNew locationWithBoxes={locationWithBoxes} />
                </View>
            </PointAnnotation>

            <Modal
                visible={overlayVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setOverlayVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setOverlayVisible(false)}>
                    <View style={styles.overlayContainer}>
                        <TouchableWithoutFeedback onPress={() => setOverlayVisible(false)}>
                            <MapSensorMeasurementsNew locationWithBoxes={locationWithBoxes} closeOverlay={() => setOverlayVisible(false)}/>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    overlayBox: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 16,
        minWidth: 300,
        alignItems: "center",
    },
    linkButton: {
        marginTop: 20,
    },
    closeButton: {
        marginTop: 10,
    },
});