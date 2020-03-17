import React, { useEffect } from 'react';
import { db } from '../../firebase';

export default function Books() {

  const bookList = useSelector(state => state.books);

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
          {/* {bookList && bookList.map((book, i)=>
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          )} */}
          {bookList.title}
        </tbody>
      </table>
    </>
  );
}