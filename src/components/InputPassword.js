import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import * as React from "react";
import { colors } from "../global";
import { Icon } from "react-native-elements";
const InputPassword = (props) => {
  const [hide, setHide] = React.useState(true);

  function enteredText(enteredText) {
    props.enteredText(enteredText);
  }
  return (
    <View style={[styles.container]}>
      <Icon
        type="material-community"
        name={"lock-outline"}
        size={20}
        color={colors.secondaryText}
      />
      <TextInput
        placeholder={props.placeholder}
        style={[styles.input]}
        onChangeText={(e) => enteredText(e)}
        secureTextEntry={hide}
      />
      <Pressable
        onPress={() => {
          hide ? setHide(false) : setHide(true);
        }}
      >
        <Icon
          type="material-community"
          name={hide ? "eye-off-outline" : "eye"}
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>
    </View>
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderBottomColor: colors.primaryLogo,
    borderBottomWidth: 1,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 13,
    marginLeft: 10,
  },
});
