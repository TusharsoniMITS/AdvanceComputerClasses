import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/insertcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Form submitted successfully!");
        setFormData({ name: "", city: "", address: "", email: "", message: "" });
      } else {
        setResponseMessage("Error submitting form. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Network error. Please check your connection.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Contact Us</h2>
        <p className="text-gray-500 text-center mb-6">We'd love to hear from you!</p>

        {responseMessage && (
          <p className={`text-center mb-4 ${responseMessage.includes("error") ? "text-red-500" : "text-green-500"}`}>
            {responseMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "city", "address", "email", "message"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "message" ? (
                <textarea
                  name={field}
                  rows="4"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder={`Enter your ${field}`}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder={`Enter your ${field}`}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
