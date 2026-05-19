import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast"; // Import toaster

function CourseInsert() {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    price: "",
    buylink:"",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("buylink", formData.buylink);
    data.append("image", formData.image);

    try {
      const response = await axios.post("/api/insertCourse", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Course added successfully!"); // Success toaster
        setFormData({ title: "", duration: "", price: "", image: null });
      } else {
        toast.error("Error adding course. Please try again."); // Error toaster
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-6">
      <Toaster /> {/* Toaster component */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter course title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (e.g., 6 weeks)</label>
            <input
              type="text"
              name="duration"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter duration"
              required
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Buy Link</label>
            <input
              type="text"
              name="buylink"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter price"
              required
              value={formData.buylink}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleImageChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseInsert;
