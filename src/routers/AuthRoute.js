import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  authenticated: !!auth._id
});

export default connect(mapStateToProps)(AuthRoute);
