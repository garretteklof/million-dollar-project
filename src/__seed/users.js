import { callLogin, callLogout } from "../api/auth";
import { callPostUsers, callGetUsers } from "../api/users";
import { callPatchLocation } from "../api/location";
import { names } from "./random-names";

export const handleTestUserBeforeMount = async () => {
  const email = "test@test.com";
  const password = "abc123";
  const firstName = "Slim";
  const lastName = "Jesus";
  const testUserExists = await checkIfTestUserExists(email);
  if (testUserExists) {
    await logoutTestUser();
    await loginTestUser(email, password);
  } else {
    createNewTestUser({ email, password, firstName, lastName });
  }
};

export const seedRandomUsers = async (bounds, callback) => {
  const { data } = await callGetUsers();
  const users = data
    .filter(({ location }) => {
      if (location) {
        return bounds.contains(new google.maps.LatLng(location.coordinates));
      }
    })
    .filter(({ email }) => email !== "test@test.com");
  let markers = [];
  if (users.length < 10) {
    await logoutTestUser();
    for (let i = 0; i < 10; i++) {
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const lngSpan = northEast.lng() - southWest.lng();
      const latSpan = northEast.lat() - southWest.lat();
      const position = new google.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
      );
      markers.push({ position });
      addRandomUser(position);
    }
    await loginTestUser("test@test.com", "abc123");
    callback(markers);
  }
};

const checkIfTestUserExists = async email => {
  const { data } = await callGetUsers();
  if (data.length) {
    return data.filter(({ dbEmail }) => dbEmail === email);
  }
};

const createNewTestUser = async user => {
  try {
    const response = await callPostUsers(user);
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
  } catch (e) {
    console.log(e);
  }
};

const loginTestUser = async (email, password) => {
  try {
    const response = await callLogin(email, password);
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
  } catch (e) {
    console.log(e);
  }
};

const logoutTestUser = async () => {
  try {
    const token = localStorage.getItem("x-auth-token");
    await callLogout(token);
  } catch (e) {
    console.log(e);
  }
};

const addRandomUser = async location => {
  try {
    const email = `${Math.random()
      .toString(36)
      .slice(-10)}@this-is-a-fake-email.com`;
    const password = "abc123";
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = names[Math.floor(Math.random() * names.length)];
    const response = await callPostUsers({
      firstName,
      lastName,
      email,
      password
    });
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
    await callPatchLocation(location, token);
    await callLogout(token);
  } catch (e) {
    console.log(e);
  }
};
