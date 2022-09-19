import { useContext } from "react";
import { LocationContext } from "../Context/LocationContext";

export const useLocationContext = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw Error("AuthContext should be inside AuthContextProvider");
  }

  return context;
};
