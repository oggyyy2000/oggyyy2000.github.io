import * as types from "../types";

const initialState = [];
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_CURRENT_TUYEN_CHANGE:
      return action.data;
    default:
      return state;
  }
};
export default myReducers;
