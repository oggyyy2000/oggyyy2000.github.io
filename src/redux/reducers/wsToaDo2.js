import * as types from "../types";

const initialState = [];
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.WS_TOA_DO2:
      return action.data;
    default:
      return state;
  }
};
export default myReducers;
