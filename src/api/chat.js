import axios from "axios";

export const callGetConvos = (participants, token) =>
  axios.get("/convos", {
    headers: {
      "x-auth": token
    },
    params: {
      participants
    }
  });

export const callPostConvos = (participants, token) =>
  axios.post("/convos", { participants }, { headers: { "x-auth": token } });

export const callGetMessages = (convoId, token) =>
  axios.get("/messages", {
    headers: {
      "x-auth": token
    },
    params: {
      convoId
    }
  });

export const callPostMessages = (message, token) =>
  axios.post("/messages", { ...message }, { headers: { "x-auth": token } });
