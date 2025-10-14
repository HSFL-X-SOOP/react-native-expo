import {useSensorDataNew} from '@/hooks/useSensors';
import {useSupercluster} from '@/hooks/useSupercluster';
import {Palette} from '@tamagui/lucide-icons';
import type {MapRef} from '@vis.gl/react-maplibre';
import {
    LngLatBoundsLike,
    Map
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import '../Global.css';
import SensorMarker from './map/web/SensorMarker';
import {useMemo, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'tamagui';
import ClusterMarker from './map/web/ClusterMarker';
import MapZoomControl from './map/MapZoomControl';
import { useSupercluster } from '@/hooks/useSupercluster';
import type { MapRef } from '@vis.gl/react-maplibre';
import { BoxType, LocationWithBoxes } from '@/api/models/sensor';
import MapSensorDrawer from './map/MapSensorDrawer';
import SensorList from './map/SensorList';
import MapDrawerToggle from './map/MapDrawerToggle';
import SensorMarker from './map/web/SensorMarker';
import {BoxType} from '@/api/models/sensor';

interface MapProps {
    module1Visible?: boolean;
    module2Visible?: boolean;
    module3Visible?: boolean;
    isDark?: boolean;
    // Overlay props - currently disabled
    // temperatureVisible?: boolean;
    // windDirectionVisible?: boolean;
}

export default function WebMap(props: MapProps) {
    const {
        module1Visible = true,
        module2Visible = true,
        module3Visible = false,
        isDark = false
    } = props;
    const { data: content, loading } = useSensorDataNew();
    const mapRef = React.useRef<MapRef>(null);

    const homeCoordinate: [number, number] = [9.26, 54.47926];
    const minMaxZoomLevel = {min: 3, max: 16};
    const mapBoundariesLongLat: LngLatBoundsLike = [[-31.266001, 27.560001], [49.869301, 71.185001]];

    const [zoomLevel, setZoomLevel] = useState(7);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);
    const [viewState, setViewState] = useState({
        longitude: homeCoordinate[0],
        latitude: homeCoordinate[1],
        zoom: zoomLevel
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [highlightedSensorId, setHighlightedSensorId] = useState<number | null>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const bounds: [number, number, number, number] = useMemo(() => {
        const map = mapRef.current?.getMap();
        if (!map) return [-31.266001, 27.560001, 49.869301, 71.185001];
        const bounds = map.getBounds();
        return [
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth(),
        ];
    }, [viewState]);

    // Filter locations based on module visibility
    const filteredContent = useMemo(() => {
        if (!content) return [];

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

    const {clusters, getClusterExpansionZoom} = useSupercluster(
        filteredContent,
        bounds,
        zoomLevel
    );
    // Filter sensors by viewport bounds
    const visibleSensors = useMemo(() => {
        return filteredContent.filter(sensor => {
            const {lat, lon} = sensor.location.coordinates;
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
        const {lat, lon} = sensor.location.coordinates;
        setHighlightedSensorId(sensor.location.id);

        // Center the map on the selected sensor
        mapRef.current?.flyTo({
            center: [lon, lat],
            zoom: Math.max(zoomLevel, 12), // Zoom in if needed
            duration: 1000,
        });

        // Clear highlight after animation
        setTimeout(() => {
            setHighlightedSensorId(null);
        }, 3000);
    };

    const {clusters, getClusterExpansionZoom} = useSupercluster(
        filteredContent,
        bounds,
        zoomLevel
    );

    // Track which style type is selected: 'old' or 'new'
    const [styleType, setStyleType] = useState<'old' | 'new'>('old');
    const t = useTheme();

    // Automatically load the correct style based on styleType and isDark
    const mapStyle = useMemo(() => {
        if (styleType === 'old') {
            // Load the old style and modify its background color based on isDark
            const baseStyle = require('../assets/markers/mapStyles/style.json');
            const modifiedStyle = JSON.parse(JSON.stringify(baseStyle)); // Deep clone

            // Find and update the background layer
            const backgroundLayer = modifiedStyle.layers.find((layer: any) => layer.id === 'background');
            if (backgroundLayer) {
                backgroundLayer.paint['background-color'] = isDark ? '#1a1a1a' : 'rgba(255,255,255,1)';
            }

            return modifiedStyle;
        } else {
            // For new style, use light or dark version based on isDark
            return isDark
                ? require('../assets/markers/mapStyles/dark_mode_openfreemap.json')
                : require('../assets/markers/mapStyles/light_mode_openfreemap.json');
        }
    }, [styleType, isDark]);

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
                        onClick={() => {
                            const expansionZoom = getClusterExpansionZoom(cluster.id as number);
                            mapRef.current?.flyTo({
                                center: [longitude, latitude],
                                zoom: expansionZoom,
                                duration: 500,
                            });
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

    // Update map background color when theme changes
    useEffect(() => {
        const map = mapRef.current?.getMap();
        if (!map) return;

        // Wait for map to be loaded before changing style
        if (!map.isStyleLoaded()) {
            map.once('load', () => {
                map.setPaintProperty('background', 'background-color', isDark ? '#1a1a1a' : '#ffffff');
            });
        } else {
            map.setPaintProperty('background', 'background-color', isDark ? '#1a1a1a' : '#ffffff');
        }
    }, [isDark]);

    return (
        <View style={{flex: 1}}>
            <MapSensorDrawer isOpen={isDrawerOpen} onToggle={() => setIsDrawerOpen(!isDrawerOpen)}>
                <SensorList
                    sensors={visibleSensors}
                    onSensorSelect={handleSensorSelect}
                    highlightedSensorId={highlightedSensorId}
                    loading={loading}
                    mapCenter={currentCoordinate}
                />
            </MapSensorDrawer>
            <Map
                ref={mapRef}
                initialViewState={viewState}
                onMove={(e) => {
                    setCurrentCoordinate([e.viewState.longitude, e.viewState.latitude]);
                    setViewState(e.viewState);
                    setZoomLevel(e.viewState.zoom);
                }}
                key="map"
                mapStyle={mapStyle}
                maxBounds={mapBoundariesLongLat}
                longitude={currentCoordinate[0]}
                latitude={currentCoordinate[1]}
                zoom={zoomLevel}
            >
                {pins}
                <MapZoomControl
                    zoomLevel={zoomLevel}
                    minMaxZoomLevel={minMaxZoomLevel}
                    setZoomLevel={setZoomLevel}
                    setCurrentCoordinate={setCurrentCoordinate}
                    homeCoordinate={homeCoordinate}
                />
            </Map>
        </View>);
}

