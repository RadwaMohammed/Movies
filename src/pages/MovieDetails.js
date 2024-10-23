import React, { useState, useEffect, useContext } from "react";
import { Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useCallback } from "react";
import dayjs from "dayjs";
import axiosInstance, { AxiosInterceptor } from "../axiosConfig/axiosinstance";
import LoaderContext from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import logo from "../images/logo.png";
import Header from "../components/Header";

const MovieDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [isLoading] = useContext(LoaderContext);

  const getMovieDetails = useCallback(async () => {
    const res = await axiosInstance.get(`movie/${param.id}`);
    setMovie(res.data);
  }, [param.id]);
  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  const redirectToHome = () => {
    navigate("/");
  };

  console.log(movie);
  return (
    <AxiosInterceptor>
      <div>
        <Header />
        <main className="container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <article className="details-container d-flex mt-5 gap-2 justify-content-center align-items-start">
                <div className="movie-img-container rounded-2 p-1">
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/` +
                          movie?.poster_path
                        : logo
                    }
                    className="img-movie rounded-3 w-100"
                    alt={movie?.original_title || movie?.title || ""}
                  />
                </div>
                <div className="movie-details">
                  <header>
                    <h2 className="d-flex flex-wrap-reverse">
                      <strong className="order-1 fs-2">
                        {movie?.original_title || movie?.title || ""}
                      </strong>
                      {movie?.release_date && (
                        <time dateTime={movie.release_date} className="ms-1">
                          ({dayjs(movie.release_date).format("YYYY")})
                        </time>
                      )}
                    </h2>

                    <div className="d-flex gap-1 flex-wrap badge-wrapper">
                      {(movie?.genres || []).map((genre) => (
                        <Badge bg="" key={genre.id}>
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </header>

                  <section className="mt-4">
                    <h3 className="fs-3">قصة الفيلم</h3>
                    <p>{movie?.overview || " غير متوفر"}</p>
                  </section>
                  <footer className="d-flex flex-wrap align-items-center mt-4">
                    <div className="bottom-content d-flex">
                      {movie?.release_date && (
                        <div className="d-flex align-items-baseline ms-3 mb-2">
                          <h4 className="fs-5">تاريخ الفيلم: </h4>
                          <time dateTime={movie.release_date} className="me-2">
                            {dayjs(movie.release_date).format("MMM D, YYYY")}
                          </time>
                        </div>
                      )}

                      {!!movie?.runtime && (
                        <div className="d-flex align-items-baseline ms-2">
                          <h4 className="fs-5"> مدة الفيلم: </h4>
                          <p className="me-2">{`${movie.runtime}دقيقة`}</p>
                        </div>
                      )}
                    </div>
                    <div className="vote m-auto">
                      <CircularProgressbar
                        value={movie?.vote_average || 0}
                        maxValue={10}
                        text={`${(movie?.vote_average || 0).toFixed(1)}`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#3c3d37",
                          textColor: "#fff",
                          pathColor: "#fff",
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                  </footer>
                </div>
              </article>
              <div className="go-home text-center mb-4">
                <button className="btn mt-3" onClick={() => redirectToHome()}>
                  عودة الى الصفحة الرئيسية
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </AxiosInterceptor>
  );
};

export default MovieDetails;
