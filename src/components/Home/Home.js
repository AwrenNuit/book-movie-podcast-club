import React from 'react';
import './Home.css';

export default function Home() {

  return(
    <div className="main-container">
      <h1>Hey there!</h1>
      <div className="home-container">
        <p className="home-p">
          Hello and welcome to the Cozy Community Collective! This is a place to share some of your 
          favorite books, movies, and podcasts. What are some feel-good movies that boost your mood? 
          How about some books that make all the problems of the real-world seem far, far away? Got a 
          great podcast? Maybe some media to help us learn new skills? Awesome cooking resources? 
          Cleaning tips? Share them all!
        </p>
        <p className="home-p">
          I aim to keep this account-free and totally open to the public, so please don't abuse this! I 
          would prefer to keep things nice and open. That said, if there are any suggestions on stuff 
          that might make this better let me know. Email me at&nbsp;
          <a href="mailto:awren.nuit@gmail.com?Subject=Book%20and%20Movie%20Club" target="_top">
            awren.nuit@gmail.com
          </a>
          .
        </p>
        <p className="home-p">
          Click or tap on "Books", "Movies", or "Podcasts" above to get goin'. Happy travels!~ &hearts;
        </p>
      </div>
    </div>
  );
}