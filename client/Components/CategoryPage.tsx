import React from "react";
import { Text, SafeAreaView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { AllCategoriesPrams } from "./AllCategoriesPage";

const CategoryPage: React.FC = () => {
  const route = useRoute<RouteProp<AllCategoriesPrams, "Category">>();

  return (
    <SafeAreaView>
      <Text>{route.params.categoryCode}</Text>
    </SafeAreaView>
  );
};

export default CategoryPage;
