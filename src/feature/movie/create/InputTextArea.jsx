function InputTextArea({ register, errors }) {
    return (<div className="mb-4">
        <label htmlFor="overview" className="block text-sm font-medium ">Description</label>
        <textarea {
            ...register("overview", {
                required: "overview is required",
            })
        } id="overview" name="overview" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500"></textarea>
        {errors.overview && (
            <span className="text-red-500 text-sm">{errors.overview.message}</span>
        )}
    </div>);
}

export default InputTextArea;