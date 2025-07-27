import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroPage from './components/IntroPage';
import LoginPage from './components/LoginPage';
import CoverPage from './components/CoverPage';
import JournalPage from './components/Journal';
import './App.css';

function App() {
  const [stage, setStage] = useState('intro'); // start with intro
  const [user, setUser] = useState(null);

  const handleIntroContinue = () => setStage('login');
  const handleLogin = (username) => {
    setUser(username);
    setStage('cover');
  };
  const handleCoverOpen = () => setStage('journal');

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
            <CoverPage onOpen={handleCoverOpen} user={user} />
          </motion.div>
        )}

        {stage === 'journal' && (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <JournalPage user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
