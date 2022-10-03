import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Back, Input, UploadImage, UserDetailUpload } from "../components";
import { colors, gap, shadow } from "../global";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useCallback } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { category } from "../../assets/common/data";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { useUploadItem } from "../../hooks/useUploadItem";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const EditItem = (props) => {
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openIsFree, setOpenIsFree] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [isFreeValue, setIsFreeValue] = useState("");
  const [isFree, setIsFree] = useState([]);
  const [categories, setCategories] = useState(category);
  const [foodCategoryId, setFoodCategoryId] = useState(null);
  const [expiredIn, setExpiredIn] = useState(0);
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [inpError, setInpError] = useState("");
  const { user } = useAuthContext();
  const { fetchData, error, loading } = useUploadItem();

  const item = props.route.params.data;

  useFocusEffect(
    useCallback(() => {
      setItemName(item.item_name);
      setDesc(item.desc);
      setCategoryValue(item.category._id);
      setIsFreeValue(item.is_free);
      setIsFree([]);
      setExpiredIn("");
      setImages((curr) => {
        return item.item_pics.map((image) => {
          return {
            uri: image,
          };
        });
      });
      setCategories(category);
      setInpError("");
      const fetchCategory = async () => {
        const response = await fetch(`${baseUrl}/category`);
        const json = await response.json();
        if (response.ok) {
          const data = json.filter((e) => e.value !== "all");
          const fdCId = data.filter((e) => e.value === "food");
          setCategories(data);
          setFoodCategoryId(fdCId[0]._id);
          if (item.category._id === fdCId[0]._id) {
            setIsFree([{ id: 1, isFree: "Gratis" }]);
          }
          if (item.category._id !== fdCId[0]._id) {
            setExpiredIn("");
            setIsFree([
              { id: 1, isFree: "Gratis" },
              { id: 2, isFree: "Pinjamkan" },
            ]);
          }
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
    }, [])
  );

  const sendData = () => {
    const data = {
      itemName,
      desc,
      category_id: categoryValue,
      is_free: isFreeValue,
      expiredIn,
      location,
      user_id: user.user._id,
      images,
      itemId: item._id,
    };
    if (foodCategoryId === categoryValue) {
      if (!expiredIn) {
        setInpError("mohon mengisi semua field");
        return;
      }
      setInpError("");
    }

    if (!itemName || !desc || !categoryValue || !images) {
      setInpError("mohon mengisi semua field");
    }
    if (!inpError && categoryValue) {
      fetchData(data, props.navigation, "edit");
    }
  };

  const deleteImage = (index) => {
    setImages((curr) => {
      return curr.filter((e, i) => i !== index);
    });
  };

  return (
    <View style={styles.container}>
      <Back navigation={props.navigation} text={"Upload babagix"} />
      <View style={styles.content}>
        <View style={{ paddingHorizontal: 20 }}>
          <UserDetailUpload />

          <View style={{ alignItems: "center" }}>
            <Input
              placeholder={"nama barang/makanan"}
              enteredText={(e) => setItemName(e)}
              icon={"food-outline"}
              value={itemName}
            />

            <TextInput
              placeholder={"deskripsi"}
              onChangeText={(e) => setDesc(e)}
              multiline={true}
              numberOfLines={3}
              value={desc}
              style={styles.textInp}
            />

            <View style={styles.dropDown}>
              <DropDownPicker
                open={open}
                placeholder={"pilih kategori"}
                value={categoryValue}
                style={{ zIndex: 2 }}
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
                onSelectItem={(item) => {
                  if (item.value === foodCategoryId) {
                    setIsFree([{ id: 1, isFree: "Gratis" }]);
                  }
                  if (item.label === "Barang") {
                    setExpiredIn("");
                    setIsFree([
                      { id: 1, isFree: "Gratis" },
                      { id: 2, isFree: "Pinjamkan" },
                    ]);
                  }
                }}
              />
            </View>

            <View style={styles.dropDown}>
              <DropDownPicker
                open={openIsFree}
                placeholder={"pilih status"}
                value={isFreeValue}
                style={{ zIndex: 2 }}
                items={isFree.map((e) => {
                  return {
                    label: e.isFree,
                    value: e.id,
                  };
                })}
                setOpen={setOpenIsFree}
                setValue={setIsFreeValue}
              />
            </View>

            {categoryValue === foodCategoryId && (
              <View style={styles.foodCatActive}>
                <Icon
                  type="material-community"
                  name="clock-outline"
                  size={25}
                  color={colors.secondaryText}
                />
                <TextInput
                  placeholder={"expired in"}
                  value={expiredIn}
                  onChangeText={(e) => {
                    setExpiredIn(e);
                  }}
                  style={{ marginLeft: 10, width: "100%" }}
                  keyboardType={"numeric"}
                />
              </View>
            )}

            {images.length < 3 && (
              <UploadImage
                images={(src) => setImages((curr) => [...curr, src])}
              />
            )}

            <View style={{ justifyContent: "center" }}>
              <FlatList
                data={images}
                style={{ height: 100 }}
                numColumns={3}
                ListFooterComponent={
                  <View style={styles.buttonSubCont}>
                    {!loading ? (
                      <Pressable onPress={sendData} style={styles.submitButt}>
                        <Text style={styles.submitButtText}>Tambahkan</Text>
                      </Pressable>
                    ) : (
                      <View style={styles.loading}>
                        <ActivityIndicator
                          size={"large"}
                          color={colors.primaryLogo}
                        />
                      </View>
                    )}
                    {/* error message */}
                    {inpError ? (
                      <Text style={styles.errorText}>{inpError}</Text>
                    ) : null}
                    {error ? (
                      <Text style={styles.errorText}>{error}</Text>
                    ) : null}
                  </View>
                }
                renderItem={(image) => {
                  return (
                    <View key={image.index} style={styles.prevImageCont}>
                      <Image
                        source={{
                          uri: image.item.uri,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Pressable
                        onPress={() => deleteImage(image.index)}
                        style={{ position: "absolute", top: 5, right: 5 }}
                      >
                        <Icon
                          type="material-community"
                          name="trash-can-outline"
                          size={25}
                          color={"#fff"}
                        />
                      </Pressable>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    height,
    width,
    backgroundColor: "#fff",
  },
  content: {
    marginVertical: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: "#DD2929",
    textAlign: "center",
    marginVertical: 20,
  },
  textInp: {
    width: "75%",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: colors.primaryLogo,
  },
  dropDown: { width: "75%", marginVertical: 10 },
  foodCatActive: {
    width: "75%",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: colors.primaryLogo,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    marginVertical: 5,
  },
  buttonSubCont: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  submitButt: {
    backgroundColor: colors.primaryLogo,
    paddingVertical: 10,
    width: width * 0.7,
    borderRadius: 10,
    ...shadow,
  },
  submitButtText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  prevImageCont: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "row",
    width: width / 3 - 30,
    height: 100,
    marginRight: 5,
    marginVertical: 10,
  },
});
