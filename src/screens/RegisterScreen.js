import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, gap } from "../global";
import Input from "../components/Input";
import { Icon } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { useRegister } from "../../hooks/useRegister";
import * as Location from "expo-location";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { register, error, loading } = useRegister();

  useFocusEffect(
    useCallback(() => {
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      setValue("");

      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      };
      getLocation();
    }, [
      setUsername,
      setEmail,
      setPassword,
      setPhoneNumber,
      setConfirmPassword,
      setValue,
      setLocation,
    ])
  );

  const handleRegister = () => {
    const data = {
      username,
      email: email.trim(),
      phoneNumber,
      password,
      confirmPassword,
      gender: value,
      location,
    };
    register(data, navigation);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg/registerBg.png")}
        style={styles.imageBg}
        resizeMode={"cover"}
      >
        <Pressable
          style={{
            paddingTop: gap.statusBarHeight + 10,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            type="material-community"
            name="chevron-left"
            size={25}
            color={"#fff"}
          />
        </Pressable>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Belum punya akun ?</Text>
          <Text style={styles.loginTextSecondary}>
            Lengkapi data yang dibutuhkan untuk bisa menggunakan
            <Text style={{ color: "#fff", fontWeight: "500" }}> babagix</Text>
          </Text>
          <Text style={styles.loginTextSecondary}>
            Let's help each other!!!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder={"Username"}
            enteredText={(e) => setUsername(e)}
            icon={"account-outline"}
            value={username}
          />
          <Input
            placeholder={"E-mail"}
            enteredText={(e) => setEmail(e)}
            icon={"email-outline"}
            value={email}
          />
          <Input
            placeholder={"No. telepon"}
            enteredText={(e) => setPhoneNumber(e)}
            icon={"phone-outline"}
            value={phoneNumber}
          />
          <Input
            placeholder={"Kata sandi"}
            enteredText={(e) => setPassword(e)}
            icon={"lock-outline"}
            value={password}
          />
          <Input
            placeholder={"Konfirmasi kata sandi"}
            enteredText={(e) => setConfirmPassword(e)}
            icon={"lock-outline"}
            value={confirmPassword}
          />

          <View style={{ width: "75%" }}>
            <DropDownPicker
              placeholder="pilih gender"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                width: "100%",
                marginVertical: 5,
                borderColor: colors.primaryLogo,
              }}
            />
          </View>

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={"large"} color={colors.primaryLogo} />
            </View>
          ) : (
            <Pressable style={styles.buttonSubmit} onPress={handleRegister}>
              <Text style={{ color: "#fff", fontWeight: "500" }}>Daftar</Text>
            </Pressable>
          )}

          {errorMsg && (
            <View style={styles.errorCont}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}
          {error && (
            <View style={styles.errorCont}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.loginLink}>Sudah punya akun ? klik </Text>
              <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.loginLinkClick}>masuk</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBg: {
    flex: 1,
  },
  loginContainer: {
    justifyContent: "center",
    flex: 0.65,
    paddingHorizontal: 15,
  },
  loginText: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 18,
    paddingBottom: 15,
  },
  loginTextSecondary: {
    fontWeight: "400",
    color: "#C7D6CA",
    fontSize: 14,
    paddingVertical: 3,
    maxWidth: "70%",
  },
  inputContainer: {
    paddingTop: 25,
    flex: 1.2,
    alignItems: "center",
  },

  buttonSubmit: {
    width: "75%",
    alignItems: "center",
    backgroundColor: colors.primaryLogo,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  loginLink: {
    fontSize: 11,
    color: colors.alernative,
  },
  loginLinkClick: {
    fontSize: 11,
    color: colors.primaryLogo,
    fontWeight: "500",
  },
  errorCont: {
    width: "80%",
  },
  errorText: {
    fontSize: 12,
    color: "#DD2929",
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
