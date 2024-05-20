import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import Movie from "./Movie";
import Search from "../ui/Search";


import CreateMovieButton from "../ui/CreateMovieButton";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getMovie, searchItem } from "../feature/movie/movieSlice";
import FilterDropdown from "../ui/FilterDropdown";
import SortDropdown from "../ui/SortDropdown";
import ChevronRight from "../ui/icon/ChevronRight";
import ChevronLeft from "../ui/icon/ChevronLeft";
import NotFound from "../ui/NotFound";
import DividerOr from "../ui/DividerOr";



function Movies() {
  const dispatch = useDispatch();
  const movie = useSelector(getMovie);

  const loading = useSelector(getLoading);

  const navigate = useNavigate();
  const pageSize = 10;



  // State untuk nomor halaman
  const [currentPage, setCurrentPage] = useState(1)
  const maxPageButtons = 5;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };






  // Fungsi untuk membagi data menjadi halaman-halaman
  const paginate = (movie) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return movie.slice(startIndex, endIndex);
  };

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(movie.length / pageSize); i++) {
    pageNumbers.push(i);
  }

  // Menghitung index awal dan akhir dari tombol halaman yang ditampilkan
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(Math.ceil(movie.length / pageSize), startPage + maxPageButtons - 1);






  return <div className=" dark:bg-slate-900 bg-slate-300 flex justify-start items-center flex-col
  px-5 sm:px-12">
    <Link to={'create'}>

      <CreateMovieButton />

    </Link>


    <DividerOr />

    <Search />


    <div className="text-slate-200 flex flex-col justify-center md:items-start md:flex-row md:w-54 gap-4 ">
      <div className="md:w-[33rem] flex flex-row md:flex-col gap-x-2 md:gap-y-3 justify-center md:justify-start">
        {/* {filter dan sort} */}


        <SortDropdown />
        <FilterDropdown />


      </div >

      {movie.length == 0 && <NotFound />}
      {movie.length > 0 && <div className="flex flex-col justify-center gap-4">

        <div className="dark:text-slate-100 text-center sm:text-start text-slate-600 text-2xl font-bold">Found {movie.length} Result</div>



        <div className="flex flex-wrap flex-row gap-3  md:gap-6">




          {paginate(movie).map(item => (
            <Movie item={item} key={item.id} />
          ))}

        </div>



        <div className="flex flex-row gap-x-3 justify-center py-5" >
          {/* Tombol untuk halaman sebelumnya */}
          {currentPage !== 1 && <button onClick={() => handlePageChange(currentPage - 1)} >
            <ChevronLeft />
          </button>}

          <div className="flex gap-x-2">

            {startPage > 1 && (
              <button onClick={() => handlePageChange(1)}>1</button>
            )}
            {startPage > 2 && <span className="text-white">...</span>}
            {pageNumbers.slice(startPage - 1, endPage).map(number => (
              <button key={number} onClick={() => handlePageChange(number)} style={{ color: currentPage === number ? '#00B5F3' : 'white', fontWeight: currentPage === number ? 'bold' : 'normal' }}>
                {number}
              </button>
            ))}
            {endPage < Math.ceil(movie.length / pageSize) - 1 && <span className="text-white">...</span>}
            {endPage < Math.ceil(movie.length / pageSize) && (
              <button className="text-white" onClick={() => handlePageChange(Math.ceil(movie.length / pageSize))}>
                {Math.ceil(movie.length / pageSize)}
              </button>
            )}
          </div>
          {/* Tombol untuk halaman berikutnya */}
          {currentPage !== Math.ceil(movie.length / pageSize) && <button onClick={() => handlePageChange(currentPage + 1)} >
            <ChevronRight />
          </button>}
        </div>



      </div>}
    </div>
  </div>;
}



export default Movies;
