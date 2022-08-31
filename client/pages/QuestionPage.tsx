import React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Paragraph, Title, Card } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AllQuestionsStackParamList } from "./Main";
import questionsApi from "../api/questions";

type QuestionPageProps = NativeStackScreenProps<AllQuestionsStackParamList, 'Question'>

const QuestionPage: React.FC<QuestionPageProps> = ({ route }) => {
  const [question, setQuestion] = React.useState(route.params.question);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);

    questionsApi.get(question.id)
      .then(res => {
        setQuestion(res.data)
      }
      ).finally(() => {
        setRefreshing(false)
      });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Card style={styles.card} mode="outlined">
        <Card.Title title={question.subject} subtitle={question.categoryCode} titleNumberOfLines={10} />
        <Card.Content>
          <Paragraph>{question.content}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Title>Answer</Title>
          <Paragraph>{question.answers?.[0]?.content || ''}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    borderRadius: 0,
  },
});

export default QuestionPage;