import React from "react";
import Loader from "react-loaders";

import GoogleMapsWrap from "./GoogleMapsWrap";

export default class UserMap extends React.Component {
  state = { lat: 0, lng: 0, showLocation: false, isLoading: false };

  getCurrentLocation = callback => {
    this.setState({ isLoading: true });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        this.setState(
          { lat: coords.latitude, lng: coords.longitude },
          () => typeof callback === "function" && callback() // optional callback
        ),
      () => console.log("ERROR HANDLE HERE!")
    );
  };

  toggleLocation = () =>
    this.setState({
      showLocation: !this.state.showLocation,
      isLoading: false
    });

  onLocatorClick = () => {
    this.state.showLocation
      ? this.toggleLocation()
      : this.getCurrentLocation(this.toggleLocation);
  };

  overlayMapDisplays = () => {
    if (!navigator.geolocation) {
      return <p>Geolocation not supported by your browser :(</p>;
    } else if (this.state.isLoading) {
      return <Loader type="ball-rotate" style={{ transform: "scale(1.5)" }} />;
    } else if (!this.state.showLocation) {
      return <p>Currently NOT showing map!</p>;
    } else {
      return <GoogleMapsWrap lat={this.state.lat} lng={this.state.lng} />;
    }
  };

  render() {
    return (
      <div className="user-map">
        <a className="user-map__controls" onClick={this.onLocatorClick}>
          Toggle Map
        </a>
        <div className="user-map__map">{this.overlayMapDisplays()}</div>
      </div>
    );
  }
}
