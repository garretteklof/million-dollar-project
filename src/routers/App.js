import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import Login from "../components/pages/Login/";
import Discover from "../components/pages/Discover";

export const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/discover" component={Discover} />
      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default App;
