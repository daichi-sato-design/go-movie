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
        <h2>カテゴリー</h2>

        <ul className="mt-3">
          {genres.map((m) => (
            <li key={m.id}>
              <Link to={`/genre/${m.id}`}>{m.genre_name}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
};

export default Genres;
