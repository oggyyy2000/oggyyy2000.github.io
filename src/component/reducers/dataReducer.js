export const dataReducer = (state, action) => {
  const {
    type,
    payload: { name, obj3d },
  } = action;

  switch (type) {
    case "SET_DATA": 
      return {
        ...state,
        name,
        obj3d,
      };

    default:
      return state;
  }
};
