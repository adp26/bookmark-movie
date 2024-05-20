import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./feature/movie/movieSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
