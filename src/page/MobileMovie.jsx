import BookmarkIcon from "../ui/icon/BookmarkIcon";
import Rating from "../ui/StarIcon";

function Bookmark({ isBookmark = true }) {
    return (



        <div className="relative flex w-full h-40 flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">



            <div
                className="relative w-full text-gray-700 bg-white bg-clip-border rounded-xl">
                <img
                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                    alt="ui/ux review check" />


            </div>

            <div>
                <div className="px-5">
                    <div className="flex items-center justify-between ">
                        <h5 className="block font-sans text-md antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            Title of movie
                        </h5>

                    </div>

                    <div className="inline-flex flex-wrap items-center gap-3 group">
                        genre1 genre2
                    </div>
                </div>

                <Rating average={3.4} count={2000} />
                <div className="p-6 self-center">
                    <button
                        className="block w-auto select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold titlecase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        remove
                    </button>
                </div>
            </div>

        </div>


    );
}

export default Bookmark;
