import React, { useState } from "react";

const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // Set the clicked movie
  };

  const handleClose = () => {
    setSelectedMovie(null); // Clear the selection when closing
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-item"
          onClick={() => handleCardClick(movie)}
        >
          <img src={movie.Poster} alt={movie.Title} />
          <div>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}

      {/* Highlighted details */}
      {selectedMovie && (
        <div className="highlighted-details">
          <button className="close-btn" onClick={handleClose}>
            ✖
          </button>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <h2>{selectedMovie.Title}</h2>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
          <p><strong>Cast:</strong> {selectedMovie.Actors}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
