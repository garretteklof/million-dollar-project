import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../components/Home";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact={true} />
    </Switch>
  </Router>
);

export default App;
