import { useSensorDataNew } from '@/hooks/useSensors';
import {
  LngLatBoundsLike,
  Map
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import '../Global.css';
import SensorMarker from './map/SensorMarker.web';
import ClusterMarker from './map/ClusterMarker.web';
import MapZoomControl from './map/MapZoomControl';
import MapLegend from './map/MapLegend';
import { useSupercluster } from '@/hooks/useSupercluster';
import type { MapRef } from '@vis.gl/react-maplibre';

export default function WebMap() {
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

  const { clusters, getClusterExpansionZoom } = useSupercluster(
    content,
    bounds,
    zoomLevel
  );

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
        mapStyle={require('../assets/style.txt')}
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
      <MapLegend />
    </View>);
}

