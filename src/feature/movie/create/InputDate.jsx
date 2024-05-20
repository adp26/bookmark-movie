function InputDate({ register, errors }) {
    return <div className="mb-4">
        <label htmlFor="release_date" className="block text-sm font-medium ">Release Date</label>
        <input  {...register("release_date", {
            required: "release_date is required",
        })} type="date" id="release_date" name="release_date" className="mt-1 p-2 w-full border border-gray-300 text-slate-600 font-normal rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
        {errors.release_date && (
            <span className="text-red-500 text-sm">{errors.release_date.message}</span>
        )}
    </div>
}
export default InputDate;