import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import dayjs from "dayjs";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Badge } from "react-bootstrap";

const CardMovie = ({ mov, genres }) => {
  const movGenres = genres.filter((genre) =>
    mov?.genre_ids?.includes(genre.id)
  );

  return (
    <li className="movie-card p-1 rounded-2 position-relative">
      <Link to={`/movie/${mov.id}`}>
        <img
          src={
            mov?.poster_path
              ? `https://image.tmdb.org/t/p/w500/` + mov?.poster_path
              : logo
          }
          className="card-img w-100 h-100 rounded-3"
          alt={mov?.title || mov?.original_title || ""}
        />
        <div className="card-overlay w-100 h-100 position-absolute top-0 bottom-0 start-0 end-0">
          <section className="p-2 position-relative w-100 h-100">
            <h2 className="fw-bold fs-5 text-center lh-base py-2 px-1">
              {mov?.original_title || mov?.title || ""}
            </h2>
            {mov?.release_date && (
              <time dateTime={mov.release_date} className="d-block">
                {dayjs(mov.release_date).format("MMM D, YYYY")}
              </time>
            )}
            <ul className="d-flex gap-1 flex-wrap p-2 list-unstyled">
              {movGenres.map((genre) => (
                <li key={genre.id}>
                <Badge bg="">
                  {genre.name}
                </Badge>
                </li>

              ))}
            </ul>
            <div className="vote position-absolute">
              <CircularProgressbar
                value={mov?.vote_average || 0}
                maxValue={10}
                text={`${(mov?.vote_average || 0).toFixed(1)}`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#181c14",
                  textColor: "#ecdfcc",
                  pathColor: "#ecdfcc",
                  trailColor: "transparent",
                })}
              />
            </div>
          </section>
        </div>
      </Link>
    </li>
  );
};

export default CardMovie;
