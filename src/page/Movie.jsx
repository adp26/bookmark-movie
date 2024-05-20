import { Link } from "react-router-dom";
import BookmarkIcon from "../ui/icon/BookmarkIcon";
import Rating from "../ui/StarIcon";
import { useDispatch } from "react-redux";
import { addBookmark } from "../feature/movie/movieSlice";

function Movie({ item }) {

  const { id, poster_path, title, vote_average, vote_count, bookmark } = item;
  const dispatch = useDispatch();


  const handleBookmarkClick = (e) => {


    dispatch(addBookmark({ id, bookmark }));
  }

  return (

    <div className="text-slate-200 h-96 flex items-stretch ">

      <div className="relative flex w-56 max-w-[15rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        {/* image */}
        <div
          className="relative mx-4 mt-3 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl object-contain h-56 w-48 self-center">
          <img
            src={poster_path.slice(0, 5) == 'https' ? poster_path : `https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="ui/ux review check" loading="lazy" />

          {/* button add to bookmark */}
          <button
            className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle  text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

              <BookmarkIcon isChecked={bookmark} onClick={handleBookmarkClick} />

            </span>
          </button>

        </div>
        <div className="mt-1 mb-3">

          <Rating average={vote_average} count={vote_count} />
        </div>

        <div className="px-5 my-3">
          {/* tag title */}
          <div className="flex items-center justify-between ">
            <h5 className="block  text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {title}
            </h5>

          </div>
          {/* tag see more */}

        </div>
        <div className="max-h-full w-2 min-h-6"></div>
        <div className="px-6 pb-3 self-center">
          <Link to={`/movies/${id}`}>

            <button
              className="block w-auto select-none rounded-lg bg-indigo-500 py-3.5 px-7 text-center align-middle  text-sm font-bold titlecase text-slate-100 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              See More
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Movie;
