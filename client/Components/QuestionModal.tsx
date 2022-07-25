import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Paragraph, Title } from "react-native-paper";

import { Answer } from '../api/questions';

interface QuestionModalProps {
  subject: string;
  category: string;
  question: string;
  answers: Answer[];
  ModalProps: Omit<React.ComponentProps<typeof Modal>, 'children'>;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  subject,
  category,
  question,
  answers,
  ModalProps,
}) => {
  const answer = answers[0]?.content || '';

  return (
    <Modal contentContainerStyle={styles.modal} {...ModalProps}>
      <Title>Question</Title>
      <Paragraph>{question}</Paragraph>
      <Title>Answer</Title>
      <Paragraph>{answer}</Paragraph>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default QuestionModal;
