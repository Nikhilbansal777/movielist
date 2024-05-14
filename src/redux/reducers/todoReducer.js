import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "flag",
  initialState: {
    flag: false,
  },
  reducers: {
      updateFlag: (state, action) => {
          console.log(state.flag)  
          state.flag = action.payload;
    }
  },
});

export const { updateFlag } = slice.actions;
export default slice.reducer
