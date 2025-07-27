import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroPage from './components/IntroPage';
import LoginPage from './components/LoginPage';
import CoverPage from './components/CoverPage';
import JournalPage from './components/Journal';
import './App.css';

function App() {
  const [stage, setStage] = useState('intro');
  const [user, setUser] = useState(null); // username string from login
  const [avatarData, setAvatarData] = useState(null); // object with hairIndex, bodyIndex, name

  const handleIntroContinue = () => setStage('login');
  const handleLogin = (username) => {
    setUser(username);
    setStage('cover');
  };

  // This receives avatar data from CoverPage, sets it in state, and moves to journal page
  const handleCoverOpen = (avatar) => {
    setAvatarData(avatar);
    setStage('journal');
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <IntroPage onContinue={handleIntroContinue} />
          </motion.div>
        )}

        {stage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        )}

        {stage === 'cover' && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <CoverPage onOpen={handleCoverOpen} />
          </motion.div>
        )}

        {stage === 'journal' && avatarData && (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <JournalPage user={avatarData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
