import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import questionsApi, { Question } from "../api/questions";

export const fetchAllQuestions = createAsyncThunk(
  "questions/FetchAll",
  async () => {
    const response = await questionsApi.getAll();
    // TODO: Remove map when an API endpoint is made for question with answer
    const questions = response.data.questions.map((question) => ({
      ...question,
      answer: "",
    }));

    return questions;
  }
);

export const fetchQuestionsByCategory = createAsyncThunk(
  "questions/fetchByCategory",
  async (categoryCode: string) => {
    const response = await questionsApi.getAll({ categoryCode });
    // TODO: Remove map when an API endpoint is made for question with answer
    const questions = response.data.questions.map((question) => ({
      ...question,
      answer: "",
    }));

    return questions;
  }
);

export type QuestionsState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingSelectedQuestions: "idle" | "pending" | "succeeded" | "failed";
  questions: Question[];
  selectedQuestions: Question[];
};

export const initialState: QuestionsState = {
  loading: "idle",
  loadingSelectedQuestions: "idle",
  questions: [],
  selectedQuestions: [],
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

    builder.addCase(
      fetchQuestionsByCategory.fulfilled,
      (state, { payload }) => {
        state.selectedQuestions = payload;
        state.loadingSelectedQuestions = "succeeded";
      }
    );
    builder.addCase(fetchQuestionsByCategory.pending, (state) => {
      state.loadingSelectedQuestions = "pending";
    });
    builder.addCase(fetchQuestionsByCategory.rejected, (state) => {
      state.loadingSelectedQuestions = "failed";
    });
  },
});

export const { reset } = questionsSlice.actions;

export default questionsSlice.reducer;
