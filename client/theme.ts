import { DefaultTheme } from "react-native-paper";

export type Theme = typeof DefaultTheme;

export const theme: Theme = {
  ...DefaultTheme,
  // NOTE: change this to `adaptive` if you want to use dark mode
  mode: "exact",
  colors: {
    ...DefaultTheme.colors,
    primary: "#007AFF",
    backdrop: "#F8F9FF",
  },
};

export default theme;
