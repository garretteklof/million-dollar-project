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
