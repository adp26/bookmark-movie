import Movies from "./page/Movies";
import { BrowserRouter, Navigate, Route, Router, Routes, } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import DetailMovie from "./page/DetailMovie";
import Bookmarks from "./page/Bookmarks";
import UpdateMovie from "./feature/movie/UpdateMovie";
import CreateMovie from "./feature/movie/create/CreateMovie";



function App() {
  document.documentElement.classList.add('dark');

  return <BrowserRouter>
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
  </BrowserRouter>


}

export default App;
