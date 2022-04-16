import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import questionsApi, { Question } from "../api/questions";

export const fetchAllQuestions = createAsyncThunk(
  "questions/FetchAll",
  async (categoryCode?: string) => {
    const response = await questionsApi.getAll({ categoryCode });
    // TODO: Remove map when an API endpoint is made for question with answer
    const questions = response.data.map((question) => ({
      ...question,
      categoryCode: question.category_code,
      answer: "",
    }));

    return questions;
  }
);

export type QuestionsState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  questions: Question[];
};

export const initialState: QuestionsState = {
  loading: "idle",
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllQuestions.fulfilled, (state, { payload }) => {
      state.questions = payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchAllQuestions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllQuestions.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { reset } = questionsSlice.actions;

export default questionsSlice.reducer;
