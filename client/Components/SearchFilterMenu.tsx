import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { Category } from "../api/categories";
import { SearchFilters } from "../features/searchFiltersSlice";

export interface SearchFilterMenuProps {
  menuProps?: React.ComponentProps<typeof Menu>;
  searchFilters: SearchFilters;
  categories: Category[];
  handleFilterChange: (categoryCode: string) => void;
}

const SearchFilterMenu: React.FC<SearchFilterMenuProps> = ({
  menuProps = {},
  searchFilters,
  categories,
  handleFilterChange,
}) => {
  const [visible, setVisible] = React.useState(false);

  const handleMenuItemPress = (categoryCode: string) => {
    if (searchFilters.categoryCode === categoryCode) {
      handleFilterChange("");
    } else {
      handleFilterChange(categoryCode);
    }
    closeMenu();
  };

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <View style={styles.menuViewStyle}>
      <Menu
        {...menuProps}
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={styles.menuContentStyle}
        style={styles.menuStyle}
        anchor={
          <Button icon="filter" onPress={openMenu} color="white">
            filters
          </Button>
        }
      >
        {categories.map((category) => (
          <Menu.Item
            key={category.code}
            title={category.name}
            icon={searchFilters.categoryCode === category.code ? "check" : ""}
            onPress={() => handleMenuItemPress(category.code)}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuViewStyle: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  menuContentStyle: {
    borderRadius: 15,
  },
  menuStyle: {
    paddingTop: 30,
  },
});

export default SearchFilterMenu;
