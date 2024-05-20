import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_MOVIES_URL = "https://api.themoviedb.org/3/discover/movie";
const API_LANGUAGES_URL =
  "https://api.themoviedb.org/3/configuration/languages";
const API_GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWY5YjkwZWRjNTU2YmM0YWEwMWEzOGRiNTc2N2ZhZSIsInN1YiI6IjY2NDFmZTJmNzZlNWVjMWFlNDk2ODM5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Sr52-fwLdNVIW5XtBa0938fLkzeoAHPlcHamotg7sI",
  },
};

export const getMovies = createAsyncThunk(
  "movie/getAlldata",
  async function (pages) {
    if (typeof pages != "number") return 0;

    const res = axios
      .get(`${API_MOVIES_URL}?page=${pages}`, options)
      .then((res) => {
        return res.data.results;
      })
      .catch(function (error) {
        if (error.response) {
          throw Error(error.response.data.status_message);
        }
      });

    return res;
  }
);
export const getGenres = createAsyncThunk("movie/genres", async function () {
  const res = axios
    .get(`${API_GENRES_URL}`, options)
    .then((res) => {
      return res.data.genres;
    })
    .catch(function (error) {
      if (error.response) {
        throw Error(error.response.data.status_message);
      }
    });

  return res;
});

export const getLanguages = createAsyncThunk(
  "movie/languages",
  async function () {
    const res = axios
      .get(`${API_LANGUAGES_URL}`, options)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          throw Error(error.response.data.status_message);
        }
      });

    return res;
  }
);
