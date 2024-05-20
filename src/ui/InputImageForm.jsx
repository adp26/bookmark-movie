function InputImageForm({ label, ref, handleChange, handleFileInputChange, handleImageInput, formData }) {
    const label2 = label.toLowerCase();
    return (
        <div className="mb-4 flex items-center">
            <input ref={ref} type="file" id={label2} name={label2} className="hidden" onChange={handleFileInputChange} />
            <span className="ml-4">{label} URL:</span>
            <input type="text" id={`${label2}Url`} name={label2} value={formData.poster} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
            <button type="button" onClick={() => handleImageInput(label2)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">generate</button>
        </div>

    );

}


export default InputImageForm