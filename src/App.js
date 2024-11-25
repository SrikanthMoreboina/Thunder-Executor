import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "b30b71d4"; // Use environment variables for security

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch popular movies by default
    fetchMovies("popular");
  }, []);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}`);
      if (response.data.Search) {
        // Option 1: Fetch detailed info for each movie (not recommended for large searches)
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const detailsResponse = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
            return { ...movie, ...detailsResponse.data };
          })
        );
        setMovies(moviesWithDetails);
        setErrorMessage("");
      } else {
        setMovies([]);
        setErrorMessage("No such movie found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) fetchMovies(searchTerm);
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Search App</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar">
            <button type="submit" className="search-icon">
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
            <input
              type="text"
              placeholder="Search for movies by title or years..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </header>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <MovieList movies={movies} onSelectMovie={setSelectedMovie} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
