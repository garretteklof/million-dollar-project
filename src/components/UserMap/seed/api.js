import axios from "axios";

export const callLogin = (email, password) =>
  axios.post("/login", {
    email,
    password
  });

export const callLogout = token =>
  axios.delete("/logout", {
    headers: {
      "x-auth": token
    }
  });

export const callGetUsers = () => axios.get("/users");

export const callPostUsers = (email, password) =>
  axios.post("/users", {
    email,
    password
  });

export const callPatchLocation = (location, token) =>
  axios.patch("/current-location", location, {
    headers: {
      "x-auth": token
    }
  });

export const callGetMe = token =>
  axios.get("/users/me", {
    headers: {
      "x-auth": token
    }
  });
