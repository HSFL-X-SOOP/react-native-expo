import { Home, Minus, Navigation, Plus } from "@tamagui/lucide-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "tamagui";
type MapZoomControlProps = {
  zoomLevel: number;
  minMaxZoomLevel: { min: number; max: number };
  setZoomLevel: (level: number) => void;
  setCurrentCoordinate: (coord: [number, number]) => void;
  homeCoordinate: [number, number];
  setMapStyle?: (style: string) => void;
};

export default function MapZoomControl({ zoomLevel, minMaxZoomLevel, setZoomLevel, setCurrentCoordinate, homeCoordinate, setMapStyle}: MapZoomControlProps) {
  const t = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: t.background?.val
        }]}
        onPress={() => {if (zoomLevel < minMaxZoomLevel.max) setZoomLevel(zoomLevel + 1)}}
        activeOpacity={0.7}
      >
        <Plus color={t.color?.val} size={28} />
      </TouchableOpacity>

      {/* Linie */}
      <View style={{height: 1, backgroundColor: t.borderColor?.val }} />

      {/* Navigation/Kompass */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: t.background?.val }]}
        onPress={() => {/* z.B. auf Norden ausrichten */}}
        activeOpacity={0.7}
      >
        <Navigation color={t.color?.val} size={28} />
      </TouchableOpacity>

      {/* Linie */}
      <View style={{height: 1, backgroundColor: t.borderColor?.val }} />

      {/* Home Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: t.background?.val }]}
        onPress={() => setCurrentCoordinate(homeCoordinate)}
        activeOpacity={0.7}
      >
        <Home color={t.color?.val} size={28} />
      </TouchableOpacity>

      {/* Linie */}
      <View style={{height: 1, backgroundColor: t.borderColor?.val }} />

      <TouchableOpacity
        style={[styles.button, {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: t.background?.val
        }]}
        onPress={() => {if (zoomLevel > minMaxZoomLevel.min) setZoomLevel(zoomLevel - 1)}}
        activeOpacity={0.7}
      >
        <Minus color={t.color?.val} size={28} />
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
        width: 56,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
});