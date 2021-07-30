import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { path } = useRouteMatch();

  useEffect(() => {
    fetch("http://localhost:4000/v1/movies")
      .then((res) => {
        if (res.status !== 200) {
          let err = Error;
          err.message = "Invalid response code: " + res.status;
          setError(err.message);
          throw err;
        }
        return res.json();
      })
      .then((json) => {
        setMovies(json.movies);
        setIsLoaded(true);
      })
      .catch((_) => {
        setIsLoaded(true);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>映画検索</h2>
        <ul className="list-group mt-3">
          {movies.map((m) => (
            <Link
              key={m.id}
              to={`${path}/${m.id}`}
              className="list-group-item list-group-item-action"
            >
              {m.title}
            </Link>
          ))}
        </ul>
      </>
    );
  }
};

export default Movies;
