import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter((movie) => movie.id !== action.payload);
        state.categories = state.categories.filter((movie) => movie.id !== action.payload);
      })
      .addCase(fetchCategoryMovies.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      }).addMatcher((action) => action.type.endsWith("/pending"), (state, action) => {
        console.log(action);
        state.status = "loading";
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:5000/api/movies");
  return response.data;
});

export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id) => {
  await axios.delete(`http://localhost:5000/api/deleteMovie/${id}`);
  return id;
});

export const fetchCategoryMovies = createAsyncThunk("movies/fetchCategories", async (item) => {
  const response = await axios.get(`http://localhost:5000/api/getCategoryWiseData/${item}`);
  return response.data;
});
