import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { GOOGLE_MAPS_API_KEY } from "../../../config/config";

const GoogleMapsWrap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        bounds: null,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            markers: []
          });
        },
        onIdle: () => {
          const { bounds, markers } = this.state;
          if (bounds && !markers.length) {
            const southWest = bounds.getSouthWest();
            const northEast = bounds.getNorthEast();
            const lngSpan = northEast.lng() - southWest.lng();
            const latSpan = northEast.lat() - southWest.lat();
            let newMarkerArray = [];
            for (let i = 0; i < 10; i++) {
              const position = new google.maps.LatLng(
                southWest.lat() + latSpan * Math.random(),
                southWest.lng() + lngSpan * Math.random()
              );
              newMarkerArray.push({ position });
            }
            this.setState({
              markers: newMarkerArray
            });
          }
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    onBoundsChanged={props.onBoundsChanged}
    onIdle={props.onIdle}
  >
    <Marker
      key="ME!"
      position={{ lat: props.lat, lng: props.lng }}
      title="IT'S ME, MARIO!"
    />
    {props.markers.map((marker, index) => (
      <Marker key={index} position={marker.position} />
    ))}
  </GoogleMap>
));
export default GoogleMapsWrap;
