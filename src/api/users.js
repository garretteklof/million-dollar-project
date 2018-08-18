import axios from "axios";

export const callGetUsers = () => axios.get("/users");

export const callPostUsers = user =>
  axios.post("/users", {
    ...user
  });

export const callGetMe = token =>
  axios.get("/users/me", {
    headers: {
      "x-auth": token
    }
  });
