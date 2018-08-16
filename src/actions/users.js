import { callGetUsers, callPostUsers } from "../api/users";

/************************************************ ASYNC ************************************************/

export const __$setUsers = () => async dispatch => {
  try {
    const { data } = await callGetUsers();
    dispatch(setUsers(data));
  } catch (e) {
    throw new Error();
  }
};

/************************************************ ACTIONS ************************************************/

const setUsers = users => ({
  type: "SET_USERS",
  users
});
