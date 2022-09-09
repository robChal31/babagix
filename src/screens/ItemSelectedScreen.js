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
import { MapViews } from "../components";
import { relativeTime } from "../helpers";
import * as actions from "../../Redux/actions/savedActions";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");
const ItemSelectedScreen = (props) => {
  const item = props.route.params.data;
  const [saved, setSaved] = useState(isSaved());

  function isSaved() {
    return props.savedItem.filter((e) => e._id == item._id);
  }

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

        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <Pressable>
              <Icon
                type="material-community"
                name={"cards-heart-outline"}
                size={24}
                color={colors.primaryLogo}
              />
            </Pressable>
            <Text style={styles.likedText}>{item.loved.length}</Text>
            <Pressable
              onPress={() => {
                console.log(saved);
                if (saved.length) {
                  props.removeItemFromSaved(item);
                  Toast.show({
                    topOffset: 40,
                    type: "success",
                    text1: `${item.item_name} berhasil dihapus`,
                  });
                  setSaved(() => []);
                } else {
                  props.addItemToSaved(item);
                  Toast.show({
                    topOffset: 40,
                    type: "success",
                    text1: `${item.item_name} berhasil ditambahkan`,
                  });
                  setSaved(() => [1]);
                }
              }}
            >
              <Icon
                type="material-community"
                name={saved.length ? "bookmark" : "bookmark-outline"}
                size={24}
                color={colors.primaryLogo}
              />
            </Pressable>
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
                ditambahkan {relativeTime(item.created_t)}
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
              longitude: 105.897132,
              latitude: -6.372833,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      </ScrollView>
      <Pressable
        onPress={() => props.navigation.navigate("ChatScreen", { data: item })}
      >
        <View style={styles.chatButtonContainer}>
          <Text style={styles.chatButtonText}>Kirim pesan permintaan</Text>
        </View>
      </Pressable>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToSaved: (item) => dispatch(actions.addToSaved(item)),
    removeItemFromSaved: (item) => dispatch(actions.removeFromSaved(item)),
  };
};

const mapStateToProps = (state) => {
  const { savedItem } = state;
  return {
    savedItem: savedItem,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelectedScreen);

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
    backgroundColor: "#E9E9E9",
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
});
