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
    <Link to={`/movie/${mov.id}`} className="card">
      <img
        src={
          mov?.poster_path
            ? `https://image.tmdb.org/t/p/w500/` + mov?.poster_path
            : logo
        }
        className="card__image"
        alt={mov?.title || mov?.original_title || ""}
      />
      <div className="card__overlay">
        <div className="overlay__text p-2">
          <h2>{mov?.original_title || mov?.title || ""}</h2>
          {mov?.release_date && (
            <time dateTime={mov.release_date}>
              {dayjs(mov.release_date).format("MMM D, YYYY")}
            </time>
          )}
          <div className="d-flex gap-1 flex-wrap mt-3 p-2">
            {movGenres.map((genre) => (
              <Badge bg="" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="vote">
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
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;
