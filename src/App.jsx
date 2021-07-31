import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Movies from "./components/Movies";
import OneMovie from "./components/OneMovie";
import OneGenre from "./components/OneGenre";
import EditMovie from "./components/EditMovie";
import Admin from "./components/Admin";
import Genres from "./components/Genres";
import Login from "./components/Login";

const App = () => {
  const [jwt, setJWT] = useState("");

  const logout = () => {
    setJWT("");
  };

  let loginLink;
  if (jwt === "") {
    loginLink = <Link to="/login">Login</Link>;
  } else {
    loginLink = (
      <Link to="/logout" onClick={logout}>
        Logout
      </Link>
    );
  }

  const handleJWTChange = () => {};

  return (
    <Router>
      <div className="app">
        <div className="container my-4">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-4">映画を見に行こう！</h1>
            </div>
            <div className="col mt-3 text-end">{loginLink}</div>
            <hr className="mb-4" />
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Home
                  </Link>
                  <Link
                    to="/movies"
                    className="list-group-item list-group-item-action"
                  >
                    映画一覧
                  </Link>
                  <Link
                    to="/genres"
                    className="list-group-item list-group-item-action"
                  >
                    ジャンル
                  </Link>
                  {jwt !== "" && (
                    <>
                      <Link
                        to="/admin/movie/0"
                        className="list-group-item list-group-item-action"
                      >
                        映画の追加
                      </Link>
                      <Link
                        to="/admin"
                        className="list-group-item list-group-item-action"
                      >
                        カタログ管理
                      </Link>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id" component={() => <OneMovie />} />
                <Route path="/movies" component={() => <Movies />} />
                <Route path="/genre/:id" component={() => <OneGenre />} />
                <Route path="/genres" component={() => <Genres />} />
                <Route
                  path="/admin/movie/:id"
                  component={() => <EditMovie />}
                />
                <Route path="/admin" component={() => <Admin />} />
                <Route
                  exact
                  path="/login"
                  component={() => <Login handleJWTChange={handleJWTChange} />}
                />
                <Route path="/" component={() => <Home />} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
