import React from 'react';
import './Roast.css';

function Roast({ text }) {
  return (
    <div className="roast-box">
      <h2>Your Roast:</h2>
      <p>{text}</p>
    </div>
  );
}

export default Roast;
