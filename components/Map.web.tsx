import { GetGeomarData } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import {
  LngLatBoundsLike,
  Map,
  Popup
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import '../Global.css';
import MapFilterButton from './map/MapFilterButton';
import WebMarker from './map/MapSensorMarker.web';
import { MapSensorMeasurements } from './map/MapSensorMeasurements';
import MapZoomControl from './map/MapZoomControl';
export default function WebMap() {

  const [content, setContent] = useState<SensorModule[]>([])
  useEffect(() => {
    const fetchData = async () => {
    let data = await GetGeomarData()
    setContent(data)
    }
    fetchData()
  }, [])

  const [popupInfo, setPopupInfo] = useState<SensorModule>();
  const pins = useMemo(() => content.map((sensorModule, index) => (
    WebMarker(sensorModule, setPopupInfo)
    )
  ), [content]);

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
      mapStyle={require('../assets/images/style.txt')}
      maxBounds={mapBoundariesLongLat} // Germany
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
          <MapSensorMeasurements sensorModule={popupInfo} />
        </Popup>
      )}
      {/* <NavigationControl showCompass={true} showZoom={true} visualizePitch={true} key={"navigation-control"} /> */}
      <MapZoomControl zoomLevel={zoomLevel} minMaxZoomLevel={minMaxZoomLevel} setZoomLevel={setZoomLevel} setCurrentCoordinate={setCurrentCoordinate} homeCoordinate={homeCoordinate} />
      </Map>
      <MapFilterButton />
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fill the screen
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2c3538ff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    zIndex: 10, // Ensure it's above the map
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


