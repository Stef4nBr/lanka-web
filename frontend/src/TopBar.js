import React, { useState } from 'react';

import './TopBar.css';

import LoginModal from './LoginModal';

function TopBar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="base">
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
      <div className="topBar">
        <div className="leftSide">
          <h1>www.lan.ka/</h1>
        </div>
        <div className="rightSide">
          <button className="HTP">How to play</button>
          <button
            className="login"
            onClick={() => setShowLogin(true)}
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
