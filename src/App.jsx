import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Movies from "./components/Movies";
import OneMovie from "./components/OneMovie";
import OneGenre from "./components/OneGenre";
import EditMovie from "./components/EditMovie";
import Admin from "./components/Admin";
import Genres from "./components/Genres";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="container my-4">
          <div className="row">
            <h1 className="mt-4">映画を見に行こう！</h1>
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
                </ul>
              </nav>
            </div>
            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id">
                  <OneMovie />
                </Route>
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route path="/genre/:id">
                  <OneGenre />
                </Route>
                <Route path="/genres">
                  <Genres />
                </Route>
                <Route path="/admin/movie/:id">
                  <EditMovie />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
