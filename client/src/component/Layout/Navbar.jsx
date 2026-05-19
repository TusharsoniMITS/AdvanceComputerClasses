import { useEffect,useState,useRef } from "react";
import { Link, useLocation, } from "react-router-dom";

// import {useNavigate} from "react-router-dom"
// import { Context } from "../../main";
// import { useContext } from "react";
// import axios from 'axios'
// import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Step 1: Ref for dropdown

  // Step 2: Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const { isAuthorized,setIsAuthorized  } = useContext(Context);  // Assume you have a logout function in your context.
  // const navigate = useNavigate()

  const location = useLocation();



  // Check if '/admin' is part of the current path
  if (location.pathname.includes("/admin")) {
    return null;  // Hide the Navbar if '/admin' is in the URL
  }

  //  const handleLogout = async () => {
  //     try {
  //       const response = await axios.post("/api/logout", {}, { withCredentials: true });
  //       toast.success(response.data.message);
  //       setIsAuthorized(false);
  //       navigate("/login");
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Logout failed");
  //     }
  //   };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse flex-nowrap">
          <img src="/img/logo.png" className="h-16 w-16 md:h-16 md:w-16" alt="logo acc" />
          <span className="self-center text-lg md:text-2xl font-semibold whitespace-normal truncate dark:text-white">
            ADVANCED COMPUTER CLASSES
          </span>
        </Link>

        {/* Login/Logout Button and Mobile Menu Toggle Button */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {/* {isAuthorized ? (
            <button
              onClick={handleLogout}  // Trigger logout function here
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-4 py-2 text-center lg:text-xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
             ADMIN
            </Link>
          )} */}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500 ">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/coursedisplay" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">
                COURSE
              </Link>
            </li>
            <li>
              <Link to="/blog" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">
                CONTACT
              </Link>
            </li>

            {/* Typing Link with Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent "
              >
                TYPING
                <svg className="w-2.5 h-2.5 ml-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-blue-600 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-white">
                    <li>
                      <Link to="/englishtyping" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        English Typing
                      </Link>
                    </li>
                    <li>
                      <Link to="/hindityping" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Hindi Typing
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
