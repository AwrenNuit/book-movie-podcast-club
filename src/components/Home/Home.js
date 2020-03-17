import React from 'react';
import Books from '../Books/Books';
import Movies from '../Movies/Movies';
import Podcasts from '../Podcasts/Podcasts';

export default function Home() {

  return(
    <>
      <div>
        <Books />
      </div>
      <div>
        <Movies />
      </div>
      <div>
        <Podcasts />
      </div>
    </>
  );
}