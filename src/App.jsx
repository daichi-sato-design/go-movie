import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Movies from "./components/Movies";
import OneMovie from "./components/OneMovie";
import Genres from "./components/Genres";
import Admin from "./components/Admin";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="container mt-4">
          <div className="row">
            <h1 className="mt-4">映画を見に行こう！</h1>
            <hr className="mb-4" />
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/movies">映画一覧</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/genres">ガテゴリー</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/admin">カタログ管理</Link>
                  </li>
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
                <Route exact path="/genres">
                  <Genres title={"コメディ"} />
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
