function Input({ register, errors }) {

    return (<div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium  capitalize">Title</label>
        <input {
            ...register("title", {
                required: "Title is required",
            })
        } type="text" id="title" name="title" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
        {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
    </div>);
}

export default Input;