import React from "react";

import { GOOGLE_MAPS_API_KEY } from "../../../../config";

export default {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100%`, width: `100%`, position: "relative" }} />,
  mapElement: <div style={{ height: `100%` }} />
};
