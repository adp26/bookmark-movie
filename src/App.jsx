import Movies from "./page/Movies";
import { BrowserRouter, Navigate, Route, Router, Routes, } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import DetailMovie from "./page/DetailMovie";
import Bookmarks from "./page/Bookmarks";
import UpdateMovie from "./feature/movie/UpdateMovie";
import CreateMovie from "./feature/movie/create/CreateMovie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGenres, getLanguages, getMovies } from "./services/apiMovie";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";




function App() {
  const dispatch = useDispatch();
  useEffect(() => {

    //get movie page 1-3
    dispatch(getMovies(1));
    dispatch(getMovies(2));
    dispatch(getMovies(3));
    dispatch(getGenres());
    dispatch(getLanguages());

  }, [])


  document.documentElement.classList.add('dark');

  return <BrowserRouter>
    <PersistGate loading={<p>loading</p>} persistor={persistor}>

      <AppLayout>



        <Routes >
          <Route path="/bookmark" element={<Bookmarks />} />
          <Route index element={<Navigate replace to="movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/create" element={<CreateMovie />} />
          <Route path="movies/update" element={<UpdateMovie />} />
          <Route path="movies/:idmovie" element={


            <DetailMovie />

          } />
        </Routes>

      </AppLayout>
    </PersistGate>
  </BrowserRouter >


}

export default App;
