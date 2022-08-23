import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import theme from "../theme";

export interface StackHeaderProps extends NativeStackHeaderProps {
  showSearch?: boolean;
}

const StackHeader: React.FC<StackHeaderProps> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const hasBackButton = navigation.canGoBack();

  return (
    <Appbar.Header>
      {hasBackButton ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <Searchbar
        style={styles.searchBar}
        value={searchQuery}
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={() => {
          navigation.push('Search', { query: searchQuery })
        }}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginLeft: 12,
    width: "80%",
    height: "55%",
    shadowOpacity: 0,
    backgroundColor: theme.colors.background,
  },
});

export default StackHeader;
