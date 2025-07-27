import React, { useEffect, useState, useRef } from 'react';
import './IntroPage.css';
import backgroundImage from '../assets/bkg.png';
import themeSong from '../assets/themesong1.mp3';
import cheeseImg from '../assets/cheese.webp';
import cheeseTouchImg from '../assets/touch1.png'; 

const fullText =
  "Weelcome to the Diary of a Wimpy Kid-themed Roasting Journal by Coral Carlsson. Design your avatar and chat with the roaster chatbot.";

const IntroPage = ({ onContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gotCheeseTouch, setGotCheeseTouch] = useState(false);
  const themeAudioRef = useRef(null);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
      }
    }, 30);

    return () => {
      clearInterval(typingIntervalRef.current);
    };
  }, []);

  const handleBeginClick = () => {
    if (isPlaying) return;

    setGotCheeseTouch(true); 
    setIsPlaying(true);

    const audio = new Audio(themeSong);
    audio.loop = false;
    audio.volume = 0.7;

    audio.play()
      .then(() => {
        console.log("🎵 Theme song playing");
      })
      .catch((err) => {
        console.warn("Audio playback failed, proceeding immediately:", err);
        onContinue();
      });

    themeAudioRef.current = audio;

    audio.onended = () => {
      console.log("🎵 Theme song ended");
      onContinue();
    };
  };

  return (
    <div
      className="intro-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <p className="intro-text">{displayedText}</p>

      <button
        className="begin-button"
        onClick={handleBeginClick}
        disabled={isPlaying}
        aria-label="Begin"
      >
        <div className="tooltip-container">
          <img
            src={cheeseImg}
            alt="Begin button cheese"
            className="cheese-image"
          />
          <span className="tooltip-text">touch if u dare</span>
        </div>
      </button>

      {gotCheeseTouch && (
        <div className="cheese-touch-popup">
          <p className="cheese-touch-text">you got the cheese touch!!!</p>
          <img src={cheeseTouchImg} alt="Cheese touch" className="cheese-touch-image" />
        </div>
      )}
    </div>
  );
};

export default IntroPage;

