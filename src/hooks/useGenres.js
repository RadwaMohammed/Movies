import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/axiosinstance";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      const res = await axiosInstance.get("genre/movie/list");
      setGenres(res.data?.genres || []);
    };
    getGenres();
  }, []);

  return genres;
};

export default useGenres;
