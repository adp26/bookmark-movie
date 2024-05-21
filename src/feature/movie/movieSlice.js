import { createSlice } from "@reduxjs/toolkit";
import { getGenres, getLanguages, getMovies } from "../../services/apiMovie";

const initialState = {
  addState: 0,
  movie: [],
  manipulateMovie: [],
  genre: [],
  language: [],
  year: [],
  currentPage: 1,
  totalPage: 0,
  sortBy: "default",
  filterByGenre: [],
  filterByRating: null,
  filterByRelease: null,
  searchQuery: "",
  loading: false,
  status: "idle",
  error: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.movie = state.movie.map((val) =>
        val.id === action.payload.id
          ? { ...val, bookmark: !action.payload.bookmark }
          : val
      );

      state.manipulateMovie = state.movie;
    },
    searchItem(state, action) {
      const search = action.payload.toLowerCase();
      state.loading = true;

      state.searchQuery = action.payload;
      state.manipulateMovie = applySortAndFilter(state);

      state.loading = false;
    },
    sortItem: (state, action) => {
      state.sortBy =
        state.sortBy === action.payload ? "default" : action.payload;
      state.manipulateMovie = applySortAndFilter(state);
    },
    filterGenre: (state, action) => {
      const index = state.filterByGenre.indexOf(action.payload);

      if (index >= 0) {
        state.filterByGenre.splice(index, 1);
      } else {
        state.filterByGenre.push(action.payload);
      }

      state.manipulateMovie = applySortAndFilter(state);
    },
    filterRating: (state, action) => {
      state.filterByRating =
        state.filterByRating === action.payload ? null : action.payload;

      state.manipulateMovie = applySortAndFilter(state);
    },
    filterRelease: (state, action) => {
      state.filterByRelease =
        state.filterByRelease === action.payload ? null : action.payload;

      state.manipulateMovie = applySortAndFilter(state);
    },
    resetSortFilter: (state) => {
      state.filterByGenre = [];
      state.filterByRating = null;
      state.filterByRelease = null;
      state.manipulateMovie = applySortAndFilter(state);
    },

    addItem(state, action) {
      state.movie.unshift(action.payload);
      state.manipulateMovie.unshift(action.payload);
    },
    updateItem(state, action) {
      state.movie = state.movie.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.manipulateMovie = state.movie;
    },
    deleteItem(state, action) {
      state.movie = state.movie.filter((item) => item.id !== action.payload);
      state.manipulateMovie = state.movie;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.addState < 3) {
          state.addState += 1;
          state.movie = [...state.movie, ...action.payload].map(
            (data, index) => {
              return { ...data, id: index, bookmark: false };
            }
          );
          state.manipulateMovie = state.movie;
        }
        state.year = state.movie.map((val) => val.release_date.substring(0, 4));
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //genres
      .addCase(getGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genre = action.payload;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //languages
      .addCase(getLanguages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.language = action.payload;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const applySortAndFilter = (state) => {
  let data = state.movie;

  if (state.searchQuery) {
    data = data.filter((item) =>
      item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  if (state.filterByGenre.length > 0) {
    data = data.filter((item) =>
      state.filterByGenre.every((filter) => item.genre_ids.includes(filter))
    );
  }
  if (state.filterByRating) {
    data = data.filter((item) => item.vote_average >= state.filterByRating);
  }
  if (state.filterByRelease) {
    data = data.filter((item) =>
      item.release_date.includes(state.filterByRelease)
    );
  }

  if (state.sortBy !== "default") {
    data = data.slice().sort((a, b) => {
      if (state.sortBy === "(A-Z)") {
        return a.title.localeCompare(b.title);
      } else if (state.sortBy === "(Z-A)") {
        return b.title.localeCompare(a.title);
      } else if (state.sortBy === "rating") {
        return b.vote_average - a.vote_average;
      }
      return 0;
    });
  }

  return data;
};

export const {
  addBookmark,
  searchItem,
  sortItem,
  filterGenre,
  filterRelease,
  filterRating,
  resetSortFilter,
  resetItem,
  addItem,
  updateItem,
  deleteItem,
} = movieSlice.actions;

export default movieSlice.reducer;
export const getLoading = (state) => state.loading;
export const getMovie = (state) => state.manipulateMovie;

export const getTotalMovie = (state) => state.movie.length;
export const getGenre = (state) => state.genre;
export const getLanguage = (state) => state.language;
export const getYear = (state) => state.year;
export const getMovieById = (id) => (state) =>
  state.manipulateMovie.find((val) => val.id === parseInt(id));
