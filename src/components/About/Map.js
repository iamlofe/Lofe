import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapWithAMarker = withScriptjs(
  withGoogleMap(({coords}) => (
    <GoogleMap defaultZoom={8} defaultCenter={coords}>
      <Marker position={coords} />
    </GoogleMap>
  ))
);

const Map = ({coords}) => (
  <MapWithAMarker
    coords={coords}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPgp2up9kVOEq2H1wBDhmSS4EmHGdssbw&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{height: `100%`}} />}
    containerElement={<div style={{height: `100%`}} />}
    mapElement={<div style={{height: `100%`}} />}
  />
);

export default Map;
