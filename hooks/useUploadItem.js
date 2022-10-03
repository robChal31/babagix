import { useState } from "react";
import baseUrl from "../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useUploadItem = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const fetchData = async (data, navigation, method) => {
    const {
      category_id,
      desc,
      images,
      is_free,
      itemName,
      location,
      user_id,
      expiredIn,
    } = data;
    if (
      category_id &&
      desc &&
      images.length &&
      is_free &&
      itemName &&
      location &&
      user_id
    ) {
      const makeDate = Date.now() + parseInt(expiredIn) * 86400000;

      setLoading(true);
      const formData = new FormData();
      images.map((image) => {
        return formData.append("images", {
          uri: image.uri,
          type: "image/jpg",
          name: "testuploadimage",
        });
      });
      formData.append("category_id", category_id);
      formData.append("is_free", is_free);
      formData.append("desc", desc);
      formData.append("itemName", itemName);
      formData.append("longitude", location.longitude);
      formData.append("latitude", location.latitude);
      formData.append("user_id", user_id);
      formData.append("expiredAt", makeDate);

      let response = "";
      if (method === "edit") {
        try {
          response = await axios.put(
            `${baseUrl}/item/${data.itemId}`,
            formData,
            {
              headers: {
                Authorization: `bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
                Accept:
                  "application/json, application/xml, text/plain, text/html, *.*",
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (method === "upload") {
        try {
          response = await axios.post(`${baseUrl}/item`, formData, {
            headers: {
              Authorization: `bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*",
            },
          });
        } catch (error) {
          console.log(error, "error upload");
        }
      }
      setLoading(false);
      if (response.status == 200) {
        setError(null);
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: `Item berhasil di${method}`,
        });
        navigation.navigate("Home");
      }
      if (response.status != 200) {
        setError(`Gagal ${method} item`);
        Toast.show({
          topOffset: 40,
          type: "error",
          text1: `Item gagal di${method}`,
        });
      }
    } else {
      setError("Mohon mengisi semua field");
    }
  };
  return { fetchData, error, loading };
};
