import React from "react";
import "./sprites.svg";

const Sprite = ({ icon }) => (
  <svg>
    <use xlinkHref={`#sprites_${icon}`} />
  </svg>
);

export default Sprite;
