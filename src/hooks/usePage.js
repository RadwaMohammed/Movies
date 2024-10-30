import { useContext, useEffect } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import axiosInstance from "../axiosConfig/axiosinstance";
import PageContext from "../contexts/PageContext";

const usePage = (page) => {
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const [pagePath] = useContext(PageContext);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await axiosInstance.get(`${pagePath}&page=${page}`);
        setMovies(res.data.results);
        const totalPages =
          res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
        setpageCount(totalPages);
      } catch (error) {
        alert(error);
      }
    };
    getAllMovies();
  }, [page, setMovies, setpageCount, pagePath]);
};

export default usePage;
