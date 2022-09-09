import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { colors } from "../global";
import Drawer from "./Drawer";

const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogo}>
        <Text style={styles.headerLogoText}>BABAGIX</Text>
      </View>
      <View style={styles.headerIconCont}>
        <Pressable
          style={{ marginRight: 10 }}
          onPress={() => props.navigation.navigate("SearchScreen")}
        >
          <Icon type="material-community" name="magnify" size={25} />
        </Pressable>
        <Pressable>
          <Drawer navigation={props.navigation} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: colors.primaryLogo,
    borderRadius: 5,
  },
  headerLogoText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  headerIconCont: {
    flexDirection: "row",
    alignItems: "center",
  },
});
