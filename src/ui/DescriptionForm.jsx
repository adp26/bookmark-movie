function DescriptionForm({ register }) {
    return (<div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea register={register} id="description" name="description" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"></textarea>
    </div>);
}


export default DescriptionForm;