import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PubRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  authenticated: !!auth._id
});

export default connect(mapStateToProps)(PubRoute);
