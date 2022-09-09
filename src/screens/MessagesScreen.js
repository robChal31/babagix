import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState } from "react";
import { gap, colors, chatList } from "../global";
import { Back, ChatList } from "../components";

const { width, height } = Dimensions.get("window");
const MessagesScreen = (props) => {
  const [message, setMessage] = useState(chatList);
  return (
    <View style={styles.container}>
      <Back navigation={props.navigation} text={"Pesan masuk"} />
      {message && (
        <FlatList
          data={message}
          renderItem={({ item, index }) => {
            return (
              <ChatList
                data={item}
                navigation={(screen, data) => navigation.navigate(screen, data)}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.userId;
          }}
        />
      )}
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    width,
  },
});
