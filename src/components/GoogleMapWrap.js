import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { GOOGLE_MAPS_API_KEY } from "../../config/config";

const GoogleMapWrap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ lat, lng, zoom }) => (
  <GoogleMap center={{ lat, lng }} zoom={zoom}>
    <Marker position={{ lat, lng }} title="Hello World!" />
  </GoogleMap>
));
export default GoogleMapWrap;
