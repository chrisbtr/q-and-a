import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AllQuestionsStackParamList } from "./Main";
import { Paragraph, Subheading, Title } from "react-native-paper";

type QuestionPageProps = NativeStackScreenProps<AllQuestionsStackParamList, 'Question'>

const QuestionPage: React.FC<QuestionPageProps> = ({ route }) => {
  const question = route.params.question;
  return (
    <SafeAreaView>
      <View>
        <Title>{question.subject}</Title>
        <Subheading style={styles.categorySubheading}>{question.categoryCode}</Subheading>
        <Subheading style={styles.subheading}>Question</Subheading>
        <Paragraph>{question.content}</Paragraph>
        <Subheading style={styles.subheading}>Answer</Subheading>
        <Paragraph>{question.answers?.[0]?.content || ''}</Paragraph>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
  subheading: {
    textAlign: 'center',
  },
  categorySubheading: {
    marginBottom: 12,
    fontSize: 15,
  },
});

export default QuestionPage;