import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { colors, gap, shadow } from "../global";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { EditProfile } from "../components";

const numColumns = 3;
const { width } = Dimensions.get("window");

const Profile = (props) => {
  const [activeProfileScreen, setActiveProfileScreen] = useState([true, false]);
  const [dataRendered, setDataRendered] = useState([]);
  const [userDetail, setUserDetail] = useState();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/item/profile/${user.user._id}`);
      const json = await response.json();
      if (response.ok) {
        setDataRendered(json);
      }
    };
    const userData = async () => {
      const userFetch = await fetch(
        `${baseUrl}/user/${props.route.params.data}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      );
      const json = await userFetch.json();
      setUserDetail(json);
    };
    userData();
    fetchData();
    return () => {
      setActiveProfileScreen([true, false]);
      setDataRendered();
      setUserDetail();
    };
  }, [setDataRendered, setUserDetail, setActiveProfileScreen]);

  return (
    <>
      {userDetail && (
        <View style={styles.container}>
          {/* navigation back */}
          <View style={styles.navigationBack}>
            <Pressable onPress={() => props.navigation.goBack()}>
              <Icon type="material-community" name="arrow-left" size={25} />
            </Pressable>
          </View>

          {/* profile detail and action  */}
          <View style={styles.profileContainer}>
            <View style={styles.profile}>
              <View style={styles.imageProfileContainer}>
                <View style={styles.imageProfileShadow}>
                  <Image
                    source={{ uri: userDetail.avatar }}
                    style={styles.imageProfile}
                  />
                </View>
                <Text style={styles.username}>{user.user.username}</Text>
                <Text numberOfLines={3} style={styles.bio}>
                  {userDetail.bio}
                </Text>
              </View>
              <View style={styles.profileActionContainer}>
                <Pressable
                  style={styles.profileAction}
                  onPress={() => setActiveProfileScreen([true, false])}
                >
                  <Text
                    style={
                      activeProfileScreen[0]
                        ? styles.profileActionText
                        : styles.profileActionText2
                    }
                  >
                    Shared ({dataRendered.length})
                  </Text>
                  <Icon
                    type="material-community"
                    name="archive-outline"
                    size={25}
                    color={
                      activeProfileScreen[0] ? colors.primaryText : colors.line
                    }
                  />
                </Pressable>
                <Pressable
                  style={styles.profileAction}
                  onPress={() => setActiveProfileScreen([false, true])}
                >
                  <Text
                    style={
                      activeProfileScreen[1]
                        ? styles.profileActionText
                        : styles.profileActionText2
                    }
                  >
                    Edit Profile
                  </Text>
                  <Icon
                    type="material-community"
                    name="cog-outline"
                    size={25}
                    color={
                      activeProfileScreen[1] ? colors.primaryText : colors.line
                    }
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* profile content */}
          <View style={styles.contentContainer}>
            {activeProfileScreen[0] && (
              <View style={{ flex: 1, width }}>
                <FlatList
                  data={dataRendered}
                  numColumns={numColumns}
                  renderItem={({ item, index }) => {
                    const lastOrSecondLastItem =
                      index == dataRendered.length - 2 ||
                      index == dataRendered.length - 1;
                    const gridStyle =
                      dataRendered.length % 3 !== 0 && lastOrSecondLastItem;
                    const useStyle = !gridStyle
                      ? styles.normalGridImage
                      : gridStyle && dataRendered.length - index == 2
                      ? styles.secondGridImage
                      : styles.thirdGridImage;
                    return (
                      <Pressable
                        style={{ ...useStyle, ...shadow, borderWidth: 0.2 }}
                        onPress={() =>
                          props.navigation.navigate("ItemSelectedScreen", {
                            data: item,
                          })
                        }
                      >
                        <Image
                          source={{ uri: item.item_pics[0] }}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                          }}
                        />
                      </Pressable>
                    );
                  }}
                  keyExtractor={(item, index) => {
                    return item._id;
                  }}
                  style={{ paddingBottom: 300, flex: 1 }}
                />
              </View>
            )}
            {/* {user.user._id == userDetail._id} */}
            {userDetail._id === user.user._id && activeProfileScreen[1] && (
              <EditProfile
                navigation={props.navigation.navigate}
                activeProfileProp={() => setActiveProfileScreen([true, false])}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    backgroundColor: "#F3F5F7",
    position: "relative",
  },
  navigationBack: {
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomColor: colors.line,
  },
  profileActionContainer: {},
  profile: {
    paddingHorizontal: 15,
  },
  imageProfileContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  imageProfile: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  imageProfileShadow: {
    width: 80,
    height: 80,
    borderRadius: 100,
    ...shadow,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.secondaryText2,
    marginTop: 15,
  },
  bio: {
    fontSize: 11,
    marginTop: 8,
    maxWidth: "50%",
    textAlign: "center",
    color: colors.alernative,
  },
  profileActionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 0.3,
    paddingBottom: 20,
    borderBottomColor: colors.secondaryText,
  },
  profileAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileActionText: {
    marginRight: 10,
    color: colors.primaryText,
    fontWeight: "500",
  },
  profileActionText2: {
    marginRight: 10,
    color: colors.line,
    fontWeight: "500",
  },
  contentContainer: {
    paddingTop: 5,
    flex: 1,
  },
  normalGridImage: {
    flex: 1,
    height: 130,
    margin: 2,
  },
  secondGridImage: {
    width: width / 3 - 4,
    height: 130,
    margin: 2,
  },
  thirdGridImage: {
    width: width / 3 - 4,
    height: 130,
    margin: 2,
  },
  editInput: {
    paddingVertical: 3,
    borderBottomWidth: 0.55,
    borderBottomColor: colors.line,
    color: colors.secondaryText,
  },
});
