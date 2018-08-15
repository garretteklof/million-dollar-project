import axios from "axios";

export const callGetUsers = () => axios.get("/users");

export const callPostUsers = (email, password) =>
  axios.post("/users", {
    email,
    password
  });

export const callGetMe = token =>
  axios.get("/users/me", {
    headers: {
      "x-auth": token
    }
  });
