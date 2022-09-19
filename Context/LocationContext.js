import { useEffect } from "react";
import { createContext, useReducer } from "react";
import * as Location from "expo-location";
import { useState } from "react";

export const LocationContext = createContext();

export const locationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOCATION": {
      return { location: action.payload };
    }
    default:
      return state;
  }
};

export const LocationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, {
    location: null,
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        dispatch({ type: "ADD_LOCATION", payload: location.coords });
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log("location in here", state);
  return (
    <LocationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};
