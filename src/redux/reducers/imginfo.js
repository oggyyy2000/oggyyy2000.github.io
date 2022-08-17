import * as types from "../types";

const initialState = [];
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.DETAIL_IMG:
      return action.data;
    default:
      return state;
  }
};
export default myReducers;
