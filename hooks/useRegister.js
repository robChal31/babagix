import { useState } from "react";
import baseUrl from "../assets/common/baseUrl";
import Toast from "react-native-toast-message";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const register = async (data, navigation) => {
    setLoading(false);
    const {
      email,
      password,
      gender,
      username,
      confirmPassword,
      phoneNumber,
      location,
    } = data;
    if (
      !email ||
      !password ||
      !gender ||
      !confirmPassword ||
      !username ||
      !phoneNumber ||
      !location
    ) {
      setError("Mohon untuk mengisi semua field");
    } else {
      setError(null);
      setLoading(true);
      const { latitude, longitude } = location.coords;
      const response = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          gender,
          confirmPassword,
          username,
          phoneNumber,
          latitude,
          longitude,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        setLoading(false);
        setError(null);
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: "Registrasi akun berhasil",
          text2: json,
        });
        navigation.navigate("LoginScreen");
      }

      if (!response.ok) {
        setLoading(false);
        setError(json);
      }
    }
  };

  return { register, error, loading };
};
