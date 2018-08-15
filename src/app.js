import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./routers/App";
import configureStore from "./store/configureStore";
import { injectGlobal } from "styled-components";

const store = configureStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));

injectGlobal`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
  }
  body {
    box-sizing: border-box;
  }`;
