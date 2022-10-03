import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { colors, gap } from "../global";
import * as Location from "expo-location";
import { useState } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const MapScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [dataRendered, setDataRendered] = React.useState(null);
  const [errrMsg, setErrorMsg] = useState("");
  const _map = React.useRef();

  const { user } = useAuthContext();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});

        const getItem = await fetch(
          `${baseUrl}/item?userId=${user.user._id}&long=${location.coords.longitude}&latt=${location.coords.latitude}`
        );
        const data = await getItem.json();
        setDataRendered(data);
        setUserLocation(() => {
          return {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
        });
        _map.current.animateToRegion(location, 1000);
      })();
    }, [])
  );

  return (
    <>
      {userLocation && (
        <View style={styles.container}>
          {userLocation && (
            <View style={{ flex: 1 }}>
              <MapView
                ref={_map}
                showsUserLocation={true}
                followsUserLocation={true}
                style={styles.map}
                initialRegion={userLocation}
              >
                <Marker
                  draggable
                  coordinate={userLocation}
                  onDragEnd={(e) => {
                    const { longitude, latitude } = e.nativeEvent.coordinate;
                    setUserLocation({ ...userLocation, longitude, latitude });
                  }}
                />
                {dataRendered &&
                  dataRendered.map((item, index) => {
                    console.log(item);
                    return (
                      <MapView.Marker
                        coordinate={{
                          latitude: parseFloat(item.location.coordinates[1]),
                          longitude: parseFloat(item.location.coordinates[0]),
                        }}
                        key={index.toString()}
                      >
                        {item.category.category_name == "Makanan" && (
                          <Icon
                            type="material-community"
                            name="food"
                            size={25}
                            color={colors.activeCategory}
                          />
                        )}
                        {item.category.category_name == "Barang" && (
                          <Icon
                            type="material-community"
                            name="lightbulb"
                            size={25}
                            color={colors.activeCategory}
                          />
                        )}
                        <Callout
                          tooltip
                          onPress={() =>
                            navigation.navigate("ItemSelectedScreen", {
                              data: item,
                            })
                          }
                        >
                          <View>
                            <View style={styles.bubbleContainer}>
                              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                                {item.item_name}
                              </Text>
                              <Text
                                style={{ fontSize: 10, color: colors.line }}
                              >
                                {item.user.username}
                              </Text>
                              <Text
                                style={{ top: -40, width: 120, height: 120 }}
                              >
                                <Image
                                  source={{
                                    uri: item.item_pics[0],
                                  }}
                                  style={styles.imageBubble}
                                />
                              </Text>
                            </View>
                            <View style={styles.arrowBorder}></View>
                            <View style={styles.arrow}></View>
                          </View>
                        </Callout>
                      </MapView.Marker>
                    );
                  })}
              </MapView>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: gap.statusBarHeight,
  },
  map: {
    width,
    height: height,
  },
  bubbleContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 10,
    width: 150,
    height: 150,
  },
  imageBubble: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
});
