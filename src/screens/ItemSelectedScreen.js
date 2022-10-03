import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { Icon } from "react-native-elements";
import { colors, gap, shadow } from "../global";
import { DeleteItem, MapViews } from "../components";
import { relativeTime } from "../helpers";
import Toast from "react-native-toast-message";
import baseUrl from "../../assets/common/baseUrl";
import { useAuthContext } from "../../hooks/useAuthContext";

const { width, height } = Dimensions.get("window");
const ItemSelectedScreen = (props) => {
  const [saved, setSaved] = useState([]);
  const [loved, setLoved] = useState([]);
  const [countLoved, setCountLoved] = useState(0);
  const { user } = useAuthContext();
  const item = props.route.params.data;

  useEffect(() => {
    const isSaved = async () => {
      const checkIsSaved = await fetch(
        `${baseUrl}/item/getOneSaved?userId=${user.user._id}&itemId=${item._id}`,
        {
          method: "GET",
        }
      );

      const response = await checkIsSaved.json();
      setSaved(() => response);
    };

    const isLoved = async () => {
      const checkIsLoved = await fetch(
        `${baseUrl}/item/isLoved?userId=${user.user._id}&itemId=${item._id}`,
        {
          method: "GET",
        }
      );

      const response = await checkIsLoved.json();
      setCountLoved(response.countLoved);
      setLoved(response.isLoved);
    };

    isSaved();
    isLoved();
  }, [setSaved, setLoved, setCountLoved]);

  function isSaved() {
    if (saved.length) {
      const removeSavedItem = async () => {
        const rmSaved = await fetch(`${baseUrl}/item/removeSaved`, {
          method: "PUT",
          body: JSON.stringify({ savedId: saved[0], userId: user.user._id }),
          headers: {
            Authorization: `bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const rmResponse = await rmSaved.json();
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: `${item.item_name} dihapus dari item tersimpan`,
        });
        setSaved(rmResponse);
      };
      removeSavedItem();
    }

    if (!saved.length) {
      const addSavedItem = async () => {
        const data = { itemId: item._id, userId: user.user._id };

        const add = await fetch(`${baseUrl}/item/addSaved`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        });
        const json = await add.json();
        Toast.show({
          topOffset: 40,
          type: "success",
          text1: `${item.item_name} ditambahkan ke item tersimpan`,
        });
        setSaved(json);
      };

      addSavedItem();
    }
  }

  const checkRoom = () => {
    const roomHandler = async () => {
      const roomName = {
        ownerId: item.user._id,
        requesterId: user.user._id,
        item: item._id,
      };
      const roomString = `${roomName.ownerId}-${roomName.requesterId}-${roomName.item}`;
      const isRoom = await fetch(`${baseUrl}/message/getARoom/${roomString}`);
      const isRoomValid = await isRoom.json();
      if (!isRoomValid) {
        const makeRoom = await fetch(`${baseUrl}/message`, {
          method: "POST",
          body: JSON.stringify(roomName),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        });

        const json = await makeRoom.json();
        props.navigation.navigate("ChatScreen", {
          data: { itemId: json.data.item, roomId: json.data._id },
        });
      }
      if (isRoomValid) {
        props.navigation.navigate("ChatScreen", {
          data: { itemId: isRoomValid.item, roomId: isRoomValid._id },
        });
      }
    };

    roomHandler();
  };

  const isLoved = () => {
    if (loved.length) {
      const removeLovedItem = async () => {
        const rmSaved = await fetch(`${baseUrl}/item/removeLoved`, {
          method: "PUT",
          body: JSON.stringify({ itemId: item._id, userId: user.user._id }),
          headers: {
            Authorization: `bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const rmResponse = await rmSaved.json();
        setCountLoved(rmResponse.countLoved);
        setLoved(rmResponse.rmLoved);
      };
      removeLovedItem();
    }

    if (!loved.length) {
      const addLovedItem = async () => {
        const addLove = await fetch(`${baseUrl}/item/addLoved`, {
          method: "PUT",
          body: JSON.stringify({ itemId: item._id, userId: user.user._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        });
        const json = await addLove.json();
        setLoved(json.addToLoved);
        setCountLoved(json.countLoved);
      };

      addLovedItem();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Icon type="material-community" name={"arrow-left"} size={25} />
        </Pressable>
        <Text numberOfLines={1} style={styles.headerText}>
          {item.item_name}
        </Text>
      </View>
      <ScrollView>
        <ImageSlider images={item.item_pics} />

        <View style={styles.iconMainContainer}>
          <View style={styles.iconContainer}>
            <Pressable onPress={isLoved}>
              <Icon
                type="material-community"
                name={loved.length ? "cards-heart" : "cards-heart-outline"}
                size={24}
                color={loved.length ? "#E62F2F" : colors.primaryLogo}
              />
            </Pressable>
            <Text style={styles.likedText}>{countLoved}</Text>
            {item.user._id !== user.user._id && (
              <Pressable
                onPress={() => {
                  isSaved();
                }}
              >
                <Icon
                  type="material-community"
                  name={saved.length ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={colors.primaryLogo}
                />
              </Pressable>
            )}
          </View>
          <View>
            {item.user._id === user.user._id && (
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    props.navigation.navigate("EditItemScreen", { data: item });
                  }}
                >
                  <Icon
                    type="material-community"
                    name={"pencil-outline"}
                    size={24}
                    color={colors.primaryLogo}
                  />
                </Pressable>

                <DeleteItem
                  data={{
                    itemId: item._id,
                    user: { userId: user.user._id, token: user.token },
                    navigation: props.navigation.navigate,
                  }}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.userImageContainer}>
            <Image
              source={{ uri: item.user.avatar }}
              style={styles.userImage}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.username}>{item.user.username}</Text>
            <Text style={styles.itemName}>{item.item_name}</Text>
            <View style={styles.timeAddedContainer}>
              <Icon
                type="material-community"
                name={"clock-time-nine-outline"}
                size={15}
                color={colors.alernative}
              />
              <Text style={styles.timeDetail}>
                ditambahkan {relativeTime(new Date(item.createdAt).getTime())}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemDescription}>
          <Text>{item.desc}</Text>
        </View>
        <View style={styles.mapView}>
          <Text style={styles.mapHeaderText}>Perkiraan Lokasi</Text>
          <MapViews
            region={{
              longitude: item.location.coordinates[0],
              latitude: item.location.coordinates[1],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      </ScrollView>
      {item.user._id !== user.user._id && (
        <Pressable onPress={() => checkRoom()}>
          <View style={styles.chatButtonContainer}>
            <Text style={styles.chatButtonText}>Kirim pesan permintaan</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default ItemSelectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: gap.statusBarHeight + 5,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerText: {
    flex: 1,
    paddingHorizontal: 10,
    color: colors.alernative,
    fontSize: 17,
  },
  detailItem: {
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
  },
  userImageContainer: {
    ...shadow,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    paddingLeft: 15,
  },
  username: { fontSize: 13, color: colors.secondaryText },
  itemName: {
    fontWeight: "500",
    color: "#333",
    maxWidth: width * 0.7,
    fontSize: 17,
  },
  timeAddedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  timeDetail: { fontSize: 12, marginLeft: 5, color: colors.alernative },
  itemDescription: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  mapView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  iconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  likedText: {
    marginLeft: 2,
    fontSize: 13,
    color: "#6F7B74",
    marginRight: 10,
    fontWeight: "bold",
  },
  mapHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.secondaryText2,
    paddingTop: 16,
    paddingBottom: 3,
  },
  chatButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.secondaryText2,
    width: width * 0.9,
    paddingVertical: 13,
    borderRadius: 10,
  },
  chatButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  iconMainContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#E9E9E9",
  },
});
