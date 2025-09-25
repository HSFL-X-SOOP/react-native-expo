import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";

type MapZoomControlProps = {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  setCurrentCoordinate: (coord: [number, number]) => void;
  homeCoordinate: [number, number];
};

export default function MapZoomControl({ zoomLevel, setZoomLevel, setCurrentCoordinate, homeCoordinate }: MapZoomControlProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={            [styles.button, {borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0}]}
        onPress={() => setZoomLevel(zoomLevel + 1)}
        activeOpacity={0.7}
      >
        <Icon source="plus" color="black" size={28}></Icon>
      </TouchableOpacity>
            {/* Linie */}
      <View style={{height: 1, backgroundColor: "#333" }} />
        {/* Windrose/Kompass */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {/* z.B. auf Norden ausrichten */}}
        activeOpacity={0.7}
      >
        <Icon source="navigation" color="black" size={28}></Icon>
      </TouchableOpacity>
                  {/* Linie */}
      <View style={{height: 1, backgroundColor: "#333" }} />
              {/* Windrose/Kompass */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {setCurrentCoordinate(homeCoordinate)}}
        activeOpacity={0.7}
      >
        <Icon source="home-map-marker" color="black" size={28}></Icon>
      </TouchableOpacity>
                  {/* Linie */}
      <View style={{height: 1, backgroundColor: "#333" }} />
      <TouchableOpacity
        style={
            [styles.button, {borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8}]
    }
        onPress={() => setZoomLevel(zoomLevel - 1)}
        activeOpacity={0.7}
      >
        <Icon source="minus" color="black" size={28}></Icon>
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
        backgroundColor: "#fff",
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