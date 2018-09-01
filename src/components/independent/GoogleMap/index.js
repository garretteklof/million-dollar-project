import React from "react";
import { connect } from "react-redux";

import GoogleMapsWrap from "./Google/GoogleMapsWrap";
import googleprops from "./Google/google-maps-wrap-props";

import Loader from "./Loader";
import MapMarker from "./MapMarker";
import GhostToggle from "./GhostToggle";

import { __$setUsers } from "../../../actions/users";
import { setBounds } from "../../../actions/map";

import { callGetUsers, callPatchUserLocation } from "../../../api/users";

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

  async componentDidMount() {
    // small mount delay w/ react-google-maps
    // can't access map ref on mount
    // ∴ need ~small setTimeout
    setTimeout(async () => {
      if (this._MAP_REF_) {
        try {
          await this.getCurrentLocation();

          // await seedRandomUsers(this.state.bounds, markers =>
          //   this.setState({ markers })
          // );

          //I have no real idea why this works.
          //But so much going on with seeding test users
          //neglible setTimeout keeps from having to refresh for users
          setTimeout(() => this.props.__$setUsers(), 100);
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
            await callPatchUserLocation(
              this.props.authId,
              { geo: { lat, lng } },
              token
            );
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
    const { bounds } = this.state;
    const users = data
      .filter(({ location }) => {
        if (location) {
          return bounds.contains(new google.maps.LatLng(location.geo));
        }
      })
      .filter(({ _id }) => _id !== this.props.authId);

    const markers = users.map(({ location }) => ({
      position: new google.maps.LatLng(location.geo)
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
    this.setState({ showLocation: !this.state.showLocation }, () => {
      const token = localStorage.getItem("x-auth-token");
      let isSharing;
      if (this.state.showLocation) {
        isSharing = true;
      } else {
        isSharing = false;
      }
      callPatchUserLocation(
        this.props.authId,
        { geo: { lat: this.state.lat, lng: this.state.lng }, isSharing },
        token
      );
    });

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

const mapStateToProps = ({ auth }) => ({
  authId: auth._id
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMap);
