import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const GoogleMapsWrap = withScriptjs(
  withGoogleMap(props => {
    const { onMapMounted, ...otherProps } = props;
    return (
      <GoogleMap
        {...otherProps}
        ref={ref => {
          onMapMounted && onMapMounted(ref);
        }}
      >
        {props.children}
      </GoogleMap>
    );
  })
);

export default GoogleMapsWrap;
