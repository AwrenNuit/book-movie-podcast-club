import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import './Movies.css';

export default function Movies() {

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieListReducer);
  const [newFree, setNewFree] = useState(false);
  const [newGenre, setNewGenre] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(()=>{
    clearReducer();
    resetList();
  }, []);

  const addNewMovie = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/movies/${newTitle}`).set({
        free: newFree,
        genre: newGenre,
        location: newLocation,
        title: newTitle
      });
      clearReducer();
      resetList();
      setNewTitle('');
      setNewGenre('');
      setNewLocation('');
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
        <div className="form-container">
          <h3>Add Movie: </h3>
          <form className="add-new-item-form" onSubmit={addNewMovie}>
            <div className="flex-row">
              <div className="flex-col">
                <label>Title:</label>
              </div>
              <div className="flex-col">
                <input 
                  className="add-new-item-input"
                  type="text" 
                  value={newTitle} 
                  onChange={(e)=>setNewTitle(e.target.value)} 
                  placeholder="movie title" 
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                <label>Genre:</label>
              </div>
              <div className="flex-col">
                <input 
                  className="add-new-item-input"
                  type="text" 
                  value={newGenre} 
                  onChange={(e)=>setNewGenre(e.target.value)} 
                  placeholder="movie genre" 
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                <label>Available for free?</label>
              </div>
              <div className="flex-col">
                <label>
                  <input 
                    className="add-new-item-input"
                    type="radio" 
                    name="free"
                    value="Yes" 
                    onChange={(e)=>setNewFree(e.target.value)} 
                  />
                  Yes
                </label>
                <label>
                  <input 
                    className="add-new-item-input"
                    type="radio" 
                    name="free"
                    value="No" 
                    onChange={(e)=>setNewFree(e.target.value)} 
                    defaultChecked
                  />
                  No
                </label>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                <label>Where to find this movie:</label>
              </div>
              <div className="flex-col">
                <input 
                  className="add-new-item-input"
                  type="text" 
                  value={newLocation} 
                  onChange={(e)=>setNewLocation(e.target.value)} 
                  placeholder="website, link, etc" 
                />
              </div>
            </div>
            <button type="submit">Add to list!</button>
          </form>
        </div>
      </div>
      <table className="movie-table">
        <thead>
          <tr className="movie-table-header">
            <th>Title</th>
            <th>Genre</th>
            <th>Free?</th>
            <th>Find it Here</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie, i)=>
            <tr className="movie-table-row" key={i}>
              <td>{movie.title || "-"}</td>
              <td>{movie.genre || "-"}</td>
              <td>{movie.free || "-"}</td>
              <td>
                {movie.location ? 
                  <a href={movie.location} target="_blank" rel="noopener noreferrer">{movie.location}</a> 
                : 
                  "-"
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}