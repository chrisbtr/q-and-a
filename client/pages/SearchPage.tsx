import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Text, Button } from "react-native-paper";

import { HomeStackParamList } from "./Main";
import questionsApi, { Question } from "../api/questions";
import theme from "../theme";
import QuestionList from "../Components/QuestionList";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export type SearchPageProps = NativeStackScreenProps<
  HomeStackParamList,
  "Search"
>;

const SearchPage: React.FC<SearchPageProps> = ({ navigation, route }) => {
  const { categories } = useSelector((state: RootState) => ({
    categories: state.categories.categories,
  }));

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  const [pending, setPending] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const { query, categoryCode } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: query });
  }, []);

  const handleQuestionPress = (question: Question) => {
    navigation.navigate("Question", { question });
  };

  React.useEffect(() => {
    questionsApi
      .getAll({
        query,
        categoryCode: categoryCode === "" ? undefined : categoryCode,
      })
      .then((res) => {
        if (res.status === 200) {
          setQuestions(res.data.questions);
          return;
        }
        setFailed(true);
      })
      .catch(() => {
        setFailed(true);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  if (pending) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  if (failed) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>An error occurred</Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </View>
    );
  }
  if (questions.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.centeredText}>Could not find a match for:</Text>
        <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
          {route.params.query}
        </Text>
      </View>
    );
  }
  return (
    <QuestionList
      getAllQuestionParams={{ query, categoryCode }}
      onQuestionPress={handleQuestionPress}
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    color: theme.colors.error,
    fontSize: 16,
  },
  centeredText: {
    textAlign: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});

export default SearchPage;
