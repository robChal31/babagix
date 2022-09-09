import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { colors } from "../global";
import { useState } from "react";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const ImageSlider = (props) => {
  const [activeDot, setActiveDot] = useState(0);

  function imageSlided({ nativeEvent }) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeDot) {
      setActiveDot(slide);
    }
  }
  return (
    <View>
      <View>
        <ScrollView
          onScroll={imageSlided}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {props.images.map((image, index) => {
            return (
              <Image
                key={index.toString()}
                source={{ uri: image }}
                style={styles.imageSlider}
              />
            );
          })}
        </ScrollView>
        <View style={styles.dotIndicatorContainer}>
          {props.images.length > 1 &&
            props.images.map((image, index) => {
              return (
                <Text
                  key={index.toString()}
                  style={
                    index == activeDot
                      ? styles.dotActiveIndicator
                      : styles.dotIndicator
                  }
                >
                  ⬤
                </Text>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  imageSlider: { width, height: height * 0.5, resizeMode: "cover" },
  dotIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginVertical: 5,
  },
  dotActiveIndicator: {
    color: "#0D180B",
    marginRight: 5,
  },
  dotIndicator: {
    color: colors.secondaryText,
    marginRight: 5,
  },
});
