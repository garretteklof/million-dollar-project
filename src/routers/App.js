import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Discovery from "../components/pages/Discovery";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Discovery} exact={true} />
    </Switch>
  </Router>
);

export default App;
