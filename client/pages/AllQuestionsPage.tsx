import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainTabsParamList } from "./main";
import QuestionList from "../Components/QuestionList";
import { Question } from "../api/questions";

export type AllQuestionsPageProps = NativeStackScreenProps<MainTabsParamList, "AllQuestions">;

const AllQuestionsPage: React.FC<AllQuestionsPageProps> = ({ navigation }) => {
  const handleQuestionPress = (question: Question) => {
    navigation.navigate('AllQuestions', { screen: 'Question', params: { question } });
  };

  return (
    <QuestionList
      getAllQuestionParams={{}}
      onQuestionPress={handleQuestionPress}
    />
  );
};


export default AllQuestionsPage;
