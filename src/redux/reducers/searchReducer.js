import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchString",
  initialState: {
    searchString: "",
  },
  reducers: {
    updateSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { updateSearchString } = searchSlice.actions;
export default searchSlice.reducer;
