import React from "react";

const LocatorToggle = ({ onLocatorClick }) => (
  <a
    onClick={onLocatorClick}
    style={{ cursor: "pointer", color: "blue", fontSize: "3rem" }}
  >
    Toggle Map
  </a>
);

export default LocatorToggle;
