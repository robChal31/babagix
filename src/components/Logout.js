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
import { useLogout } from "../../hooks/useLogout";

const { width, height } = Dimensions.get("window");
const Logout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useLogout();

  return (
    <View>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Apakah anda yakin mau logout ?</Text>
            <View style={styles.buttonCont}>
              <Pressable
                style={[styles.button, styles.buttonLogout]}
                onPress={() => {
                  setModalVisible(false);
                  logout();
                }}
              >
                <Text style={styles.textStyle}>Logout</Text>
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
        style={styles.logoutCont}
      >
        <Icon type="material-community" name="logout-variant" size={25} />
        <Text style={{ marginLeft: 10 }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Logout;

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
    padding: 35,
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
  buttonLogout: {
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
  logoutCont: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
