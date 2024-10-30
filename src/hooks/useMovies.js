import { useContext, useEffect } from "react";
import axiosInstance from "../axiosConfig/axiosinstance";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import PageContext from "../contexts/PageContext";

const useMovies = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const [, setPagePath] = useContext(PageContext);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await axiosInstance.get("movie/popular");
        setMovies(res.data.results);
        const totalPages =
          res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
        setpageCount(totalPages);
        setPagePath("movie/popular?");
      } catch (error) {
        alert(error);
      }
    };
    getAllMovies();
  }, [setMovies, setpageCount, setPagePath]);
  return movies;
};

export default useMovies;
