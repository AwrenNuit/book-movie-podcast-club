import React, { useEffect } from 'react';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function Books() {

  const dispatch = useDispatch();
  const bookList = useSelector(state => state.bookListReducer);

  useEffect(()=>{
    db.ref(`/books`).on(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_BOOK_LIST`, payload: child.val()});
      });
    });
  }, []);

  return(
    <>
      <h1>Books</h1>
      {JSON.stringify(bookList)}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
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