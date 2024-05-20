
import { Children, useEffect } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { getGenres, getLanguages, getMovies } from "../services/apiMovie";
import { resetItem } from "../feature/movie/movieSlice";

function AppLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    //get movie page 1-3
    dispatch(resetItem());
    dispatch(getMovies(1));
    dispatch(getMovies(2));
    dispatch(getMovies(3));
    dispatch(getGenres());
    dispatch(getLanguages());
  }, [])

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;
