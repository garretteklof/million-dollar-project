import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "../components/pages/Login/";
import Discover from "../components/pages/Discover";

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/discover" component={Discover} />
      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default App;
