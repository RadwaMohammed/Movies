import React, { useContext, useEffect, useState } from "react";
import CardMovie from "../components/CardMovie";
import PaginationComponent from "../components/Pagination";
import GenresFilter from "../components/GenresFilter";
import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import MoviesSaerch from "../components/MoviesSearch";
import axiosInstance, { AxiosInterceptor } from "../axiosConfig/axiosinstance";
import LoaderContext from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import Header from "../components/Header";

const MoviesList = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [pageCount, setpageCount] = useContext(PageCountContext);
  const [genres, setGenres] = useState([]);
  const [isLoading] = useContext(LoaderContext);

  const getPage = async (page) => {
    try {
      const res = await axiosInstance.get(`movie/popular?page=${page}`);
      setMovies(res.data.results);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await axiosInstance.get("movie/popular");
        setMovies(res.data.results);
        const totalPages =
          res.data?.total_pages > 500 ? 500 : res.data?.total_pages;
        setpageCount(totalPages);
      } catch (error) {
        alert(error);
      }
    };
    getAllMovies();
  }, [setMovies, setpageCount]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await axiosInstance.get("genre/movie/list");
      setGenres(res.data?.genres || []);
    };
    getGenres();
  }, []);

  return (
    <AxiosInterceptor>
      <Header />
      <main className="container">
        <MoviesSaerch />
        <GenresFilter genres={genres} />
        {isLoading && <Loader />}
        {movies.length >= 1 ? (
          <>
            <ul className="cards-container list-unstyled mt-3 justify-content-center gap-3 px-2">
              {movies.map((mov) => (
                <CardMovie mov={mov} key={mov.id} genres={genres} />
              ))}
            </ul>
            {<PaginationComponent getPage={getPage} pageCount={pageCount} />}
          </>
        ) : (
          !isLoading && <h2 className="text-center p-5">لا يوجد أفلام ...</h2>
        )}
      </main>
    </AxiosInterceptor>
  );
};

export default MoviesList;
