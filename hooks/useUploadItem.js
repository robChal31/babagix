import { useState } from "react";
import baseUrl from "../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { useAuthContext } from "./useAuthContext";

export const useUploadItem = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const fetchData = async (data, navigation) => {
    const { category_id, desc, images, is_free, itemName, location, user_id } =
      data;
    if (
      category_id &&
      desc &&
      images.length &&
      is_free &&
      itemName &&
      location &&
      user_id
    ) {
      setLoading(true);
      const response = await fetch(`${baseUrl}/item`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
        },
      });
      const json = await response.json();
      if (response.ok) {
        setLoading(false);
        setError(null);
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: "Item berhasil diupload",
          text2: json,
        });
        navigation.navigate("Home");
      }
      if (!response.ok) {
        setLoading(false);
        setError(json);
        Toast.show({
          topOffset: 40,
          type: "error",
          text1: "Gagal upload item",
          text2: json,
        });
      }
    } else {
      setError("Mohon mengisi semua field");
    }
  };
  return { fetchData, error, loading };
};
