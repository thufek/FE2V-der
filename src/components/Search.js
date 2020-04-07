import React, { useState, useContext, useEffect } from "react";
import { VaderContext } from "../context/VaderContext";

const Search = () => {
  const [searchWord, setSearchWord] = useState();

  const [, fetchData, , errorMessage, , fetchWeekData] = useContext(
    VaderContext
  );

  //Hämtar väderinfo för Stockholm som default
  useEffect(() => {
    fetchData("Stockholm");
    fetchWeekData("Stockholm");
  }, []);

  return (
    <div className="form-group mt-2">
      <input
        className="form-control"
        type="text"
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button
        className="btn btn-dark mt-2 float-right"
        onClick={() => {
          fetchData(searchWord);
          fetchWeekData(searchWord);
        }}
      >
        Search
      </button>
      <div className="mt-5 ml-4 pt-4 pb-0 float-right">{errorMessage}</div>
    </div>
  );
};

export default Search;
