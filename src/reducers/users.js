const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, { type, users }) => {
  switch (type) {
    case "SET_USERS":
      return users;
    default:
      return state;
  }
};
