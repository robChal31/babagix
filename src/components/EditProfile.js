import { useState } from "react";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { colors } from "../global";
import Input from "./Input";
import UploadImage from "./UploadImage";

import baseUrl from "../../assets/common/baseUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const EditProfile = (props) => {
  const { user, dispatch } = useAuthContext();
  const [username, setUsername] = useState(user.user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.user.phone_number);
  const [bio, setBio] = useState(user.user.bio);
  const [images, setImages] = useState({ uri: user.user.avatar });

  const sendData = () => {
    const reqHandler = async () => {
      const formData = new FormData();
      formData.append("images", {
        uri: images.uri,
        type: "image/jpg",
        name: "test upload image",
      });
      formData.append("username", username);
      formData.append("phoneNumber", phoneNumber);
      formData.append("bio", bio);
      const updateData = await axios.put(
        `${baseUrl}/user/${user.user._id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${user.token}`,
          },
        }
      );
      if (updateData.data) {
        await AsyncStorage.removeItem("user");
        dispatch({ type: "LOGIN", payload: updateData.data });
        await AsyncStorage.setItem("user", JSON.stringify(updateData.data));
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: "update berhasil",
        });
        props.activeProfileProp();
        props.navigation("HomeScreen", { data: user.user._id });
      }
      if (!updateData.data) {
        Toast.show({
          topOffset: 40,
          type: "error",
          text1: "update gagal",
        });
      }
      setImages("");
    };
    reqHandler();
  };

  return (
    <View style={styles.settingsContainer}>
      <View style={{ alignItems: "center" }}>
        <Input
          placeholder={"Username"}
          enteredText={(e) => setUsername(e)}
          value={username}
          icon={"account-outline"}
        />
        <Input
          placeholder={"Bio"}
          enteredText={(e) => setBio(e)}
          value={bio}
          icon={"text-account"}
        />
        <Input
          placeholder={"No. telepon"}
          enteredText={(e) => setPhoneNumber(e)}
          value={phoneNumber}
          icon={"phone-outline"}
        />
        <View style={{ width: "75%", marginVertical: 5 }}>
          <UploadImage images={(src) => setImages(src)} />
        </View>

        {images ? (
          <View style={styles.imageCont}>
            <Image
              source={{
                uri: `${images.uri}`,
              }}
              style={styles.image}
            />
          </View>
        ) : null}

        <Pressable style={styles.submitButt} onPress={sendData}>
          <Text style={styles.submitText}>update</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  settingsContainer: {
    marginVertical: 20,
    height: height,
    width: width,
  },
  imageCont: {
    borderRadius: 5,
    borderWidth: 0.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    overflow: "hidden",
    width: 110,
    height: 110,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  submitButt: {
    marginVertical: 20,
    padding: 10,
    width: "70%",
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: colors.primaryLogo,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  submitText: { textAlign: "center", fontWeight: "bold", color: "#FFF" },
});
