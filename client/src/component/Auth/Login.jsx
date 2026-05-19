import { useState, useContext } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main"; // Ensure this path is correct
import toast from "react-hot-toast"

function Login() {
  const { setIsAuthorized } = useContext(Context); // Get authentication state from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        "/api/signIn",
        { email, password },
        { withCredentials: true } // ✅ Ensures /cookies are included
      );
  
      console.log("🟢 Login Response:", response.data); // Debugging
  
      // ✅ Extract user object & token from response
      const { user } = response.data;
  
      if (!user || !user.role) {
        setError("User role not found. Please contact support.");
        return;
      }
      
      localStorage.setItem("token", response.data.token)
      // ✅ Update authentication state
      setIsAuthorized(true);
  
      // ✅ Navigate based on user role
      switch (user.role) {
        case "admin":
          toast.success("Login admin successful!");
          navigate("/admin", { replace: true });
          break;
        case "student":
          toast.success("Login student successful!");
          navigate("/studentdashboard", { replace: true });
          break;
        default:
          setError("Unauthorized role. Please contact support.");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };
  


  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6">Sign in to continue</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>

            <Link to="/changepassword" className="text-sm text-blue-600 hover:underline">Change Password</Link>
            
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
