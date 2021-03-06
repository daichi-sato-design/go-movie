import React, { useState, useEffect } from "react";
import { useParams, Link, withRouter } from "react-router-dom";

const OneGenre = withRouter((props) => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/movies/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          let err = Error;
          err.Message = "Invalid response code: " + res.status;
          setError(err.Message);
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
  }, [id]);

  if (!movies) {
    setMovies([]);
  }

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>ジャンル: {props.location.genreName}</h2>
        <ul className="list-group mt-3">
          {movies.map((m) => (
            <Link
              key={m.id}
              to={`/movies/${m.id}`}
              className="list-group-item list-group-item-action"
            >
              {m.title}
            </Link>
          ))}
        </ul>
      </>
    );
  }
});

export default OneGenre;
