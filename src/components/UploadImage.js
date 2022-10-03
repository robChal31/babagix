import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../global";
import * as ImagePicker from "expo-image-picker";

const UploadImage = (props) => {
  const [mediaPermission, setMediaPermission] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setMediaPermission(status === "granted");

      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    };
    checkPermissions();
  }, []);

  if (!mediaPermission || !hasCameraPermission) {
    return <View />;
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      props.images(result);
    }
  };

  const takePict = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      props.images(result);
    }
  };

  return (
    <>
      <Pressable
        onPress={takePict}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "75%",
          marginVertical: 10,
        }}
      >
        <Icon
          type="material-community"
          name="camera-outline"
          size={25}
          color={colors.primaryLogo}
        />
        <Text
          style={{
            marginLeft: 10,
            color: colors.secondaryText,
            fontSize: 13,
          }}
        >
          Ambil photo
        </Text>
      </Pressable>

      <Pressable
        onPress={pickImage}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "75%",
          marginVertical: 10,
        }}
      >
        <Icon
          type="material-community"
          name="image"
          size={25}
          color={colors.primaryLogo}
        />
        <Text
          style={{
            marginLeft: 10,
            color: colors.secondaryText,
            fontSize: 13,
          }}
        >
          Pilih dari gallery
        </Text>
      </Pressable>
    </>
  );
};

export default UploadImage;
