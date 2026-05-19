import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'; // Import motion
/* eslint-enable no-unused-vars */

function CourseDisplay() {
    const [courses, setCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState(9);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/api/getAllCourse");
                setCourses(response.data.allCourse || []);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again.");
                toast.error("Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const showMoreCourses = () => {
        setVisibleCourses((prev) => prev + 9);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="max-w-7xl w-full">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Course List</h2>

                {loading && <p className="text-center text-blue-500">Loading courses...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {courses.length > 0 ? (
                        courses.slice(0, visibleCourses).map((course, index) => (
                            <motion.div
                                key={course._id}
                                className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={course.image?.url || "/default-image.jpg"}
                                    alt={course.title}
                                    className="w-full h-56 object-contain bg-white"
                                />
                                <h3 className="text-xl font-bold text-gray-700">{course.title || "No Title"}</h3>
                                <p className="text-gray-600">Duration: {course.duration || "N/A"}</p>
                                <p className="text-gray-800 font-semibold">Price: {course.price || "Free"}</p>
                                <a
                                    className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition"
                                    href={course.buylink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get This Course
                                </a>
                            </motion.div>
                        ))
                    ) : (
                        !loading && <p className="text-center text-gray-500">No courses available.</p>
                    )}
                </div>

                {visibleCourses < courses.length && (
                    <div className="text-center mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={showMoreCourses}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
                        >
                            Show More
                        </motion.button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDisplay;
