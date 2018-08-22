import React from "react";

import { MAP_PADDING } from "../../../shared/Variables";

export default {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: (
    <div
      style={{
        maxHeight: `calc(100vh - 2 * ${MAP_PADDING})`,
        height: `100%`,
        width: `100%`,
        position: "relative"
      }}
    />
  ),
  mapElement: <div style={{ height: `100%` }} />
};
