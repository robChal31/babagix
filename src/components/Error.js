import { View, Text, StyleSheet } from "react-native";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#DC1C39",
    fontSize: 11,
  },
});
