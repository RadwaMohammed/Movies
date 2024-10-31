import { useState } from "react";
import useGenresFilter from "../hooks/useGenresFilter";

const GenresFilter = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  useGenresFilter(selectedGenres);

  const handleGenresFilter = (selectedGenre) => {
    if (selectedGenres.includes(selectedGenre)) {
      let filteredGenres = selectedGenres.filter((el) => el !== selectedGenre);
      setSelectedGenres(filteredGenres);
    } else {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  return (
    <ul className="d-flex justify-content-center flex-wrap mt-3 list-unstyled">
      {genres.map((genre) => (
        <li key={genre.id}>
          <button
            className={`rounded-1 genres-btn ${
              selectedGenres?.includes(genre.id) ? "active" : ""
            }`}
            onClick={() => {
              handleGenresFilter(genre.id);
              document.querySelector(".search input").value = "";
            }}
          >
            {genre.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GenresFilter;
