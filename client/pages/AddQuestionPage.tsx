import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button, TextInput, Chip, Subheading } from "react-native-paper";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { MainTabsParamList } from "./Main";
import { RootState } from "../store";
import StackHeader from "../Components/StackHeader";

export type AddQuestionStackParamList = {
  AddQuestionPage: undefined;
};

export type HomePageStackProps = MaterialBottomTabScreenProps<
  MainTabsParamList,
  "AddQuestion"
>;

export type AddQuestionProps = NativeStackScreenProps<
  AddQuestionStackParamList,
  "AddQuestionPage"
>;

const Stack = createNativeStackNavigator();

const HomePageStack: React.FC<HomePageStackProps> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddQuestionPage"
      options={{
        title: "Add Questions",
        header: (props) => <StackHeader showSearch={false} {...props} />,
      }}
      component={AddQuestionPage}
    ></Stack.Screen>
  </Stack.Navigator>
);

export const AddQuestionPage: React.FC<AddQuestionProps> = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [subjectText, setSubjectText] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(
    categories[0].code
  );

  const onChangeSubjectText = (text: string) => {
    setSubjectText(text);
  };
  const onChangeQuestionText = (text: string) => {
    setQuestionText(text);
  };

  const handleCategoryChange = (categoryCode: string) => {
    return () =>
      setSelectedCategory(
        categories.find((category) => category.code === categoryCode)?.code ||
          selectedCategory
      );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          autoComplete="on"
          mode="outlined"
          label="Question Subject"
          value={subjectText}
          onChangeText={onChangeSubjectText}
        />
        <TextInput
          autoComplete="on"
          mode="outlined"
          label="Your Question"
          value={questionText}
          onChangeText={onChangeQuestionText}
          multiline={true}
          numberOfLines={10}
        />
        <View>
          <Subheading style={styles.categorySelectSubheading}>
            Select A Category
          </Subheading>
          <View style={styles.categorySelectContainer}>
            {categories.map((category) => (
              <Chip
                key={category.code}
                mode="outlined"
                onPress={handleCategoryChange(category.code)}
                selected={category.code === selectedCategory}
              >
                {category.name}
              </Chip>
            ))}
          </View>
        </View>
      </View>

      <Button>Submit</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
    padding: 20,
  },
  categorySelectSubheading: {
    alignSelf: "center",
  },
  categorySelectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
});

export default HomePageStack;
