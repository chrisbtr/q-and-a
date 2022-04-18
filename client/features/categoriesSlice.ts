import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoriesApi, { Category } from "../api/categories";

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await categoriesApi.getAll();
    return response.data;
  }
);

const fetchCategoryByCode = createAsyncThunk(
  "categories/fetchByCode",
  async (code: string) => {
    const response = await categoriesApi.get(code);
    return response.data;
  }
);

export type CategoriesState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  categories: Category[];
};

export const initialState: CategoriesState = {
  loading: "idle",
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { reset } = categoriesSlice.actions;

export default categoriesSlice.reducer;
