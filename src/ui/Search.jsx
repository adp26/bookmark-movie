import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchItem } from "../feature/movie/movieSlice";


function Search() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  const debouncedSearch = useCallback(
    debounce((term) => dispatch(searchItem(term)), 500),
    [dispatch]
  );
  function handleSubmit(e) {

    setQuery(e.target.value);
    // Tunda pemanggilan fungsi pencarian dengan debounce
    // if (!query) return;
    debouncedSearch(e.target.value);

  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (<div className="flex justify-center pb-5 sm:pb-9 md:pb-14 w-full">

    <form className=""  >
      <input
        placeholder="Search movie by title.."
        onChange={handleSubmit}
        value={query}
        onKeyPress={handleKeyPress}
        className=" w-50 rounded-md bg-zinc-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-slate-300 placeholder:italic focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:w-80 focus:w-64 sm:focus:w-96 sm:h-12"
      />
    </form>
  </div>);
}

export default Search;