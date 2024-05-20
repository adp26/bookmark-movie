import { useNavigate, useParams } from "react-router";
import OptionButton from "../ui/icon/optionButton";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, getGenre, getMovieById } from "../feature/movie/movieSlice";
import Plus from "../ui/icon/Plus";
import BackButton from "../ui/icon/BackButton";


function DetailMovie() {

    const { idmovie } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genres = useSelector(getGenre);


    const movie = useSelector(getMovieById(idmovie));

    const { genre_ids, id, overview, poster_path, backdrop_path, release_date, title, vote_average, vote_count, bookmark } = movie;

    function convertIdGenreToText(idGenre) {
        if (!idGenre) return;
        return genres.find(value => value.id === idGenre).name;
    }
    function convertDateToYear(dateString) {
        // Memastikan format input dateString adalah 'YYYY-MM-DD'
        if (dateString && dateString.length >= 4) {
            return dateString.substring(0, 4);
        }
        return null; // Atau bisa mengembalikan nilai default atau pesan kesalahan
    }
    function handleUrlBackrop(url) {
        if (url.slice(0, 5) === 'https') {
            return { backgroundImage: `url('${url}}')` }
        }
        return { backgroundImage: `url('https://image.tmdb.org/t/p/original/${url}')` };
        //
    };


    return (<div className="
            text-slate-100
            relative
            block
            z-10
            bg-cover
            bg-no-repeat
            bg-center
            before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-slate-200
            before:to-slate-800
            dark:before:from-black
            dark:before:to-black/50
            before:opacity-50
            before:z-[-5]
           
            " style={handleUrlBackrop(backdrop_path)}>


        <div className="self-start pt-5 ml-5 sm:ml-20 text-white gap-3 flex flex-row cursor-pointer" onClick={() => navigate('/movies')}>

            <BackButton custom={true} />
            Back
        </div>

        <div className="flex flex-col mb-10 md:flex-row items-start mt-10  md:mt-20 md:mx-20">
            <img className="ml-20  object-cover md:object-fill h-72 w-64 lg:h-3/5 lg:w-80 rounded-lg shadow-xl dark:shadow-gray-800" src={poster_path.slice(0, 5) == 'https' ? poster_path : `https://image.tmdb.org/t/p/w500${poster_path}`} alt="Poster of [object Object]" />
            <div className="flex flex-col ml-20 mt-10 md:mt-0 space-y-5">
                <div className="inline-flex items-start lg:items-center gap-4">

                    <p className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">{title}</p>
                    <OptionButton id={id} />
                </div>
                <div className="flex flex-row space-x-2 items-center sm:items-start md:items-center">
                    {genre_ids && genre_ids.map(genre =>
                        <span key={genre} className="inline-flex items-center border-white border rounded-lg  px-2 py-1 text-l font-medium text-slate-100 text-xs md:text-md lg:text-lg ring-1 ring-inset ring-purple-700/10">{convertIdGenreToText(genre)}</span>
                    )}


                    <span className="text-xs md:text-md lg:text-xl"> • {convertDateToYear(release_date)}</span>
                </div>
                <p className="pe-10  md:pr-24 text-lg sm:text-xl lg:text-2xl">{overview}</p>
                {!bookmark && <div onClick={() => dispatch(addBookmark({ id, bookmark }))} className=" flex flex-row bg-indigo-500 w-40 rounded-md p-2 gap-x-1 justify-center items-center cursor-pointer">

                    <button className="">Add bookmark </button>
                    <Plus />
                </div>}
            </div>

        </div>
    </div>);


}
export default DetailMovie;