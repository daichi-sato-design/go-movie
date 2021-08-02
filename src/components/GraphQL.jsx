import React, { useState, useEffect } from "react";
import Input from "./form-compornents/Input";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState({
    search: "",
  });

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
    let value = evt.target.value;
    let name = evt.target.name;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
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

        <form onSubmit={handleSubmit}>
          <Input
            title={"Search"}
            type={"text"}
            name={"search"}
            value={searchTerm.search}
            handleChange={handleChange}
          ></Input>
        </form>

        <div className="list-group">
          {movies.map((m, _) => (
            <a
              key={m.id}
              className="list-group-item list-group-item-action"
              href="#!"
            >
              <strong>{m.title}</strong>
              <br />
              <small className="text-muted">
                ({m.year} - {m.runtime} minutes)
              </small>
              <br />
              {m.description.slice(0, 100)}...
            </a>
          ))}
        </div>
      </>
    );
  }
};

export default GraphQL;
