import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Paragraph, Title } from "react-native-paper";

interface QuestionModalProps {
  subject: string;
  category: string;
  question: string;
  answer: string;
  ModalProps: Omit<React.ComponentProps<typeof Modal>, 'children'>;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  subject,
  category,
  question,
  answer,
  ModalProps,
}) => {
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
