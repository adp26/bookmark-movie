import Plus from "./icon/Plus";

const CreateMovieButton = () => {
    return (
        <button className="bg-indigo-500  hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-9 md:mt-12  rounded-md">
            <div className="flex flex-row gap-2 justify-center items-center">

                Create Movie
                <Plus />
            </div>
        </button>
    );
};

export default CreateMovieButton;