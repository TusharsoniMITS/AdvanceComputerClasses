import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function HindiText() {
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/insertHindiText", {
        text: translatedText,
      });
      toast.success("Text saved successfully!");
      setTranslatedText(""); // Reset the state after successful submission
    } catch (error) {
      console.error("Error saving text:", error);
      toast.error("Text save failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Hindi Typing
        </h1>

        {/* Hindi Typing Input */}
        <textarea
          className="w-full mt-4 p-3 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="Type here in Hindi..."
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default HindiText;
