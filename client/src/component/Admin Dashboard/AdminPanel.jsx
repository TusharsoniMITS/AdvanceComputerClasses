import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseInsert from "./Course/CourseInsert";
import CourseEdit from "./Course/CourseEdit";
import {
  FaBars,
  FaBell,
  FaExpandArrowsAlt,
  FaTachometerAlt,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { Context } from "../../main";
import { toast } from "react-hot-toast";
import BlogInsert from "./Blog/BlogInsert";
import BlogDisplay from "./Blog/BlogDisplay";
import HindiText from "./Typing/HindiText";
import EnglishText from "./Typing/EnglishText";
import ContactDisplay from "./Contact/ContactDisplay";
import EditHindiText from "./Typing/EditHindiText";
import EditEnglishText from "./Typing/EditEnglishText";
import SliderImage from "./Slider/SliderImage";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  // Separate dropdown states
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [typingDropdownOpen, setTypingDropdownOpen] = useState(false);

  const { setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleMenuClick = (componentName) => {
    setSelectedComponent(componentName);
    setSidebarOpen(false); // Close sidebar on selection
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout", {}, { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 p-4 space-y-4 fixed h-full transition-transform z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } lg:translate-x-0 lg:relative`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/img/logo.png" alt="logo" className="rounded-full w-12 h-12" />
            <span className="font-semibold">Advanced Computer Classes</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-xl lg:hidden">
            <AiOutlineClose />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {/* Dashboard */}
            <li
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => handleMenuClick("dashboard")}
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </li>

            {/* Slider Image Change */}

            <li
              className="flex items-center space-x-2 p-2 rounded cursor-pointer text-white hover:bg-gray-700"
              onClick={() => handleMenuClick("sliderimage")}
            >
              <MdCircle className="text-xs text-white" />  {/* White Circle */}
              <span>Slider Image</span>
            </li>


            {/* Course Dropdown */}
            <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <div
                className="flex items-center justify-between"
                onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
              >
                <div className="flex items-center space-x-2">
                  <MdCircle className="text-xs" />
                  <span>Course</span>
                </div>
                <FaChevronDown
                  className={`transition-transform ${courseDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {courseDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li
                    className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("courseInsert")}
                  >
                    <MdCircle className="text-xs" />
                    <span>Course Insert</span>
                  </li>
                  <li
                    className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("courseEdit")}
                  >
                    <MdCircle className="text-xs" />
                    <span>Course Edit</span>
                  </li>
                </ul>
              )}
            </li>

            {/* Blog Dropdown */}
            <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <div
                className="flex items-center justify-between"
                onClick={() => setBlogDropdownOpen(!blogDropdownOpen)}
              >
                <div className="flex items-center space-x-2">
                  <MdCircle className="text-xs" />
                  <span>Blog</span>
                </div>
                <FaChevronDown
                  className={`transition-transform ${blogDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {blogDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("blogInsert")}>
                    <MdCircle className="text-xs" />
                    <span>Blog Insert</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("blogEdit")}>
                    <MdCircle className="text-xs" />
                    <span>Blog Edit</span>
                  </li>
                </ul>
              )}
            </li>

            {/* Typing Section */}
            <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <div
                className="flex items-center justify-between"
                onClick={() => setTypingDropdownOpen(!typingDropdownOpen)}
              >
                <div className="flex items-center space-x-2">
                  <MdCircle className="text-xs" />
                  <span>Typing</span>
                </div>
                <FaChevronDown
                  className={`transition-transform ${typingDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {typingDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("hindiText")}>
                    <MdCircle className="text-xs" />
                    <span>Insert Hindi Text</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("EditHindiText")}>
                    <MdCircle className="text-xs" />
                    <span>Edit Hindi Text</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("englishText")}>
                    <MdCircle className="text-xs" />
                    <span>Insert English Text</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                    onClick={() => handleMenuClick("editenglishText")}>
                    <MdCircle className="text-xs" />
                    <span>Edit English Text</span>
                  </li>
                </ul>
              )}
            </li>



            {/* Contact Messages */}
            <li
              className="p-2 rounded cursor-pointer  bg-gray-600 text-white"
              onClick={() => handleMenuClick("contactMessage")}
            >
              <span>📩 Contact Messages</span>
            </li>


            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 mt-4 bg-red-600 rounded hover:bg-red-700 w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all">
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl lg:hidden">
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <button onClick={toggleFullScreen} className="p-2 rounded-full hover:bg-gray-200">
            <FaExpandArrowsAlt />
          </button>
        </nav>

        <div className="p-6 overflow-auto">
          {selectedComponent === "dashboard" && <h2>Dashboard Content</h2>}
          {selectedComponent === "courseInsert" && <CourseInsert />}
          {selectedComponent === "courseEdit" && <CourseEdit />}
          {selectedComponent === "blogInsert" && <BlogInsert />}
          {selectedComponent === "blogEdit" && <BlogDisplay />}
          {selectedComponent === "hindiText" && <HindiText />}
          {selectedComponent === "EditHindiText" && <EditHindiText />}
          {selectedComponent === "englishText" && <EnglishText />}
          {selectedComponent === "editenglishText" && <EditEnglishText />}
          {selectedComponent === "sliderimage" && <SliderImage />}
          {selectedComponent === "contactMessage" && <ContactDisplay />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
