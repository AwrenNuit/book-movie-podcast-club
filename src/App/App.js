import React, { useEffect } from 'react';
import './App.css';
import { db } from '../firebase';

export default function App() {

  useEffect(()=>{
    db.ref(`/books`).on(`value`, snap => {
      snap.forEach(child => {
        console.log(child.val());
      });
    });
  }, []);

  return (
    <>
      <p>operational</p>
    </>
  );
}