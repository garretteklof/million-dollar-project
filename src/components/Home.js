import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported by your browser :(");
    }
    new google.maps.Map(this.mapContainer.current, {
      center: { lat: 0, lng: 0 },
      zoom: 1
    });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const geoCoordinates = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        const map = new google.maps.Map(this.mapContainer.current, {
          center: geoCoordinates,
          zoom: 15
        });
        new google.maps.Marker({
          map,
          position: geoCoordinates,
          title: "Hello World!"
        });
      },
      () => console.log("Tough beans!")
    );
  }
  render() {
    return (
      <div
        ref={this.mapContainer}
        style={{ height: "400px", width: "400px" }}
      />
    );
  }
}
