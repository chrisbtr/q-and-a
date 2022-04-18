import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { Category } from "../api/categories";
import { MainTabsParamList } from "../Main";
import CategoryPage from "./CategoryPage";
import CategoryCard from "./CategoryCard";

export type AllCategoriesParamList = {
  Categories: undefined;
  Category: {
    category: Category;
  };
};

export type AllCategoriesPageProps = NativeStackScreenProps<
  AllCategoriesParamList,
  "Categories"
>;

export type AllCategoriesPageStackProps = MaterialBottomTabNavigationProp<
  MainTabsParamList,
  "AddQuestion"
>;

const Stack = createNativeStackNavigator<AllCategoriesParamList>();

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
              navigation.navigate("Category", { category });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const AllCategoriesPageStack: React.FC<AllCategoriesPageStackProps> = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTitleStyle: { ...theme.fonts.medium },
        headerTintColor: theme.colors.background,
      }}
    >
      <Stack.Screen name="Categories" component={AllCategoriesPage} />
      <Stack.Screen name="Category" component={CategoryPage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AllCategoriesPageStack;
