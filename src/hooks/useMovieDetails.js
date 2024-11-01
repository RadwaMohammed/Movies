import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/axiosinstance";

const useMovieDetails = (id) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await axiosInstance.get(`movie/${id}`);
      setMovie(res.data);
    };
    getMovieDetails();
  }, [id]);

  return movie;
};

export default useMovieDetails;
