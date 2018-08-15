import axios from "axios";

export const callPatchLocation = (location, token) =>
  axios.patch("/current-location", location, {
    headers: {
      "x-auth": token
    }
  });
