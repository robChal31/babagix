import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "../global";
import { relativeTime } from "../helpers";

const { width, height } = Dimensions.get("window");

const Chat = (props) => {
  return (
    <View style={props.owner ? styles.owner : styles.guest}>
      <Text style={props.owner ? styles.ownerText : styles.guestText}>
        {props.data.text}
      </Text>
      <Text style={props.owner ? styles.ownerTime : styles.guestTime}>
        {relativeTime(props.data.createdAt)}
      </Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  owner: {
    backgroundColor: colors.secondaryText,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    maxWidth: width * 0.8,
    alignSelf: "flex-start",
    borderRadius: 15,
    borderTopLeftRadius: 0,
  },
  guest: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    maxWidth: width * 0.8,
    alignSelf: "flex-end",
    borderRadius: 15,
    borderTopRightRadius: 0,
  },
  ownerText: {
    color: "#fff",
  },
  guestText: {
    color: colors.secondaryText,
  },
  ownerTime: {
    color: colors.line,
    fontSize: 9,
    paddingTop: 5,
    alignSelf: "flex-end",
  },
  guestTime: {
    color: "#AEAEAE",
    fontSize: 9,
    paddingTop: 5,
    alignSelf: "flex-start",
  },
});
