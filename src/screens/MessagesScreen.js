import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import { gap, colors, chatList } from "../global";
import { Back, ChatList } from "../components";
import { useEffect, useState } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const MessagesScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      const getMessages = async () => {
        const messagesList = await fetch(
          `${baseUrl}/message/${user.user._id}`,
          {
            method: "GET",
          }
        );
        const json = await messagesList.json();
        if (messagesList.ok) {
          setMessages(json);
        }
        if (!messagesList.ok) {
          console.log(json);
        }
      };
      getMessages();
    }, [setMessages])
  );

  return (
    <View style={styles.container}>
      <Back navigation={props.navigation} text={"Pesan masuk"} />
      {messages ? (
        <FlatList
          data={messages}
          renderItem={({ item, index }) => {
            return (
              <ChatList data={item} navigation={props.navigation.navigate} />
            );
          }}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      ) : null}
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
