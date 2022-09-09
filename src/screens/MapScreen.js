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
import { colors, gap, itemDatas } from "../global";
import * as Location from "expo-location";
import { Header, HomeScreenNavigationHeader } from "../components";

const { width, height } = Dimensions.get("window");
const MapScreen = ({ navigation }) => {
  const [position, setPosition] = React.useState({
    latitudeDelta: 20,
    longitudeDelta: 20,
    latitude: parseFloat(-0.789275),
    longitude: parseFloat(113.921326),
  });
  const [dataRendered, setDataRendered] = React.useState(null);
  const _map = React.useRef();

  //user location useeffect
  // React.useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return getLocation;
  //     }
  //     foregroundSubscrition = Location.watchPositionAsync(
  //       {
  //         // Tracking options
  //         accuracy: Location.Accuracy.High,
  //         distanceInterval: 10,
  //       },
  //       (location) => {
  //         // console.log(location);
  //         let cor = {
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //         };
  //         setPosition({
  //           ...cor,
  //           latitudeDelta: 0.00822,
  //           longitudeDelta: 0.0421,
  //         });
  //       }
  //     );
  //   })();
  // }, []);
  //another example to use permission

  // const checkPermission = async () => {
  //   const permissionStatus = await Location.requestForegroundPermissionsAsync();
  //   if (permissionStatus.status === "granted") {
  //     const permission = await askPermission();
  //     return permission;
  //     const {
  //       coords: { latitude, longitude },
  //     } = await Location.getCurrentPositionAsync();
  //     setPosition({
  //       latitudeDelta: 0.008,
  //       longitudeDelta: 0.008,
  //       latitude,
  //       longitude,
  //     });
  //   }
  //   return;
  // };

  // const askPermission = async () => {
  //   const permission = await Location.requestForegroundPermissionsAsync();
  //   return permission.status === "granted";
  // };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setPosition((state) => {
        goToMyLocation({
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
          latitude,
          longitude,
        });
        return {
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
          latitude,
          longitude,
        };
      });
      console.log(position);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    // checkPermission();
    getLocation();
  }, []);

  //animate to user location
  const goToMyLocation = (coordinateAnimate) => {
    _map.current.animateToRegion(coordinateAnimate, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Pressable onPress={goToMyLocation}>
          <Text>press</Text>
        </Pressable>
      </View>
      {position && (
        <View style={{ flex: 1 }}>
          <MapView
            ref={_map}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            initialRegion={position}
          >
            <Marker
              draggable
              coordinate={position}
              onDragEnd={(e) => {
                const { longitude, latitude } = e.nativeEvent.coordinate;
                setPosition({ ...position, longitude, latitude });
              }}
            />
            {dataRendered &&
              dataRendered.map((item, index) => {
                return (
                  <MapView.Marker
                    coordinate={item.location}
                    key={index.toString()}
                  >
                    {item.category_id == 1 && (
                      <Icon
                        type="material-community"
                        name="food"
                        size={25}
                        color={colors.activeCategory}
                      />
                    )}
                    {item.category_id == 2 && (
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
                          <Text style={{ fontSize: 13, fontWeight: "500" }}>
                            {item.itemName}
                          </Text>
                          <Text style={{ fontSize: 11, color: colors.line }}>
                            {item.username}
                          </Text>
                          <Text>
                            <Image
                              source={item.images[0]}
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
  },
  imageBubble: {
    width: 120,
    height: 80,
    resizeMode: "contain",
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
