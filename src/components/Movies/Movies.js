import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';

export default function Movies() {

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieListReducer);

  useEffect(()=>{
    db.ref(`/movies`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_MOVIE_LIST`, payload: child.val()});
      });
    });
  }, []);

  return(
    <>
      <h1>Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie, i)=>
            <tr key={i}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}