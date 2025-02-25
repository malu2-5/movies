import React from "react";
import MovieSearch from "./MovieSearch"; // Your existing movie search component

export default function MovieSearchApp({ setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <div className="container-fluid p-4 text-white text-center bg-dark min-vh-100">
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <MovieSearch />
    </div>
  );
}
