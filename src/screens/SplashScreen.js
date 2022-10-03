import { ImageBackground } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/babagixSplash.png")}
      style={{ flex: 1 }}
    />
  );
};

export default SplashScreen;
