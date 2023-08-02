import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./features/categoriesSlice";
import QuestionsReducer from "./features/questionsSlice";
import searchFiltersReducer from "./features/searchFiltersSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questions: QuestionsReducer,
    searchFilters: searchFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
