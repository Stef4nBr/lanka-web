import React from 'react';
import './navBar.css';

function TopBar() {
  return (
    <div class="topBar">
      <div class="leftSide">
        <h1>www.lan.ka/</h1>
      </div>
      <div class="rightSide">
        <button class="HTP">How to play</button>
        <button class="login">Admin Access</button>
      </div>
    </div>
  );
}

export default TopBar;
