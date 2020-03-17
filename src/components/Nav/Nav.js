import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {

  return(
    <nav>
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/books">
        <li>Books</li>
      </Link>
      <Link to="/movies">
        <li>Movies</li>
      </Link>
      <Link to="/podcasts">
        <li>Podcasts</li>
      </Link>
      <Link to="/about">
        <li>About</li>
      </Link>
    </ul>
    </nav>
  );
}