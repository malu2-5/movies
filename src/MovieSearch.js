/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { useApi } from "./ApiContext";  // Import the useApi hook

export default function MovieSearchApp() {
  const { API_KEY, API_URL } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null); // Stores selected movie details

  // Fetch movies with pagination
  const fetchMovies = async (pageNumber = 1) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}&page=${pageNumber}`);
      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
        setError("No movies found.");
      } else {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults));
        setPage(pageNumber);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) fetchMovies(1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Fetch Full Movie Details by IMDb ID
  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Total Pages Calculation
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <>
      <div className="mb-4">
        <a class="navbar-brand" href="#">
          <img src="images/logo.png" height="200" />
        </a>
      </div>
      <form className="d-flex justify-content-center mb-4 col-md-6 mx-auto" onSubmit={(e) => { e.preventDefault(); fetchMovies(); }}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-secondary" type="submit">
            <Search />
          </button>
        </div>
      </form>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 pb-5">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col">
              <a className="card bg-dark text-light h-100 border border-warning text-decoration-none" href=""
                onClick={() => fetchMovieDetails(movie.imdbID)} // Fetch movie details on click
                data-bs-toggle="modal"
                data-bs-target="#movieModal"

              >
                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt={movie.Title}
                  style={{ height: "300px", objectFit: "cover" }}
                  onError={(e) => e.target.src = "images/no-image.svg"}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex flex-column align-items-center mt-5">
          {/* Total Pages Indicator */}
          <p className="mb-2">Page {page} of {totalPages}</p>
          <ul className="pagination">
            {/* First Page Button */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchMovies(1)}>First</button>
            </li>

            {/* Previous Button */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchMovies(page - 1)}>Previous</button>
            </li>

            {/* Page Numbers (Show 5 page numbers max) */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <li key={pageNum} className={`page-item ${pageNum === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => fetchMovies(pageNum)}>{pageNum}</button>
                </li>
              );
            })}

            {/* Next Button */}
            <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchMovies(page + 1)}>Next</button>
            </li>

            {/* Last Page Button */}
            <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchMovies(totalPages)}>Last</button>
            </li>
          </ul>
        </nav>
      )}

      <div className="modal fade" id="movieModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">{selectedMovie?.Title || "Movie Details"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                selectedMovie && (
                  <>
                    <img
                      src={selectedMovie.Poster}
                      className="img-fluid mb-3"
                      alt={selectedMovie.Title}
                      onError={(e) => (e.target.src = "images/no-image.svg")}
                    />
                    <h5>{selectedMovie.Title} ({selectedMovie.Year})</h5>
                    <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                    <p><strong>Director:</strong> {selectedMovie.Director}</p>
                    <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                    <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}