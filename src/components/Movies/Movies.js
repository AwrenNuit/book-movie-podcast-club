import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';

export default function Movies() {

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieListReducer);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');

  useEffect(()=>{
    resetList();
  }, []);

  async function addNewMovie(e){
    e.preventDefault();
    if(newTitle !== ''){
      await db.ref(`/movies/${newTitle}`).set({
        title: newTitle,
        genre: newGenre
      });
      clearReducer();
      resetList();
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
    <>
      <h1>Movies</h1>
      <div>
        <p>Add Movie</p>
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