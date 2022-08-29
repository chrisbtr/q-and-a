import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Subheading, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useScrollToTop } from "@react-navigation/native";

import { RootState } from "../store";
import { MainTabsParamList } from "./Main";
import { fetchAllQuestions } from "../features/questionsSlice";
import QuestionCard from "../Components/QuestionCard";
import CategoryCard from "../Components/CategoryCard";

export type HomePageProps = NativeStackScreenProps<
  MainTabsParamList,
  "Home"
>;

export const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const { questions, categories } = useSelector((state: RootState) => ({
    questions: state.questions.questions,
    categories: state.categories.categories,
  }));

  const getCategoryName = (categoryCode: string) =>
    categories.find((category) => category.code === categoryCode)?.name;

  React.useEffect(() => {
    // TODO: Make this fetch the questions by date
    dispatch(fetchAllQuestions());
  }, []);

  return (
    <View style={styles.container} >
      <ScrollView ref={ref}>
        <Subheading style={styles.subheading}>Categories</Subheading>
        <ScrollView horizontal>
          {categories.map((category) => (
            <CategoryCard
              title={category.name}
              key={`home_page_category_${category.code}`}
              source={{ uri: "https://picsum.photos/700" }}
              viewCategoryHandler={() => {
                navigation.navigate('AllCategories', { screen: 'Category', params: { category } })
              }}
            />
          ))}
        </ScrollView>
        <Subheading style={styles.subheading}>New Questions</Subheading>
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            id={question.id}
            subject={question.subject}
            category={getCategoryName(question.categoryCode) || ""}
            question={question.content}
            answers={question.answers}
            onPress={() => navigation.navigate('Home', { screen: 'Question', params: { question } })}
          />
        )
        )}
        <Button
          style={{ alignSelf: "center" }}
          onPress={() => navigation.navigate("AllQuestions", { screen: 'Questions' })}
        >
          View More
        </Button>
      </ScrollView>
    </View>
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

export default HomePage;
