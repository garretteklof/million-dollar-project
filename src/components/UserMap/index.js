import React from "react";
import { Marker } from "react-google-maps";

import GoogleMapsWrap from "./GoogleMapsWrap";
import CustomMapControl from "./CustomMapControl";

import { GOOGLE_MAPS_API_KEY } from "../../config/config";

export default class UserMap extends React.Component {
  state = {
    markers: [],
    bounds: null,
    lat: 43.07466941883877,
    lng: -89.38419462801693,
    showLocation: false,
    isLoading: false
  };

  componentDidMount() {}

  _MAP_REF_ = null;

  onMapMounted = ref => {
    if (ref && !this._MAP_REF_) {
      this._MAP_REF_ = ref;
    }
  };

  onBoundsChanged = () => {
    if (this._MAP_REF_) {
      this.setState({
        bounds: this._MAP_REF_.getBounds(),
        markers: []
      });
    }
  };

  onIdle = () => {
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
      this.setState({ markers: newMarkerArray });
    }
  };

  getCurrentLocation = callback => {
    this.setState({ isLoading: true });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        this.setState({ lat: coords.latitude, lng: coords.longitude }, () => {
          const { lat, lng } = this.state;
          typeof callback === "function" && callback();

          /* NEED TO DO THIS BETTER LATER */
          this._MAP_REF_.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
            {
              lat,
              lng
            }
          );
          /* NEED TO DO THIS BETTER LATER */
        }),
      () => console.log("ERROR HANDLE HERE!")
    );
  };

  toggleLocation = () =>
    this.setState({
      showLocation: !this.state.showLocation,
      isLoading: false
    });

  handleToggleLocation = () => {
    if (this.state.showLocation) {
      return this.toggleLocation();
    }
    this.getCurrentLocation(this.toggleLocation);
  };

  render() {
    const { lat, lng } = this.state;
    return (
      <GoogleMapsWrap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={15}
        defaultCenter={{ lat, lng }}
        onMapMounted={this.onMapMounted}
        onBoundsChanged={this.onBoundsChanged}
        onIdle={this.onIdle}
      >
        {this.state.showLocation && (
          <Marker key="ME!" position={{ lat, lng }} title={"IT ME, MARIO!"} />
        )}
        {this.state.showLocation &&
          this.state.markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
        {window.google && (
          <CustomMapControl
            position={window.google.maps.ControlPosition.BOTTOM_CENTER}
            toggle={this.handleToggleLocation}
          >
            <a className="user-map__controls">Toggle Map</a>
          </CustomMapControl>
        )}
        {this.state.isLoading && (
          <CustomMapControl
            position={window.google.maps.ControlPosition.CENTER}
            toggle={() => console.log("I'm a fraud component!")}
          >
            <span style={{ fontSize: "8rem" }}>LOADING!</span>
          </CustomMapControl>
        )}
      </GoogleMapsWrap>
    );
  }
}
