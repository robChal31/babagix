import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import * as React from "react";
import { colors } from "../global";
import { Icon } from "react-native-elements";

const Input = (props) => {
  function enteredText(enteredText) {
    props.enteredText(enteredText);
  }
  return (
    <View style={styles.container}>
      <Icon
        type="material-community"
        name={props.icon}
        size={20}
        color={colors.secondaryText}
      />
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={(e) => enteredText(e)}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLogo,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 13,
    color: colors.secondaryText2,
    marginLeft: 10,
  },
});
