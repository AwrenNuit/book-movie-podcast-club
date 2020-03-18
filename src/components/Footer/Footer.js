import React from 'react';
import './Footer.css';

export default function Footer() {

  return(
    <>
      <div className="whitespace"></div>
      <div className="footer-container">
        <p className="footer-content">&copy; {new Date().getFullYear()} Awren Nuit</p>
      </div>
    </>
  );
}