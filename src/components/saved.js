import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { colors, shadow } from "../global/styles";

const { width, height } = Dimensions.get("window");

const Saved = (props) => {
  return (
    <Pressable
      style={styles.cardItemContainer}
      onPress={() =>
        props.navigate("ItemSelectedScreen", { data: props.data.item })
      }
    >
      <Image
        source={{ uri: props.data.item.item_pics[0] }}
        style={styles.imageCard}
      />
      <View>
        <Text
          style={{ fontSize: 14, fontWeight: "400", color: colors.primaryText }}
        >
          {props.data.item.item_name}
        </Text>
        <View style={styles.userCardDetail}>
          <Text
            numberOfLines={2}
            style={{ fontSize: 12, color: colors.line, width: width * 0.6 }}
          >
            {props.data.item.desc}
          </Text>
        </View>
        <View style={styles.userCardDetail}>
          <Image
            source={{ uri: props.data.item.user.avatar }}
            style={styles.avaImageCard}
          />
          <Text style={{ fontSize: 12, color: colors.secondaryText }}>
            {props.data.item.user.username}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Saved;

const styles = StyleSheet.create({
  cardItemContainer: {
    ...shadow,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: width,
    height: 100,
  },
  imageCard: {
    width: 80,
    height: 70,
    resizeMode: "cover",
    marginHorizontal: 5,
    marginRight: 20,
  },
  userCardDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  avaImageCard: {
    borderRadius: 50,
    width: 20,
    height: 20,
    resizeMode: "cover",
    marginRight: 8,
  },
  cardDetailItemContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  cardDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
});
