import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import "./EditMovie.css";
import Input from "./form-compornents/Input";
import TextArea from "./form-compornents/TextArea";
import Select from "./form-compornents/Select";
import Alert from "./ui-components/Alert";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const EditMovie = withRouter((props) => {
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    rating: "",
    description: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [formAlert, setFormAlert] = useState({
    type: "d-none",
    message: "",
  });

  const { id } = useParams();

  useEffect(() => {
    // ユーザー認証
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login",
      });
      return;
    }
    // urlのidパラメータで映画の「追加・編集」切り替え
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
  }, [id, props.history, props.jwt]);

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
  ];

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Clientフォームのバリデーション
    let errors = [];
    if (movie.title === "") {
      errors.push("title");
    }
    if (movie.release_date === "") {
      errors.push("release_date");
    }
    if (movie.runtime === "") {
      errors.push("runtime");
    }
    if (movie.release_date === "") {
      errors.push("mpaa_rating");
    }
    if (movie.rating === "") {
      errors.push("rating");
    }
    if (movie.description === "") {
      errors.push("description");
    }
    setErrors(errors);
    if (errors.length > 0) {
      return false;
    }

    // バリデーション通過後
    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    myHeader.append("Authorization", `Bearer ${props.jwt}`);

    const requestOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(payload),
    };

    fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setFormAlert({
            type: "alert-danger",
            message: data.error.message,
          });
        } else {
          setFormAlert({
            type: "alert-success",
            message: "Changes saved!",
          });
        }
      });
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const confirmDelete = () => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    myHeader.append("Authorization", `Bearer ${props.jwt}`);

    const requestOptions = {
      method: "GET",
      headers: myHeader,
    };
    confirmAlert({
      title: "Delete movie?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "はい",
          onClick: () => {
            fetch(
              `http://localhost:4000/v1/admin/deletemovie/${id}`,
              requestOptions
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  setFormAlert({
                    type: "alert-danger",
                    message: data.error.message,
                  });
                } else {
                  props.history.push("/admin");
                }
              });
          },
        },
        {
          label: "キャンセル",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>映画の追加</h2>
        <Alert alertType={formAlert.type} alertMessage={formAlert.message} />
        <hr />
        <form onSubmit={handleSubmit}>
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
            className={hasError("title") ? "is-invalid" : ""}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
            errorMsg={"※ タイトルを入力してください。"}
          />

          <Input
            title={"上映日"}
            type={"date"}
            name={"release_date"}
            value={movie.release_date}
            handleChange={handleChange}
            className={hasError("release_date") ? "is-invalid" : ""}
            errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
            errorMsg={"※ 上映日を入力してください。"}
          />

          <Input
            title={"上映時間"}
            type={"text"}
            name={"runtime"}
            value={movie.runtime}
            handleChange={handleChange}
            className={hasError("runtime") ? "is-invalid" : ""}
            errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
            errorMsg={"※ 上映時間を入力してください。"}
          />

          <Select
            title={"MPAA レーティング"}
            name={"mpaa_rating"}
            value={movie.mpaa_rating}
            placeholder={"Choose..."}
            options={mpaaOptions}
            handleChange={handleChange}
            className={hasError("mpaa_rating") ? "is-invalid" : ""}
            errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
            errorMsg={"※ MPAAレーティングを選択してください。"}
          />

          <Input
            title={"レーティング"}
            type={"text"}
            name={"rating"}
            value={movie.rating}
            handleChange={handleChange}
            className={hasError("rating") ? "is-invalid" : ""}
            errorDiv={hasError("rating") ? "text-danger" : "d-none"}
            errorMsg={"※ レーティングを入力してください。"}
          />

          <TextArea
            title={"詳細"}
            name={"description"}
            value={movie.description}
            row={3}
            handleChange={handleChange}
            className={hasError("description") ? "is-invalid" : ""}
            errorDiv={hasError("description") ? "text-danger" : "d-none"}
            errorMsg={"※ 詳細を入力してください。"}
          />

          <hr />

          <button type="submit" className="btn btn-primary">
            保存
          </button>
          <Link to="/admin" className="btn btn-warning ms-1">
            キャンセル
          </Link>
          {movie.id > 0 && (
            <a
              href="#!"
              onClick={() => confirmDelete()}
              className="btn btn-danger ms-1"
            >
              削除
            </a>
          )}
        </form>
      </>
    );
  }
});

export default EditMovie;
