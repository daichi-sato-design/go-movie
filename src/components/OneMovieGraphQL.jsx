import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OneMovieGraphQL = () => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const payload = `
        {
            movie(id: ${id}) {
                id
                title
                runtime
                year
                description
                release_date
                rating
                mpaa_rating
                poster
            }
        }
        `;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      Headers: myHeaders,
    };

    fetch("http://localhost:4000/v1/graphql", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          let err = Error;
          err.Message = "Invalid response code " + res.status;
          setError(err.Message);
          throw err;
        }
        return res.json();
      })
      .then((json) => {
        setMovie(json.data.movie);
        setIsLoaded(true);
      })
      .catch((_) => {
        setIsLoaded(true);
      });
  }, [id]);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>
          {movie.title} ({movie.year})
        </h2>

        {movie.poster !== "" && (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
              alt="poster"
            />
          </div>
        )}

        <div className="float-start">
          <small>Rating: {movie.mpaa_rating}</small>
        </div>
        <div className="float-end">
          {movie.genres.map((m, index) => (
            <span className="badge bg-secondary me-1" key={index}>
              {m}
            </span>
          ))}
        </div>
        <div className="clearfix"></div>

        <hr />

        <table className="table table-compact table-striped mt-3">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>タイトル</strong>
              </td>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <td>
                <strong>詳細</strong>
              </td>
              <td>{movie.description}</td>
            </tr>
            <tr>
              <td>
                <strong>上映時間</strong>
              </td>
              <td>{movie.runtime}分</td>
            </tr>
            <tr>
              <td>
                <strong>公開日</strong>
              </td>
              <td>{movie.release_date}</td>
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              <td>{movie.rating}</td>
            </tr>
            <tr>
              <td>
                <strong>MPAA</strong>
              </td>
              <td>{movie.mpaa_rating}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default OneMovieGraphQL;
