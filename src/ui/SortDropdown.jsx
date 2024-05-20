import React, { useState, useEffect, useRef } from 'react';
import { sortItem } from '../feature/movie/movieSlice';
import ChecklistIcon from './icon/CheklistIcon';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';

const sortList = ["(A-Z)", "(Z-A)"];
const SortDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.movie.sortBy);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortChange = (sortOption) => {

        dispatch(sortItem(sortOption));
        setIsOpen(false);
    };

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
        <div ref={dropdownRef} className="relative inline-block text-left w-auto">
            <button
                type="button"
                onClick={handleToggleDropdown}
                className={`inline-flex ${sortBy != 'default' ? 'w-20' : 'w-24'}justify-center  rounded-md border border-gray-300 shadow-sm px-4 p-2 bg-white  font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none`}
            >
                {sortBy != "default" ? `Sort By: ${sortBy}` : "Sort"}
            </button>


            {isOpen && (
                <div className="  absolute bottom-full  mb-2 translate-x-20  translate-y-12 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {sortList.map(sort => <div key={sort} className='flex flex-row mx-3 justify-center items-center'>

                            <button
                                className="block px-2 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                                onClick={() => handleSortChange(sort)}
                            >

                                Title {sort}
                            </button>
                            {sortBy === sort && <ChecklistIcon className="bg-slate-600" />}
                        </div>)}


                    </div>
                </div>
            )}

        </div>
    );
};
export default SortDropdown;