import { GetGeomarData } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import {
  LngLatBoundsLike,
  Map,
  NavigationControl,
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

  const mapBoundariesLongLat: LngLatBoundsLike = [[-31.266001, 27.560001], [49.869301, 71.185001]]
  const [viewState, setViewState] = useState({
    longitude: 9.26,
    latitude: 54.47926,
    zoom: 7
  });
  return (
    <View style={{flex: 1}}>
      <Map
      initialViewState={viewState}
      onMove={e => setViewState(e.viewState)}
      key={"map"}
      //style={{width: 1600, height: 1200}}
      // mapStyle="https://demotiles.maplibre.org/style.json"
      mapStyle={require('../assets/images/style.txt')}
      maxBounds={mapBoundariesLongLat} // Germany

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
      <NavigationControl showCompass={true} showZoom={true} visualizePitch={true} key={"navigation-control"} />
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


