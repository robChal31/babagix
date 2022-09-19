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
import { Back, Input, UserDetailUpload } from "../components";
import { colors, gap, shadow } from "../global";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useRef, useCallback } from "react";
import baseUrl from "../../assets/common/baseUrl";
import { category } from "../../assets/common/data";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { useUploadItem } from "../../hooks/useUploadItem";
import { useFocusEffect } from "@react-navigation/native";

const numColumns = 3;
const { width, height } = Dimensions.get("window");
const UploadScreen = (props) => {
  const cameraRef = useRef();

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
  const [images, setImages] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [openCamera, setOpenCamera] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [inpError, setInpError] = useState("");
  const { user } = useAuthContext();
  const { fetchData, error, loading } = useUploadItem();

  useFocusEffect(
    useCallback(() => {
      setItemName("");
      setDesc("");
      setCategoryValue("");
      setIsFreeValue("");
      setIsFree([]);
      setExpiredIn("");
      setImages([]);
      setInpError("");
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

      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
      })();
    }, [])
  );

  if (!hasCameraPermission) {
    // Camera permissions are still loading
    return <View />;
  }

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
    };
    if (foodCategoryId === categoryValue) {
      if (!expiredIn) {
        setInpError("mohon mengisi semua field");
        return;
      }
      setInpError("");
    }
    if (!inpError && categoryValue) {
      fetchData(data, props.navigation);
    }
  };

  const cameraHandler = () => {
    if (openCamera) {
      // requestPermission()
      setOpenCamera(false);
    }
    if (!openCamera) {
      setOpenCamera(true);
    }
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = {
        base64: true,
        quality: 0.5,
        exif: false,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setImages((curr) => {
          return [...curr, source];
        });
      }
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const saveImagetoState = () => {
    cameraHandler();
    cancelPreview();
  };

  const onSnapView = () => {
    if (!isPreview) {
      return (
        <>
          <Pressable
            onPress={cameraHandler}
            style={{ alignItems: "flex-end", margin: 20 }}
            disabled={!isCameraReady}
          >
            <Icon
              type="material-community"
              name="close"
              size={40}
              color="#fff"
            />
          </Pressable>
          <View
            style={{
              marginVertical: 40,
              flexDirection: "row",
              justifyContent: "center",
              width,
              alignItems: "center",
            }}
          >
            <Pressable
              style={{ marginLeft: 80 }}
              onPress={onSnap}
              disabled={!isCameraReady}
            >
              <Icon
                type="material-community"
                name="circle-slice-8"
                size={60}
                color={"#fff"}
              />
            </Pressable>
            <Pressable
              style={{ marginLeft: 40 }}
              disabled={!isCameraReady}
              onPress={() => {
                setCameraType((curr) => {
                  return curr === CameraType.back
                    ? CameraType.front
                    : CameraType.back;
                });
              }}
            >
              <Icon
                type="material-community"
                name="rotate-3d-variant"
                size={40}
                color={colors.primaryLogo}
              />
            </Pressable>
          </View>
        </>
      );
    }
    if (isPreview) {
      return (
        <Pressable
          style={{
            flex: 1,
            paddingVertical: 30,
            flexDirection: "column",
            bottom: 0,
            justifyContent: "space-between",
          }}
        >
          <View></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 30,
            }}
          >
            <Pressable onPress={cancelPreview}>
              <Icon
                type="material-community"
                name="trash-can-outline"
                size={40}
                color="#fff"
              />
            </Pressable>
            <Pressable onPress={saveImagetoState}>
              <Icon
                type="material-community"
                name="check"
                size={40}
                color={colors.primaryLogo}
              />
            </Pressable>
          </View>
        </Pressable>
      );
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
              style={{
                width: "75%",
                borderBottomWidth: 1,
                marginBottom: 10,
                borderColor: colors.primaryLogo,
              }}
            />

            <View style={{ width: "75%", marginVertical: 10 }}>
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

            <View style={{ width: "75%", marginVertical: 10 }}>
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
              <Pressable
                onPress={cameraHandler}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "75%",
                }}
              >
                <Icon
                  type="material-community"
                  name="camera-outline"
                  size={40}
                  color={colors.secondaryText}
                />
                <Text style={{ marginLeft: 10 }}>Tambahkan foto</Text>
              </Pressable>
            )}
            {inpError ? <Text style={styles.errorText}>{inpError}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {!loading && images ? (
              <View style={{ justifyContent: "center" }}>
                <FlatList
                  data={images}
                  style={{ height: 200 }}
                  numColumns={numColumns}
                  renderItem={(image) => {
                    return (
                      <View
                        key={image.index}
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: 10,
                          flexDirection: "row",
                          width: width / 3 - 30,
                          height: 100,
                          marginRight: 5,
                          marginVertical: 10,
                        }}
                      >
                        <Image
                          source={{
                            uri: `data:image/jpg;base64,${image.item}`,
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
            ) : null}

            {!loading ? (
              <Pressable
                onPress={sendData}
                style={{
                  backgroundColor: colors.primaryLogo,
                  paddingVertical: 10,
                  width: width * 0.7,
                  borderRadius: 10,
                  ...shadow,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: images.length < 1 ? height - 450 : height - 300,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "500" }}>
                  Tambahkan
                </Text>
              </Pressable>
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator size={"large"} color={colors.primaryLogo} />
              </View>
            )}
          </View>
        </View>
      </View>
      {openCamera && (
        <Camera
          ref={cameraRef}
          type={cameraType}
          ratio={"16:9"}
          onCameraReady={onCameraReady}
          style={{
            width,
            height: height - 40,
            zIndex: 2,
            justifyContent: "space-between",
            top: gap.statusBarHeight,
            position: "absolute",
          }}
        >
          {onSnapView()}
        </Camera>
      )}
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight,
    flex: 1,
    height,
    width,
    backgroundColor: "#fff",
    position: "relative",
  },
  content: {
    marginVertical: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  errorText: {
    fontSize: 12,
    color: "#DD2929",
    textAlign: "center",
    marginVertical: 20,
  },
});
