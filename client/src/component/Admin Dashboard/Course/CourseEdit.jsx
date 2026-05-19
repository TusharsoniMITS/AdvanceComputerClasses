import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function CourseDisplay() {
    const [courses, setCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingCourse, setEditingCourse] = useState(null);
    const [editedCourse, setEditedCourse] = useState({ title: "", duration: "", price: "" });

    useEffect(() => {
        fetchCourses();
    }, []);

    // ✅ Fetch all courses
    const fetchCourses = async () => {
        try {
            const response = await axios.get("/api/getAllCourse");
            setCourses(response.data.allCourse);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to load courses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Show more courses
    const showMoreCourses = () => {
        setVisibleCourses((prev) => prev + 12);
    };

    // ✅ Delete course
    const deleteCourse = async (id) => {
        try {
            await axios.delete(`/api/DeleteCourse/${id}`);
            fetchCourses(); // Refresh courses after deletion
            toast.success("Course deleted successfully!");
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error(error.response?.data?.message || "Failed to delete the course.");
        }
    };

    // ✅ Handle Edit Click
    const handleEditClick = (course) => {
        setEditingCourse(course._id);
        setEditedCourse({ title: course.title, duration: course.duration, price: course.price });
    };

    // ✅ Handle Input Change
    const handleInputChange = (e) => {
        setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
    };

    // ✅ Save Edited Course
    const saveEditedCourse = async () => {
        try {
            await axios.put(`/api/updatecourse/${editingCourse}`, editedCourse);
            fetchCourses(); // Refresh courses after update
            toast.success("Course updated successfully!");
            setEditingCourse(null);
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error(error.response?.data?.message || "Failed to update the course.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
    {/* Main container with a minimum height of the full screen, 
        flexbox to center content, and a light gray background with padding */}
    
    <div className="max-w-7xl w-full">
        {/* Wrapper with a maximum width of 7xl and full width */}

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Course List
        </h2>
        {/* Heading with bold text, centered, and margin-bottom for spacing */}

        {loading && <p className="text-center text-blue-500">Loading courses...</p>}
        {/* Shows "Loading courses..." message when data is being fetched */}

        {error && <p className="text-center text-red-500">{error}</p>}
        {/* Shows error message in red if there's an error fetching courses */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Grid layout: 
                - 1 column on small screens
                - 2 columns on medium screens
                - 3 columns on large screens
                - 6px gap between grid items */}
            
            {courses.slice(0, visibleCourses).map((course) => (
                <div key={course._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                    {/* Each course card: 
                        - White background
                        - Shadow for depth
                        - Rounded corners
                        - Padding & flexbox for centering */}
                    
                    <img
                        src={course.image?.url || "/default-image.jpg"}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    {/* Course image: 
                        - Uses course image URL or a default image
                        - Full width, 40px height, rounded corners, and bottom margin */}
                    
                    {editingCourse === course._id ? (
                        <div className="w-full">
                            {/* If the course is being edited, show input fields */}
                            <input
                                type="text"
                                name="title"
                                value={editedCourse.title}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 mb-2"
                            />
                            {/* Input for title with border, rounded corners, and padding */}

                            <input
                                type="text"
                                name="duration"
                                value={editedCourse.duration}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 mb-2"
                            />
                            {/* Input for duration */}

                            <input
                                type="text"
                                name="price"
                                value={editedCourse.price}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 mb-2"
                            />
                            {/* Input for price */}

                            <button
                                onClick={saveEditedCourse}
                                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700"
                            >
                                Save
                            </button>
                            {/* Save button - Green background, white text, hover effect */}
                        </div>
                    ) : (
                        <>
                            {/* If not editing, show course details */}
                            <h3 className="text-xl font-bold text-gray-700 text-center">{course.title}</h3>
                            {/* Course title - Bold and centered */}

                            <p className="text-gray-600">Duration: {course.duration}</p>
                            {/* Course duration - Styled with gray color */}

                            <p className="text-gray-800 font-semibold">Price: {course.price}</p>
                            {/* Course price - Darker text with semi-bold style */}

                            <div className="flex space-x-2 mt-4">
                                {/* Buttons for edit and delete actions */}
                                <button
                                    onClick={() => handleEditClick(course)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-700"
                                >
                                    Edit
                                </button>
                                {/* Edit button - Yellow background with hover effect */}

                                <button
                                    onClick={() => deleteCourse(course._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                {/* Delete button - Red background with hover effect */}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>

        {/* Show More Button */}
        {visibleCourses < courses.length && (
            <div className="text-center mt-6">
                <button
                    onClick={showMoreCourses}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
                >
                    Show More
                </button>
            </div>
        )}
        {/* "Show More" button appears if there are more courses to display */}
    </div>
</div>

    );
}

export default CourseDisplay;
