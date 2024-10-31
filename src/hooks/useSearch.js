import { useContext, useEffect } from "react";
import axiosInstance from "../axiosConfig/axiosinstance";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import PageContext from "../contexts/PageContext";

const useSearch = (text) => {
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const [, setPagePath] = useContext(PageContext);

  const reActiveGenresBtn = () => {
    [...document.getElementsByClassName("genres-btn")].forEach((el) =>
      el.classList.remove("active")
    );
  };
  useEffect(() => {
    const search = async (text) => {
      try {
        if (text.trim()) {
          const res = await axiosInstance.get(
            `search/movie?query=${text.trim()}`
          );
          setMovies(res.data.results);
          const totalPages =
            res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
          setpageCount(totalPages);
          setPagePath(`search/movie?query=${text.trim()}`);
        } else {
          const res = await axiosInstance.get("movie/popular");
          setMovies(res.data.results);
          const totalPages =
            res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
          setpageCount(totalPages);
          setPagePath("movie/popular?");
        }
      } catch (err) {
        alert(err);
      } finally {
        reActiveGenresBtn();
      }
    };
    search(text);
  }, [text, setMovies, setPagePath, setpageCount]);
};

export default useSearch;
