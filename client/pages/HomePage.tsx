import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { Portal, Subheading, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { RootState } from "../store";
import { MainTabsParamList } from "./Main";
import { fetchAllQuestions } from "../features/questionsSlice";
import StackHeader from "../Components/StackHeader";
import QuestionCard from "../Components/QuestionCard";
import QuestionModal from "../Components/QuestionModal";
import CategoryCard from "../Components/CategoryCard";

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
          header: (props) => <StackHeader {...props} />,
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
    // TODO: Make this fetch the questions by date
    dispatch(fetchAllQuestions());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <Subheading style={styles.subheading}>New Questions</Subheading>
          <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {questions.map(
                ({ id, subject, categoryCode, content, answer }) => (
                  <QuestionCard
                    key={id}
                    id={id}
                    subject={subject}
                    category={getCategoryName(categoryCode) || ""}
                    question={content}
                    answer={answer}
                    onPress={onPressHandler}
                  />
                )
              )}
            </View>
            <Button style={{ alignSelf: "center" }}>View More</Button>
          </ScrollView>

          <Subheading style={styles.subheading}>Categories</Subheading>
          {categories.map((category) => (
            <CategoryCard
              title={category.name}
              key={`home_page_category_${category.code}`}
              source={{ uri: "https://picsum.photos/700" }}
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
  searchBar: {
    width: "70%",
    height: "70%",
  },
  subheading: {
    marginTop: 5,
    marginLeft: 14,
    fontSize: 20,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default HomePageStack;
