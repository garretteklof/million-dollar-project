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

export const callGetUser = (id, token) =>
  axios.get(`/users/${id}`, {
    headers: { "x-auth": token }
  });

export const callPatchUser = (id, payload, token) =>
  axios.patch(`/users/${id}`, payload, {
    headers: { "x-auth": token }
  });

export const callPatchUserLocation = (id, location, token) =>
  axios.patch(`/users/${id}/location`, location, {
    headers: {
      "x-auth": token
    }
  });
