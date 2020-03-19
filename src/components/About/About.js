import React from 'react';
import './About.css';

export default function About() {

  return(
    <div className="main-container">
      <div className="about-container">
        <h1 className="about-heading">About</h1>
        <p className="about-p">
          Hey everyone! I'm Awren. I figure since we're all quarantined for at least a couple weeks we should 
          dive deeper into how technology can build community. What are your favorite books, movies, and 
          podcasts? Share them! See what other people are suggesting and check those out! Get your friends 
          and family to use this and have some discussions about them!
        </p>
        <p className="about-p">
          I plan on keeping this account-free and registration-free. This is an ongoing project where I'm 
          updating things as I go, so bear with me if some bugs start cropping up. If you have suggestions 
          or run into bugs I'd love to hear about it! You can email me at&nbsp;
          <a href="mailto:awren.nuit@gmail.com?Subject=Book%20and%20Movie%20Club" target="_top">
            awren.nuit@gmail.com
          </a>
          .
        </p>
        <p className="about-p">
          I'm also in the market for a job, so if you enjoy this and you or someone you know is hiring software 
          engineers please reach out! All of the code for my projects, including this one, is available to view 
          on <a href="https://github.com/AwrenNuit" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </div>
    </div>
  );
}