import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";

import { RootState } from "../store";
import { MainTabsParamList } from "./main";
import QuestionCard from "../Components/QuestionCard";
import questionsApi, { Question } from "../api/questions";

const TAKE_AMOUNT = 15;

const AllQuestionsPage: React.FC<NativeStackScreenProps<MainTabsParamList, "AllQuestions">> = ({ navigation }) => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [allQuestionsCount, setAllQuestionsCount] = React.useState<number | null>(null);
  const [skipCount, setSkipCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { categories } = useSelector((state: RootState) => ({
    categories: state.categories.categories,
  }));

  const getQuestions = () => {
    if (allQuestionsCount === null || allQuestionsCount > skipCount) {
      setIsLoading(true);
      questionsApi.getAll({ take: TAKE_AMOUNT, skip: skipCount }).then(res => {
        console.log(skipCount)
        setAllQuestionsCount(res.data.allQuestionsCount);
        setQuestions([...questions, ...res.data.questions]);
        setIsLoading(false);
      });
    }
  };

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

  const renderQuestion: React.FC<renderQuestionProps> = ({ item }) => {
    return (
      <QuestionCard
        key={item.id}
        id={item.id}
        subject={item.title}
        category={getCategoryName(item.categoryCode) || ""}
        question={item.content}
        answers={item.answers}
        onPress={() => {
          navigation.navigate('AllQuestions', { screen: 'Question', params: { question: item } })
        }}
      />
    );
  };

  React.useEffect(() => {
    getQuestions()
  }, [skipCount, allQuestionsCount]);



  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  return (
    <FlatList
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

export default AllQuestionsPage;
