import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

function InputSingleSelection({ languages, control, errors }) {
    const dropdownSingleRef = useRef(null);
    const [dropdownSingleOpen, setDropdownSingleOpen] = useState(false);

    const toggleDropdownSingle = () => {
        setDropdownSingleOpen(!dropdownSingleOpen);
    };
    const handleSingleOptionClick = (value, field) => {
        field.onChange(value);

        setDropdownSingleOpen(false);

    };
    const handleClickOutside = (event) => {

        if (dropdownSingleRef.current && !dropdownSingleRef.current.contains(event.target)) {
            setDropdownSingleOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="mb-4">
        <label className="block text-sm font-medium ">Language</label>
        <div className="relative inline-block w-64" ref={dropdownSingleRef}>
            <Controller
                name="original_language"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <>
                        {dropdownSingleOpen && (
                            <div className="absolute bottom-full left-20 md:left-full mb-2 translate-x-1  translate-y-12 w-38 md:w-full h-32 overflow-y-auto scroll-smooth bg-white border border-gray-300 rounded-md shadow-lg z-10 text-slate-600 font-normal">
                                {languages.map((option) => (
                                    <div
                                        key={option.iso_639_1}
                                        className="flex items-center p-2 cursor-pointer"
                                        onClick={() => handleSingleOptionClick(option.english_name, field)}
                                    >
                                        <input
                                            name="original_language"
                                            type="radio"
                                            value={option.id}
                                            checked={field.value.includes(option.english_name)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        <label className="cursor-pointer text-slate-600 font-normal">{option.english_name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div
                            className="bg-white border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer text-slate-600 font-normal"
                            onClick={toggleDropdownSingle}
                        >
                            {field.value.length === 0 ? 'Select options' : field.value}
                        </div>
                    </>
                )}
            />
        </div>
    </div>);
}

export default InputSingleSelection;