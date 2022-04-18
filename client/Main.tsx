import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { Appbar, IconButton, Button, Subheading } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { RootState } from "./store";
import { fetchAllCategories, reset } from "./features/categoriesSlice";
import AllCategoriesPage from "./Components/AllCategoriesPage";
import HomePage from "./Components/HomePage";
import AddQuestionModal from "./Components/AddQuestionPage";

export type MainTabsParamList = {
  Home: undefined;
  AddQuestion: undefined;
  AllCategories: undefined;
};

const Tab = createMaterialBottomTabNavigator<MainTabsParamList>();

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

  const [currentRouteName, setCurrentRouteName] = React.useState("Home");

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
            listeners={{ tabPress: () => setCurrentRouteName("Home") }}
            name="Home"
            component={HomePage}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AddQuestion"
            listeners={{ tabPress: () => setCurrentRouteName("Add Question") }}
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
          />
          <Tab.Screen
            name="AllCategories"
            listeners={{
              tabPress: () => setCurrentRouteName("AllCategories"),
            }}
            component={AllCategoriesPage}
            options={{
              title: "All Categories",
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
