import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { useScrollToTop } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import { RootState } from "../store";
import QuestionCard from "../Components/QuestionCard";
import questionsApi, { Question, GetAllQuestionParams } from "../api/questions";

export type QuestionListProps = {
  onQuestionPress: (question: Question) => void;
  getAllQuestionParams: Omit<GetAllQuestionParams, "take" | "skip">;
};

const TAKE_AMOUNT = 15;

const QuestionList: React.FC<QuestionListProps> = ({ onQuestionPress, getAllQuestionParams }) => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [allQuestionsCount, setAllQuestionsCount] = React.useState<number | null>(null);
  const [skipCount, setSkipCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const { categories } = useSelector((state: RootState) => ({
    categories: state.categories.categories,
  }));

  const getQuestions = () => {
    if (allQuestionsCount === null || allQuestionsCount > skipCount) {
      setIsLoading(true);
      questionsApi.getAll({ ...getAllQuestionParams, take: TAKE_AMOUNT, skip: skipCount }).then(res => {
        setAllQuestionsCount(res.data.allQuestionsCount);
        setQuestions([...questions, ...res.data.questions]);
        setIsLoading(false);
      });
    }
  };

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  const loadMoreQuestions = () => {
    setSkipCount(skipCount + TAKE_AMOUNT);
  };

  const handleRefresh = () => {
    setQuestions([]);
    setSkipCount(0);
    setAllQuestionsCount(null);
  };

  type renderQuestionProps = {
    item: Question;
  }

  React.useEffect(() => {
    getQuestions()
  }, [skipCount, allQuestionsCount]);

  const renderQuestion: React.FC<renderQuestionProps> = ({ item }) => {
    return (
      <QuestionCard
        key={item.id}
        id={item.id}
        subject={item.subject}
        category={getCategoryName(item.categoryCode) || ""}
        question={item.content}
        answers={item.answers}
        onPress={() => onQuestionPress(item)}
      />
    );
  };

  return (
    <FlatList
      ref={ref}
      data={questions}
      renderItem={renderQuestion}
      ListFooterComponent={
        () => isLoading ?
          <View style={styles.loaderStyles}><ActivityIndicator /></View>
          : null
      }
      onRefresh={handleRefresh}
      refreshing={isLoading}
      keyExtractor={item => String(item.id)}
      onMomentumScrollEnd={loadMoreQuestions}
    />
  );
};

const styles = StyleSheet.create({
  loaderStyles: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default QuestionList;