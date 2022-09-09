import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import {
  ItemSelectedScreen,
  SearchScreen,
  ChatScreen,
  RegisterScreen,
  LoginScreen,
  WelcomeScreen,
  HomeScreen,
  SavedScreen,
  Profile,
  MapScreen,
} from "../screens";
import { useAuthContext } from "../../hooks/useAuthContext";

const Stack = createNativeStackNavigator();
const Navigation = (props) => {
  const { user } = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={WelcomeScreen}
      >
        <Stack.Screen
          name="TabNavigation"
          component={user ? TabNavigation : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
        ></Stack.Screen>
        <Stack.Screen name="MapScreen" component={MapScreen}></Stack.Screen>
        <Stack.Screen
          name="HomeScreen"
          component={user ? HomeScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ItemSelectedScreen"
          component={user ? ItemSelectedScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="SearchScreen"
          component={user ? SearchScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ChatScreen"
          component={user ? ChatScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={user ? HomeScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="SavedScreen"
          component={user ? SavedScreen : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={user ? Profile : LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegisterScreen"
          component={user ? HomeScreen : RegisterScreen}
        ></Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default Navigation;
