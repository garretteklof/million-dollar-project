import React from "react";

import GoogleMapWrap from "./GoogleMapWrap";

export default class Home extends React.Component {
  state = { lat: 21.42251, lng: 39.826168 };
  componentDidMount() {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported by your browser :(");
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude
        }),
      () => console.log("Tough beans!")
    );
  }
  render() {
    return <GoogleMapWrap {...this.state} zoom={15} />;
  }
}
