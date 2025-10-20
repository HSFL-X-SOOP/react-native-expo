import {useSensorDataNew} from "@/hooks/useSensors";
import {useSupercluster} from "@/hooks/useSupercluster";
import {Camera, MapView} from "@maplibre/maplibre-react-native";
import {useMemo, useState, useRef} from "react";
import {View} from "react-native";
import SensorMarker from "./map/native/SensorMarker";
import ClusterMarker from "./map/native/ClusterMarker";
import MapZoomControl from "./map/MapZoomControl";
import {BoxType, LocationWithBoxes} from "@/api/models/sensor";
import MapSensorBottomSheet, {MapSensorBottomSheetRef} from "./map/MapSensorBottomSheet";
import SensorList from "./map/SensorList";
import MapDrawerToggle from "./map/MapDrawerToggle";

interface MapProps {
    module1Visible?: boolean;
    module2Visible?: boolean;
    module3Visible?: boolean;
    isDark?: boolean;
}

export default function NativeMap(props: MapProps) {
    const {
        module1Visible = true,
        module2Visible = true,
        module3Visible = false,
        isDark = false
    } = props;
    const {data: content, loading} = useSensorDataNew();
    const mapRef = useRef<any>(null);
    const bottomSheetRef = useRef<MapSensorBottomSheetRef>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const homeCoordinate: [number, number] = [9.26, 54.47926];
    const minMaxZoomLevel = {min: 3, max: 16};
    const mapBoundariesLongLat = {
        ne: [49.869301, 71.185001],
        sw: [-31.266001, 27.560001]
    };

    const [zoomLevel, setZoomLevel] = useState(7);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);
    const [cameraUpdateTrigger, setCameraUpdateTrigger] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [highlightedSensorId, setHighlightedSensorId] = useState<number | null>(null);
    const [viewportBounds, setViewportBounds] = useState<[number, number, number, number]>([
        mapBoundariesLongLat.sw[0],
        mapBoundariesLongLat.sw[1],
        mapBoundariesLongLat.ne[0],
        mapBoundariesLongLat.ne[1]
    ]);

    const handleSetZoomLevel = (newZoom: number | ((prev: number) => number)) => {
        const actualNewZoom = typeof newZoom === 'function' ? newZoom(zoomLevel) : newZoom;
        setZoomLevel(actualNewZoom);
        setCameraUpdateTrigger(prev => prev + 1);
    };

    const handleSetCurrentCoordinate = (newCoord: [number, number]) => {
        setCurrentCoordinate(newCoord);
        setCameraUpdateTrigger(prev => prev + 1);
    };

    const bounds: [number, number, number, number] = useMemo(() => {
        return viewportBounds;
    }, [viewportBounds]);

    const filteredContent = useMemo(() => {
        if (!content) return [];

        return content.filter(locationWithBoxes => {
            const hasWaterBoxes = locationWithBoxes.boxes.some(box =>
                box.type === BoxType.WaterBox || box.type === BoxType.WaterTemperatureOnlyBox
            );
            const hasAirBoxes = locationWithBoxes.boxes.some(box =>
                box.type === BoxType.AirBox
            );

            if (module1Visible && hasWaterBoxes) return true;
            return module2Visible && hasAirBoxes;


        });
    }, [content, module1Visible, module2Visible, module3Visible]);

    const visibleSensors = useMemo(() => {
        return filteredContent.filter(sensor => {
            const { lat, lon } = sensor.location.coordinates;
            return (
                lon >= bounds[0] &&
                lat >= bounds[1] &&
                lon <= bounds[2] &&
                lat <= bounds[3]
            );
        });
    }, [filteredContent, bounds]);

    const handleSensorSelect = (sensor: LocationWithBoxes) => {
        const { lat, lon } = sensor.location.coordinates;
        setHighlightedSensorId(sensor.location.id);

        handleSetZoomLevel(Math.max(zoomLevel, 12));
        handleSetCurrentCoordinate([lon, lat]);

        bottomSheetRef.current?.snapToPeek();

        setTimeout(() => {
            setHighlightedSensorId(null);
        }, 3000);
    };

    const {clusters, getClusterExpansionZoom} = useSupercluster(
        filteredContent,
        bounds,
        zoomLevel
    );

    const mapStyle = useMemo(() => {
        return isDark
            ? require('@/assets/mapStyles/dark_mode.json')
            : require('@/assets/mapStyles/light_mode.json');
    }, [isDark]);

    const pins = useMemo(() => {
        return clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {cluster: isCluster, point_count, locationWithBoxes} = cluster.properties;

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
                            handleSetZoomLevel(expansionZoom);
                            handleSetCurrentCoordinate([longitude, latitude]);
                        }}
                    />
                );
            }

            return (
                <SensorMarker
                    key={locationWithBoxes!.location.id}
                    locationWithBoxes={locationWithBoxes!}
                />
            );
        });
    }, [clusters, getClusterExpansionZoom]);

    return (
        <View style={{flex: 1, backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5'}}>
            <MapView
                ref={mapRef}
                style={{flex: 1}}
                mapStyle={mapStyle}
                compassEnabled={true}
                zoomEnabled={true}
                onRegionIsChanging={(region: any) => {
                    // Snap sheet to peek during map movement (like web onMove)
                    if (bottomSheetRef.current) {
                        bottomSheetRef.current.snapToPeek();
                    }
                }}
                onRegionDidChange={(region: any) => {
                    if (!region || !region.centerCoordinate || typeof region.zoomLevel === 'undefined') {
                        return;
                    }

                    if (debounceTimerRef.current) {
                        clearTimeout(debounceTimerRef.current);
                    }

                    setCurrentCoordinate(region.centerCoordinate);
                    setZoomLevel(region.zoomLevel);

                    debounceTimerRef.current = setTimeout(() => {
                        const approximateBounds: [number, number, number, number] = [
                            region.centerCoordinate[0] - 0.5,
                            region.centerCoordinate[1] - 0.5,
                            region.centerCoordinate[0] + 0.5,
                            region.centerCoordinate[1] + 0.5,
                        ];
                        setViewportBounds(approximateBounds);
                    }, 300);
                }}
            >
                <Camera
                    key={`camera-${cameraUpdateTrigger}`}
                    zoomLevel={zoomLevel}
                    centerCoordinate={currentCoordinate}
                    maxZoomLevel={18}
                    minZoomLevel={3}
                    animationDuration={300}
                />
                {pins}
            </MapView>

            <MapZoomControl
                zoomLevel={zoomLevel}
                minMaxZoomLevel={minMaxZoomLevel}
                setZoomLevel={handleSetZoomLevel}
                setCurrentCoordinate={handleSetCurrentCoordinate}
                homeCoordinate={homeCoordinate}
            />

            <MapDrawerToggle onPress={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />

            <MapSensorBottomSheet
                ref={bottomSheetRef}
                isOpen={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
            >
                <SensorList
                    sensors={visibleSensors}
                    allSensors={filteredContent}
                    onSensorSelect={handleSensorSelect}
                    highlightedSensorId={highlightedSensorId}
                    loading={loading}
                    mapCenter={currentCoordinate}
                    horizontal
                />
            </MapSensorBottomSheet>
        </View>
    );
}
