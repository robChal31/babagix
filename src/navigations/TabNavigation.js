import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { colors } from "../global/styles";
import {
  MessagesScreen,
  HomeScreen,
  UploadScreen,
  MapScreen,
} from "../screens";
import { useAuthContext } from "../../hooks/useAuthContext";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { user } = useAuthContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map-marker" : "map-marker-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "email" : "email-outline";
          }

          // You can return any component that you like here!
          return (
            <Icon
              type="material-community"
              name={iconName}
              size={25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.primaryLogo,
        tabBarInactiveTintColor: colors.secondaryText2,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
