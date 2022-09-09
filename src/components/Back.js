import { StyleSheet, Pressable, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../global";

const Back = (props) => {
  return (
    <View style={styles.navigationBack}>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Icon type="material-community" name="arrow-left" size={25} />
      </Pressable>
      <Text style={styles.header}>{props.text}</Text>
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
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
  header: {
    flex: 1,
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    marginRight: 25,
  },
});
