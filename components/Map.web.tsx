import { useSensorDataNew } from '@/hooks/useSensors';
import { useSupercluster } from '@/hooks/useSupercluster';
import { Palette } from '@tamagui/lucide-icons';
import type { MapRef } from '@vis.gl/react-maplibre';
import {
  LngLatBoundsLike,
  Map
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'tamagui';
import '../Global.css';
import ClusterMarker from './map/ClusterMarker.web';
import MapLegend from './map/MapLegend';
import MapZoomControl from './map/MapZoomControl';
import SensorMarker from './map/SensorMarker.web';
import SensorMarker from './map/web/SensorMarker';
import ClusterMarker from './map/web/ClusterMarker';
import MapZoomControl from './map/MapZoomControl';
import { useSupercluster } from '@/hooks/useSupercluster';
import type { MapRef } from '@vis.gl/react-maplibre';
import { BoxType } from '@/api/models/sensor';

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
  const { data: content } = useSensorDataNew();
  const mapRef = React.useRef<MapRef>(null);

  const homeCoordinate: [number, number] = [9.26, 54.47926];
  const minMaxZoomLevel = { min: 3, max: 16 };
  const mapBoundariesLongLat: LngLatBoundsLike = [[-31.266001, 27.560001], [49.869301, 71.185001]];

  const [zoomLevel, setZoomLevel] = useState(7);
  const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);
  const [viewState, setViewState] = useState({
    longitude: homeCoordinate[0],
    latitude: homeCoordinate[1],
    zoom: zoomLevel
  });

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

  const { clusters, getClusterExpansionZoom } = useSupercluster(
    filteredContent,
    bounds,
    zoomLevel
  );

  const [mapStyle, setMapStyle] = useState(require('../assets/style.txt'));
  const t = useTheme();

  const pins = useMemo(() => {
    return clusters.map((cluster) => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const { cluster: isCluster, point_count, locationWithBoxes } = cluster.properties;

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
      <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: t.background?.val
        }]}
            onPress={() => setMapStyle(require('../assets/light_mode_openfreemap.txt'))}
            activeOpacity={0.7}
          >
            <Palette color={t.color?.val} size={24} />
            <Text style={{ fontSize: 13 }}>Neu</Text>
          </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: t.borderColor?.val }} />
          <TouchableOpacity
            style={[styles.button, {
          backgroundColor: t.background?.val
        }]}
            onPress={() => setMapStyle(require('../assets/dark_mode_openfreemap.txt'))}
            activeOpacity={0.7}
          >
            <Palette color={t.color?.val} size={24} />
            <Text style={{ fontSize: 13 }}>Neu Dark</Text>
          </TouchableOpacity>
          <View style={{height: 1, backgroundColor: t.borderColor?.val }} />
          <TouchableOpacity
            style={[styles.button, {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: t.background?.val
        }]}
            onPress={() => setMapStyle(require('../assets/style.txt'))}
            activeOpacity={0.7}
          >
            <Palette color={t.color?.val} size={24} />
            <Text style={{ fontSize: 13 }}>Alt</Text>
          </TouchableOpacity>
        </View>
      <MapLegend />
    </View>);
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
});
