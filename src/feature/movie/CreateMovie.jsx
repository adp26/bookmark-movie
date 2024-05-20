import React, { useState, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getGenre, getLanguage, getMovieById, getTotalMovie, updateItem } from './movieSlice';
import { useForm, Controller, set } from 'react-hook-form';
import BackButton from '../../ui/icon/BackButton';




const CreateMovie = () => {
    const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const dispatch = useDispatch();
    const location = useLocation();


    const navigate = useNavigate();

    const dropdownMultiRef = useRef(null);
    const dropdownSingleRef = useRef(null);

    const movie = useSelector(getMovieById(location.state - 1));
    const genres = useSelector(getGenre);
    const languages = [...useSelector(getLanguage)].sort((a, b) => { return a.english_name > b.english_name ? 1 : -1; });
    const totalMovie = useSelector(getTotalMovie);





    useEffect(() => {
        if (movie) {
            setValue('id', movie.id);
            setValue('title', movie.title);
            setValue('overview', movie.overview);
            setValue('genre_ids', convertGenre(movie.genre_ids));
            setValue('poster_path', movie.poster_path);
            setValue('backdrop_path', movie.backdrop_path);
            setValue('release_date', movie.release_date);
            setValue('original_language', convertLanguage(movie.original_language));
            setValue('vote_count', movie.vote_count);
            setValue('vote_average', movie.vote_average);

        }
    }, []);

    function convertGenre(data) {

        if (typeof data[0] === 'string') {
            return data.map(genre =>
                (genres.find(val => val.name === genre)).id
            )
        }
        return data.map(id => genres.find(val => val.id === id).name);
    }

    function convertLanguage(data) {

        if (data.length == 0) return;
        if (data.length == 2) {
            return languages.find(val => val.iso_639_1 === data).english_name;
        }
        return languages.find(val => val.english_name === data).iso_639_1;
    }

    const onSubmit = (data) => {
        data.original_language = convertLanguage(data.original_language);
        data.genre_ids = convertGenre(data.genre_ids);
        data.release_date = formatDate(data.release_date);
        data.vote_average = data.vote_average ? data.vote_average : 0;
        data.vote_count = data.vote_count ? data.vote_count : 0;
        if (!data.id) {

            data.id = totalMovie + 1;

            dispatch(addItem(data));
        } else {

            dispatch(updateItem(data))

        }
        reset();
        navigate('/movies', { replace: true })


    };
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [dropdownMultiOpen, setDropdownMultiOpen] = useState(false);
    const [dropdownSingleOpen, setDropdownSingleOpen] = useState(false);


    const toggleDropdownSingle = () => {
        setDropdownSingleOpen(!dropdownSingleOpen);
    };
    const toggleDropdownMulti = () => {
        setDropdownMultiOpen(!dropdownMultiOpen);
    };

    const handleMultiOptionClick = (value, field) => {
        const valueArray = [...field.value];
        if (valueArray.includes(value)) {
            const index = valueArray.indexOf(value);
            valueArray.splice(index, 1);
        } else {
            valueArray.push(value);
        }
        field.onChange(valueArray);
    };

    const handleSingleOptionClick = (value, field) => {
        field.onChange(value);

        setDropdownSingleOpen(false);

    };

    const handleClickOutside = (event) => {
        if (dropdownMultiRef.current && !dropdownMultiRef.current.contains(event.target)) {
            setDropdownMultiOpen(false);
        }
        if (dropdownSingleRef.current && !dropdownSingleRef.current.contains(event.target)) {
            setDropdownSingleOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGenerateClick = () => {
        const random = Math.random() * 100;
        setValue('poster_path', `https://source.unsplash.com/random/500x750/?movie&sig=${random.toPrecision(2)}`);
    };
    const handleGenerateBackDropClick = () => {
        const random = Math.random() * 100;
        setValue('backdrop_path', `https://source.unsplash.com/random/1321x830?movie&sig=${random.toPrecision(2)}`);
    };

    return (
        <div className='bg-slate-900 h-auto'>
            <div className="self-start pt-5 ml-5 sm:ml-20 text-white gap-3 flex flex-row cursor-pointer" onClick={() => location.state ? navigate(-1) : navigate('/movies')}>

                <BackButton custom={true} />
                Back
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-4 bg-inherit text-slate-200 font-semibold shadow-md rounded-md ">
                <div className='text-sky-200 font-extrabold text-3xl w-full pb-1'>
                    {movie ? 'Update' : 'Create'} Movie
                </div>
                <div className="flex-grow border-t-4 border-indigo-500 w-52 pb-9"></div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium  capitalize">Title</label>
                    <input {
                        ...register("title", {
                            required: "Title is required",
                        })
                    } type="text" id="title" name="title" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
                    {errors.title && (
                        <span className="text-red-500 text-sm">{errors.title.message}</span>
                    )}
                </div>


                <div className="mb-4">
                    <label htmlFor="overview" className="block text-sm font-medium ">Description</label>
                    <textarea {
                        ...register("overview", {
                            required: "overview is required",
                        })
                    } id="overview" name="overview" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500"></textarea>
                    {errors.overview && (
                        <span className="text-red-500 text-sm">{errors.overview.message}</span>
                    )}
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="poster_path" className="mr-2">Poster URL</label>
                    <Controller
                        name="poster_path"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input disabled
                                {...field}
                                id="poster_path"

                                type="text"
                                className="border bg-white rounded-md p-2 w-full text-slate-600 font-normal"
                            />
                        )}
                    />


                    <button
                        type="button"
                        onClick={handleGenerateClick}
                        className="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md"
                    >
                        Generate
                    </button>

                </div>
                {/* {errors.poster_path && (
                    <span className="text-red-500 text-sm">{errors.poster_path.message}</span>
                )} */}
                <div className="flex items-center mb-4">
                    <label htmlFor="backdrop_path" className="mr-2">Backdrop URL</label>
                    <Controller
                        name="backdrop_path"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input disabled
                                {...field}
                                id="backdrop_path"
                                type="text"
                                name='backdrop_path'
                                className="border  bg-white rounded-md p-2 w-full text-slate-600 font-normal"
                            />
                        )}
                    />
                    <button
                        type="button"
                        onClick={handleGenerateBackDropClick}
                        className="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md"
                    >
                        Generate
                    </button>
                </div>

                <div className="mb-4">
                    <label htmlFor="release_date" className="block text-sm font-medium ">Release Date</label>
                    <input  {...register("release_date", {
                        required: "release_date is required",
                    })} type="date" id="release_date" name="release_date" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
                    {errors.release_date && (
                        <span className="text-red-500 text-sm">{errors.release_date.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium ">Language</label>
                    <div className="relative inline-block w-64" ref={dropdownSingleRef}>
                        <Controller
                            name="original_language"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <>
                                    {dropdownSingleOpen && (
                                        <div className="absolute bottom-full left-20 md:left-full mb-2 translate-x-1  translate-y-12 w-38 md:w-full h-32 overflow-y-auto scroll-smooth bg-white border border-gray-300 rounded-md shadow-lg z-10 text-slate-600 font-normal">
                                            {languages.map((option) => (
                                                <div
                                                    key={option.iso_639_1}
                                                    className="flex items-center p-2 cursor-pointer"
                                                    onClick={() => handleSingleOptionClick(option.english_name, field)}
                                                >
                                                    <input
                                                        name="original_language"
                                                        type="radio"
                                                        value={option.id}
                                                        checked={field.value.includes(option.english_name)}
                                                        readOnly
                                                        className="mr-2"
                                                    />
                                                    <label className="cursor-pointer text-slate-600 font-normal">{option.english_name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div
                                        className="bg-white border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer text-slate-600 font-normal"
                                        onClick={toggleDropdownSingle}
                                    >
                                        {field.value.length === 0 ? 'Select options' : field.value}
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium ">Genre</label>
                    <div id="genre_select" className="relative inline-block w-64" ref={dropdownMultiRef}>

                        <Controller
                            name="genre_ids"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <>
                                    <div
                                        className="bg-white border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer text-slate-600 font-normal"
                                        onClick={toggleDropdownMulti}
                                    >
                                        {field.value.length === 0 ? 'Select options' : field.value.join(', ')}
                                    </div>
                                    {dropdownMultiOpen && (
                                        <div className="absolute  bottom-full left-14 md:left-full mb-2 translate-x-1  translate-y-12 w-39 md:w-full bg-white border border-gray-300  rounded-md shadow-lg z-10 h-32 overflow-y-auto scroll-smooth">
                                            {genres.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className="flex items-center p-2 cursor-pointer"
                                                    onClick={() => handleMultiOptionClick(option.name, field)}
                                                >
                                                    <input
                                                        id={`genre_${option.id}`}
                                                        type="checkbox"
                                                        value={option.id}
                                                        checked={field.value.includes(option.name)}
                                                        readOnly
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`genre_${option.id}`} className="cursor-pointer text-slate-600 font-normal">{option.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </div>
                </div>


                <div className="mt-4">
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};


export default CreateMovie;
