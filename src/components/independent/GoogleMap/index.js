import React from "react";
import { connect } from "react-redux";

import GoogleMapsWrap from "./Google/GoogleMapsWrap";
import googleprops from "./Google/google-maps-wrap-props";

import Loader from "./Loader";
import MapMarker from "./MapMarker";
import GhostToggle from "./GhostToggle";

import { __$setUsers } from "../../../actions/users";
import { setBounds } from "../../../actions/map";

import { callGetUsers } from "../../../api/users";
import { callPatchLocation } from "../../../api/location";

import {
  handleTestUserBeforeMount,
  seedRandomUsers
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
    // small mount delay w/ react-google-maps
    // can't access map ref on mount
    // ∴ need ~small setTimeout
    setTimeout(async () => {
      if (this._MAP_REF_) {
        try {
          await this.getCurrentLocation();
          await seedRandomUsers(this.state.bounds, markers =>
            this.setState({ markers })
          );
          this.props.__$setUsers();
        } catch (e) {
          console.log(e);
          this.props.__$setUsers();
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
          this.updateMarkers();
          this.props.setBounds({ bounds: this.state.bounds });
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

  placeMarkersOnMap = () => {
    const { markers, lat, lng } = this.state;
    const userMarker = (
      <MapMarker key="ME!" position={{ lat, lng }} title={"IT ME!"} />
    );
    let allMarkers = markers.map((marker, index) => (
      <MapMarker key={index} position={marker.position} />
    ));
    if (this.state.showLocation) {
      allMarkers.push(userMarker);
    }
    return allMarkers;
  };

  placeControlsOnMap = () => {
    const { isLoading, geolocationDenied } = this.state;
    if (window.google && !isLoading && !geolocationDenied) {
      return (
        <GhostToggle
          position={window.google.maps.ControlPosition.BOTTOM_CENTER}
          toggle={this.onGhostToggle}
          children={"Ghost Toggle"}
        />
      );
    }
  };

  onGhostToggle = () =>
    this.setState({ showLocation: !this.state.showLocation });

  render() {
    const { lat, lng, isLoading } = this.state;
    return (
      <GoogleMapsWrap
        {...googleprops}
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
        onMapMounted={this.onMapMounted}
        onBoundsChanged={this.onBoundsChanged}
      >
        {isLoading && <Loader>LOADING!</Loader>}
        {this.placeMarkersOnMap()}
        {this.placeControlsOnMap()}
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
