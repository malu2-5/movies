import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const API_KEY = "92cbf628";
  const API_URL = "https://www.omdbapi.com/";

  return (
    <ApiContext.Provider value={{ API_KEY, API_URL }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use API context
export const useApi = () => {
  return useContext(ApiContext);
};
