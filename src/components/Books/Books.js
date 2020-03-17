import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import './Books.css';

export default function Books() {

  const dispatch = useDispatch();
  const bookList = useSelector(state => state.bookListReducer);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  useEffect(()=>{
    resetList();
  }, []);

  const addNewBook = e => {
    e.preventDefault();
    if(newTitle !== ''){
      db.ref(`/books/${newTitle}`).set({
        title: newTitle,
        author: newAuthor
      });
      clearReducer();
      resetList();
      setNewTitle('');
      setNewAuthor('');
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
    <>
      <h1>Books</h1>
      <div className="add-new-item-container">
        <span>Add Book: </span>
        <form className="add-new-item-form" onSubmit={addNewBook}>
          <input 
            className="add-new-item-input"
            type="text" 
            value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="book title" 
          />
          <input 
            className="add-new-item-input"
            type="text" 
            value={newAuthor} 
            onChange={(e)=>setNewAuthor(e.target.value)} 
            placeholder="book author" 
          />
          <button type="submit">Add to list!</button>
        </form>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th className="book-table-heading">Title</th>
            <th className="book-table-heading">Author</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, i)=>
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}