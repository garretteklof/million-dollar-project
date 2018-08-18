import axios from "axios";

export const callPatchLocation = (location, token) =>
  axios.patch("/location", location, {
    headers: {
      "x-auth": token
    }
  });
