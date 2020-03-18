import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase';
import './Podcasts.css';

export default function Podcasts() {

  const dispatch = useDispatch();
  const podcastList = useSelector(state => state.podcastListReducer);
  const [newDescription, setNewDescription] = useState('');
  const [newFree, setNewFree] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(()=>{
    clearReducer();
    resetList();
  }, []);

  const addNewPodcast = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/podcasts/${newTitle}`).set({
        description: newDescription,
        free: newFree,
        location: newLocation,
        title: newTitle
      });
      clearReducer();
      resetList();
      setNewTitle('');
      setNewDescription('');
    }
  }

  const clearReducer = () => dispatch({type: `CLEAR_PODCAST_LIST`});

  const resetList = () => {
    db.ref(`/podcasts`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_PODCAST_LIST`, payload: child.val()});
      });
    });
  }

  return(
    <div className="main-container">
      <h1>Podcasts</h1>
      <div className="add-new-item-container">
        <div className="form-container">
          <h3>Add Podcast: </h3>
          <form className="add-new-item-form" onSubmit={addNewPodcast}>
            <div>
              <label>Title:</label>
              <input 
                className="add-new-item-input"
                type="text" 
                value={newTitle} 
                onChange={(e)=>setNewTitle(e.target.value)} 
                placeholder="podcast name" 
              />
            </div>
            <div>
              <label>Description:</label>
              <input 
                className="add-new-item-input"
                type="text" 
                value={newDescription} 
                onChange={(e)=>setNewDescription(e.target.value)} 
                placeholder="brief description" 
              />
            </div>
            <div>
              <label>Available for free?</label>
              <label>
                <input 
                  className="add-new-item-input"
                  type="radio" 
                  name="free"
                  value="true" 
                  onChange={(e)=>setNewFree(e.target.value)} 
                />
                Yes
              </label>
              <label>
                <input 
                  className="add-new-item-input"
                  type="radio" 
                  name="free"
                  value="false" 
                  onChange={(e)=>setNewFree(e.target.value)} 
                  defaultChecked
                />
                No
              </label>
            </div>
            <div>
            <label>Where to find this podcast:</label>
              <input 
                className="add-new-item-input"
                type="text" 
                value={newLocation} 
                onChange={(e)=>setNewLocation(e.target.value)} 
                placeholder="website link" 
              />
            </div>
            <button type="submit">Add to list!</button>
          </form>
        </div>
      </div>
      <table className="podcast-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Free?</th>
            <th>Find it Here</th>
          </tr>
        </thead>
        <tbody>
          {podcastList.map((podcast, i)=>
            <tr key={i}>
              <td>{podcast.title || "-"}</td>
              <td>{podcast.description || "-"}</td>
              <td>{podcast.free || "-"}</td>
              <td>{podcast.location || "-"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}