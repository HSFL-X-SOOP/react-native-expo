import { LocationWithBoxes, SensorModule } from '@/api/models/sensor';
import { useSensorData, useSensorDataNew } from '@/hooks/useSensors';
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
import WebMarkerNew from './map/MapSensorMarker.web';
import { MapSensorMeasurementsNew } from './map/MapSensorMeasurements';
import MapZoomControl from './map/MapZoomControl';
export default function WebMap() {

  const { data: content } = useSensorData();
  const { data: content2 } = useSensorDataNew();

  const [popupInfo, setPopupInfo] = useState<SensorModule>();
  const [popupInfo2, setPopupInfo2] = useState<LocationWithBoxes>();
  // const pins = useMemo(() => content.map((sensorModule) => (
  //   WebMarker(sensorModule, setPopupInfo)
  //   )
  // ), [content]);

  const pins2 = useMemo(() => content2.map((sensorModule) => (
    WebMarkerNew(sensorModule, setPopupInfo2)
    )
  ), [content2]);

  const [zoomLevel, setZoomLevel] = useState(7);
  const homeCoordinate: [number, number] = [9.26, 54.47926];
  const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>(homeCoordinate);
  const minMaxZoomLevel = { min: 3, max: 16 };

  const mapBoundariesLongLat: LngLatBoundsLike = [[-31.266001, 27.560001], [49.869301, 71.185001]]
  const [viewState, setViewState] = useState({
    longitude: homeCoordinate[0],
    latitude: homeCoordinate[1],
    zoom: zoomLevel
  });


  return (
    <View style={{flex: 1}}>
      <Map
      initialViewState={viewState}
      onMove={e => {setCurrentCoordinate([e.viewState.longitude, e.viewState.latitude]); setViewState(e.viewState); setZoomLevel(e.viewState.zoom)}}
      key={"map"}
      //style={{width: 1600, height: 1200}}
      // mapStyle="https://demotiles.maplibre.org/style.json"
      mapStyle={require('../assets/style.txt')}
      maxBounds={mapBoundariesLongLat} // Germany
      longitude={currentCoordinate[0]}
      latitude={currentCoordinate[1]}
      zoom={zoomLevel}
      >
        {pins2}
        {/* {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.location.coordinates.lon)}
          latitude={Number(popupInfo.location.coordinates.lat)}
          onClose={() => setPopupInfo(undefined)}
        >
          <MapSensorMeasurements sensorModule={popupInfo} />
        </Popup>
      )} */}
              {popupInfo2 && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo2.location.coordinates.lon)}
          latitude={Number(popupInfo2.location.coordinates.lat)}
          onClose={() => setPopupInfo2(undefined)}
        >
          <MapSensorMeasurementsNew locationWithBoxes={popupInfo2} />
        </Popup>
      )}
      {/* <NavigationControl showCompass={true} showZoom={true} visualizePitch={true} key={"navigation-control"} /> */}
      <MapZoomControl zoomLevel={zoomLevel} minMaxZoomLevel={minMaxZoomLevel} setZoomLevel={setZoomLevel} setCurrentCoordinate={setCurrentCoordinate} homeCoordinate={homeCoordinate} />
      </Map>
      {/* <MapFilterButton /> */}
    </View>);
}

