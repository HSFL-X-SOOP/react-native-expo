import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Plus, Minus, Navigation, Home} from "@tamagui/lucide-icons";
import {useTheme} from "tamagui";

type MapZoomControlProps = {
    zoomLevel: number;
    minMaxZoomLevel: { min: number; max: number };
    setZoomLevel: (level: number | ((prev: number) => number)) => void;
    setCurrentCoordinate: (coord: [number, number]) => void;
    homeCoordinate: [number, number];
};

export default function MapZoomControl({
                                           zoomLevel,
                                           minMaxZoomLevel,
                                           setZoomLevel,
                                           setCurrentCoordinate,
                                           homeCoordinate
                                       }: MapZoomControlProps) {
    const t = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: t.background?.val
                }]}
                onPress={() => {
                    setZoomLevel(prev => Math.min(minMaxZoomLevel.max, Math.round(prev) + 1));
                }}
                activeOpacity={0.7}
            >
                <Plus color={t.color?.val} size={20}/>
            </TouchableOpacity>

            {/* Linie */}
            <View style={{height: 1, backgroundColor: t.borderColor?.val}}/>

            {/* Navigation/Kompass */}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: t.background?.val}]}
                onPress={() => {/* z.B. auf Norden ausrichten */
                }}
                activeOpacity={0.7}
            >
                <Navigation color={t.color?.val} size={20}/>
            </TouchableOpacity>

            {/* Linie */}
            <View style={{height: 1, backgroundColor: t.borderColor?.val}}/>

            {/* Home Button */}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: t.background?.val}]}
                onPress={() => setCurrentCoordinate(homeCoordinate)}
                activeOpacity={0.7}
            >
                <Home color={t.color?.val} size={20}/>
            </TouchableOpacity>

            {/* Linie */}
            <View style={{height: 1, backgroundColor: t.borderColor?.val}}/>

            <TouchableOpacity
                style={[styles.button, {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    backgroundColor: t.background?.val
                }]}
                onPress={() => {
                    setZoomLevel(prev => Math.max(minMaxZoomLevel.min, Math.round(prev) - 1));
                }}
                activeOpacity={0.7}
            >
                <Minus color={t.color?.val} size={20}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        bottom: 100,
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
    },
    button: {
        width: 44,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.18,
        shadowRadius: 3,
        elevation: 3,
    }
});
