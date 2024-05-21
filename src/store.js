import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./feature/movie/movieSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "movie",
  storage,
};

const persistedMovieReducer = persistReducer(persistConfig, movieReducer);

const store = configureStore({
  reducer: persistedMovieReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
