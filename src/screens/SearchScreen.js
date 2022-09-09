import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { colors, gap, itemDatas } from "../global";
import { Icon } from "react-native-elements";
import { CardItem } from "../components";
import { searchedData } from "../helpers";

const SearchScreen = ({ navigation }) => {
  const dataFetched = itemDatas;
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [noResult, setNoResult] = useState(false);

  function clearInput() {
    setSearchInput("");
    setData([]);
    setNoResult(false);
  }
  const clearNoResult = useEffect(() => {
    if (data.length > 0) {
      setNoResult(false);
    }
  });
  function textInput(enteredText) {
    setSearchInput(enteredText);
  }

  function searchThis() {
    setData(searchedData(searchInput, dataFetched));
    if (data.length < 1) {
      setNoResult(true);
    } else {
      clearNoResult;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          type="material-community"
          name={"magnify"}
          size={25}
          color={colors.secondaryText}
        />
        <TextInput
          placeholder="cari apa ?"
          style={styles.searchInput}
          value={searchInput}
          onChangeText={textInput}
          onSubmitEditing={() => searchThis()}
          autoFocus
        />
        <Pressable onPress={clearInput}>
          <Icon
            type="material-community"
            name="alpha-x-circle"
            size={25}
            color={"#BA3754"}
          />
        </Pressable>
      </View>
      <View style={styles.searchedContainer}>
        {data.length > 0 && (
          <View style={styles.searchResult}>
            <Text style={styles.searchResultText}>Hasil pencarian</Text>
            <FlatList
              data={data}
              renderItem={(items, index) => {
                return (
                  <CardItem
                    data={items}
                    navigate={(screen, data) =>
                      navigation.navigate(screen, data)
                    }
                  />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
          </View>
        )}
        {noResult && (
          <View style={styles.resultNotFoundContainer}>
            <Text
              style={{
                fontWeight: "500",
                color: colors.secondaryText,
                marginBottom: 10,
              }}
            >
              Hasil Pencarian
            </Text>
            <Text style={{ color: "#BCBBC2" }}>Pencarian tidak ditemukan</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: gap.statusBarHeight + 15,
    paddingHorizontal: 15,
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    color: colors.secondaryText,
    borderColor: colors.secondaryText,
    borderBottomWidth: 1,
  },
  searchInput: {
    marginHorizontal: 15,
    flex: 1,
  },
  searchedContainer: {
    marginVertical: 20,
  },
  searchResultText: {
    color: "#BCBBC2",
    marginBottom: 10,
  },
  resultNotFoundContainer: {},
});
