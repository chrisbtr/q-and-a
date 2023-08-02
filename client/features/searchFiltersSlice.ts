import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchFilters = {
  categoryCode?: string;
};

export type SearchFiltersState = {
  filters: SearchFilters;
};

export const initialState: SearchFiltersState = {
  filters: {},
};

export const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    reset: () => initialState,
    setSearchFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = {
        ...state.filters,
        categoryCode: action.payload.categoryCode,
      };
    },
  },
});

export const { reset, setSearchFilters } = searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
