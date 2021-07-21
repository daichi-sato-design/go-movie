import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const { path } = useRouteMatch();
  useEffect(() => {
    setMovies([
      { id: 1, title: "ショーシャンクの空に", runtime: 142 },
      { id: 2, title: "ゴッドファーザー", runtime: 175 },
      { id: 3, title: "ダークナイト", runtime: 153 },
    ]);
  }, []);

  return (
    <>
      <h2>映画を探す</h2>
      <ul className="mt-3">
        {movies.map((m) => (
          <li key={m.id}>
            <Link to={`${path}/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
