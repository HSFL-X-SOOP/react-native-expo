import { PointAnnotation } from "@maplibre/maplibre-react-native";
import React from "react";
import { View } from "react-native";
import { ClusterMarkerSvg } from "./ClusterMarkerSvg";
import { useThemeContext } from "@/context/ThemeSwitch";

interface ClusterMarkerProps {
    latitude: number;
    longitude: number;
    pointCount: number;
    clusterId: number;
    onPress: () => void;
}

export default function ClusterMarker({
    latitude,
    longitude,
    pointCount,
    clusterId,
    onPress
}: ClusterMarkerProps) {
    const { isDark } = useThemeContext();
    const accentColor = !isDark ? '#006e99' : '#7db07d';

    return (
        <PointAnnotation
            id={`cluster-${clusterId}`}
            key={`cluster-${clusterId}`}
            coordinate={[longitude, latitude]}
            title="Cluster"
            onSelected={onPress}
        >
            <View>
                <ClusterMarkerSvg
                    count={pointCount}
                    accentColor={accentColor}
                    enableAnimations={false}
                />
            </View>
        </PointAnnotation>
    );
}
