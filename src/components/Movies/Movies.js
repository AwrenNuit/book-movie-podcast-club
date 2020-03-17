import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';

export default function Movies() {

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieListReducer);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');

  useEffect(()=>{
    db.ref(`/movies`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_MOVIE_LIST`, payload: child.val()});
      });
    });
  }, []);

  const addNewMovie = () => {

  }

  return(
    <>
      <h1>Movies</h1>
      <div>
        <p>Add Book</p>
        <form onSubmit={addNewMovie}>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="movie title" 
          />
          <input 
            type="text" 
            value={newGenre} 
            onChange={(e)=>setNewGenre(e.target.value)} 
            placeholder="movie genre" 
          />
          <button type="submit">Add to list!</button>
        </form>
      </div>
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