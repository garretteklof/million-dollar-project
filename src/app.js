import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./routers/App";
import configureStore from "./store/configureStore";
import { injectGlobal } from "styled-components";
import { loginUser, logoutUser } from "./actions/auth";
import { callGetMe } from "./api/users";

const store = configureStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById("app"));
    hasRendered = true;
  }
};

(async () => {
  const token = sessionStorage.getItem("x-auth-token");
  if (token) {
    try {
      const currentUser = await callGetMe(token);
      store.dispatch(loginUser(currentUser.data));
    } catch (e) {
      sessionStorage.removeItem("x-auth-token");
      store.dispatch(logoutUser());
    }
  }
  renderApp();
})();

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
