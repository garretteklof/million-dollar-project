import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import GridOfCards from "./GridOfCards";
import UserSummary from "./UserSummary";
import Chat from "../Chat";

const Rolodex = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/chat`} component={Chat} exact />
    <Route path={`${match.path}/:internalUrl`} component={UserSummary} />
    <Route path={`${match.path}`} component={GridOfCards} />
    <Redirect to={`${match.url}`} />
  </Switch>
);
export default Rolodex;
