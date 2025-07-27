import React, { useState, useRef, useEffect } from 'react';
import paper from '../assets/paper.jpg';
import { generateRoast } from '../roastLogic';
import writingSound from '../assets/writingeffect.mp3';
import './Journal.css';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [roast, setRoast] = useState('');
  const [animatedText, setAnimatedText] = useState('');
  const writingAudioRef = useRef(new Audio(writingSound));

  writingAudioRef.current.volume = 0.3;

  const handleKeyDown = (e) => {
    if (!writingAudioRef.current.paused) {
      writingAudioRef.current.currentTime = 0;
    }
    writingAudioRef.current.play();

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setRoast(generateRoast(entry));
    }
  };

  useEffect(() => {
    let index = 0;
    setAnimatedText('');
    if (roast) {
      const interval = setInterval(() => {
        setAnimatedText((prev) => prev + roast.charAt(index));
        index++;
        if (index >= roast.length) {
          clearInterval(interval);
        }
      }, 40); // Adjust speed here
      return () => clearInterval(interval);
    }
  }, [roast]);

  return (
    <div
      className="journal-page"
      style={{ backgroundImage: `url(${paper})` }}
    >
      <div className="writing-area">
      <div
        className="user-text"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Dear Diary..."
        onInput={(e) => setEntry(e.currentTarget.textContent)}
        onKeyDown={handleKeyDown}
        ></div>

        {roast && (
          <div className="roast-text typing-text">
            {animatedText}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
