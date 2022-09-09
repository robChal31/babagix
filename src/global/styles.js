import { getStatusBarHeight } from "react-native-status-bar-height";

export const gap = { statusBarHeight: getStatusBarHeight() };

export const colors = {
  primaryLogo: "#369346",
  primaryText: "#143408",
  secondaryText: "#779379",
  secondaryText2: "#2f442c",
  line: "#d7d8d6",
  activeCategory: "#B23BB8",
  alernative: "#888",
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.6,
  shadowRadius: 2.62,
  elevation: 4,
};
