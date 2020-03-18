import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import './Movies.css';

export default function Movies() {

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieListReducer);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');

  useEffect(()=>{
    clearReducer();
    resetList();
  }, []);

  const addNewMovie = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/movies/${newTitle}`).set({
        title: newTitle,
        genre: newGenre
      });
      clearReducer();
      resetList();
      setNewTitle('');
      setNewGenre('');
    }
  }

  const clearReducer = () => dispatch({type: `CLEAR_MOVIE_LIST`});

  const resetList = () => {
    db.ref(`/movies`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_MOVIE_LIST`, payload: child.val()});
      });
    });
  }

  return(
    <div className="main-container">
      <h1>Movies</h1>
      <div className="add-new-item-container">
        <span>Add Movie: </span>
        <form className="add-new-item-form" onSubmit={addNewMovie}>
          <input 
            className="add-new-item-input"
            type="text" 
            value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="movie title" 
          />
          <input 
            className="add-new-item-input"
            type="text" 
            value={newGenre} 
            onChange={(e)=>setNewGenre(e.target.value)} 
            placeholder="movie genre" 
          />
          <button type="submit">Add to list!</button>
        </form>
      </div>
      <table className="movie-table">
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
    </div>
  );
}