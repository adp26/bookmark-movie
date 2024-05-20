// src/components/FilterDropdown.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleFilter } from '../features/filterSlice';
import { filterGenre, filterRating, filterRelease, getGenre, getYear, resetSortFilter } from '../feature/movie/movieSlice';

import ChecklistIcon from './icon/CheklistIcon';

import ChevronBottom from './icon/ChevronBottom';
import ChevronUp from './icon/ChevronUp';
import Rating from './StarIcon';


const ratings = [10, 9, 8, 7, 6, 5];

const FilterDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const genres = useSelector(getGenre);

    const genreList = genres.map(val => val.name);
    const genreSelected = useSelector(state => state.movie.filterByGenre);
    const ratingSelected = useSelector(state => state.movie.filterByRating);
    const releaseSelected = useSelector(state => state.movie.filterByRelease);



    const yearOfRelease = useSelector(getYear);
    const setYearOfRelease = [...new Set(yearOfRelease)].sort((a, b) => parseInt(b) - parseInt(a));

    const checkGenreIsMatch = (name) => {
        const id = findIdByNameGenre(name);

        return genreSelected.find(val => val === id);


    }

    const findIdByNameGenre = (genre) => genres.find(val => val.name === genre).id;


    const toggleAccordion = () => {

        setIsOpen(!isOpen);
    };

    const handleGenreToggle = (genre) => {

        const id = findIdByNameGenre(genre);

        dispatch(filterGenre(id));
    };

    const handleRatingToggle = (rating) => {

        dispatch(filterRating(rating));
    };

    const handleYearToggle = (year) => {

        dispatch(filterRelease(year));
    }
    const resetFilterHandle = () => {
        dispatch(resetSortFilter());
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="w-auto">
            <div className="bg-white text-black  p-2 rounded-lg cursor-pointer w-36" onClick={toggleAccordion}>
                <div className="flex justify-between items-center">
                    <div className='flex flex-row gap-x-2'>

                        <h2 className="text-lg font-medium">Filter</h2>
                        {genreSelected.length > 0 || releaseSelected || ratingSelected ? <ChecklistIcon /> : ''}
                    </div>
                    {/* <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /> */}
                    {isOpen ? <ChevronUp /> : <ChevronBottom />}
                </div>
            </div>
            {isOpen && (
                <div className="absolute top-19 right-19 z-20  mt-2 w-54 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3">
                    <div className="mb-4 text-right " onClick={resetFilterHandle}>
                        <button className="mb-2 text-red-600 font-semibold">Reset</button></div>
                    <div className="mb-4">
                        <h3 className="font-medium mb-2 text-black">Release</h3>
                        <div className=' h-32 overflow-y-auto scroll-smooth'>

                            {setYearOfRelease.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearToggle(year)}
                                    className={`flex items-center w-full text-left text-black px-4 py-2 mb-1 border-b-2 border-slate-200 gap-x-2`}
                                >
                                    {year}
                                    {year === releaseSelected && (
                                        <ChecklistIcon />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium mb-2 text-black">Genre</h3>
                        <div className='overflow-y-auto h-32 scroll-smooth'>

                            {genreList.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handleGenreToggle(name)}
                                    className={`flex items-center w-full text-left text-black px-4 py-2 mb-1   border-b-2 border-slate-200 gap-x-2 `}
                                >
                                    {name}
                                    {checkGenreIsMatch(name) && (
                                        <ChecklistIcon />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2 text-black ">Rating</h3>
                        <div className=' h-32 overflow-y-auto scroll-smooth'>

                            {ratings.map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleRatingToggle(rating)}
                                    className={`flex text-black items-center w-full text-left px-4 py-2 mb-1 border-b-2 border-slate-200 gap-x-2`}
                                >

                                    <Rating />
                                    {
                                        ` ${rating} and up`}
                                    {rating === ratingSelected && (
                                        <ChecklistIcon />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default FilterDropdown;
