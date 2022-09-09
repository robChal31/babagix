import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../global";
import { sortArr } from "../helpers";
import DropDownPicker from "react-native-dropdown-picker";

const HomeScreenNavigationHeader = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [screenNavigationStyle, setScreenNavigationStyle] = useState([
    { Semua: "activeNavigationHeader" },
    { Gratis: "notActiveNavigationHeader" },
    { Pinjam: "notActiveNavigationHeader" },
  ]);
  const [filterQuery, setFilterQuery] = useState("");

  const categories = props.categoryList.sort((a, b) => {
    return sortArr(a) > sortArr(b) ? 1 : -1;
  });

  useEffect(() => {
    setCategoryValueHandler();
  }, [value, filterQuery]);

  //handler
  function setCategoryValueHandler() {
    props.dataShown(filterQuery, value);
  }

  function freeOrBorrow(isFree) {
    setScreenNavigationStyle((state) => {
      return state.map((e, i) => {
        return [Object.keys(e)] == isFree
          ? { [Object.keys(e)]: "activeNavigationHeader" }
          : { [Object.keys(e)]: "notActiveNavigationHeader" };
      });
    });
    let query = isFree == "Gratis" ? 1 : isFree == "Pinjam" ? 2 : 3;
    setFilterQuery(() => {
      props.dataShown(query, value);
      return query;
    });
  }

  return (
    <View>
      <View style={styles.navigationHeader}>
        {screenNavigationStyle.map((e, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => freeOrBorrow(Object.keys(e)[0])}
              style={{ marginRight: 30 }}
            >
              <Text style={styles[e[Object.keys(e)]]}>{Object.keys(e)[0]}</Text>
            </Pressable>
          );
        })}
      </View>

      <>
        <DropDownPicker
          open={open}
          value={value}
          style={{ zIndex: 100 }}
          items={categories.map((e) => {
            return {
              label: e.category_name,
              value: e.value == "all" ? "" : e._id,
              icon: e.icon
                ? () => (
                    <Icon type="material-community" name={e.icon} size={20} />
                  )
                : null,
            };
          })}
          setOpen={setOpen}
          setValue={setValue}
          onPress={() => setCategoryValueHandler()}
        />
      </>
    </View>
  );
};

export default HomeScreenNavigationHeader;

const styles = StyleSheet.create({
  navigationHeader: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  notActiveNavigationHeader: {
    color: colors.secondaryText,
    fontWeight: "500",
    fontSize: 17,
    paddingBottom: 10,
    paddingRight: 5,
  },
  activeNavigationHeader: {
    color: colors.primaryText,
    fontWeight: "500",
    fontSize: 17,
    paddingBottom: 10,
    borderBottomColor: colors.primaryText,
    borderBottomWidth: 2,
    paddingRight: 5,
  },
  categoryContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 13,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  categoryfilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 13,
    marginLeft: 7,
    color: colors.secondaryText2,
  },
  notActiveCategoryText: {
    fontSize: 13,
    marginLeft: 7,
    color: colors.activeCategory,
  },
});
