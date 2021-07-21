import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

const CategoryPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <h2>カテゴリー</h2>

      <ul className="mt-3">
        <li>
          <Link to={`${path}/comedy`}>コメディ</Link>
        </li>
        <li>
          <Link to={`${path}/drama`}>ドラマ</Link>
        </li>
      </ul>
    </>
  );
};

export default CategoryPage;
