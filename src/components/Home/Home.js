import React from 'react';
import Books from '../Books/Books';
import Movies from '../Movies/Movies';

export default function Home() {

  return(
    <>
      <div>
        <Books />
      </div>
      <div>
        <Movies />
      </div>
    </>
  );
}