import { StyleSheet, View, TextInput } from "react-native";
import Input from "./Input";

const EditProfile = () => {
  return (
    <View style={styles.settingsContainer}>
      <View>
        <Input />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  settingsContainer: {
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});
