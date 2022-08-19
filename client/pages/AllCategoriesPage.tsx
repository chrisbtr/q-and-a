import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

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
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AllCategoriesPage;
