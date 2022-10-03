import { View, StyleSheet, Pressable, Dimensions, Text } from "react-native";
import { Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { gap, colors } from "../global";
import { connect } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import Saved from "../components/saved";
import baseUrl from "../../assets/common/baseUrl";

import * as actions from "../../Redux/actions/savedActions";
import { useAuthContext } from "../../hooks/useAuthContext";

const { width, height } = Dimensions.get("window");

const SavedScreen = (props) => {
  const [saved, setSaved] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const isSaved = async () => {
      const checkIsSaved = await fetch(
        `${baseUrl}/item/getSavedItems?userId=${user.user._id}`,
        {
          method: "GET",
        }
      );

      const response = await checkIsSaved.json();
      setSaved(() => response);
    };
    isSaved();
  }, [setSaved]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationBack}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Icon type="material-community" name="arrow-left" size={25} />
        </Pressable>
        <Text style={styles.header}>Tersimpan</Text>
      </View>

      {saved ? (
        <SwipeListView
          data={saved}
          renderItem={(items) => (
            <Saved data={items} navigate={props.navigation.navigate} />
          )}
          renderHiddenItem={(data) => {
            return (
              <View style={styles.renderHiddenContainer}>
                <Pressable
                  style={styles.hiddenButton}
                  onPress={() => {
                    props.removeFromSaved(data.item);
                    console.log(data.item);
                  }}
                >
                  <Icon
                    type="material-community"
                    size={30}
                    name="trash-can-outline"
                    color={"white"}
                  />
                </Pressable>
              </View>
            );
          }}
          disableRightSwipe={true}
          previewOpenDelay={3000}
          friction={1000}
          tension={40}
          leftOpenValue={75}
          stopLeftSwipe={75}
          rightOpenValue={-75}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "300",
              backgroundColor: colors.primaryLogo,
              color: "white",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 6,
            }}
          >
            Belum ada yang disimpan
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { savedItem } = state;
  return {
    savedItem: savedItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromSaved: (data) => dispatch(actions.removeFromSaved(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    width,
  },
  emptyContainer: {
    height: height * 0.6,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
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
  renderHiddenContainer: {
    marginVertical: 5,
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 3,
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 25,
    height: 95,
    width: width / 1.2,
    borderRadius: 10,
  },
});
