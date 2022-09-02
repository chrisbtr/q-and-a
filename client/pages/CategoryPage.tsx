import React from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, Button } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AllCategoriesStackParamList } from "./Main";
import QuestionList from "../Components/QuestionList";
import { Question } from "../api/questions";

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

  const handleQuestionPress = (question: Question) => {
    navigation.navigate('Question', { question });
  };

  if (category.questions.length) {
    return <QuestionList getAllQuestionParams={{ categoryCode: category.code }} onQuestionPress={handleQuestionPress} />;
  }

  return (
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
