import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  CardItem,
  DrawerNav,
  Header,
  HomeScreenNavigationHeader,
} from "../components";
import { colors, gap } from "../global";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const HomeScreen = (props) => {
  const [dataRendered, setDataRendered] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${baseUrl}/item`)
        .then((res) => setDataRendered(res.data))
        .catch((err) => err);
      axios
        .get(`${baseUrl}/category`)
        .then((res) => setCategory(res.data))
        .catch((err) => console.log(err));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => {
        setDataRendered([]);
        setLoading(true);
      };
    }, [])
  );

  function filterData(itemsStatus, itemsCategory) {
    axios(`${baseUrl}/item?isFree=${itemsStatus}&category=${itemsCategory}`)
      .then((res) => setDataRendered(() => res.data))
      .catch((err) => console.log(err));
  }

  const DrawerNavigation = () => {
    return <DrawerNav navigation={props.navigation} />;
  };

  return (
    <View style={styles.homeScreenContainer}>
      {/* screen header */}
      <View>
        <Header navigation={props.navigation} />
      </View>
      {/* navigation header */}
      <HomeScreenNavigationHeader
        dataSend={dataRendered}
        dataShown={(itemsStatus, itemsCategory) => {
          filterData(itemsStatus, itemsCategory);
        }}
        categoryList={category}
      />

      {/* card item list */}

      <View style={styles.hSCardContainer}>
        <View style={styles.cardItemHeaderContainer}>
          <Text style={styles.cardItemHeader}>Disekitar kamu</Text>
        </View>
        {loading == false ? (
          <>
            {!dataRendered && (
              <View>
                <Text style={styles.emptyListItemMsg}>
                  Belum ada barang yang dibagikan disekitar kamu sekarang,
                  kenapa tidak jadi yang pertama ?
                </Text>
              </View>
            )}
            {dataRendered && (
              <FlatList
                data={dataRendered}
                renderItem={(items, index) => {
                  return (
                    <CardItem
                      data={items}
                      navigate={(screen, data) =>
                        props.navigation.navigate(screen, data)
                      }
                    />
                  );
                }}
                keyExtractor={(item, index) => {
                  return index;
                }}
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: 30,
                  paddingBottom: 50,
                }}
              />
            )}
          </>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={colors.primaryLogo} />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: gap.statusBarHeight + 10,
    paddingHorizontal: 20,
    position: "relative",
  },
  hSCardContainer: {
    paddingTop: 10,
    flex: 5,
  },
  cardItemHeaderContainer: {
    borderColor: colors.primaryLogo,
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 10,
  },
  cardItemHeader: {
    fontSize: 13,
    color: colors.primaryLogo,
    fontWeight: "500",
  },
  emptyListItemMsg: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    color: "#d3d3d3",
    paddingVertical: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
