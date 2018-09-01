import React from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import PubRoute from "./PubRoute";
import AuthRoute from "./AuthRoute";

import Login from "../components/pages/Login/";
import Discover from "../components/pages/Discover";

export const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <PubRoute path="/login" component={Login} />
      <AuthRoute path="/discover" component={Discover} />
    </Switch>
  </Router>
);

export default App;
