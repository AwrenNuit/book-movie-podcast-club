import React from 'react';

export default function Movies() {

  return(
    <>
      <h1>Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title1</td>
            <td>genre1</td>
          </tr>
          <tr>
            <td>title2</td>
            <td>genre2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}