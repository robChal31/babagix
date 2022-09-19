import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, gap, shadow } from "../global";
import { Icon } from "react-native-elements";
import { Chat } from "../components";
import baseUrl from "../../assets/common/baseUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const ChatScreen = (props) => {
  const [inpChat, setInpChat] = useState("");
  const [itemData, setItemData] = useState("");
  const [chatData, setChatData] = useState("");
  const { user } = useAuthContext();

  const flatListRef = useRef();

  const item = props.route.params.data;

  useFocusEffect(
    useCallback(() => {
      const getItem = async () => {
        const getItemData = await fetch(`${baseUrl}/item/${item.itemId}`);
        const data = await getItemData.json();
        if (data) {
          setItemData(data);
        }
      };

      const getChat = async () => {
        const getChatData = await fetch(
          `${baseUrl}/message/openRoom/${item.roomId}`
        );
        const data = await getChatData.json();
        setChatData(data);
      };

      getItem();
      getChat();
    }, [setItemData, setChatData])
  );

  function sendChat() {
    const chatHandler = async () => {
      const data = {
        text: inpChat,
        user: user.user._id,
        created_at: Date.now(),
        isReaded: 0,
      };
      const addChat = await fetch(`${baseUrl}/message/${chatData._id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      });

      const json = await addChat.json();
      setChatData(json);
      setInpChat("");
    };

    chatHandler();

    Keyboard.dismiss();
    flatListRef.current.scrollToEnd();
  }

  function testEnter(e) {
    console.log(e.nativeEvent.key === "Done");
  }
  return (
    <View style={styles.container}>
      <View style={styles.navigationBack}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Icon type="material-community" name="arrow-left" size={25} />
        </Pressable>
      </View>

      {itemData ? (
        <>
          <View style={styles.itemRequestedContainer}>
            <View style={styles.itemRequested}>
              <Image
                source={{ uri: itemData.item_pics[0] }}
                style={{ width: 35, height: 35, resizeMode: "cover" }}
              />
              <View style={styles.pickUpDetail}>
                <Text style={{ fontSize: 12, fontWeight: "500" }}>
                  {itemData.item_name}
                </Text>
                <View style={styles.pickUp}>
                  <Icon
                    type="material-community"
                    name="alarm"
                    size={15}
                    color={colors.secondaryText}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      color: colors.secondaryText,
                      marginLeft: 5,
                      marginVertical: 5,
                    }}
                  >
                    Bisa diambil :
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: colors.primaryLogo,
                      marginLeft: 5,
                      marginVertical: 5,
                    }}
                  >
                    Kapan saja!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              initialScrollIndex={chatData.length - 1}
              data={chatData.chats}
              renderItem={(e) => {
                return <Chat data={e} />;
              }}
              ListHeaderComponent={
                <View style={styles.ownerDetail}>
                  <View style={styles.profileOwner}>
                    <Image
                      source={{ uri: itemData.user.avatar }}
                      style={styles.ownerImage}
                    />
                  </View>
                  <Text
                    style={{ fontSize: 14, marginTop: 10, fontWeight: "500" }}
                  >
                    {itemData.user.username}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Icon
                      type="material-community"
                      name="map-marker-outline"
                      size={15}
                      color={"#BDBDBD"}
                    />
                    <Text
                      style={{ fontSize: 10, marginLeft: 4, color: "#BDBDBD" }}
                    >
                      1km dari lokasi kamu
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={colors.primaryLogo} />
        </View>
      )}

      <View style={styles.inputChatContainer}>
        <TextInput
          placeholder="ketik pesan"
          style={styles.inputChat}
          value={inpChat}
          on
          onKeyPress={testEnter}
          onChangeText={(e) => setInpChat(e)}
        />
        <Pressable
          onPress={sendChat}
          style={{
            marginLeft: 10,
            backgroundColor: colors.primaryText,
            padding: 8,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            type="material-community"
            name="send"
            size={20}
            color={"#fff"}
            style={{ textAlign: "center" }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
  },
  navigationBack: {
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomColor: colors.line,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemRequestedContainer: {
    paddingHorizontal: 15,
  },
  itemRequested: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    ...shadow,
    borderRadius: 5,
  },
  pickUpDetail: {
    flex: 1,
    marginLeft: 10,
  },
  pickUp: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerDetail: {
    alignItems: "center",
    marginVertical: 5,
  },
  profileOwner: {
    width: 50,
    height: 50,
    ...shadow,
    borderWidth: 0.5,
    borderColor: colors.secondaryText,
    borderRadius: 100,
  },
  ownerImage: { width: 50, height: 50, resizeMode: "cover", borderRadius: 100 },
  chatContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    paddingTop: 10,
    flex: 1,
  },
  inputChatContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputChat: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 0.6,
    borderRadius: 10,
    flex: 1,
  },
});
