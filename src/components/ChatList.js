import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { colors } from "../global";
import { relativeTime } from "../helpers";

const { width, height } = Dimensions.get("window");

const ChatList = (props) => {
  return (
    <Pressable
      onPress={() =>
        props.navigation("ChatScreen", {
          data: { itemId: props.data.item._id, roomId: props.data._id },
        })
      }
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: props.data.item.item_pics[0],
          }}
          style={styles.avaImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{props.data.item.item_name}</Text>
          <View style={styles.chatDetail}>
            <Text numberOfLines={1} style={styles.chatText}>
              {props.data.chats[props.data.chats.length - 1].text}
            </Text>
            <Text style={styles.chatTime}>
              {relativeTime(
                props.data.chats[props.data.chats.length - 1].created_at
              )}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 9,
                color: colors.primaryText,
                marginRight: 10,
              }}
            >
              {props.data.user.username}
            </Text>
            <Image
              source={{ uri: props.data.user.avatar }}
              style={{ width: 20, height: 20, borderRadius: 100 }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatList;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    width,
    marginVertical: 2,
  },
  avaImage: { width: 50, height: 50, borderRadius: 100 },
  userName: { fontWeight: "500", paddingBottom: 5 },
  chatDetail: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
  },
  chatText: {
    fontSize: 12,
    width: "70%",
    paddingRight: 10,
    color: colors.alernative,
  },
  chatTime: { fontSize: 9, color: colors.secondaryText2 },
});
