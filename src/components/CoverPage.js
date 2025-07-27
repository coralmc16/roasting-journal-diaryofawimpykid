import React, { useState, useEffect } from 'react';
import './CoverPage.css';
import { playClickSound } from '../utils/playSound'; 

import hair1 from '../assets/hair/hair2.svg';
import hair2 from '../assets/hair/hair11.svg';
import hair3 from '../assets/hair/hair5.svg';
import hair4 from '../assets/hair/hair8.svg';
import hair5 from '../assets/hair/hair7.svg';
import hair6 from '../assets/hair/hair9.svg';
import hair7 from '../assets/hair/hair12.svg';
import hair8 from '../assets/hair/hair13.svg';

import body1 from '../assets/body/boy2.svg';
import body2 from '../assets/body/boy3.svg';
import body3 from '../assets/body/girl1.svg';
import body4 from '../assets/body/girl3.svg';

import gregImg from '../assets/greg.png';  // <-- Import Greg image here

const hairOptions = [hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8];
const bodyOptions = [body1, body2, body3, body4];

const CoverPage = ({ onOpen }) => {
  const [hairIndex, setHairIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [displayedName, setDisplayedName] = useState('');

  // New state for popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Show popup for 3 seconds on name submit
  const handleNameSubmit = () => {
    playClickSound(); 
    const trimmedName = nameInput.trim();
    if (trimmedName) {
      setDisplayedName(trimmedName);
      setShowPopup(true);  // Show popup when name submitted
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3s
    }
  };

  const changeHair = (dir) => {
    playClickSound(); 
    setHairIndex((prev) => (prev + dir + hairOptions.length) % hairOptions.length);
  };

  const changeBody = (dir) => {
    playClickSound(); 
    setBodyIndex((prev) => (prev + dir + bodyOptions.length) % bodyOptions.length);
  };

  return (
    <div className="avatar-select-page">
      <div className="avatar-preview" style={{ position: 'relative', width: 400, height: 400 }}>
        {displayedName && <div className="book-title">{`${displayedName}'s Edition`}</div>}
        <img src={bodyOptions[bodyIndex]} alt="body" className="avatar-part" />
        <img src={hairOptions[hairIndex]} alt="hair" className="avatar-part avatar-hair" />
      </div>

      <div className="name-controls">
        <input
          type="text"
          className="name-input"
          placeholder="Enter your name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button className="submit-name-btn" onClick={handleNameSubmit}>Submit</button>
      </div>

      <div className="controls">
        <div className="control-group">
          <button onClick={() => changeHair(-1)}>←</button>
          <span>Hair</span>
          <button onClick={() => changeHair(1)}>→</button>
        </div>
        <div className="control-group">
          <button onClick={() => changeBody(-1)}>←</button>
          <span>Body</span>
          <button onClick={() => changeBody(1)}>→</button>
        </div>

        <button
          className="start-btn"
          onClick={() => {
            playClickSound();
            const finalName = displayedName || nameInput.trim();
            if (!finalName) {
              alert('Please enter your name before starting!');
              return;
            }
            onOpen({
              hairIndex,
              bodyIndex,
              name: finalName,
            });
          }}
        >
          Start →
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-greg">
          <img src={gregImg} alt="Greg" />
          <p>looks just like you!</p>
        </div>
      )}
    </div>
  );
};

export default CoverPage;
