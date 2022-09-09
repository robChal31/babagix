import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../global";

const { width, height } = Dimensions.get("window");
const MapViews = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        ref={props.mapRef}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.map}
        initialRegion={props.region}
      >
        {props.region && (
          <MapView.Marker coordinate={props.region}>
            <View style={styles.markerContainer}>
              <View style={styles.circleMarker}></View>
            </View>
          </MapView.Marker>
        )}
      </MapView>
    </View>
  );
};

export default MapViews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginBottom: 40,
    paddingBottom: 50,
  },
  map: {
    width: width * 0.92,
    height: height * 0.4,
  },
  markerContainer: {
    borderRadius: 100,
    position: "relative",
    borderWidth: 2,
    borderColor: colors.secondaryText2,
    width: 35,
    height: 35,
    padding: 1,
    opacity: 0.8,
  },
  circleMarker: {
    backgroundColor: colors.secondaryText,
    flex: 1,
    borderRadius: 100,
    opacity: 0.3,
  },
});
