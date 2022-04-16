import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import theme from "./theme";
import store from "./store";
import Main from "./Main";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
