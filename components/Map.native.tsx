import { useSensorDataNew } from "@/hooks/useSensors";
import { useSupercluster } from "@/hooks/useSupercluster";
import { Camera, MapView } from "@maplibre/maplibre-react-native";
import { useMemo, useState } from "react";
import { View } from "react-native";
import SensorMarker from "./map/MapSensorMarker.native";
import ClusterMarker from "./map/ClusterMarker.native";
import MapZoomControl from "./map/MapZoomControl";

interface MapProps {
    module1Visible?: boolean;
    module2Visible?: boolean;
    module3Visible?: boolean;
    temperatureVisible?: boolean;
    windDirectionVisible?: boolean;
}

export default function NativeMap(props: MapProps) {
    const { data: content, loading } = useSensorDataNew();

    console.log('NativeMap render:', {
        contentLength: content?.length,
        loading,
        hasContent: !!content
    });

    const homeCoordinate: [number, number] = [9.26, 54.46];
    const minMaxZoomLevel = { min: 3, max: 16 };
    const mapBoundariesLongLat = {
        ne: [49.869301, 71.185001],
        sw: [-31.266001, 27.560001]
    };

    const [zoomLevel, setZoomLevel] = useState(7);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);

    const bounds: [number, number, number, number] = useMemo(() => {
        return [
            mapBoundariesLongLat.sw[0],
            mapBoundariesLongLat.sw[1],
            mapBoundariesLongLat.ne[0],
            mapBoundariesLongLat.ne[1],
        ];
    }, []);

    // Only use supercluster when we have valid content
    const { clusters, getClusterExpansionZoom } = useSupercluster(
        content && content.length > 0 ? content : [],
        bounds,
        zoomLevel
    );

    const pins = useMemo(() => {
        return clusters.map((cluster, index) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count, locationWithBoxes } = cluster.properties;

            if (isCluster) {
                return (
                    <ClusterMarker
                        key={`cluster-${cluster.id}`}
                        latitude={latitude}
                        longitude={longitude}
                        pointCount={point_count!}
                        clusterId={cluster.id as number}
                        onPress={() => {
                            const expansionZoom = getClusterExpansionZoom(cluster.id as number);
                            setZoomLevel(expansionZoom);
                            setCurrentCoordinate([longitude, latitude]);
                        }}
                    />
                );
            }

            return (
                <SensorMarker
                    key={locationWithBoxes!.location.id}
                    locationWithBoxes={locationWithBoxes!}
                    index={index}
                />
            );
        });
    }, [clusters, getClusterExpansionZoom]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                mapStyle={require('../assets/style.json')}
                compassEnabled={true}
                zoomEnabled={true}
                onRegionDidChange={(region: any) => {
                    setCurrentCoordinate(region.centerCoordinate);
                    setZoomLevel(region.zoomLevel);
                }}
            >
                <Camera
                    zoomLevel={zoomLevel}
                    centerCoordinate={currentCoordinate}
                    maxZoomLevel={18}
                    minZoomLevel={3}
                />
                {pins}
            </MapView>

            <MapZoomControl
                zoomLevel={zoomLevel}
                minMaxZoomLevel={minMaxZoomLevel}
                setZoomLevel={setZoomLevel}
                setCurrentCoordinate={setCurrentCoordinate}
                homeCoordinate={homeCoordinate}
            />
        </View>
    );
}
