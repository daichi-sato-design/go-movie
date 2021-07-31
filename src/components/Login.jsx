import React, { useState } from "react";
import Input from "./form-compornents/Input";
import Alert from "./ui-components/Alert";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  //   const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [formAlert, setFormAlert] = useState({
    type: "d-none",
    message: "",
  });

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let errors = [];
    if (state.email === "") {
      errors.push("email");
    }
    if (state.password === "") {
      errors.push("password");
    }
    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    fetch("http://localhost:4000/v1/signin", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setFormAlert({
            type: "alert-danger",
            message: data.error.message,
          });
        } else {
          console.log(data);
          setFormAlert({
            type: "alert-success",
            message: "Success!",
          });
        }
      });
  };

  return (
    <>
      <h2>ログイン</h2>
      <hr />
      <Alert alertType={formAlert.type} alertMessage={formAlert.message} />

      <form onSubmit={handleSubmit}>
        <Input
          title={"メールアドレス"}
          type={"text"}
          name={"email"}
          handleChange={handleChange}
          className={hasError("email") ? "is-invalid" : ""}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMsg={"有効なメールアドレスを入力してください"}
        />

        <Input
          title={"パスワード"}
          type={"password"}
          name={"password"}
          handleChange={handleChange}
          className={hasError("password") ? "is-invalid" : ""}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMsg={"パスワードを入力してください"}
        />

        <button type="submit" className="btn btn-primary">
          ログイン
        </button>
      </form>
    </>
  );
};

export default Login;
