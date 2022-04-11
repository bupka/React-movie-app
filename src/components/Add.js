import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value);

    fetch(`
https://api.themoviedb.org/3/search/movie?api_key=2a92fb9ed92190ce01628040ed11d5f4&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        if (!data.errors) {
          setResults(data.results);
          // console.log(setResults);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={search}
              onChange={onChange}
            />
          </div>
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
