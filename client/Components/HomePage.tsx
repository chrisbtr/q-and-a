import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { fetchAllQuestions, reset } from "../features/questionsSlice";
import QuestionCard from "./QuestionCard";
import QuestionModal from "./QuestionModal";

const HomePage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { questions, categories } = useSelector((state: RootState) => ({
    questions: state.questions.questions,
    categories: state.categories.categories,
  }));

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState("");

  const selectedQuestion = questions.find(
    (question) => String(question.id) === selectedQuestionId
  );

  const onPressHandler = (cardId: string) => {
    setIsModalOpen(true);
    setSelectedQuestionId(cardId);
  };

  React.useEffect(() => {
    dispatch(reset());
    dispatch(fetchAllQuestions());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {questions.map(({ id, subject, categoryCode, content, answer }) => (
          <QuestionCard
            key={id}
            id={id}
            subject={subject}
            category={getCategoryName(categoryCode) || ""}
            question={content}
            answer={answer}
            onPress={onPressHandler}
          />
        ))}
      </ScrollView>
      {selectedQuestion ? (
        <Portal>
          <QuestionModal
            subject={selectedQuestion.subject || ""}
            category={getCategoryName(selectedQuestion.categoryCode) || ""}
            question={selectedQuestion.content}
            answer={selectedQuestion.answer || ""}
            ModalProps={{
              visible: isModalOpen,
              onDismiss: () => setIsModalOpen(false),
            }}
          />
        </Portal>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default HomePage;
