import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import baseUrl from "../../assets/common/baseUrl";
import { colors } from "../global";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");
const DeleteItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const deleteItem = () => {
    const dlItemFunc = async () => {
      const dlItem = await fetch(`${baseUrl}/item/${props.data.itemId}`, {
        method: "DELETE",
        body: JSON.stringify({ userId: props.data.user.userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${props.data.user.token}`,
        },
      });

      const response = await dlItem.json();
      Toast.show({
        topOffset: 40,
        type: "success",
        text1: "item telah dihapus",
      });
      props.data.navigation("HomeScreen");
    };
    dlItemFunc();
  };

  return (
    <View>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10 }}>Hapus item ?</Text>
            <View style={styles.buttonCont}>
              <Pressable
                style={[styles.button, styles.buttDelete]}
                onPress={() => {
                  setModalVisible(false);
                  deleteItem();
                }}
              >
                <Text style={styles.textStyle}>Hapus</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.deleteCont}
      >
        <Icon
          type="material-community"
          name="delete-outline"
          size={25}
          color={colors.primaryLogo}
        />
      </Pressable>
    </View>
  );
};

export default DeleteItem;

const styles = StyleSheet.create({
  centeredView: {
    width,
    height: height * 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  buttonCont: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  buttDelete: {
    backgroundColor: "#D82F2F",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginRight: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  deleteCont: {
    flexDirection: "row",
    alignItems: "center",
  },
});
