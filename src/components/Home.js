import React from "react";

import UserMap from "./UserMap/";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <UserMap />
      </div>
    );
  }
}
