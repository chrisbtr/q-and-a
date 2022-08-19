import React from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootState } from "../store";
import { MainTabsParamList } from "./main";
import QuestionCard from "../Components/QuestionCard";

const AllQuestionsPage: React.FC<NativeStackScreenProps<MainTabsParamList, "AllQuestions">> = ({ navigation }) => {
  const { questions, categories } = useSelector((state: RootState) => ({
    questions: state.questions.questions,
    categories: state.categories.categories,
  }));

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  return (
    <ScrollView>
      {questions.map(question => (
        <QuestionCard
          key={question.id}
          id={question.id}
          subject={question.subject}
          category={getCategoryName(question.categoryCode) || ""}
          question={question.content}
          answers={question.answers}
          onPress={() => {
            navigation.navigate('AllQuestions', { screen: 'Question', params: { question } })
          }}
        />
      ))}
    </ScrollView>
  );
};

export default AllQuestionsPage;
