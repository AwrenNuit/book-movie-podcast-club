import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function Podcasts() {

  const dispatch = useDispatch();
  const podcastList = useSelector(state => state.podcastListReducer);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(()=>{
    clearReducer();
    resetList();
  }, []);

  const addNewPodcast = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/podcasts/${newTitle}`).set({
        title: newTitle,
        description: newDescription
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
    <>
      <h1>Podcasts</h1>
      <div className="add-new-item-container">
        <span>Add Podcast: </span>
        <form className="add-new-item-form" onSubmit={addNewPodcast}>
          <input 
            className="add-new-item-input"
            type="text" 
            value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="podcast name" 
          />
          <input 
            className="add-new-item-input"
            type="text" 
            value={newDescription} 
            onChange={(e)=>setNewDescription(e.target.value)} 
            placeholder="brief description" 
          />
          <button type="submit">Add to list!</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {podcastList.map((podcast, i)=>
            <tr key={i}>
              <td>{podcast.title}</td>
              <td>{podcast.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}