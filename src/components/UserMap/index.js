import React from "react";
import { Marker } from "react-google-maps";
import styled from "styled-components";

import GoogleMapsWrap from "./Google/GoogleMapsWrap";
import CustomMapControl from "./Google/CustomMapControl";

import { GOOGLE_MAPS_API_KEY } from "../../config";

import { callPatchLocation, callGetUsers } from "../../api/";
import {
  loginTestUser,
  logoutTestUser,
  handleTestUserBeforeMount,
  addRandomUser
} from "./__seed/users";

export default class UserMap extends React.Component {
  state = {
    markers: [],
    bounds: null,
    lat: 43.07466941883877,
    lng: -89.38419462801693,
    showLocation: false,
    isLoading: false
  };

  _MAP_REF_ = null;

  componentWillMount() {
    handleTestUserBeforeMount();
  }

  onMapMounted = ref => {
    if (ref && !this._MAP_REF_) {
      this._MAP_REF_ = ref;
    }
  };

  onBoundsChanged = () => {
    if (this._MAP_REF_) {
      this.setState({
        bounds: this._MAP_REF_.getBounds()
      });
    }
  };

  seedUsers = async () => {
    const { bounds, lat, lng } = this.state;
    const { data } = await callGetUsers();
    let newMarkerArray = [];
    if (data.length < 11) {
      await logoutTestUser();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const lngSpan = northEast.lng() - southWest.lng();
      const latSpan = northEast.lat() - southWest.lat();
      for (let i = 0; i < 10; i++) {
        const position = new google.maps.LatLng(
          southWest.lat() + latSpan * Math.random(),
          southWest.lng() + lngSpan * Math.random()
        );
        newMarkerArray.push({ position });
        addRandomUser(position);
      }
      newMarkerArray.push({ position: new google.maps.LatLng(lat, lng) });
      await loginTestUser("test@test.com", "abc123");
    } else {
      newMarkerArray = data.map(({ locationCoordinates }) => ({
        position: new google.maps.LatLng(
          locationCoordinates.lat,
          locationCoordinates.lng
        )
      }));
    }
    this.setState({ markers: newMarkerArray });
  };

  getCurrentLocation = async callback => {
    this.setState({ isLoading: true });
    const token = localStorage.getItem("x-auth-token");
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const lat = coords.latitude;
          const lng = coords.longitude;
          try {
            await callPatchLocation({ lat, lng }, token);
          } catch (e) {}
          this.setState({ lat, lng }, () => {
            /* NEED TO DO THIS BETTER LATER */
            this._MAP_REF_.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
              {
                lat,
                lng
              }
            );
            this.setState({
              bounds: this._MAP_REF_.getBounds()
            });
            /* NEED TO DO THIS BETTER LATER */
            typeof callback === "function" && callback();
          });
          return resolve();
        },
        () => reject(Error("ERROR HANDLE HERE!")),
        { enableHighAccuracy: true }
      );
    });
  };

  toggleLocation = () =>
    this.setState({
      showLocation: !this.state.showLocation,
      isLoading: false
    });

  onToggleButtonClick = async () => {
    if (this.state.showLocation) {
      return this.toggleLocation();
    }
    try {
      await this.getCurrentLocation(this.toggleLocation);
      this.seedUsers();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { lat, lng } = this.state;
    return (
      <GoogleMapsWrap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
        onMapMounted={this.onMapMounted}
        onBoundsChanged={this.onBoundsChanged}
      >
        {/* {this.state.showLocation && (
          <Marker key="ME!" position={{ lat, lng }} title={"IT ME, MARIO!"} />
        )} */}

        {this.state.showLocation &&
          this.state.markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
        {window.google &&
          !this.state.isLoading && (
            <CustomMapControl
              position={window.google.maps.ControlPosition.BOTTOM_CENTER}
              toggle={this.onToggleButtonClick}
            >
              <ToggleMap>Toggle Map</ToggleMap>
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

const ToggleMap = styled.a`
  cursor: pointer;
  color: blue;
  font-size: 3rem;
`;
