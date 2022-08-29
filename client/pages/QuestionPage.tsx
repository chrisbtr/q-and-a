import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Paragraph, Title, Card } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AllQuestionsStackParamList } from "./Main";

type QuestionPageProps = NativeStackScreenProps<AllQuestionsStackParamList, 'Question'>

const QuestionPage: React.FC<QuestionPageProps> = ({ route }) => {
  const question = route.params.question;

  return (
    <ScrollView>
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