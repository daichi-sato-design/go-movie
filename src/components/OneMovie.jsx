import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OneMovie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setMovie({
      id,
      title: "Some movie",
      runtime: 150,
    });
  }, [id]);

  return (
    <>
      <h2>
        映画：{movie.title} {movie.id}
      </h2>
      <table className="table table-compact table-striped mt-3">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>タイトル</strong>
            </td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>
              <strong>上映時間</strong>
            </td>
            <td>{movie.runtime}分</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OneMovie;
