import React, { useState } from 'react';
import paperBg from '../assets/paper.jpg'; 
import postitImg from '../assets/postit.png'; 
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password');
      return;
    }

    
    if (isLogin) {
      if (password.length < 4) {
        setError('Password too short');
        return;
      }
     
      onLogin(username);
    } else {
     
      onLogin(username);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${paperBg})` }}
    >
      <div
  className="login-box"
  style={{
    backgroundImage: `url(${postitImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}
>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => { setError(''); setIsLogin(!isLogin); }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
