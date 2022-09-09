import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors, gap, shadow, chat } from "../global";
import { Icon } from "react-native-elements";
import { Chat } from "../components";

const ChatScreen = ({ navigation, route }) => {
  const [chatData, setChatData] = useState(chat);
  const [inpChat, setInpChat] = useState("");
  const flatListRef = useRef();

  function sendChat() {
    if (inpChat) {
      setChatData([
        ...chatData,
        {
          userId: 1,
          text: inpChat,
          createdAt: Number(new Date()),
        },
      ]);
      setInpChat("");
      Keyboard.dismiss();
      flatListRef.current.scrollToEnd();
    }
  }

  function testEnter(e) {
    console.log(e.nativeEvent.key === "Done");
  }
  return (
    <View style={styles.container}>
      <View style={styles.navigationBack}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon type="material-community" name="arrow-left" size={25} />
        </Pressable>
      </View>
      <View style={styles.itemRequestedContainer}>
        <View style={styles.itemRequested}>
          <Image
            source={route.params.data.images[0]}
            style={{ width: 35, height: 35, resizeMode: "cover" }}
          />
          <View style={styles.pickUpDetail}>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              {route.params.data.itemName}
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
                Kapan saja
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.chatContainer}>
        {chatData && (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={chatData.length - 1}
            data={chatData}
            renderItem={({ item, index }) => {
              const owner = item.userId == 1;
              return <Chat owner={owner} data={item} />;
            }}
            ListHeaderComponent={
              <View style={styles.ownerDetail}>
                <View style={styles.profileOwner}>
                  <Image
                    source={route.params.data.userAva}
                    style={styles.ownerImage}
                  />
                </View>
                <Text
                  style={{ fontSize: 14, marginTop: 10, fontWeight: "500" }}
                >
                  {route.params.data.username}
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
        )}
      </View>

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
          onPress={() => sendChat()}
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
