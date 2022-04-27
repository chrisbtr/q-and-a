import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Avatar, Searchbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export interface StackHeaderProps extends NativeStackHeaderProps {
  showSearch?: boolean;
}

const StackHeader: React.FC<StackHeaderProps> = ({
  showSearch = true,
  options,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  return (
    <Appbar.Header>
      <Appbar.Content title={options.title} />
      {showSearch ? (
        !searching ? (
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setSearching(true);
            }}
          />
        ) : (
          <Searchbar
            autoFocus
            style={styles.searchBar}
            value={searchQuery}
            placeholder="Search"
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={() => setSearching(false)}
            onEndEditing={() => setSearching(false)}
          />
        )
      ) : null}
      <Avatar.Text
        label="CB"
        size={32}
        style={{ backgroundColor: "gray" }}
        color="white"
      />
      <Appbar.Action icon="dots-horizontal" onPress={() => {}} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginRight: 8,
    width: "75%",
    height: "70%",
  },
});

export default StackHeader;
