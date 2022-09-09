import Navigation from "./src/navigations/Navigation";
import Toast from "react-native-toast-message";
//redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//context api
import { AuthContextProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Navigation />
        <Toast />
      </Provider>
    </AuthContextProvider>
  );
}
