const mapReducerDefaultState = {};

export default (state = mapReducerDefaultState, { type, payload }) => {
  switch (type) {
    case "SET_BOUNDS":
      const { bounds } = payload;
      return { ...state, bounds };
    default:
      return state;
  }
};
