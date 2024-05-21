import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteItem } from '../../feature/movie/movieSlice';

const OptionButton = ({ id }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const popupRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOptionClick = (option) => {

        if (option === 'delete') {

            dispatch(deleteItem(id))
            navigate('/movies')
        }
        if (option === 'edit') {

            navigate('/movies/create', { state: id + 1 })
        }
        setIsPopupOpen(false);
    };

    return (
        <div className="relative flex-row text-left ml-0" ref={popupRef}>
            {isPopupOpen && (
                <div
                    className="absolute  right-0 translate-y-12 ml-12 w-32  md:w-56  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    ref={popupRef}
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={() => handleOptionClick("edit")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleOptionClick("delete")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className="inline-flex justify-center w-full border border-slate-100 p-0  text-sm font-medium  rounded-md focus:outline-none "
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:h-10 md:w-10 fill-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </button>


        </div>
    );
};

export default OptionButton;
