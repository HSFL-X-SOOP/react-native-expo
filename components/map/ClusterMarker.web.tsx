import { Marker } from "@vis.gl/react-maplibre";
import { ClusterMarkerSvg } from "./ClusterMarkerSvg";
import { useThemeContext } from "@/context/ThemeSwitch";

interface ClusterMarkerProps {
    latitude: number;
    longitude: number;
    pointCount: number;
    onClick: () => void;
}

export default function ClusterMarker({ latitude, longitude, pointCount, onClick }: ClusterMarkerProps) {
    const { isDark } = useThemeContext();
    const accentColor = !isDark ? '#006e99' : '#7db07d';

    return (
        <Marker
            latitude={latitude}
            longitude={longitude}
            anchor="center"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                onClick();
            }}
        >
            <ClusterMarkerSvg count={pointCount} accentColor={accentColor} />
        </Marker>
    );
}
