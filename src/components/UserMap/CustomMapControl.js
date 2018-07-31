import React from "react";
import { createPortal } from "react-dom";
import { MAP } from "react-google-maps/lib/constants";
import PropTypes from "prop-types";
export default class CustomMapControl extends React.Component {
  static contextTypes = { [MAP]: PropTypes.object };
  componentWillMount() {
    this.map = this.context[MAP];
    this.controlDiv = document.createElement("div");
    this.controlDiv.addEventListener("click", this.props.toggle);
    this.map.controls[this.props.position].push(this.controlDiv);
  }
  componentWillUnmount() {
    this.controlDiv.removeEventListener("click", this.props.toggle);
  }
  render() {
    return createPortal(this.props.children, this.controlDiv);
  }
}
