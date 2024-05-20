import { Controller } from "react-hook-form";

function InputUrl({ label, control, setValue }) {
    const handleGenerateClick = () => {
        const random = Math.random() * 100;
        setValue(`${label.toLowerCase()}_path`, `https://source.unsplash.com/random/500x750/?movie&sig=${random.toPrecision(2)}`);
    };

    return (<div className="flex items-center mb-4">
        <label htmlFor="backdrop_path" className="mr-2">{label} URL</label>
        <Controller
            name={`${label.toLowerCase()}_path`}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <input disabled
                    {...field}
                    id={`${label.toLowerCase()}_path`}
                    type="text"
                    name={`${label.toLowerCase()}_path`}
                    className="border  bg-white rounded-md p-2 w-full text-slate-600 font-normal"
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
    </div>);
}

export default InputUrl;