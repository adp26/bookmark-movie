function InputForm({ label, register }) {
    return (<div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 capitalize">{label}</label>
        <input register={register} type="text" id="title" name="title" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
    </div>);
}


export default InputForm