import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { Appbar, IconButton, Button, Subheading, useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootState } from "../store";
import { fetchAllCategories, reset } from "../features/categoriesSlice";
import AllCategoriesPage from "./AllCategoriesPage";
import HomePage from "./HomePage";
import { Category } from "../api/categories";
import { Question } from "../api/questions";
import AllQuestionsPage from "./AllQuestionsPage";
import StackHeader from "../Components/StackHeader";
import CategoryPage from "./CategoryPage";
import QuestionPage from "./QuestionPage";
import SearchPage from "./SearchPage";

export type HomeStackParamList = {
  HomePage: undefined;
  AllQuestions: undefined;
  Search: {
    query: string,
  };
  Category: {
    category: Category;
  };
  Question: {
    question: Question;
  };
};

export type AllCategoriesStackParamList = {
  Categories: undefined;
  Category: {
    category: Category;
  };
  Question: {
    question: Question;
  };
};

export type AllQuestionsStackParamList = {
  Questions: undefined;
  Question: {
    question: Question;
  };
};

export type MainTabsParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  AddQuestion: undefined;
  AllCategories: NavigatorScreenParams<AllCategoriesStackParamList>;
  AllQuestions: NavigatorScreenParams<AllQuestionsStackParamList>;
};

const Tab = createMaterialBottomTabNavigator<MainTabsParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const AllCategoriesStack = createNativeStackNavigator<AllCategoriesStackParamList>();
const AllQuestionsStack = createNativeStackNavigator<AllQuestionsStackParamList>();

const AllQuestionsPageStack: React.FC = () => {
  const theme = useTheme();

  return (
    <AllQuestionsStack.Navigator initialRouteName="Questions" screenOptions={{
      headerBackTitle: "Back",
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTitleStyle: { ...theme.fonts.medium },
      headerTintColor: theme.colors.background,
    }}>
      <AllQuestionsStack.Screen name='Questions' component={AllQuestionsPage} />
      <AllQuestionsStack.Screen name='Question' component={QuestionPage} />
    </AllQuestionsStack.Navigator>
  );
};

const HomePageStack: React.FC = () => {
  const theme = useTheme();

  return (
    <HomeStack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTitleStyle: { ...theme.fonts.medium },
        headerTintColor: theme.colors.background,
        //header: (props) => <StackHeader {...props} />,
      }}
    // screenOptions={{ header: (props) => <StackHeader {...props} /> }}
    >
      <HomeStack.Screen
        name="HomePage"
        options={{
          title: "Home",
          header: (props) => <StackHeader {...props} />
        }}
        component={HomePage}
      />
      <HomeStack.Screen
        name="Search"
        options={{
          title: "Search",
          header: (props) => <StackHeader {...props} />
        }}
        component={SearchPage}
      />
      <HomeStack.Screen
        name='Question'
        options={{
          title: "Question",
          headerTitle: '',
        }}
        component={QuestionPage}
      />
      <HomeStack.Screen
        name='Category'
        options={{
          title: "Category",
          headerTitle: '',
        }}
        component={CategoryPage}
      />
    </HomeStack.Navigator>
  );
};

const AllCategoriesPageStack: React.FC<AllCategoriesStackParamList> = () => {
  const theme = useTheme();

  return (
    <AllCategoriesStack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTitleStyle: { ...theme.fonts.medium },
        headerTintColor: theme.colors.background,
        //header: (props) => <StackHeader {...props} />,
      }}
    >
      <AllCategoriesStack.Screen
        name="Categories"
        component={AllCategoriesPage}
        options={{
          title: "Categories",
          //header: (props) => <StackHeader {...props} />,
        }}
      />
      <AllCategoriesStack.Screen
        name="Category"
        options={{
          title: "Category",
          headerTitle: '',
        }}
        component={CategoryPage}
      />
      <AllCategoriesStack.Screen
        name='Question'
        options={{
          title: "Question",
          headerTitle: '',
        }}
        component={QuestionPage}
      />
    </AllCategoriesStack.Navigator>
  );
};

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const handleGetCategories = () => {
    dispatch(reset());
    dispatch(fetchAllCategories());
  };

  React.useEffect(() => {
    handleGetCategories();
  }, []);

  const loading = useSelector((state: RootState) => state.categories.loading);

  if (loading === "idle") {
    handleGetCategories();
  }

  if (loading === "failed") {
    return (
      <>
        <Appbar.Header>
          <Appbar.Content title="" />
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
          <IconButton icon="cloud-off-outline" />
          <Subheading>No connection</Subheading>
          <Button icon="restart" onPress={handleGetCategories}>
            Retry
          </Button>
        </SafeAreaView>
      </>
    );
  }

  if (loading === "succeeded") {
    return (
      <>
        <Tab.Navigator initialRouteName="Home" shifting>
          <Tab.Screen
            name="Home"
            component={HomePageStack}
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="AddQuestion"
            component={AddQuestionModal}
            options={{
              title: "Add Question",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          /> */}
          <Tab.Screen
            name="AllQuestions"
            component={AllQuestionsPageStack}
            options={{
              title: "Questions",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="compass" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AllCategories"
            component={AllCategoriesPageStack}
            options={{
              title: "Categories",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="menu" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;
