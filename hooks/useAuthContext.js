import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("AuthContext should be inside AuthContextProvider");
  }

  return context;
};
