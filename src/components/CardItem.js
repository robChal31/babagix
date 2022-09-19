import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { colors, shadow } from "../global/styles";

const { height, width } = Dimensions.get("window");

const CardItem = (props) => {
  const isLoved = props.data.item.loved.filter((e) => e == props.data.userId);
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
          style={{ fontSize: 14, fontWeight: "500", color: colors.primaryText }}
        >
          {props.data.item.item_name}
        </Text>
        <View style={styles.userCardDetail}>
          <Image
            source={{ uri: props.data.item.user.avatar }}
            style={styles.avaImageCard}
          />
          <Text style={{ fontSize: 12, color: colors.secondaryText }}>
            {props.data.item.user.username}
          </Text>
        </View>
        <View style={styles.cardDetailItemContainer}>
          <View style={styles.cardDetailItem}>
            <Icon
              type="material-community"
              name="map-marker-outline"
              size={15}
              color={colors.secondaryText2}
            />
            <Text
              style={{
                fontSize: 11,
                color: colors.secondaryText2,
                marginLeft: 2,
              }}
            >
              {/* {props.data.item.location} */}
            </Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Icon
              type="material-community"
              name={isLoved.length ? "cards-heart" : "cards-heart-outline"}
              size={15}
              color={colors.secondaryText2}
            />
            <Text
              style={{
                fontSize: 11,
                color: colors.secondaryText2,
                marginLeft: 2,
              }}
            >
              {props.data.item.loved.length}
            </Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Text
              style={{
                fontSize: 11,
                color:
                  props.data.item.is_free == "0"
                    ? colors.secondaryText2
                    : colors.primaryLogo,
                marginLeft: 2,
              }}
            >
              {props.data.item.is_free == "2" ? "Pinjam" : "Gratis"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardItem;

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
    width: width - 40,
  },
  imageCard: {
    width: 110,
    height: 100,
    resizeMode: "cover",
    marginRight: 15,
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
