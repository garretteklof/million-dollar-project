import React from "react";
import { connect } from "react-redux";
import { Marker } from "react-google-maps";

import GoogleMapsWrap from "./GoogleMapsWrap";
import CustomControl from "./CustomControl";
import Button from "../../shared/Button/";

import { GOOGLE_MAPS_API_KEY } from "../../../config";

import { __$setUsers } from "../../../actions/users";
import { setBounds } from "../../../actions/map";

import { callGetUsers } from "../../../api/users";
import { callPatchLocation } from "../../../api/location";

import {
  loginTestUser,
  logoutTestUser,
  handleTestUserBeforeMount,
  addRandomUser
} from "../../../__seed/users";

class GoogleMap extends React.Component {
  state = {
    markers: [],
    bounds: null,
    lat: 43.07466941883877,
    lng: -89.38419462801693,
    showLocation: false,
    isLoading: false,
    geolocationDenied: false
  };

  componentDidMount() {
    handleTestUserBeforeMount();
    setTimeout(async () => {
      if (this._MAP_REF_) {
        try {
          await this.getCurrentLocation();
          await this.seedRandomUsers();
          this.props.__$setUsers();
        } catch (e) {
          console.log(e);
          this.setState({
            isLoading: false,
            geolocationDenied: true
          });
        }
      }
    }, 500);
  }

  _MAP_REF_ = null;

  onMapMounted = async ref => {
    if (ref && !this._MAP_REF_) {
      this._MAP_REF_ = ref;
    }
  };

  onBoundsChanged = () => {
    if (this._MAP_REF_) {
      this.setState(
        {
          bounds: this._MAP_REF_.getBounds()
        },
        () => {
          this.props.setBounds({ bounds: this.state.bounds });
          this.updateMarkers();
        }
      );
    }
  };

  getCurrentLocation = async () => {
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
            /* NEED TO DO THIS BETTER LATER */
            this.setState({
              bounds: this._MAP_REF_.getBounds(),
              showLocation: !this.state.showLocation,
              isLoading: false
            });
          });
          return resolve();
        },
        e => reject(e),
        { enableHighAccuracy: true }
      );
    });
  };

  placeUserMarker = () => {
    const { lat, lng } = this.state;
    if (this.state.showLocation) {
      return <Marker key="ME!" position={{ lat, lng }} title={"IT ME!"} />;
    }
  };

  seedRandomUsers = async () => {
    const { bounds } = this.state;
    const { data } = await callGetUsers();
    const users = data
      .filter(({ locationCoordinates }) =>
        bounds.contains(new google.maps.LatLng(locationCoordinates))
      )
      .filter(({ email }) => email !== "test@test.com");
    let markers = [];
    if (users.length < 10) {
      await logoutTestUser();
      for (let i = 0; i < 10; i++) {
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();
        const lngSpan = northEast.lng() - southWest.lng();
        const latSpan = northEast.lat() - southWest.lat();
        const position = new google.maps.LatLng(
          southWest.lat() + latSpan * Math.random(),
          southWest.lng() + lngSpan * Math.random()
        );
        markers.push({
          position
        });
        addRandomUser(position);
      }
      await loginTestUser("test@test.com", "abc123");
    } else {
      markers = users.map(({ locationCoordinates }) => ({
        position: new google.maps.LatLng(
          locationCoordinates.lat,
          locationCoordinates.lng
        )
      }));
    }
    this.setState({ markers });
  };

  onGhostToggleClick = () =>
    this.setState({ showLocation: !this.state.showLocation });

  updateMarkers = async () => {
    const { data } = await callGetUsers();
    const users = data
      .filter(({ locationCoordinates }) =>
        this.state.bounds.contains(new google.maps.LatLng(locationCoordinates))
      )
      .filter(({ email }) => email !== "test@test.com");

    const markers = users.map(({ locationCoordinates }) => ({
      position: new google.maps.LatLng(
        locationCoordinates.lat,
        locationCoordinates.lng
      )
    }));
    this.setState({ markers });
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
        {this.state.markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}

        {this.placeUserMarker()}

        {window.google &&
          !this.state.isLoading &&
          !this.state.geolocationDenied && (
            <CustomControl
              position={window.google.maps.ControlPosition.BOTTOM_CENTER}
              toggle={this.onGhostToggleClick}
            >
              <Button>Ghost Mode</Button>
            </CustomControl>
          )}
        {this.state.isLoading && (
          <CustomControl
            position={window.google.maps.ControlPosition.CENTER}
            toggle={() => console.log("I'm a fraud component!")}
          >
            <span style={{ fontSize: "8rem" }}>LOADING!</span>
          </CustomControl>
        )}
      </GoogleMapsWrap>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setBounds: bounds => dispatch(setBounds(bounds)),
  __$setUsers: () => dispatch(__$setUsers())
});

export default connect(
  undefined,
  mapDispatchToProps
)(GoogleMap);
