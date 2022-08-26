import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import theme from "../theme";

export interface StackHeaderProps extends NativeStackHeaderProps {
  showSearch?: boolean;
}

const StackHeader: React.FC<StackHeaderProps> = ({
  navigation,
  back,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <View style={styles.searchbarContainer}>
        <Searchbar
          style={styles.searchBar}
          value={searchQuery}
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => {
            const noWhitespaceQuery = searchQuery.replace(/\s/g, '');
            if (noWhitespaceQuery !== '') {
              navigation.push('Search', { query: searchQuery });
            }
          }}
        />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    flex: 1,
  },
  searchBar: {
    marginLeft: 12,
    marginRight: 12,
    height: "60%",
    shadowOpacity: 0,
    backgroundColor: theme.colors.background,
  },
});

export default StackHeader;
