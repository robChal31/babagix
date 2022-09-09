import { useState } from "react";
import baseUrl from "../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {
  const [errorInp, setErrorInp] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorInp("Mohon untuk mengisi e-mail dan password");
    } else {
      const user = { email, password };
      setErrorInp(false);
      setLoading(true);
      setTimeout(async () => {
        const response = await fetch(`${baseUrl}/user/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (response.ok) {
          setLoading(false);
          setErrorInp("");
          dispatch({ type: "LOGIN", payload: json });
          await AsyncStorage.setItem("user", JSON.stringify(json));
          Toast.show({
            topOffset: 40,
            type: "success",
            text1: "Login berhasil",
            text2: json,
          });
        }

        if (!response.ok) {
          setErrorInp(json);
          setLoading(false);
          Toast.show({
            topOffset: 40,
            type: "error",
            text1: "Login gagal",
            text2: json,
          });
        }
      }, 1000);
    }
  };
  return { errorInp, login, loading };
};
