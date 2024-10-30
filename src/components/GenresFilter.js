import { useContext, useEffect, useState } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import axiosInstance from "../axiosConfig/axiosinstance";
import PageContext from "../contexts/PageContext";

const GenresFilter = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const [, setPagePath] = useContext(PageContext);

  useEffect(() => {
    const getFilteredMovies = async () => {
      const res = await axiosInstance.get(
        `discover/movie?with_genres=${selectedGenres.join()}`
      );
      setMovies(res.data.results);

      const totalPages =
        res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
      setpageCount(totalPages);
      selectedGenres.join()
        ? setPagePath(`discover/movie?with_genres=${selectedGenres.join()}`)
        : setPagePath("movie/popular?");
    };
    getFilteredMovies(selectedGenres);
  }, [selectedGenres, setMovies, setpageCount, setPagePath]);

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
