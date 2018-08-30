import React from "react";
import "./sprites.svg";

const Sprite = ({ icon, ...rest }) => (
  <svg {...rest}>
    <use xlinkHref={`#sprites_${icon}`} />
  </svg>
);

export default Sprite;
