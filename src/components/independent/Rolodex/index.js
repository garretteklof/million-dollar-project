import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Grid from "./Grid";
import User from "./User";

const Rolodex = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/user-:id`} component={User} />
    <Route path={`${match.path}`} component={Grid} />
    <Redirect to={`${match.url}`} />
  </Switch>
);
export default Rolodex;
