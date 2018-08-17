import React from "react";

import CustomControl from "./Google/GoogleMapsCustomControl";
import Button from "../../shared/Button/";

const GhostToggle = props => (
  <CustomControl {...props}>
    <Button>{props.children}</Button>
  </CustomControl>
);

export default GhostToggle;
