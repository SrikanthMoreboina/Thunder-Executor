import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=b30b71d4";


const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}&i=${movie.imdbID}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [movie]);

  if (!details) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{details.Title}</h2>
        <p><strong>Genre:</strong> {details.Genre}</p>
        <p><strong>Plot:</strong> {details.Plot}</p>
        <p><strong>Rating:</strong> {details.imdbRating}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;
