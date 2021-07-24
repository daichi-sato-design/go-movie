import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditMovie.css";
import Input from "./form-compornents/Input";
import TextArea from "./form-compornents/TextArea";
import Select from "./form-compornents/Select";

const EditMovie = () => {
  const [movie, setMovie] = useState({});
  const [mpaaOptions, setMpaaOptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id > 0) {
      fetch(`http://localhost:4000/v1/movie/${id}`)
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
          const release_date = new Date(json.movie.release_date);
          setMovie({
            id,
            title: json.movie.title,
            release_date: release_date.toISOString().split("T")[0],
            runtime: json.movie.runtime,
            mpaa_rating: json.movie.mpaa_rating,
            rating: json.movie.rating,
            description: json.movie.description,
          });
          setIsLoaded(true);
        })
        .catch((_) => {
          setIsLoaded(true);
        });
    } else {
      // パラメータidが0のとき
      setIsLoaded(true);
    }

    setMpaaOptions([
      { id: "G", value: "G" },
      { id: "PG", value: "PG" },
      { id: "PG14", value: "PG14" },
      { id: "R", value: "R" },
      { id: "NC17", value: "NC17" },
    ]);
  }, [id]);

  const handleSubmit = (evt) => {
    console.log("Form was submitted");
    evt.preventDefault();
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>映画の追加</h2>

        <hr />
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={movie.id}
            onChange={handleChange}
          />

          <Input
            title={"タイトル"}
            type={"text"}
            name={"title"}
            value={movie.title}
            handleChange={handleChange}
          />

          <Input
            title={"上映日"}
            type={"date"}
            name={"release_date"}
            value={movie.release_date}
            handleChange={handleChange}
          />

          <Input
            title={"上映時間"}
            type={"text"}
            name={"runtime"}
            value={movie.runtime}
            handleChange={handleChange}
          />

          <Select
            title={"MPAA レーティング"}
            name={"mpaa_rating"}
            value={movie.mpaa_rating}
            placeholder={"Choose..."}
            options={mpaaOptions}
            handleChange={handleChange}
          />

          <Input
            title={"レーティング"}
            type={"text"}
            name={"rating"}
            value={movie.rating}
            handleChange={handleChange}
          />

          <TextArea
            title={"詳細"}
            name={"description"}
            value={movie.description}
            row={3}
            handleChange={handleChange}
          />

          <hr />

          <button type="submit" className="btn btn-primary">
            保存
          </button>
        </form>

        <div className="mt-4">
          <pre>{JSON.stringify(movie, 0, 3)}</pre>
        </div>
      </>
    );
  }
};

export default EditMovie;
