import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./form-compornents/Input";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const payload = `
        {
            list{
                id
                title
                description
                runtime
                year
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
        let theList = Object.values(json.data.list);
        return theList;
      })
      .then((theList) => {
        setMovies(theList);
        setIsLoaded(true);
      })
      .catch((_) => {
        setIsLoaded(true);
      });
  }, []);

  const handleChange = (evt) => {
    const newSearchTerm = evt.target.value;
    setSearchTerm(newSearchTerm);
    perfromSearch(newSearchTerm);
  };

  const perfromSearch = (newSearchTerm) => {
    const payload = `
        {
            search(titleContains: "${newSearchTerm}") {
                id
                title
                runtime
                year
                description
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
        return res.json();
      })
      .then((json) => {
        let theList = Object.values(json.data.search);
        return theList;
      })
      .then((theList) => {
        if (theList.length > 0) {
          setMovies(theList);
        } else {
          setMovies([]);
        }
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>GraphQL</h2>
        <hr />

        <Input
          title={"Search"}
          type={"text"}
          name={"search"}
          value={searchTerm}
          handleChange={handleChange}
        ></Input>

        <div className="list-group">
          {movies.map((m, _) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/movies/${m.id}`}
            >
              <strong>{m.title}</strong>
              <br />
              <small className="text-muted">
                ({m.year} - {m.runtime} minutes)
              </small>
              <br />
              {m.description.slice(0, 100)}...
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default GraphQL;
