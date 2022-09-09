import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors, gap } from "../global";
import { Error, Input, InputPassword } from "../components";
import { Icon } from "react-native-elements";
import { useLogin } from "../../hooks/useLogin";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorInp, login, loading } = useLogin();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg/loginBg.png")}
        style={styles.bgimage}
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
          <Text style={styles.loginText}>Selamat datang kembali</Text>
          <Text style={styles.loginTextSecondary}>
            Babagix adalah platform untuk sharing dari komunitas untuk komunitas
          </Text>
          <Text style={styles.loginTextSecondary}>
            Let's help each other!!!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder={"E-mail"}
            enteredText={(e) => setEmail(e)}
            icon={"email-outline"}
          />
          <InputPassword
            placeholder={"Password"}
            enteredText={(e) => setPassword(e)}
          />
          {errorInp ? <Error text={errorInp} /> : null}
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={"large"} color={colors.primaryLogo} />
            </View>
          ) : (
            <Pressable
              style={styles.buttonSubmit}
              onPress={() => login(email, password)}
            >
              <Text style={{ color: "#fff", fontWeight: "500" }}>Masuk</Text>
            </Pressable>
          )}

          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.registerLink}>Belum punya akun ? klik </Text>
              <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={styles.registerLinkClick}>daftar</Text>
              </Pressable>
            </View>
            <Pressable>
              <Text style={styles.forgotPass}>Lupa password ?</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
  },
  loginContainer: {
    justifyContent: "center",
    flex: 1,
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
    flex: 1,
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
  registerLink: {
    fontSize: 11,
    color: colors.alernative,
  },
  registerLinkClick: {
    fontSize: 11,
    color: colors.primaryLogo,
    fontWeight: "500",
  },
  forgotPass: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primaryLogo,
    marginVertical: 15,
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
