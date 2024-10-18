import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardMovie from "../components/CardMovie";
import PaginationComponent from "../components/Pagination";
import GenresFilter from "../components/GenresFilter";

import MovieContext from "../contexts/MoviesContext";
import PageCountContext from "../contexts/PageCountContext";
import MoviesSaerch from "../components/MoviesSearch";
import NavBar from "../components/Navbar";
import axiosInstance, { AxiosInterceptor } from "../axiosConfig/axiosinstance";
import LoaderContext from "../contexts/LoaderContext";
import Loader from "../components/Loader";

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
      <NavBar />
      <Container>
        <MoviesSaerch />
        <GenresFilter genres={genres} />
        {isLoading && <Loader />}

        <div className="mt-3">
          {movies.length >= 1 ? (
            <>
              <div className="cards-container">
                {movies.map((mov) => (
                  <CardMovie key={mov.id} mov={mov} genres={genres} />
                ))}
              </div>
              {<PaginationComponent getPage={getPage} pageCount={pageCount} />}
            </>
          ) : (
            !isLoading && <h2 className="text-center p-5">لا يوجد أفلام ...</h2>
          )}
        </div>
      </Container>
    </AxiosInterceptor>
  );
};

export default MoviesList;
