import faker from "faker";
import { callLogin, callLogout } from "../api/auth";
import {
  callPostUsers,
  callGetUsers,
  callPatchUser,
  callPatchUserLocation
} from "../api/users";

export const handleTestUserBeforeMount = async () => {
  const email = "test@test.com";
  const password = "abc123";
  const name = { first: "Slim", last: "Jesus" };
  const testUserExists = await checkIfTestUserExists(email);
  if (testUserExists) {
    await logoutTestUser();
    await loginTestUser(email, password);
  } else {
    await createNewTestUser({ email, password, name });
  }
  return localStorage.getItem("x-auth-token");
};

export const seedRandomUsers = async (bounds, callback) => {
  const { data } = await callGetUsers();
  const users = data
    .filter(({ location }) => {
      if (location) {
        return bounds.contains(new google.maps.LatLng(location.geo));
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
      addRandomUser({ geo: position });
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
    const id = response.data._id;
    const avatar = faker.image.avatar();
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
    await callPatchUser(id, { avatar }, token);
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
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();
    const name = { first: faker.name.firstName(), last: faker.name.lastName() };
    const avatar = faker.image.avatar();
    const forte = chooseRandomForte();
    const response = await callPostUsers({
      name,
      email,
      password
    });
    const id = response.data._id;
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
    await callPatchUser(id, { avatar, forte }, token);
    await callPatchUserLocation(id, location, token);
    await callLogout(token);
  } catch (e) {
    console.log(e);
  }
};

const chooseRandomForte = () => {
  const forteArray = ["visionary", "engineer", "artist", "tbd"];
  return forteArray[Math.floor(Math.random() * forteArray.length)];
};
