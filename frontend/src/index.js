import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FabricTest from './Fabric';
import TopBar from './navBar';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TopBar />
    <FabricTest />
  </React.StrictMode>
);

reportWebVitals();
