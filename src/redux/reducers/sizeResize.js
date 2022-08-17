import * as types from "../types";

const initialState = {
  width1: "55%",
  width2: "45%",
  height1: "50%",
  height2: "50%",
};

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.sizeResize:
      return action.data;
    default:
      return state;
  }
};
export default myReducers;
