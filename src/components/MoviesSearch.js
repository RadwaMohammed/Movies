import { useContext } from "react";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import axiosInstance from "../axiosConfig/axiosinstance";

const MoviesSaerch = () => {
  const [, setMovies] = useContext(MovieContext);
  const [, setpageCount] = useContext(PageCountContext);
  const reActiveGenresBtn = () => {
    [...document.getElementsByClassName('genres-btn')].forEach(el => el.classList.remove('active'))
  }
  const search = async (word) => {
    try{
      if (word.trim()) {

        const res = await axiosInstance.get(`search/movie?query=${word}`);
        setMovies(res.data.results);
        const totalPages =
          res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
        setpageCount(totalPages);
      }
    } catch(err) {
      alert(err)
    } finally {
      reActiveGenresBtn()
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
