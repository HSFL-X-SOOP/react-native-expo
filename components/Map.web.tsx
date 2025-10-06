import { LocationWithBoxes } from '@/api/models/sensor';
import { useSensorDataNew } from '@/hooks/useSensors';
import {
  LngLatBoundsLike,
  Map,
  Popup
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import '../Global.css';
import SensorMarker from './map/SensorMarker.web';
import { SensorPopup } from './map/MapSensorMeasurements';
import MapZoomControl from './map/MapZoomControl';

export default function WebMap() {
  const { data: content } = useSensorDataNew();
  const [popupInfo, setPopupInfo] = useState<LocationWithBoxes>();

  const pins = useMemo(() => content.map((locationWithBoxes) => (
    <SensorMarker
      key={locationWithBoxes.location.id}
      locationWithBoxes={locationWithBoxes}
      setPopupInfo={setPopupInfo}
    />
  )), [content]);

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

  return (
    <View style={{flex: 1}}>
      <Map
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
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.location.coordinates.lon)}
            latitude={Number(popupInfo.location.coordinates.lat)}
            onClose={() => setPopupInfo(undefined)}
          >
            <SensorPopup locationWithBoxes={popupInfo} />
          </Popup>
        )}
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

