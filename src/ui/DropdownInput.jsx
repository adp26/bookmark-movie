import { useEffect, useRef, useState } from "react";

const DropdownInput = ({ options, register, isMultiSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    {isMultiSelect ? 'Select' : selectedOption || 'Select'}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="py-1" role="none">
                        {options.map(option => (
                            <label key={option} className="flex items-center justify-between px-4 py-2 text-sm">
                                <span>{option}</span>
                                {isMultiSelect ? (
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={selectedOption.includes(option)}
                                        onChange={() => handleOptionClick(option)}
                                        className="ml-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={() => handleOptionClick(option)}
                                        className="ml-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default DropdownInput;