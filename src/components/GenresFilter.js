import { useContext, useEffect, useState } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import axiosInstance from "../axiosConfig/axiosinstance";


const GenresFilter = ({genres}) => {

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);



  useEffect(() => {
    const getFilteredMovies = async () => {
      const res = await axiosInstance.get(
        `discover/movie?with_genres=${selectedGenres.join()}`
      );
      setMovies(res.data.results);

      const totalPages =
        res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
      setpageCount(totalPages);
    };
    getFilteredMovies(selectedGenres);
  }, [selectedGenres, setMovies, setpageCount]);

  const handleGenresFilter = (selectedGenre) => {
    if (selectedGenres.includes(selectedGenre)) {
      let filteredGenres = selectedGenres.filter((el) => el !== selectedGenre);
      setSelectedGenres(filteredGenres);
    } else {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-wrap mt-3">
      {genres.map((genre) => (
        <button
          className={`genres-btn ${
            selectedGenres?.includes(genre.id) ? "active" : ""
          }`}
          key={genre.id}
          onClick={() => {
            handleGenresFilter(genre.id)
            document.querySelector('.search input').value=""
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenresFilter;
