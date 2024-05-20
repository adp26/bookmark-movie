import React, { useState, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getGenre, getLanguage, getMovieById, getTotalMovie, updateItem } from '../movieSlice';
import { useForm } from 'react-hook-form';
import BackButton from '../../../ui/icon/BackButton';
import { formatDate } from '../../../utils/FormatDate';
import { convertGenre, convertLanguage } from '../../../utils/Convert';
import InputUrl from './InputUrl';
import InputTextArea from './InputTextArea';
import Input from './Input';
import InputDate from './InputDate';
import InputSingleSelection from './InputSingleSelection';
import InputMultiSelection from './InputMultiSelection';
import ButtonSubmit from './ButtonSubmit';
import Title from './Title';



const CreateMovie = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const movie = useSelector(getMovieById(location.state - 1));
    const genres = useSelector(getGenre);
    const languages = [...useSelector(getLanguage)].sort((a, b) => { return a.english_name > b.english_name ? 1 : -1; });
    const totalMovie = useSelector(getTotalMovie);



    useEffect(() => {
        if (movie) {
            setValue('id', movie.id);
            setValue('title', movie.title);
            setValue('overview', movie.overview);
            setValue('genre_ids', convertGenre(genres, movie.genre_ids));
            setValue('poster_path', movie.poster_path);
            setValue('backdrop_path', movie.backdrop_path);
            setValue('release_date', movie.release_date);
            setValue('original_language', convertLanguage(languages, movie.original_language));
            setValue('vote_count', movie.vote_count);
            setValue('vote_average', movie.vote_average);

        }
    }, []);



    const onSubmit = (data) => {
        data.original_language = convertLanguage(languages, data.original_language);
        data.genre_ids = convertGenre(genres, data.genre_ids);
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


    return (
        <div className='bg-slate-900 h-auto'>
            <div className="self-start pt-5 ml-5 sm:ml-20 text-white gap-3 flex flex-row cursor-pointer" onClick={() => location.state ? navigate(-1) : navigate('/movies')}>

                <BackButton custom={true} />
                Back
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-4 bg-inherit text-slate-200 font-semibold shadow-md rounded-md ">
                <Title state={location.state - 1} />
                <div className="flex-grow border-t-4 border-indigo-500 w-52 pb-9"></div>
                <Input register={register} errors={errors} />


                <InputTextArea register={register} errors={errors} />
                <InputUrl control={control} label={'Poster'} setValue={setValue} />

                <InputUrl control={control} label={'Backdrop'} setValue={setValue} />

                <InputDate register={register} errors={errors} />
                <InputSingleSelection languages={languages} control={control} errors={errors} />
                <InputMultiSelection genres={genres} control={control} errors={errors} />


                <ButtonSubmit />
            </form>
        </div>
    );
};


export default CreateMovie;
