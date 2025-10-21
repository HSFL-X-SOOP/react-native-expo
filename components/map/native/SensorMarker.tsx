import {LocationWithBoxes} from "@/api/models/sensor";
import {PointAnnotation} from "@maplibre/maplibre-react-native";
import React, {useState} from "react";
import {Modal, Pressable, StyleSheet, View} from "react-native";
import {SensorPopup} from "../MapSensorMeasurements";
import {SensorMarkerContent} from "../MapSensorTemperatureText";
import {Theme, YStack} from "tamagui";
import {useThemeContext} from "@/context/ThemeSwitch";

interface SensorMarkerProps {
    locationWithBoxes: LocationWithBoxes;
    index?: number;
}

export default function SensorMarker({locationWithBoxes}: SensorMarkerProps) {
    const [open, setOpen] = useState(false);
    const {currentTheme} = useThemeContext();

    return (
        <>
            <PointAnnotation
                id={`marker-${locationWithBoxes.location.id}`}
                key={`marker-${locationWithBoxes.location.id}`}
                coordinate={[
                    locationWithBoxes.location.coordinates.lon,
                    locationWithBoxes.location.coordinates.lat,
                ]}
                onSelected={() => setOpen(true)}
            >
                <View>
                    <SensorMarkerContent locationWithBoxes={locationWithBoxes} isHovered={false}/>
                </View>
            </PointAnnotation>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <Theme name={currentTheme}>
                            <YStack>
                                <SensorPopup
                                    locationWithBoxes={locationWithBoxes}
                                    closeOverlay={() => setOpen(false)}
                                />
                            </YStack>
                        </Theme>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
