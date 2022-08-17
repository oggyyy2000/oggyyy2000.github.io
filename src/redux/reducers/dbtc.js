import * as types from "../types";

let initialState = "";

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.Db_Tc:
      return action.data;
    default:
      return state;
  }
};
export default myReducers;
