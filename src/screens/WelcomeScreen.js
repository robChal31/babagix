import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { colors, gap } from "../global";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg/welcomeBg.png")}
        style={styles.imageBg}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeHeader}>babagix</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTextHeader}>Mari babagix</Text>
          <Text style={styles.welcomeText1}>
            Butuh sesuatu atau ingin berbagi sesuatu, babagix bisa bantu kamu
          </Text>

          <View style={styles.welcomenavigation}>
            <Pressable
              style={styles.register}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: colors.primaryLogo,
                }}
              >
                Daftar
              </Text>
            </Pressable>
            <Pressable
              style={styles.login}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                Masuk
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerContainer: {
    paddingTop: gap.statusBarHeight + 10,
    flex: 2,
  },
  welcomeHeader: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18,
  },
  welcomeContainer: {
    flex: 1,
    marginTop: 30,
  },
  welcomeTextHeader: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
  welcomeText1: {
    color: colors.line,
    fontWeight: "500",
    fontSize: 14,
  },
  welcomenavigation: {
    marginVertical: 10,
  },
  register: {
    backgroundColor: "#ffff",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  login: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#fff",
  },
});
