import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useScrollToTop } from "@react-navigation/native";

import { RootState } from "../store";
import { MainTabsParamList } from "./Main";
import CategoryCard from "../Components/CategoryCard";

export type AllCategoriesPageProps = NativeStackScreenProps<
  MainTabsParamList,
  "AllCategories"
>;

const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({
  navigation,
}) => {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  return (
    <ScrollView style={styles.container} ref={ref}>
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.name}
          source={{ uri: "https://picsum.photos/700" }}
          viewCategoryHandler={() => {
            navigation.navigate("AllCategories", { screen: 'Category', params: { category } });
          }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AllCategoriesPage;
