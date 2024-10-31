import { useContext, useEffect } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import PageContext from "../contexts/PageContext";
import axiosInstance from "../axiosConfig/axiosinstance";

const useGenresFilter = (selectedGenres) => {
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
};

export default useGenresFilter;
