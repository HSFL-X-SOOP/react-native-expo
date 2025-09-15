import { GetGeomarData } from '@/data/geomar-data';
import { SensorModule } from '@/data/sensor';
import {
  Map,
  Popup
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import WebMarker from './map/MapSensorMarker.web';
import { MapSensorMeasurements } from './map/MapSensorMeasurements';
export default async function WebMap() {

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

  return (
    <View>
      <Map
      initialViewState={{
        longitude: 9.26,
        latitude: 54.47926,
        zoom: 7
      }}
      style={{width: 1600, height: 1200}}
      // mapStyle="https://demotiles.maplibre.org/style.json"
      mapStyle={require('../assets/images/style.txt')}

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
      </Map>
    </View>);
}



