import { useState, useEffect } from "react";
import axios from "axios";
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'; // Import motion
/* eslint-enable no-unused-vars */
import { Link } from "react-router-dom"; // ✅ Fixed import

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/getAllBlog")
      .then((res) => {
        if (Array.isArray(res.data.allBlog)) {
          setPosts(res.data.allBlog);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load posts");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto my-10 p-6 md:p-8 border rounded-2xl shadow-xl bg-gray-900">
      <div className="max-w-8xl mx-auto p-4 md:p-6 rounded-xl">

        {/* Heading animation */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-center mb-6 md:mb-8 text-yellow-400 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          LATEST VACANCY & IMPORTANT UPDATES
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              className="p-4 md:p-6 border rounded-xl shadow-xl bg-gray-100 transition-all duration-200 relative overflow-hidden group hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
              <Link
                to={`/blogview/${post._id}`}
                className="text-base md:text-lg hover:underline font-semibold text-blue-500 hover:text-black transition-colors duration-150 relative z-10"
              >
                {post.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
