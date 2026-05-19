import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for Vite
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Create Context
export const Context = createContext({
  isAuthorized: false,
  user: {},
  setIsAuthorized: () => {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthorized")) ?? false; // ✅ Fixed localStorage parsing
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) ?? {}; // ✅ Fixed localStorage parsing
  });

  // Save auth state to localStorage on change
  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify(isAuthorized));
  }, [isAuthorized]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  );
};

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
