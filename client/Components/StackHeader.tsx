import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import theme from "../theme";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchFilters,
  reset,
  SearchFilters,
} from "../features/searchFiltersSlice";
import { RootState, AppDispatch } from "../store";
import SearchFilterMenu from "./SearchFilterMenu";

export interface StackHeaderProps extends NativeStackHeaderProps {
  showSearch?: boolean;
}

const StackHeader: React.FC<StackHeaderProps> = ({
  navigation,
  options,
  back,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { categories, searchFilters } = useSelector((state: RootState) => ({
    categories: state.categories.categories,
    searchFilters: state.searchFilters.filters,
  }));

  const dispatch = useDispatch<AppDispatch>();

  const getLastSearchQuery = () =>
    typeof options.headerTitle === "string" ? options.headerTitle : "";

  const handleSearch = (filters: SearchFilters = searchFilters) => {
    const noWhitespaceQuery = searchQuery.replace(/\s/, "");
    if (noWhitespaceQuery !== "") {
      navigation.push("Search", {
        query: searchQuery,
        categoryCode: filters.categoryCode,
      });
    }
  };

  const handleChangeFilterCategory = (categoryCode: string) => {
    dispatch(setSearchFilters({ categoryCode }));
    handleSearch({ categoryCode });
  };

  React.useEffect(() => {
    setSearchQuery(getLastSearchQuery());
  }, [options]);

  return (
    <Appbar.Header style={{ height: 85 }}>
      {back ? (
        <Appbar.BackAction
          style={{ flexDirection: "column", justifyContent: "flex-start" }}
          onPress={() => {
            dispatch(reset());
            navigation.goBack();
          }}
        />
      ) : null}

      <View style={styles.searchbarContainer}>
        <Searchbar
          style={styles.searchBar}
          value={searchQuery}
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => handleSearch()}
          onEndEditing={() => {
            setSearchQuery(getLastSearchQuery());
          }}
        />
        <SearchFilterMenu
          handleFilterChange={handleChangeFilterCategory}
          searchFilters={searchFilters}
          categories={categories}
        />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 85,
  },
  searchbarContainer: {
    flex: 1,
  },
  searchBar: {
    marginLeft: 12,
    marginRight: 12,
    // marginTop: 12,
    height: "40%",
    shadowOpacity: 0,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
  },
  filterChipBackground: {
    marginTop: 12,
    marginBottom: 6,
  },
});

export default StackHeader;
