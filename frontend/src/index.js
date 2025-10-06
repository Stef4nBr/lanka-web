import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';

import FabricTest from './Fabric';
import TopBar from './TopBar';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{marginTop:"3%"}}></div>
    <TopBar />
    <FabricTest />
  </React.StrictMode>
);

reportWebVitals();
