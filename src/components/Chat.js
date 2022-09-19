import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "../global";
import { relativeTime } from "../helpers";
import { useAuthContext } from "../../hooks/useAuthContext";

const { width, height } = Dimensions.get("window");

const Chat = (props) => {
  const { user } = useAuthContext();
  const chats = props.data.item;
  const owner = user.user._id !== chats.user;
  return (
    <View style={owner ? styles.owner : styles.guest}>
      <Text style={owner ? styles.ownerText : styles.guestText}>
        {chats.text}
      </Text>
      <Text style={owner ? styles.ownerTime : styles.guestTime}>
        {relativeTime(chats.created_at)}
      </Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  owner: {
    marginVertical: 5,
    maxWidth: width * 0.8,
    alignSelf: "flex-start",
  },
  guest: {
    marginVertical: 5,
    maxWidth: width * 0.8,
    alignSelf: "flex-end",
  },
  ownerText: {
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.secondaryText,
    borderRadius: 15,
    borderTopLeftRadius: 0,
  },
  guestText: {
    color: colors.secondaryText,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
    borderTopRightRadius: 0,
  },
  ownerTime: {
    color: colors.primaryLogo,
    fontSize: 9,
    paddingTop: 5,
    alignSelf: "flex-start",
    paddingLeft: 6,
  },
  guestTime: {
    color: "#AEAEAE",
    fontSize: 9,
    paddingTop: 5,
    alignSelf: "flex-end",
    paddingRight: 6,
  },
});
