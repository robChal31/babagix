import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const authenticated = async () => {
      try {
        const storage = await AsyncStorage.getItem("user");
        if (storage) {
          dispatch({ type: "LOGIN", payload: JSON.parse(storage) });
        }
      } catch (error) {
        console.log(error);
      }
    };
    authenticated();
  }, []);

  console.log("AuthContext", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
