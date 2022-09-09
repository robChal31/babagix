import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Back, Input } from "../components";
import { colors, gap } from "../global";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { category } from "../../assets/common/data";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import ImagePicker from "react-native-image-crop-picker";

const { width, height } = Dimensions.get("window");

const UploadScreen = (props) => {
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openIsFree, setOpenIsFree] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [isFreeValue, setIsFreeValue] = useState("");
  const [categories, setCategories] = useState(category);
  const [foodCategoryId, setFoodCategoryId] = useState(null);
  const [expiredIn, setExpiredIn] = useState(0);
  const [location, setLocation] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${baseUrl}/category`);
      const json = await response.json();
      if (response.ok) {
        const data = json.filter((e) => e.value !== "all");
        const fdCId = data.filter((e) => e.value === "food");
        setCategories(data);
        setFoodCategoryId(fdCId[0]._id);
      }
    };
    fetchCategory();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const openCamera = () => {};

  return (
    <View style={styles.container}>
      <Back navigation={props.navigation} text={"Upload babagix"} />
      <View style={styles.content}>
        <View style={{ paddingHorizontal: 20 }}>
          {/* user detail */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: user.user.avatar }}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {user.user.username}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: colors.secondaryText,
                }}
              >
                {user.user.email}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 5,
              marginTop: 8,
              marginBottom: 5,
              color: colors.secondaryText,
              fontSize: 12,
            }}
          >
            mau babagix apa hari ini?
          </Text>
          {/* input */}
          <View style={{ alignItems: "center" }}>
            <Input
              placeholder={"nama barang/makanan"}
              enteredText={(e) => setItemName(e)}
              icon={"food-outline"}
            />
            <TextInput
              placeholder={"deskripsi"}
              onChangeText={(e) => setDesc(e)}
              multiline={true}
              numberOfLines={2}
              style={{
                width: "75%",
                borderBottomWidth: 1,
                marginBottom: 10,
                borderColor: colors.primaryLogo,
              }}
            />
            <View style={{ width: "50%", marginVertical: 10 }}>
              <DropDownPicker
                open={open}
                placeholder={"pilih kategori"}
                value={categoryValue}
                style={{ zIndex: 100 }}
                items={categories.map((e) => {
                  return {
                    label: e.category_name,
                    value: e.value == "all" ? "" : e._id,
                    icon: e.icon
                      ? () => (
                          <Icon
                            type="material-community"
                            name={e.icon}
                            size={20}
                          />
                        )
                      : null,
                  };
                })}
                setOpen={setOpen}
                setValue={setCategoryValue}
              />
            </View>

            {categoryValue !== foodCategoryId && (
              <View style={{ width: "50%", marginVertical: 10 }}>
                <DropDownPicker
                  open={openIsFree}
                  placeholder={"pilih status"}
                  value={isFreeValue}
                  style={{ zIndex: 100 }}
                  items={[
                    { id: 1, isFree: "Gratis" },
                    { id: 2, isFree: "Pinjamkan" },
                  ].map((e) => {
                    return {
                      label: e.isFree,
                      value: e.id,
                    };
                  })}
                  setOpen={setOpenIsFree}
                  setValue={setIsFreeValue}
                />
              </View>
            )}

            {categoryValue === foodCategoryId && (
              <View
                style={{
                  width: "75%",
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  borderColor: colors.primaryLogo,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 2,
                  marginVertical: 5,
                }}
              >
                <Icon
                  type="material-community"
                  name="clock-outline"
                  size={25}
                  color={colors.secondaryText}
                />
                <TextInput
                  placeholder={"expired in"}
                  onChangeText={(e) => setExpiredIn(e)}
                  style={{ marginLeft: 10 }}
                  keyboardType={"numeric"}
                />
              </View>
            )}

            <Pressable
              onPress={openCamera}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                type="material-community"
                name="camera-outline"
                size={40}
                color={colors.secondaryText}
              />
              <Text style={{ marginLeft: 10 }}>Kamera</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    width,
    backgroundColor: "#fff",
  },
  content: {
    marginVertical: 20,
  },
});
