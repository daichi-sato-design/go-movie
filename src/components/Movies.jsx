import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { path } = useRouteMatch();

  useEffect(() => {
    fetch("http://localhost:4000/v1/movies")
      // .then((res) => res.json())
      .then((response) => {
        if (response.status !== 200) {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          setError(err.message);
          throw err;
        }
        return response.json();
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
  }
};

export default Movies;
