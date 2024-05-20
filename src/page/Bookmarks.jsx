
import { useSelector } from "react-redux";
import Movie from "./Movie";
import { getMovie } from "../feature/movie/movieSlice";
import NotFound from "../ui/NotFound";
import BackButton from "../ui/icon/BackButton";
import { useNavigate } from "react-router";


function Bookmarks() {
  const navigate = useNavigate();
  const movie = useSelector(getMovie).filter((val) => val.bookmark);

  return <div className="dark:bg-slate-900 bg-slate-300 flex justify-start items-center flex-col
  px-12">

    <div className="self-start pt-5 text-slate-700 dark:text-white gap-3 flex flex-row cursor-pointer" onClick={() => navigate('/movies')}>

      <BackButton />
      Back
    </div>

    {movie.length == 0 && <div className="w-full h-full items-center flex justify-center">

      < NotFound />
    </div>
    }

    <div className="text-slate-200 flex flex-row justify-center mt-16 w-full">

      <div className="flex flex-col justify-center items-center gap-4">
        {movie.length > 0 && <div className="text-slate-700 dark:text-white">You have {movie.length.toString()} movie in bookmark </div>}


        <div className="flex flex-wrap gap-6">

          {movie.map(mov => <Movie key={mov.id} item={mov} />)

          }
        </div>

        <div className="h-20 pt-10 flex justify-center">

        </div>

      </div>
    </div>
  </div >;
}


export default Bookmarks;
