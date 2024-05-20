import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

function InputMultiSelection({ genres, control, errors }) {
    const dropdownMultiRef = useRef(null);


    const [dropdownMultiOpen, setDropdownMultiOpen] = useState(false);

    const toggleDropdownMulti = () => {
        setDropdownMultiOpen(!dropdownMultiOpen);
    };

    const handleMultiOptionClick = (value, field) => {
        const valueArray = [...field.value];
        if (valueArray.includes(value)) {
            const index = valueArray.indexOf(value);
            valueArray.splice(index, 1);
        } else {
            valueArray.push(value);
        }
        field.onChange(valueArray);
    };



    const handleClickOutside = (event) => {
        if (dropdownMultiRef.current && !dropdownMultiRef.current.contains(event.target)) {
            setDropdownMultiOpen(false);
        }

    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="mb-4">
        <label className="block text-sm font-medium ">Genre</label>
        <div id="genre_select" className="relative inline-block w-64" ref={dropdownMultiRef}>

            <Controller
                name="genre_ids"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <>
                        <div
                            className="bg-white border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer text-slate-600 font-normal"
                            onClick={toggleDropdownMulti}
                        >
                            {field.value.length === 0 ? 'Select options' : field.value.join(', ')}
                        </div>
                        {dropdownMultiOpen && (
                            <div className="absolute  bottom-full left-14 md:left-full mb-2 translate-x-1  translate-y-12 w-39 md:w-full bg-white border border-gray-300  rounded-md shadow-lg z-10 h-32 overflow-y-auto scroll-smooth">
                                {genres.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center p-2 cursor-pointer"
                                        onClick={() => handleMultiOptionClick(option.name, field)}
                                    >
                                        <input
                                            id={`genre_${option.id}`}
                                            type="checkbox"
                                            value={option.id}
                                            checked={field.value.includes(option.name)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        <label htmlFor={`genre_${option.id}`} className="cursor-pointer text-slate-600 font-normal">{option.name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    </div>);
}

export default InputMultiSelection;