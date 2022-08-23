import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, Button } from 'react-native-paper';

import { HomeStackParamList } from './Main';
import questionsApi, { Question } from '../api/questions';
import theme from '../theme';
import QuestionCard from '../Components/QuestionCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
  const [questions, setQuestions] = React.useState<Question[]>([])

  const { query } = route.params;

  React.useEffect(() => {
    questionsApi.getAll({ query }).then(res => {
      if (res.status === 200) {
        setQuestions(res.data);
        return;
      }
      setFailed(true);
    }).catch(() => {
      setFailed(true);
    }).finally(() => {
      setPending(false);
    })
  }, [])

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
        <Text style={styles.centeredText}>
          Could not find a match for:
        </Text>
        <Text style={[styles.centeredText, { fontWeight: 'bold' }]}>
          {route.params.query}
        </Text>
      </View>
    );
  }
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
          onPress={() => navigation.navigate('Question', { question })}
        />
      )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: theme.colors.error,
    fontSize: 16,
  },
  centeredText: {
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    flex: 1,
  },
});

export default SearchPage;