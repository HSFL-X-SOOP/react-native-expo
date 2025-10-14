import {useSensorDataNew} from '@/hooks/useSensors';
import {useSupercluster} from '@/hooks/useSupercluster';
import {Palette} from '@tamagui/lucide-icons';
import type {MapRef} from '@vis.gl/react-maplibre';
import {LngLatBoundsLike, Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import {useMemo, useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'tamagui';
import ClusterMarker from './map/web/ClusterMarker';
import MapZoomControl from './map/MapZoomControl';
import SensorMarker from './map/web/SensorMarker';
import {BoxType, LocationWithBoxes} from '@/api/models/sensor';
import MapSensorDrawer from './map/MapSensorDrawer';
import SensorList from './map/SensorList';
import MapDrawerToggle from './map/MapDrawerToggle';

interface MapProps {
    module1Visible?: boolean;
    module2Visible?: boolean;
    module3Visible?: boolean;
    isDark?: boolean;
}

export default function WebMap(props: MapProps) {
    const {
        module1Visible = true,
        module2Visible = true,
        module3Visible = false,
        isDark = false
    } = props;
    const {data: content, loading} = useSensorDataNew();
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

    const {clusters, getClusterExpansionZoom} = useSupercluster(
        filteredContent,
        bounds,
        zoomLevel
    );

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

    const handleSensorSelect = (sensor: LocationWithBoxes) => {
        const {lat, lon} = sensor.location.coordinates;
        setHighlightedSensorId(sensor.location.id);

        mapRef.current?.flyTo({
            center: [lon, lat],
            zoom: Math.max(zoomLevel, 12),
            duration: 1000,
        });

        setTimeout(() => {
            setHighlightedSensorId(null);
        }, 3000);
    };

    const [styleType, setStyleType] = useState<'old' | 'new'>('old');
    const t = useTheme();

    const mapStyle = useMemo(() => {
        if (styleType === 'old') {
            const baseStyle = require('../assets/markers/mapStyles/style.json');
            const modifiedStyle = JSON.parse(JSON.stringify(baseStyle));

            const backgroundLayer = modifiedStyle.layers.find((layer: any) => layer.id === 'background');
            if (backgroundLayer) {
                backgroundLayer.paint['background-color'] = isDark ? '#1a1a1a' : 'rgba(255,255,255,1)';
            }

            return modifiedStyle;
        } else {
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
    }, [clusters, getClusterExpansionZoom, highlightedSensorId]);

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

            <MapDrawerToggle onPress={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen}/>

            <Map
                ref={mapRef}
                initialViewState={viewState}
                onMove={(e) => {
                    if (debounceTimerRef.current) {
                        clearTimeout(debounceTimerRef.current);
                    }

                    setCurrentCoordinate([e.viewState.longitude, e.viewState.latitude]);
                    setZoomLevel(e.viewState.zoom);

                    debounceTimerRef.current = setTimeout(() => {
                        setViewState(e.viewState);
                    }, 300);
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

            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        backgroundColor: styleType === 'new' ? t.color?.val : t.background?.val
                    }]}
                    onPress={() => setStyleType('new')}
                    activeOpacity={0.7}
                >
                    <Palette color={styleType === 'new' ? t.background?.val : t.color?.val} size={24}/>
                    <Text
                        style={{fontSize: 13, color: styleType === 'new' ? t.background?.val : t.color?.val}}>Neu</Text>
                </TouchableOpacity>
                <View style={{height: 8}}/>
                <TouchableOpacity
                    style={[styles.button, {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        backgroundColor: styleType === 'old' ? t.color?.val : t.background?.val
                    }]}
                    onPress={() => setStyleType('old')}
                    activeOpacity={0.7}
                >
                    <Palette color={styleType === 'old' ? t.background?.val : t.color?.val} size={24}/>
                    <Text
                        style={{fontSize: 13, color: styleType === 'old' ? t.background?.val : t.color?.val}}>Alt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        bottom: 300,
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
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
});
