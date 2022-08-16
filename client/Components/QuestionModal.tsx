import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Paragraph, Title, Subheading } from "react-native-paper";

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
      <Title>{subject}</Title>
      <Subheading style={styles.categorySubheading}>{category}</Subheading>
      <Subheading style={styles.subheading}>Question</Subheading>
      <Paragraph>{question}</Paragraph>
      <Subheading style={styles.subheading}>Answer</Subheading>
      <Paragraph>{answer}</Paragraph>
    </Modal>
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

export default QuestionModal;
