import React from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootState } from "../store";
import { HomePageStackParamList } from "./HomePage";
import QuestionCard from "../Components/QuestionCard";

const AllQuestionsPage: React.FC<
  NativeStackScreenProps<HomePageStackParamList, "AllQuestions">
> = () => {
  const { questions, categories } = useSelector((state: RootState) => ({
    questions: state.questions.questions,
    categories: state.categories.categories,
  }));

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  return (
    <ScrollView>
      {questions.map(({ id, subject, categoryCode, content, answer }) => (
        <QuestionCard
          key={id}
          id={id}
          subject={subject}
          category={getCategoryName(categoryCode) || ""}
          question={content}
          answer={answer}
        />
      ))}
    </ScrollView>
  );
};

export default AllQuestionsPage;
