import React from 'react';

export default function Footer() {

  return(
    <>
      <div className="whitespace"></div>
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Awren Nuit</p>
      </div>
    </>
  );
}