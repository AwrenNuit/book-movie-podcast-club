import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import './Books.css';

export default function Books() {

  const dispatch = useDispatch();
  const bookList = useSelector(state => state.bookListReducer);
  const [newAuthor, setNewAuthor] = useState('');
  const [newFree, setNewFree] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');


  useEffect(()=>{
    clearReducer();
    resetList();
  }, []);

  const addNewBook = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/books/${newTitle}`).set({
        author: newAuthor,
        free: newFree,
        location: newLocation,
        title: newTitle
      });
      clearReducer();
      resetList();
      setNewTitle('');
      setNewAuthor('');
      setNewLocation('');
    }
  }

  const clearReducer = () => dispatch({type: `CLEAR_BOOK_LIST`});

  const resetList = () => {
    db.ref(`/books`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_BOOK_LIST`, payload: child.val()});
      });
    });
  }

  return(
    <div className="main-container">
      <h1>Books</h1>
      <div className="add-new-item-container">
      <div className="form-container">
          <h3>Add Book: </h3>
          <form className="add-new-item-form" onSubmit={addNewBook}>
            <div>
              <label>Title:</label>
              <input 
                className="add-new-item-input"
                type="text" 
                value={newTitle} 
                onChange={(e)=>setNewTitle(e.target.value)} 
                placeholder="book title" 
              />
            </div>
            <div>
            <label>Author:</label>
              <input 
                className="add-new-item-input"
                type="text" 
                value={newAuthor} 
                onChange={(e)=>setNewAuthor(e.target.value)} 
                placeholder="book author" 
              />
            </div>
            <div>
              <label>Available for free?</label>
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
            <div>
            <label>Where to find this book online:</label>
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
      <table className="book-table">
        <thead>
          <tr className="book-table-header">
            <th>Title</th>
            <th>Author</th>
            <th>Free?</th>
            <th>Find it Here</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, i)=>
            <tr className="book-table-row" key={i}>
              <td>{book.title}</td>
              <td>{book.author || "-"}</td>
              <td>{book.free || "-"}</td>
              <td>{book.location || "-"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}