import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import CategoryPage from "./CategoryPage";
import CategoryCard from "./CategoryCard";

const Stack = createNativeStackNavigator();

const AllCategoriesPage: React.FC<
  NativeStackScreenProps<AllCategoriesPrams, "Categories">
> = ({ navigation }) => {
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
            viewCategoryHandler={() =>
              navigation.navigate("Category", { categoryCode: category.code })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export type AllCategoriesPrams = {
  Categories: undefined;
  Category: {
    categoryCode: string;
  };
};

const AllCategoriesPageStack: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.background
      }}
    >
      <Stack.Screen name="Categories" component={AllCategoriesPage} />
      <Stack.Screen name="Category" component={CategoryPage} />
    </Stack.Navigator>
  );
};
export default AllCategoriesPageStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
