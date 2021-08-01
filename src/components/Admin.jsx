import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, withRouter } from "react-router-dom";

const Admin = withRouter((props) => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { path } = useRouteMatch();

  useEffect(() => {
    // ユーザー認証
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login",
      });
      return;
    }
    // DBから映画一覧の取得
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
  }, [props.history, props.jwt]);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>カタログ管理</h2>
        <ul className="list-group mt-3">
          {movies.map((m) => (
            <Link
              key={m.id}
              to={`${path}/movie/${m.id}`}
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

export default Admin;
