import React, { useState, useEffect, useContext } from "react";
import { Badge, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useCallback } from "react";
import dayjs from "dayjs";
import NavBar from "../components/Navbar";
import axiosInstance, { AxiosInterceptor } from "../axiosConfig/axiosinstance";
import LoaderContext from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import logo from "../images/logo.png";


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
        <NavBar />
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="details-container d-flex mt-5 gap-2 align-items-start">
                <div className="movie-img-container">
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/` +
                          movie?.poster_path
                        : logo
                    }
                    className="img-movie w-30"
                    alt={movie?.original_title || movie?.title || ""}
                  />
                </div>
                <div className="movie-details">
                  <h2>
                    {movie?.original_title || movie?.title || ""}

                    {movie?.release_date && (
                      <time dateTime={movie.release_date}>
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

                  <section className="mt-4">
                    <h3>قصة الفيلم</h3>
                    <p>{movie?.overview || " غير متوفر"}</p>

                    <div className="wrapper d-flex flex-wrap">
                      <div className="bottom-content d-flex gap-3">
                        {movie?.release_date && (
                          <div className="d-flex">
                            <h4>تاريخ الفيلم: </h4>
                            <time dateTime={movie.release_date}>
                              {dayjs(movie.release_date).format("MMM D, YYYY")}
                            </time>
                          </div>
                        )}

                        {!!movie?.runtime && (
                          <div className="d-flex">
                            <h4> مدة الفيلم: </h4>
                            <p>{`${movie.runtime}دقيقة`}</p>
                          </div>
                        )}
                      </div>
                      <div className="vote">
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
                    </div>
                  </section>
                </div>
              </div>
              <div className="go-home text-center mb-4">
                <button className="btn" onClick={() => redirectToHome()}>
                  عودة الى الصفحة الرئيسية
                </button>
              </div>
            </>
          )}
        </Container>
      </div>
    </AxiosInterceptor>
  );
};

export default MovieDetails;
