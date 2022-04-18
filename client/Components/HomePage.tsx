import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { RootState } from "../store";
import { MainTabsParamList } from "../Main";
import { fetchAllQuestions } from "../features/questionsSlice";
import QuestionCard from "./QuestionCard";
import QuestionModal from "./QuestionModal";

export type HomePageStackParamList = {
  HomePage: undefined;
};

export type HomePageStackProps = MaterialBottomTabScreenProps<
  MainTabsParamList,
  "Home"
>;

export type HomePageProps = NativeStackScreenProps<
  HomePageStackParamList,
  "HomePage"
>;

const Stack = createNativeStackNavigator();

const HomePageStack: React.FC<HomePageStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        options={{
          title: "Home",
          header: ({ options }) => (
            <Appbar.Header>
              <Appbar.Content title={options.title} />
              <Appbar.Action icon="magnify" onPress={() => {}} />
              <Appbar.Action icon="dots-horizontal" onPress={() => {}} />
            </Appbar.Header>
          ),
        }}
        component={HomePage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const HomePage: React.FC<HomePageProps> = () => {
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
    dispatch(fetchAllQuestions());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
      </View>
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

export default HomePageStack;
