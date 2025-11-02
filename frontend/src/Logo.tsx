import React from 'react';
import './Logo.css';

function Logo(): React.ReactElement {
  return (
    <>
      <div className="logo-container">
        <svg className="logo-svg" viewBox="0 0 960 300">
          <symbol id="s-text">
            <text className="logo-text" textAnchor="middle" x="50%" y="80%">www.lan.ka/</text>
          </symbol>

          <g className="g-ants">
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
          </g>
        </svg>
      </div>
    </>
  );
}

export default Logo;
