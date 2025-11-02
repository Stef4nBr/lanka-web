import React from 'react';
import './Logo.css';

function Logo(): React.ReactElement {
  return (
    <>
      <div className="container" style={{ margin: 'initial', maxWidth: '100%', width: 'fit-content' }}>
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="80%">l̲a̲n̲.̲k̲a̲/̲</text>
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
