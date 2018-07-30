import React from "react";

import GoogleMapsWrap from "./GoogleMapsWrap";
import LocatorToggle from "./LocatorToggle";

export default class UserMap extends React.Component {
  state = { lat: 0, lng: 0, showLocation: false };

  getCurrentLocation = callback => {
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
      showLocation: !this.state.showLocation
    });

  onLocatorClick = () => {
    this.state.showLocation
      ? this.toggleLocation()
      : this.getCurrentLocation(this.toggleLocation);
  };

  overlayMapDisplays = () => {
    if (!navigator.geolocation) {
      return <p>Geolocation not supported by your browser :(</p>;
    } else if (!this.state.showLocation) {
      return <p>Currently Not Showing Map!</p>;
    } else {
      return <GoogleMapsWrap lat={this.state.lat} lng={this.state.lng} />;
    }
  };

  render() {
    return (
      <div>
        <LocatorToggle onLocatorClick={this.onLocatorClick} />
        {this.overlayMapDisplays()}
      </div>
    );
  }
}
