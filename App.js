import Navigation from "./src/navigations/Navigation";
import Toast from "react-native-toast-message";
//redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//context api
import { AuthContextProvider } from "./Context/AuthContext";
import { LocationContextProvider } from "./Context/LocationContext";

export default function App() {
  return (
    <AuthContextProvider>
      <LocationContextProvider>
        <Provider store={store}>
          <Navigation />
          <Toast />
        </Provider>
      </LocationContextProvider>
    </AuthContextProvider>
  );
}
