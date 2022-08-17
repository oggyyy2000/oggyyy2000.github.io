import { createContext, useReducer } from "react";
import { dataReducer } from "../reducers/dataReducer";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(dataReducer, {
    name: "",
    obj3d: "",
  });

  const SetData = ({ name, obj3d }) => {
    dispatch({
      type: "SET_DATA",
      payload: { name, obj3d },
    });
  };

  // Context data
  const DataContextData = { dataState, SetData };

  // Return provider
  return (
    <DataContext.Provider value={DataContextData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
