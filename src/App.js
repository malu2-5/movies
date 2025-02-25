import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import MovieSearchApp from "./MovieSearchApp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/movies" />} />
        <Route path="/movies" element={isAuthenticated ? <MovieSearchApp setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
