import React from "react";

import GoogleMapsWrap from "./GoogleMapsWrap";
import LocatorToggle from "./LocatorToggle";

export default class UserMap extends React.Component {
  state = { lat: 0, lng: 0, showLocation: false };

  onLocatorClick = () => {
    if (!this.state.showLocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          this.setState({
            lat: coords.latitude,
            lng: coords.longitude,
            showLocation: true
          }),
        () => console.log("ERROR HANDLE HERE!")
      );
    } else {
      this.setState({ showLocation: false });
    }
  };

  render() {
    return (
      <div>
        <LocatorToggle onLocatorClick={this.onLocatorClick} />
        {this.state.showLocation ? (
          <GoogleMapsWrap lat={this.state.lat} lng={this.state.lng} zoom={15} />
        ) : (
          <p>Currently Not Showing Map!</p>
        )}
      </div>
    );
  }
}

// if (!navigator.geolocation) {
//   return <p>Geolocation not supported by your browser :(</p>;
// }

/* <GoogleMapsWrap lat={this.state.lat} lng={this.state.lng} zoom={15} />; */
