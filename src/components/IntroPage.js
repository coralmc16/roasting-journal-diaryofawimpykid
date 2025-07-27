import React, { useEffect, useState, useRef } from 'react';
import './IntroPage.css';
import backgroundImage from '../assets/bkg.png';
import themeSong from '../assets/themesong1.mp3';
import cheeseImg from '../assets/cheese.webp';

const fullText =
  "Weelcome to the Diary of a Wimpy Kid-themed Roasting Journal by Coral Carlsson. Design your avatar and chat with the roaster chatbot.";

const IntroPage = ({ onContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const themeAudioRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Typing animation
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
    if (isPlaying) return; // prevent double clicks

    const audio = new Audio(themeSong);
    audio.loop = false;
    audio.volume = 0.7;

    setIsPlaying(true); // update button state

    audio.play()
      .then(() => {
        console.log("🎵 Theme song playing");
      })
      .catch((err) => {
        console.warn("Audio playback failed, proceeding immediately:", err);
        onContinue(); // fallback if playback fails
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
    </div>
  );
};

export default IntroPage;

