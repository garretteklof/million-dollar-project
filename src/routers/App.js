import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Discover from "../components/pages/Discover";

const App = () => (
  <Router>
    <Switch>
      <Route path="/discover" component={Discover} />
      <Redirect to="/discover" />
    </Switch>
  </Router>
);

export default App;
