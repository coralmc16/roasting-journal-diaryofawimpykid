import React, { useState, useEffect, useRef } from 'react';
import './CoverPage.css';
import { playClickSound } from '../utils/playSound'; // 🔊 Import sound utility

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

const hairOptions = [hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8];
const bodyOptions = [body1, body2, body3, body4];

const CoverPage = ({ onOpen }) => {
  const [hairIndex, setHairIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') onOpen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpen]);

  const changeHair = (dir) => {
    playClickSound(); // 🔊 Play sound
    setHairIndex((prev) => (prev + dir + hairOptions.length) % hairOptions.length);
  };

  const changeBody = (dir) => {
    playClickSound(); // 🔊 Play sound
    setBodyIndex((prev) => (prev + dir + bodyOptions.length) % bodyOptions.length);
  };

  const handleNameSubmit = () => {
    playClickSound(); // 🔊 Play sound
    setDisplayedName(nameInput.trim());
  };

  const handleStart = () => {
    playClickSound(); // 🔊 Play sound
    onOpen();
  };

  // **Export avatar function**
  const handleDownloadAvatar = async () => {
    playClickSound();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas size - choose avatar display size, e.g., 400x400 px
    canvas.width = 400;
    canvas.height = 400;

    // Load images asynchronously
    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // To avoid CORS issues if needed
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    try {
      const bodyImg = await loadImage(bodyOptions[bodyIndex]);
      const hairImg = await loadImage(hairOptions[hairIndex]);

      // Draw body first
      ctx.drawImage(bodyImg, 0, 0, canvas.width, canvas.height);
      // Draw hair on top
      ctx.drawImage(hairImg, 0, 0, canvas.width, canvas.height);

      // Create download link
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${displayedName || 'my_avatar'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error loading images for avatar export', err);
      alert('Failed to export avatar image.');
    }
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

        <button className="download-btn" onClick={handleDownloadAvatar}>
          Download Avatar
        </button>

        <button className="start-btn" onClick={handleStart}>Start →</button>
      </div>

      {/* Hidden canvas for exporting avatar */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CoverPage;
