import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import "./styles/styles.scss";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<AppRouter />, document.getElementById("app"));
