import React, { useContext } from "react";
import CardMovie from "../components/CardMovie";
import Pagination from "../components/Pagination";
import GenresFilter from "../components/GenresFilter";
import MoviesSaerch from "../components/MoviesSearch";
import { AxiosInterceptor } from "../axiosConfig/axiosinstance";
import LoaderContext from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import Header from "../components/Header";
import useMovies from "../hooks/useMovies";
import useGenres from "../hooks/useGenres";

const MoviesList = () => {
  const [isLoading] = useContext(LoaderContext);
  const movies = useMovies();
  const genres = useGenres();

  return (
    <AxiosInterceptor>
      <Header />
      <main className="container">
        <MoviesSaerch />
        <GenresFilter genres={genres} />
        {isLoading && <Loader />}
        {movies.length >= 1 ? (
          <>
            <ul className="cards-container list-unstyled mt-3 justify-content-center gap-3">
              {movies.map((mov) => (
                <CardMovie mov={mov} key={mov.id} genres={genres} />
              ))}
            </ul>
            {<Pagination />}
          </>
        ) : (
          !isLoading && <h2 className="text-center p-5">لا يوجد أفلام ...</h2>
        )}
      </main>
    </AxiosInterceptor>
  );
};

export default MoviesList;
