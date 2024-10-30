import { useContext } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import axiosInstance from "../axiosConfig/axiosinstance";
import PageContext from "../contexts/PageContext";

const MoviesSaerch = () => {
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const [, setPagePath] = useContext(PageContext);

  const reActiveGenresBtn = () => {
    [...document.getElementsByClassName("genres-btn")].forEach((el) =>
      el.classList.remove("active")
    );
  };

  const search = async (word) => {
    try {
      if (word.trim()) {
        const res = await axiosInstance.get(
          `search/movie?query=${word.trim()}`
        );
        setMovies(res.data.results);
        const totalPages =
          res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
        setpageCount(totalPages);
        setPagePath(`search/movie?query=${word.trim()}`);
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

  const onSearch = (word) => {
    search(word);
  };

  return (
    <form className="search d-flex justify-content-center pt-3">
      <input
        onChange={(e) => onSearch(e.target.value)}
        type="text"
        className="form-control"
        placeholder="ابــحــث ....."
      />
    </form>
  );
};

export default MoviesSaerch;
