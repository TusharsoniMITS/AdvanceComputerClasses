import { useState, useEffect, useRef } from "react";
import axios from "axios";

const EnglishTyping = () => {
  const [textSamples, setTextSamples] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
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
  const [ setCurrentPage] = useState(1);
  const [currentPageGroup,] = useState(0); // each group = 5 pages



  const textContainerRef = useRef(null);
  const currentWordRef = useRef(null);

  useEffect(() => {
    axios.get("/api/getAllText")
      .then((response) => {
        if (response.data && response.data.allMessage) {
          setTextSamples(response.data.allMessage.map((item) => item.text));
          setText(response.data.allMessage[0]?.text || "");
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


  const grossWPM = ((totalTypedChars / 5) / selectedTime).toFixed(2);
  const netWPM = (grossWPM - errors / selectedTime).toFixed(2);
  const accuracy = totalTypedChars > 0
    ? (((totalTypedChars / 5 - errors) / (totalTypedChars / 5)) * 100).toFixed(2)
    : 100;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          English Typing Practice
        </h1>

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
              min="0.1"
              step="0.1"
            />
          </div>
        )}

        <div
          ref={textContainerRef}
          className="border p-4 rounded-lg overflow-y-auto bg-gray-50 text-lg leading-relaxed mb-4 break-words h-100"
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


        <div className="flex flex-wrap justify-center space-x-2 mt-6">

          {/* Previous Button */}
          <button
            onClick={() => {
              if (textIndex > 0) {
                setTextIndex(textIndex - 1);
                setText(textSamples[textIndex - 1]);
                setCurrentPage(textIndex);
                handleReset();
              }
            }}
            className={`px-2 py-1 text-sm rounded ${textIndex === 0 ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
            disabled={textIndex === 0}
          >
            Prev
          </button>

      
          {/* Page Number Buttons */}
          {textSamples
            .slice(currentPageGroup * 5, currentPageGroup * 5 + 5) // Show only 5
            .map((_, i) => {
              const realIndex = currentPageGroup * 5 + i;
              return (
                <button
                  key={realIndex}
                  onClick={() => {
                    setTextIndex(realIndex);
                    setText(textSamples[realIndex]);
                    setCurrentPage(realIndex + 1);
                    handleReset();
                  }}
                  className={`px-2 py-1 text-sm rounded ${textIndex === realIndex ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                >
                  {realIndex + 1}
                </button>
              );
            })}

          {/* Next Button */}
          <button
            onClick={() => {
              if (textIndex < textSamples.length - 1) {
                setTextIndex(textIndex + 1);
                setText(textSamples[textIndex + 1]);
                setCurrentPage(textIndex + 2);
                handleReset();
              }
            }}
            className={`px-2 py-1 text-sm rounded ${textIndex === textSamples.length - 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
            disabled={textIndex === textSamples.length - 1}
          >
            Next
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="bg-green-500 text-white px-2 py-1 text-sm rounded"
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
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
              <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnglishTyping;
