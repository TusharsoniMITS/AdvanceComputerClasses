import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'; // Import motion
/* eslint-enable no-unused-vars */

const Counter = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-6xl mx-auto p-6 md:p-10 grid gap-6 md:grid-cols-2 items-center">

        {/* Left Section Animation */}
        <motion.div 
          className="space-y-4 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 leading-snug">
            One Stop Solution <br />
            <span className="text-gray-600">For All Exam Preparation</span>
          </h2>
          <p className="text-gray-500">
            Live classes, Mock Tests, Videos, and eBooks in our Courses.
          </p>
          <Link to='/course' className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
            Get Courses
          </Link>
        </motion.div>

        {/* Right Section (Stats) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[
            { count: "1000+", text: "Live Classes", icon: "fa-solid fa-play" },
            { count: "15000+", text: "Full-Length Mock Tests", icon: "fa-solid fa-check-circle" },
            { count: "8000+", text: "Recorded Videos", icon: "fa-solid fa-video" },
            { count: "11000+", text: "Qualified Student", icon: "fa-solid fa-file-alt" },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <i className={`${item.icon} text-2xl text-blue`}></i>
              <div>
                <h3 className="text-xl font-semibold">{item.count}</h3>
                <p className=" text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Counter;
