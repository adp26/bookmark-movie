import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import DarkModeIcon from "./icon/DarkMode";
import CollapseIcon from "./icon/CollapseIcon";
const moviesPath = "/movies";
const bookmarkPath = "/bookmark";
const colorActive = "text-sky-400 font-extrabold";
function Header() {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePopUp = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (


    <header className="sticky top-0 z-50
     flex flex-row items-center justify-between
       dark:bg-indigo-500 bg-slate-700
        transition-colors duration-500 px-4 py-4
         titlecase text-slate-100">


      <Logo />


      <div className="flex justify-end gap-2">

        <DarkModeIcon />
        <div onClick={handleToggleDropdown} ref={dropdownRef}>

          <CollapseIcon />
          {isOpen && (
            <div className="sm:hidden  absolute top-0 translate-y-12 w-36 h-22 right-4 rounded-md shadow-lg z-20 bg-slate-100 ring-1 ring-black ring-opacity-5">
              <div className="p-2  flex flex-col gap-2">

                <Link to={moviesPath} onClick={() => handlePopUp} className={`${pathname == moviesPath ? colorActive : 'text-slate-500 font-bold'}`}>Movie</Link>
                <Link to={bookmarkPath} onClick={() => handlePopUp} className={`${pathname == bookmarkPath ? colorActive : 'text-slate-500 font-bold'}`}>My Bookmark</Link>


              </div>
            </div>
          )}
        </div>
        <div className="gap-2 hidden sm:gap-3 sm:flex justify-between mr-3 w-auto sm:w-75 stiky">

          <Link to={moviesPath} className={`${pathname == moviesPath ? colorActive : 'text-slate-200 font-bold'}`}>Movie</Link>
          <Link to={bookmarkPath} className={`${pathname == bookmarkPath ? colorActive : 'text-slate-200 font-bold'}`}>My Bookmark</Link>
        </div>
      </div>


    </header>

  );
}

export default Header;

