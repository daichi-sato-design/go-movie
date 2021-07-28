import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/genres`)
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
        setGenres(json.genres);
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
        <h2>ジャンル</h2>

        <ul className="list-group mt-3">
          {genres.map((m) => (
            <Link
              key={m.id}
              to={{ pathname: `/genre/${m.id}`, genreName: m.genre_name }}
              className="list-group-item list-group-item-action"
            >
              {m.genre_name}
            </Link>
          ))}
        </ul>
      </>
    );
  }
};

export default Genres;
