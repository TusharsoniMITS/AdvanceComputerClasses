import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";

const HindiTypingTest = () => {
  const [textSamples, setTextSamples] = useState([]);
  const [setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [selectedTime, setSelectedTime] = useState(1);
  const [time, setTime] = useState(selectedTime * 60);
  const [started, setStarted] = useState(false);
  const [errors, setErrors] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [incorrectWords, setIncorrectWords] = useState([]);

  const textContainerRef = useRef(null);
  const currentWordRef = useRef(null);

  const itemsPerPage = 1; // One text per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(textSamples.length / itemsPerPage);

  const [showMarquee, setShowMarquee] = useState(true);

  useEffect(() => {
    axios.get("/api/getAllHindiText")
      .then((response) => {
        if (response.data && response.data.allMessage) {
          const sampleTexts = response.data.allMessage.map((item) => item.text);
          setTextSamples(sampleTexts);
          setText(sampleTexts[0] || "");
        } else {
          console.error("Invalid API response format", response);
        }
      })
      .catch((error) => console.error("API Fetch Error:", error));
  }, []);

  useEffect(() => {
    let timer;
    if (started && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsFinished(true);
      setShowModal(true);
    }
    return () => clearInterval(timer);
  }, [started, time]);

  useEffect(() => {
    if (currentWordRef.current) {
      currentWordRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [input]);

  const handleChange = (e) => {
    if (!started) setStarted(true);
    const newValue = e.target.value;
    setInput(newValue);
    setTotalTypedChars(newValue.length);

    let errorCount = 0;
    const words = text.split(" ");
    const inputWords = newValue.split(" ");
    const incorrectIndices = [];

    inputWords.forEach((word, i) => {
      if (word !== words[i]) {
        errorCount++;
        incorrectIndices.push(i);
      }
    });

    setErrors(errorCount);
    setIncorrectWords(incorrectIndices);
  };

  const handleReset = () => {
    setInput("");
    setErrors(0);
    setTotalTypedChars(0);
    setTime(selectedTime * 60);
    setStarted(false);
    setIsFinished(false);
    setShowModal(false);
    setIncorrectWords([]);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    const newIndex = (pageNum - 1) * itemsPerPage;
    setTextIndex(newIndex);
    setText(textSamples[newIndex]);
    handleReset();
  };

  const grossWPM = ((totalTypedChars / 5) / selectedTime).toFixed(2);
  const netWPM = (grossWPM - errors / selectedTime).toFixed(2);
  const accuracy = totalTypedChars > 0
    ? (((totalTypedChars / 5 - errors) / (totalTypedChars / 5)) * 100).toFixed(2)
    : 100;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12">
        <div className="flex flex-col space-y-4 px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
            Hindi Typing Practice
          </h1>

          {showMarquee && (
        <Marquee pauseOnHover={true} gradient={false}>
          <Link
            to="/hinditypinginstruction"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowMarquee(false)} // Hide when clicked
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-yellow-400 text-black hover:text-blue-600 cursor-pointer p-2 rounded"
          >
            !! IMPORTANT INSTRUCTION FOR PRACTICE HINDI TYPING IF DONE IGNORE IT !!
          </Link>
        </Marquee>
      )}

        </div>





        {!started && (
          <div className="mb-4 flex justify-center items-center space-x-4">
            <label className="text-lg font-semibold">Set Time (minutes):</label>
            <input
              type="number"
              className="border p-2 rounded-md w-20"
              value={selectedTime}
              onChange={(e) => {
                const newTime = parseFloat(e.target.value);
                if (!isNaN(newTime) && newTime > 0) {
                  setSelectedTime(newTime);
                  setTime(newTime * 60);
                }
              }}
              disabled={started}
              min="1"
              step="1"
            />
          </div>
        )}

        <div
          ref={textContainerRef}
          className="border p-4 rounded-lg overflow-y-auto bg-gray-50 text-lg leading-relaxed mb-4 break-words h-100 text-justify"
        >
          {text.split(" ").map((word, i) => {
            const isCurrentWord = i === input.split(" ").length - 1;
            return (
              <span
                key={i}
                ref={isCurrentWord ? currentWordRef : null}
                className={`mr-2 ${isCurrentWord
                  ? "bg-yellow-300 text-black font-bold"
                  : input.split(" ")[i] === word
                    ? "text-green-500"
                    : incorrectWords.includes(i)
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        <textarea
          className="w-full p-3 border rounded-md"
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          disabled={isFinished}
        />

        <p className="mt-4 text-center text-lg font-semibold text-gray-800">
          ⏳ Time Left: {time}s | 📝 Typed: {totalTypedChars} chars |
          ❌ Errors: {errors} | 🎯 Accuracy: {accuracy}% | 🚀 Gross WPM: {grossWPM} |
          🏆 Net WPM: {netWPM}
        </p>

        <div className="flex space-x-2 justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
          >
            Previous
          </button>

          {/* Show only 5 page numbers at a time */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNum) =>
                pageNum >= Math.max(1, currentPage - 2) &&
                pageNum <= Math.min(totalPages, currentPage + 2)
            )
            .map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md ${currentPage === pageNum
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
                  }`}
              >
                {pageNum}
              </button>
            ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
          >
            Next
          </button>

          <button
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Test Completed!</h2>
            <p className="text-lg">🚀 Gross WPM: {grossWPM}</p>
            <p className="text-lg">🏆 Net WPM: {netWPM}</p>
            <p className="text-lg">🎯 Accuracy: {accuracy}%</p>
            <p className="text-lg">❌ Errors: {errors}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleReset}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HindiTypingTest;
