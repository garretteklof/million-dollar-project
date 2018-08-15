import {
  callLogin,
  callLogout,
  callPostUsers,
  callPatchLocation,
  callGetUsers
} from "../../../api/";

const checkIfTestUserExists = async email => {
  const { data } = await callGetUsers();
  if (data.length) {
    return data.filter(({ dbEmail }) => dbEmail === email);
  }
};

const createNewTestUser = async (email, password) => {
  try {
    const response = await callPostUsers(email, password);
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
  } catch (e) {
    console.log(e);
  }
};

export const loginTestUser = async (email, password) => {
  try {
    const response = await callLogin(email, password);
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
  } catch (e) {
    console.log(e);
  }
};

export const logoutTestUser = async () => {
  try {
    const token = localStorage.getItem("x-auth-token");
    await callLogout(token);
  } catch (e) {
    console.log(e);
  }
};

export const handleTestUserBeforeMount = async () => {
  const email = "test@test.com";
  const password = "abc123";
  const testUserExists = await checkIfTestUserExists(email);
  if (testUserExists) {
    await logoutTestUser();
    await loginTestUser(email, password);
  } else {
    createNewTestUser(email, password);
  }
};

export const addRandomUser = async location => {
  try {
    const email = `${Math.random()
      .toString(36)
      .slice(-10)}@this-is-a-fake-email.com`;
    const response = await callPostUsers(email, "abc123");
    const token = response.headers["x-auth"];
    localStorage.setItem("x-auth-token", token);
    await callPatchLocation(location, token);
    await callLogout(token);
  } catch (e) {
    console.log(e);
  }
};
