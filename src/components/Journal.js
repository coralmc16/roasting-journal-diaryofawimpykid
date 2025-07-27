import React, { useState, useRef, useEffect } from 'react';
import paper from '../assets/paper.jpg';
import { generateRoast } from '../roastLogic';
import writingSound from '../assets/writingeffect.mp3';
import './Journal.css';

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

const JournalPage = ({ user }) => {
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
      }, 40);
      return () => clearInterval(interval);
    }
  }, [roast]);

  if (!user) {
    return <div>Please create your avatar first.</div>;
  }

  return (
    <div className="journal-page" style={{ backgroundImage: `url(${paper})` }}>
      <div className="avatar-display">
        <img src={bodyOptions[user.bodyIndex]} alt="avatar-body" className="avatar-part" />
        <img src={hairOptions[user.hairIndex]} alt="avatar-hair" className="avatar-part avatar-hair" />
        
      </div>

      <div className="writing-area">
        <div
          className="user-text"
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Dear Diary..."
          onInput={(e) => setEntry(e.currentTarget.textContent)}
          onKeyDown={handleKeyDown}
        ></div>

        {roast && <div className="roast-text typing-text">{animatedText}</div>}
      </div>
    </div>
  );
};

export default JournalPage;
