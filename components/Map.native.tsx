import {useSensorDataNew} from "@/hooks/useSensors";
import {useSupercluster} from "@/hooks/useSupercluster";
import {Camera, MapView} from "@maplibre/maplibre-react-native";
import {useMemo, useState, useRef} from "react";
import {View} from "react-native";
import SensorMarker from "./map/native/SensorMarker";
import ClusterMarker from "./map/native/ClusterMarker";
import MapZoomControl from "./map/MapZoomControl";
import {BoxType, LocationWithBoxes} from "@/api/models/sensor";
import MapSensorDrawer from "./map/MapSensorDrawer";
import SensorList from "./map/SensorList";
import MapDrawerToggle from "./map/MapDrawerToggle";

interface MapProps {
    module1Visible?: boolean;
    module2Visible?: boolean;
    module3Visible?: boolean;
    isDark?: boolean;
    // Overlay props - currently disabled
    // temperatureVisible?: boolean;
    // windDirectionVisible?: boolean;
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

    const homeCoordinate: [number, number] = [9.26, 54.46];
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

    // Custom setZoomLevel that triggers camera update
    const handleSetZoomLevel = (newZoom: number | ((prev: number) => number)) => {
        const actualNewZoom = typeof newZoom === 'function' ? newZoom(zoomLevel) : newZoom;
        setZoomLevel(actualNewZoom);
        setCameraUpdateTrigger(prev => prev + 1);
    };

    // Custom setCurrentCoordinate that triggers camera update
    const handleSetCurrentCoordinate = (newCoord: [number, number]) => {
        setCurrentCoordinate(newCoord);
        setCameraUpdateTrigger(prev => prev + 1);
    };

    const bounds: [number, number, number, number] = useMemo(() => {
        return viewportBounds;
    }, [viewportBounds]);

    // Filter locations based on module visibility
    const filteredContent = useMemo(() => {
        if (!content || content.length === 0) return [];

        return content.filter(locationWithBoxes => {
            // Check if this location has any boxes matching the enabled modules
            const hasWaterBoxes = locationWithBoxes.boxes.some(box =>
                box.type === BoxType.WaterBox || box.type === BoxType.WaterTemperatureOnlyBox
            );
            const hasAirBoxes = locationWithBoxes.boxes.some(box =>
                box.type === BoxType.AirBox
            );

            // Show location if it has boxes matching any enabled module
            if (module1Visible && hasWaterBoxes) return true;
            if (module2Visible && hasAirBoxes) return true;
            // module3Visible is for future use (Air Quality)

            return false;
        });
    }, [content, module1Visible, module2Visible, module3Visible]);

    // Filter sensors by viewport bounds
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

    // Handle sensor selection from list - center map and highlight marker
    const handleSensorSelect = (sensor: LocationWithBoxes) => {
        const { lat, lon } = sensor.location.coordinates;
        setHighlightedSensorId(sensor.location.id);

        // Center the map on the selected sensor
        handleSetZoomLevel(Math.max(zoomLevel, 12)); // Zoom in if needed
        handleSetCurrentCoordinate([lon, lat]);

        // Close drawer after selection (mobile UX)
        setIsDrawerOpen(false);

        // Clear highlight after animation
        setTimeout(() => {
            setHighlightedSensorId(null);
        }, 3000);
    };

    // Only use supercluster when we have valid content
    const {clusters, getClusterExpansionZoom} = useSupercluster(
        filteredContent,
        bounds,
        zoomLevel
    );

    const pins = useMemo(() => {
        return clusters.map((cluster, index) => {
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
                    index={index}
                />
            );
        });
    }, [clusters, getClusterExpansionZoom]);

    return (
        <View style={{flex: 1, backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5'}}>
            <MapView
                ref={mapRef}
                style={{flex: 1}}
                mapStyle={require('../assets/markers/mapStyles/style.json')}
                compassEnabled={true}
                zoomEnabled={true}
                onRegionDidChange={(region: any) => {
                    setCurrentCoordinate(region.centerCoordinate);
                    setZoomLevel(region.zoomLevel);

                    // Update viewport bounds for filtering
                    // Note: This is an approximation. For precise bounds,
                    // we would need to get the actual visible region from MapLibre
                    const approximateBounds: [number, number, number, number] = [
                        region.centerCoordinate[0] - 0.5,
                        region.centerCoordinate[1] - 0.5,
                        region.centerCoordinate[0] + 0.5,
                        region.centerCoordinate[1] + 0.5,
                    ];
                    setViewportBounds(approximateBounds);
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

            {/* Floating Toggle Button */}
            <MapDrawerToggle onPress={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />

            {/* Sensor List Drawer */}
            <MapSensorDrawer isOpen={isDrawerOpen} onToggle={() => setIsDrawerOpen(!isDrawerOpen)}>
                <SensorList
                    sensors={visibleSensors}
                    allSensors={filteredContent}
                    onSensorSelect={handleSensorSelect}
                    highlightedSensorId={highlightedSensorId}
                    loading={loading}
                    mapCenter={currentCoordinate}
                />
            </MapSensorDrawer>
        </View>
    );
}
