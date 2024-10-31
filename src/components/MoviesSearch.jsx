import { useState } from "react";
import useSearch from "../hooks/useSearch";

const MoviesSaerch = () => {
  const [inputValue, setInputValue] = useState("");
  useSearch(inputValue);
  const onSearch = (value) => {
    setInputValue(value);
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
