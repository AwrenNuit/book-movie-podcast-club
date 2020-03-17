import React from 'react';

export default function Books() {

  return(
    <>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title1</td>
            <td>author1</td>
          </tr>
          <tr>
            <td>title2</td>
            <td>author2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}