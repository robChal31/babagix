import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./useAuthContext";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      Toast.show({
        topOffset: 40,
        type: "success",
        text1: "Logout berhasil",
        text2: "Silahkan login kembali untuk menggunakan babagix",
      });
    } catch (error) {
      Toast.show({
        topOffset: 40,
        type: "error",
        text1: "Logout gagal",
      });
    }
  };

  return { logout };
};
