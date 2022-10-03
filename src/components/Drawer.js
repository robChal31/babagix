import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useAuthContext } from "../../hooks/useAuthContext";
import { colors } from "../global";
import Logout from "./Logout";

const { width, height } = Dimensions.get("window");

const Drawer = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuthContext();
  return (
    <View>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={{ padding: 8 }}>
              <Icon
                type="material-community"
                name="close"
                size={25}
                color={colors.primaryLogo}
              />
            </Text>
          </Pressable>

          {/* //navList */}
          <View style={styles.navList}>
            <Pressable
              style={styles.navCont}
              onPress={() => {
                setModalVisible(false);
                props.navigation.navigate("Profile", { data: user.user._id });
              }}
            >
              <View style={styles.avaCont}>
                <Image
                  source={{
                    uri: user.user.avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#232924",
                  paddingRight: 8,
                }}
              >
                {user.user.username}
              </Text>
            </Pressable>

            <Pressable
              style={styles.navCont}
              onPress={() => {
                props.navigation.navigate("SavedScreen");
                setModalVisible(false);
              }}
            >
              <Icon
                type="material-community"
                name="bookmark-outline"
                size={25}
              />
              <Text style={{ marginLeft: 10, fontSize: 13 }}>Tersimpan</Text>
            </Pressable>

            <Logout />
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Icon type="material-community" name="menu" size={25} />
      </Pressable>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.5,
    height: height,
    left: width - 200,
    marginTop: 15,
    backgroundColor: "#F0F3EF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  navCont: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  avaCont: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondaryText2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#ffff",
    elevation: 5,
    marginRight: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  navList: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
});
