import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { Subheading, Button } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AllCategoriesStackParamList } from "./Main";
import QuestionCard from "../Components/QuestionCard";

export type CategoryPageProps = NativeStackScreenProps<
  AllCategoriesStackParamList,
  "Category"
>;

const CategoryPage: React.FC<CategoryPageProps> = ({ navigation }) => {
  const route = useRoute<RouteProp<AllCategoriesStackParamList, "Category">>();
  const { category } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: route.params.category.name });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {category.questions.length ? (
          category.questions.map((question) => (
            <QuestionCard
              id={question.id}
              key={`${category.code}_${question.id}`}
              category={category.name}
              subject={question.subject}
              answers={question.answers}
              question={question.content}
            />
          ))
        ) : (
          <View style={styles.noQuestions}>
            <Subheading style={styles.subheading}>
              No questions added yet
            </Subheading>
            <Button icon="plus-box-outline">Add a question</Button>
            <Button
              icon="keyboard-backspace"
              onPress={() => navigation.goBack()}
            >
              Go Back
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noQuestions: {
    padding: 14,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  subheading: {
    textAlign: "center",
  },
});

export default CategoryPage;
