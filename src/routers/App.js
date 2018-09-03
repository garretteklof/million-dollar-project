import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PubRoute from "./PubRoute";
import AuthRoute from "./AuthRoute";

import Login from "../components/pages/Login/";
import Discover from "../components/pages/Discover";

const App = () => (
  <Router>
    <Switch>
      <PubRoute path="/login" component={Login} />
      <AuthRoute path="/discover" component={Discover} />
      <Redirect to="/discover" />
    </Switch>
  </Router>
);

export default App;
